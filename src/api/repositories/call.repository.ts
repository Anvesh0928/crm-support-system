import { BaseRepository } from './base.repository.js';
import { CallModel, ICallDocument } from '../../database/index.js';

export class CallRepository extends BaseRepository<ICallDocument> {
  constructor() {
    super(CallModel);
  }

  async findBySid(exotelCallSid: string): Promise<ICallDocument | null> {
    return this.model.findOne({ exotelCallSid }).populate(['customerId', 'assignedAgentId']).exec();
  }

  async findActiveCalls(): Promise<ICallDocument[]> {
    return this.model.find({ status: { $in: ['INITIATED', 'IN_PROGRESS', 'ESCALATED'] } }).populate(['customerId', 'assignedAgentId']).exec();
  }
}
