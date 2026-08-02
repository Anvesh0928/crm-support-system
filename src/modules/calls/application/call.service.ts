import { CallModel } from '../infrastructure/call.model.js';
import { CallSessionStore } from './call-session.store.js';
import { CustomerService } from '../../customers/application/customer.service.js';
import { CallStatus, CallDirection, SentimentScore } from '../../../shared/constants/enums.js';
import { NotFoundError } from '../../../shared/errors/AppError.js';
import { getIO } from '../../../config/socket.config.js';

const customerService = new CustomerService();
const sessionStore = new CallSessionStore();

export class CallService {
  async startCallSession(params: {
    exotelCallSid: string;
    fromNumber: string;
    toNumber: string;
    direction?: CallDirection;
  }) {
    const customer = await customerService.findOrCreateByPhone(params.fromNumber);

    const callRecord = await CallModel.create({
      exotelCallSid: params.exotelCallSid,
      customerId: customer._id,
      fromNumber: params.fromNumber,
      toNumber: params.toNumber,
      direction: params.direction || CallDirection.INBOUND,
      status: CallStatus.INITIATED,
      startTime: new Date(),
    });

    await sessionStore.saveSession(params.exotelCallSid, {
      exotelCallSid: params.exotelCallSid,
      callId: callRecord._id.toString(),
      customerId: customer._id.toString(),
      fromNumber: params.fromNumber,
      status: CallStatus.INITIATED,
      startTime: Date.now(),
    });

    try {
      const io = getIO();
      io.to('live_agents').emit('call:started', {
        callId: callRecord._id,
        exotelCallSid: params.exotelCallSid,
        customer,
        status: CallStatus.INITIATED,
        fromNumber: params.fromNumber,
      });
    } catch (_) {}

    return callRecord;
  }

  async appendTranscriptChunk(sid: string, speaker: 'SYSTEM_AI' | 'CUSTOMER' | 'HUMAN_AGENT', text: string, sentiment?: SentimentScore) {
    const timestamp = new Date().toISOString();
    await sessionStore.appendUtterance(sid, { speaker, text, timestamp });

    try {
      const io = getIO();
      io.to('live_agents').emit('call:transcript_chunk', {
        exotelCallSid: sid,
        speaker,
        text,
        timestamp,
        sentiment,
      });
    } catch (_) {}
  }

  async handoverCallToAgent(sid: string, agentId: string) {
    await sessionStore.updateStatus(sid, CallStatus.ESCALATED);

    const call = await CallModel.findOneAndUpdate(
      { exotelCallSid: sid },
      { status: CallStatus.ESCALATED, assignedAgentId: agentId },
      { new: true }
    ).populate('customerId');

    if (!call) {
      throw new NotFoundError('Active call not found');
    }

    try {
      const io = getIO();
      io.to('live_agents').emit('call:escalated', { exotelCallSid: sid, agentId, call });
    } catch (_) {}

    return call;
  }

  async endCallSession(sid: string, recordingUrl?: string, summary?: string) {
    const session = await sessionStore.getSession(sid);
    const bufferedUtterances = await sessionStore.getBufferedTranscript(sid);

    const endTime = new Date();
    let durationSeconds = 0;

    if (session) {
      durationSeconds = Math.round((endTime.getTime() - session.startTime) / 1000);
    }

    const call = await CallModel.findOneAndUpdate(
      { exotelCallSid: sid },
      {
        status: CallStatus.COMPLETED,
        endTime,
        durationSeconds,
        recordingUrl,
        summary: summary || 'Automated support call completed via AI Assistant.',
        $push: { transcript: { $each: bufferedUtterances } },
      },
      { new: true }
    ).populate(['customerId', 'assignedAgentId']);

    await sessionStore.deleteSession(sid);

    try {
      const io = getIO();
      io.to('live_agents').emit('call:ended', { exotelCallSid: sid, call });
    } catch (_) {}

    return call;
  }

  async getCallById(id: string) {
    const call = await CallModel.findById(id).populate(['customerId', 'assignedAgentId']);
    if (!call) {
      throw new NotFoundError('Call record not found');
    }
    return call;
  }

  async listCalls(limit = 20, page = 1) {
    const skip = (page - 1) * limit;
    const [calls, total] = await Promise.all([
      CallModel.find().sort({ createdAt: -1 }).skip(skip).limit(limit).populate(['customerId', 'assignedAgentId']),
      CallModel.countDocuments(),
    ]);

    return { calls, total, page, totalPages: Math.ceil(total / limit) };
  }
}
