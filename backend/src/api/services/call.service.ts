import { CallRepository } from '../repositories/call.repository.js';
import { CustomerRepository } from '../repositories/customer.repository.js';
import { NotFoundError } from '../../shared/errors/AppError.js';
import { CallDirectionType, CallStatusType } from '../../database/index.js';

export class CallService {
  private callRepo = new CallRepository();
  private customerRepo = new CustomerRepository();

  async initiateCall(data: { exotelCallSid: string; fromNumber: string; toNumber: string; direction?: CallDirectionType }) {
    let customer = await this.customerRepo.findByPhone(data.fromNumber);
    if (!customer) {
      customer = await this.customerRepo.create({ phone: data.fromNumber, name: 'Caller' });
    }

    return this.callRepo.create({
      exotelCallSid: data.exotelCallSid,
      customerId: customer._id,
      fromNumber: data.fromNumber,
      toNumber: data.toNumber,
      direction: data.direction || 'INBOUND',
      status: 'INITIATED',
      startTime: new Date(),
    });
  }

  async getCallById(id: string) {
    const call = await this.callRepo.findById(id, ['customerId', 'assignedAgentId']);
    if (!call) {
      throw new NotFoundError('Call record not found');
    }
    return call;
  }

  async listCalls(page = 1, limit = 20, status?: CallStatusType) {
    const filter: any = {};
    if (status) filter.status = status;
    return this.callRepo.paginate(filter, page, limit, { createdAt: -1 }, ['customerId', 'assignedAgentId']);
  }

  async transferCall(id: string, agentId: string) {
    const call = await this.getCallById(id);
    return this.callRepo.update(call._id.toString(), {
      status: 'ESCALATED',
      assignedAgentId: agentId as any,
      transferredToAgent: true,
    });
  }

  async endCall(id: string, summary?: string, recordingUrl?: string) {
    const call = await this.getCallById(id);
    const endTime = new Date();
    const durationSeconds = Math.round((endTime.getTime() - call.startTime.getTime()) / 1000);

    return this.callRepo.update(call._id.toString(), {
      status: 'COMPLETED',
      endTime,
      durationSeconds,
      summary: summary || 'Call completed successfully.',
      recordingUrl,
    });
  }

  async updateCallStatus(id: string, status: CallStatusType) {
    return this.callRepo.update(id, { status });
  }
}
