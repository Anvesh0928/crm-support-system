import { BaseRepository } from './base.repository.js';
import { QueueModel, IQueueDocument, IQueueWaitingItem } from '../../database/index.js';

export class QueueRepository extends BaseRepository<IQueueDocument> {
  constructor() {
    super(QueueModel);
  }

  async findByKey(queueKey: string): Promise<IQueueDocument | null> {
    return this.model.findOne({ queueKey, isActive: true }).exec();
  }

  async enqueueCall(queueKey: string, item: IQueueWaitingItem): Promise<IQueueDocument | null> {
    return this.model.findOneAndUpdate(
      { queueKey, isActive: true },
      { $push: { activeItems: item } },
      { new: true }
    ).exec();
  }

  async dequeueCall(queueKey: string, callId: string): Promise<IQueueDocument | null> {
    return this.model.findOneAndUpdate(
      { queueKey },
      { $pull: { activeItems: { callId } } as any },
      { new: true }
    ).exec();
  }
}
