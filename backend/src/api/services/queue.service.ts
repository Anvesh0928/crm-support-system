import { QueueRepository } from '../repositories/queue.repository.js';
import { AgentRepository } from '../repositories/agent.repository.js';
import { NotFoundError } from '../../shared/errors/AppError.js';
import { RoutingStrategyType } from '../../database/index.js';

export class QueueService {
  private queueRepo = new QueueRepository();
  private agentRepo = new AgentRepository();

  async createQueue(data: { queueKey: string; name: string; department: string; routingStrategy?: RoutingStrategyType; requiredSkills?: string[] }) {
    return this.queueRepo.create({
      queueKey: data.queueKey,
      name: data.name,
      department: data.department,
      routingStrategy: data.routingStrategy || 'SKILL_BASED',
      requiredSkills: data.requiredSkills || [],
    });
  }

  async listQueues() {
    return this.queueRepo.find({ isActive: true });
  }

  async enqueueCall(queueKey: string, callData: { callId: string; exotelCallSid: string; customerId: string; priorityScore?: number; customerTier?: string; requiredSkills?: string[] }) {
    const queue = await this.queueRepo.findByKey(queueKey);
    if (!queue) {
      throw new NotFoundError(`Queue ${queueKey} not found`);
    }

    const item: any = {
      callId: callData.callId,
      exotelCallSid: callData.exotelCallSid,
      customerId: callData.customerId,
      joinedAt: new Date(),
      priorityScore: callData.priorityScore || 0,
      customerTier: callData.customerTier || 'STANDARD',
      requiredSkills: callData.requiredSkills || queue.requiredSkills,
    };

    return this.queueRepo.enqueueCall(queueKey, item);
  }

  async dequeueNext(queueKey: string, agentId?: string) {
    const queue = await this.queueRepo.findByKey(queueKey);
    if (!queue || queue.activeItems.length === 0) {
      return null;
    }

    // Sort active items by priority score (descending) then joinedAt (ascending)
    const sorted = [...queue.activeItems].sort((a, b) => {
      if (b.priorityScore !== a.priorityScore) return b.priorityScore - a.priorityScore;
      return new Date(a.joinedAt).getTime() - new Date(b.joinedAt).getTime();
    });

    const nextCall = sorted[0];
    await this.queueRepo.dequeueCall(queueKey, nextCall.callId.toString());

    if (agentId) {
      await this.agentRepo.updatePresence(agentId, 'BUSY', nextCall.exotelCallSid);
    }

    return nextCall;
  }
}
