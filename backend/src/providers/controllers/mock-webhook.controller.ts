import { Request, Response, NextFunction } from 'express';
import { ProviderFactory } from '../provider.factory.js';
import { CustomerService } from '../../api/services/customer.service.js';
import { CallService } from '../../api/services/call.service.js';
import { CallDirection, CallStatus } from '../../shared/constants/enums.js';
import { SocketEmitterService } from '../../sockets/services/socket-emitter.service.js';
import { logger } from '../../config/logger.config.js';

const callProvider = ProviderFactory.getCallProvider();
const aiProvider = ProviderFactory.getAIProvider();
const customerService = new CustomerService();
const callService = new CallService();
const socketEmitter = SocketEmitterService.getInstance();

export class MockWebhookController {
  // Simulates an incoming customer call trigger
  async simulateIncomingCall(req: Request, res: Response, next: NextFunction) {
    try {
      const { fromNumber = '+15550199832', toNumber = '08045678901' } = req.body;

      // 1. Trigger Mock Call Provider
      const callEvent = await callProvider.startCall({
        fromNumber,
        toNumber,
        direction: CallDirection.INBOUND,
      });

      // 2. Fetch or Create Customer profile using CustomerService API
      let customer;
      try {
        customer = await customerService.getCustomerByPhone(fromNumber);
      } catch (_) {
        customer = await customerService.createCustomer({
          phone: fromNumber,
          name: 'Simulated Caller',
          accountTier: 'STANDARD',
        });
      }

      // 3. Create Call record in MongoDB using CallService API
      const call = await callService.initiateCall({
        exotelCallSid: callEvent.callSid,
        fromNumber,
        toNumber,
        direction: CallDirection.INBOUND,
      });

      // 4. Broadcast real-time Socket.IO event to connected agents
      socketEmitter.emitToAgents('call:incoming' as any, {
        callSid: callEvent.callSid,
        fromNumber,
        toNumber,
        customerName: customer.name,
        accountTier: customer.accountTier,
        joinedAt: new Date().toISOString(),
      });

      logger.info({ callSid: callEvent.callSid }, '📞 Simulated Incoming Call Triggered');
      return res.status(200).json({ success: true, data: { callSid: callEvent.callSid, call } });
    } catch (error) {
      next(error);
    }
  }

  // Simulates an agent answering the incoming call
  async simulateAgentAnswer(req: Request, res: Response, next: NextFunction) {
    try {
      const { callSid, agentId } = req.body;
      const updatedEvent = await callProvider.acceptCall(callSid, agentId || 'mock_agent_id');

      const call = await callService.getCallById(callSid).catch(() => null);
      if (call) {
        await callService.updateCallStatus(call._id.toString(), CallStatus.IN_PROGRESS);
      }

      logger.info({ callSid }, '📞 Simulated Agent Answered Call');
      return res.status(200).json({ success: true, data: updatedEvent });
    } catch (error) {
      next(error);
    }
  }

  // Simulates call termination
  async simulateCallEnded(req: Request, res: Response, next: NextFunction) {
    try {
      const { callSid } = req.body;
      const endedEvent = await callProvider.endCall(callSid);

      const call = await callService.getCallById(callSid).catch(() => null);
      if (call) {
        await callService.endCall(call._id.toString(), 'Simulated call ended', endedEvent.recordingUrl);
      }

      socketEmitter.emitToAgents('call:ended' as any, { callSid });
      logger.info({ callSid }, '⏹️ Simulated Call Ended');
      return res.status(200).json({ success: true, data: endedEvent });
    } catch (error) {
      next(error);
    }
  }

  // Simulates AI intent analysis response
  async simulateAIResolution(req: Request, res: Response, next: NextFunction) {
    try {
      const { callSid, speechText = 'I want a refund for my order' } = req.body;
      const aiResponse = await aiProvider.analyzeSpeech({ callSid, userSpeechText: speechText });

      logger.info({ callSid, aiResponse }, '🤖 Simulated AI Resolution');
      return res.status(200).json({ success: true, data: aiResponse });
    } catch (error) {
      next(error);
    }
  }

  // Simulates audio recording availability
  async simulateRecordingReady(req: Request, res: Response, next: NextFunction) {
    try {
      const { callSid } = req.body;
      const recordingUrl = `/mock-recordings/${callSid}.mp3`;

      logger.info({ callSid, recordingUrl }, '🎧 Simulated Recording Ready');
      return res.status(200).json({ success: true, data: { callSid, recordingUrl } });
    } catch (error) {
      next(error);
    }
  }
}
