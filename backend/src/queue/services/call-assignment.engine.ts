import { redisClient } from '../../config/redis.config.js';
import { RedisQueueManager } from './redis-queue.manager.js';
import { SkillMatcherService } from './skill-matcher.service.js';
import { AgentPresenceStore } from '../../modules/agents/infrastructure/agent-presence.store.js';
import { AgentModel, CallModel } from '../../database/index.js';
import { AgentStatus } from '../../shared/constants/enums.js';
import { CallAssignmentResult } from '../interfaces/assignment.interface.js';
import { DEFAULT_QUEUE_CONFIG } from '../interfaces/queue-config.interface.js';
import { logger } from '../../config/logger.config.js';
import { getIO } from '../../config/socket.config.js';

const queueManager = new RedisQueueManager();
const skillMatcher = new SkillMatcherService();
const presenceStore = new AgentPresenceStore();

export class CallAssignmentEngine {
  /**
   * Acquire atomic Redis lock to prevent race conditions during call assignment
   */
  private async acquireAgentLock(agentId: string, ttlMs = 5000): Promise<boolean> {
    const lockKey = `lock:agent:${agentId}`;
    const acquired = await redisClient.set(lockKey, 'LOCKED', 'PX', ttlMs, 'NX');
    return !!acquired;
  }

  private async releaseAgentLock(agentId: string): Promise<void> {
    await redisClient.del(`lock:agent:${agentId}`);
  }

  /**
   * Process next queued call for a department and assign to an available matching agent
   */
  async processAndAssign(department: string): Promise<CallAssignmentResult> {
    // 1. Pop highest priority call
    const callItem = await queueManager.popHighestPriority(department);
    if (!callItem) {
      return { success: false, message: 'No waiting calls in queue' };
    }

    // 2. Find matching available agent
    const agentPresence = await skillMatcher.findBestAvailableAgent(callItem.requiredSkills, department);
    if (!agentPresence) {
      // Re-enqueue call if no agent available right now
      await queueManager.enqueue(callItem);
      return { success: false, message: 'No eligible agent available at this time' };
    }

    // 3. Acquire atomic agent lock
    const locked = await this.acquireAgentLock(agentPresence.agentId);
    if (!locked) {
      // Re-enqueue and try next time
      await queueManager.enqueue(callItem);
      return { success: false, message: 'Agent lock contention' };
    }

    try {
      // 4. Update Agent status & current active calls count
      await presenceStore.updateStatus(agentPresence.agentId, AgentStatus.BUSY, callItem.exotelCallSid);
      await AgentModel.findByIdAndUpdate(agentPresence.agentId, {
        $inc: { currentActiveCallsCount: 1 },
        status: AgentStatus.BUSY,
      });

      // 5. Update Call model with assigned agent
      await CallModel.findOneAndUpdate(
        { exotelCallSid: callItem.exotelCallSid },
        { assignedAgentId: agentPresence.agentId as any, status: 'ESCALATED' }
      );

      const assignedAt = new Date().toISOString();

      // 6. Broadcast live assignment event via Socket.IO
      try {
        const io = getIO();
        io.to('live_agents').emit('call:assigned', {
          callSid: callItem.exotelCallSid,
          assignedAgentId: agentPresence.agentId,
          agentName: agentPresence.name,
          assignedAt,
        });
      } catch (_) {}

      logger.info(
        { callSid: callItem.exotelCallSid, agentId: agentPresence.agentId },
        '✅ Call successfully assigned to live agent'
      );

      return {
        success: true,
        assignedAgentId: agentPresence.agentId,
        callItem,
        assignedAt,
      };
    } catch (err: any) {
      logger.error({ err, callItem }, '❌ Error during call assignment. Retrying...');
      await this.retryCallAssignment(callItem, err.message);
      return { success: false, message: err.message };
    } finally {
      await this.releaseAgentLock(agentPresence.agentId);
    }
  }

  /**
   * Retry mechanism: re-enqueue call with boosted priority and incremented retry count
   */
  async retryCallAssignment(item: any, reason: string): Promise<void> {
    item.retryCount = (item.retryCount || 0) + 1;

    if (item.retryCount > DEFAULT_QUEUE_CONFIG.maxAssignmentRetries) {
      logger.warn({ item, reason }, '⚠️ Max assignment retries exceeded. Moving call to DLQ');
      await queueManager.pushToDlq(item, `Max Retries Exceeded: ${reason}`);
      return;
    }

    item.priorityScore = queueManager.calculatePriorityScore(item);
    logger.info({ callId: item.callId, retryCount: item.retryCount }, '🔄 Re-enqueuing call with elevated priority');
    await queueManager.enqueue(item);
  }
}
