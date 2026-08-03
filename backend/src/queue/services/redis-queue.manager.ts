import { redisClient } from '../../config/redis.config.js';
import { QueuedCallItem } from '../interfaces/queue-item.interface.js';
import { DEFAULT_QUEUE_CONFIG } from '../interfaces/queue-config.interface.js';
import { logger } from '../../config/logger.config.js';

export class RedisQueueManager {
  private getFifoKey(department: string): string {
    return `crm:queue:fifo:${department.toLowerCase()}`;
  }

  private getPriorityKey(department: string): string {
    return `crm:queue:priority:${department.toLowerCase()}`;
  }

  private getVipKey(): string {
    return `crm:queue:vip`;
  }

  private getDlqKey(): string {
    return `crm:queue:dlq`;
  }

  /**
   * Calculate dynamic priority score combining tier bonus, waiting duration, and retry count
   */
  calculatePriorityScore(item: Partial<QueuedCallItem>): number {
    let score = 0;
    if (item.customerTier === 'VIP') score += DEFAULT_QUEUE_CONFIG.vipTierBonusScore;
    else if (item.customerTier === 'ENTERPRISE') score += DEFAULT_QUEUE_CONFIG.enterpriseTierBonusScore;
    else score += 100;

    if (item.retryCount) {
      score += item.retryCount * DEFAULT_QUEUE_CONFIG.retryBonusScore;
    }

    // Waiting time bonus (+0.1 point per second waited)
    if (item.joinedAt) {
      const waitSeconds = Math.floor((Date.now() - new Date(item.joinedAt).getTime()) / 1000);
      score += Math.max(0, waitSeconds * 0.1);
    }

    return Math.round(score);
  }

  /**
   * Enqueue a call item into appropriate Redis Queue (VIP, Priority, or FIFO)
   */
  async enqueue(item: QueuedCallItem): Promise<void> {
    item.priorityScore = this.calculatePriorityScore(item);
    const serialized = JSON.stringify(item);

    if (item.customerTier === 'VIP') {
      logger.info({ callId: item.callId, tier: item.customerTier }, '🌟 Enqueuing into VIP Redis Queue');
      await redisClient.zadd(this.getVipKey(), item.priorityScore, serialized);
    } else {
      // Enqueue to Priority Sorted Set
      await redisClient.zadd(this.getPriorityKey(item.department), item.priorityScore, serialized);
      // Enqueue to FIFO list for fallback sequential scanning
      await redisClient.rpush(this.getFifoKey(item.department), serialized);
    }
  }

  /**
   * Pop highest priority call across VIP and Priority Sorted Sets
   */
  async popHighestPriority(department: string): Promise<QueuedCallItem | null> {
    // 1. Check VIP Queue first
    const vipResults = await redisClient.zpopmax(this.getVipKey(), 1);
    if (vipResults && vipResults.length >= 2) {
      return JSON.parse(vipResults[0]);
    }

    // 2. Check Department Priority Sorted Set
    const prioResults = await redisClient.zpopmax(this.getPriorityKey(department), 1);
    if (prioResults && prioResults.length >= 2) {
      const item: QueuedCallItem = JSON.parse(prioResults[0]);
      // Remove matching item from FIFO fallback list
      await redisClient.lrem(this.getFifoKey(department), 1, prioResults[0]);
      return item;
    }

    return null;
  }

  /**
   * Push timed-out or failed call into Dead-Letter Queue (DLQ)
   */
  async pushToDlq(item: QueuedCallItem, reason: string): Promise<void> {
    const dlqPayload = JSON.stringify({ ...item, dlqReason: reason, movedToDlqAt: new Date().toISOString() });
    await redisClient.rpush(this.getDlqKey(), dlqPayload);
    logger.warn({ callId: item.callId, reason }, '⚠️ Call moved to Dead-Letter Queue (DLQ)');
  }

  /**
   * Get total waiting count in queue
   */
  async getQueueDepth(department: string) {
    const vipCount = await redisClient.zcard(this.getVipKey());
    const prioCount = await redisClient.zcard(this.getPriorityKey(department));
    const dlqCount = await redisClient.llen(this.getDlqKey());
    return { vipCount, prioCount, dlqCount, totalWaiting: vipCount + prioCount };
  }
}
