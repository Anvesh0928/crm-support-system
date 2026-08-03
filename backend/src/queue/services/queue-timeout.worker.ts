import { redisClient } from '../../config/redis.config.js';
import { RedisQueueManager } from './redis-queue.manager.js';
import { TicketModel } from '../../database/index.js';
import { DEFAULT_QUEUE_CONFIG } from '../interfaces/queue-config.interface.js';
import { logger } from '../../config/logger.config.js';
import { getIO } from '../../config/socket.config.js';

const queueManager = new RedisQueueManager();

export class QueueTimeoutWorker {
  private timer: NodeJS.Timeout | null = null;
  private readonly checkIntervalMs = 10000; // Check every 10s

  startWorker() {
    if (this.timer) return;
    logger.info('⏰ Starting Queue SLA Timeout & DLQ Monitoring Worker');
    this.timer = setInterval(() => this.processTimeouts(), this.checkIntervalMs);
  }

  stopWorker() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
      logger.info('⏰ Stopped Queue Timeout Worker');
    }
  }

  async processTimeouts() {
    try {
      // Find all priority queue keys in Redis
      const keys = await redisClient.keys('crm:queue:priority:*');

      for (const key of keys) {
        const rawItems = await redisClient.zrange(key, 0, -1);
        const now = Date.now();

        for (const raw of rawItems) {
          try {
            const item = JSON.parse(raw);
            const joinedMs = new Date(item.joinedAt).getTime();
            const waitSeconds = Math.floor((now - joinedMs) / 1000);

            if (waitSeconds > DEFAULT_QUEUE_CONFIG.maxWaitTimeSeconds) {
              logger.warn({ callSid: item.exotelCallSid, waitSeconds }, '⏳ Queue SLA Timeout exceeded! Evicting to DLQ');

              // 1. Remove from Sorted Set and FIFO list
              await redisClient.zrem(key, raw);
              const dept = item.department || 'general';
              await redisClient.lrem(`crm:queue:fifo:${dept.toLowerCase()}`, 1, raw);

              // 2. Push to DLQ
              await queueManager.pushToDlq(item, `SLA Timeout exceeded (${waitSeconds}s)`);

              // 3. Auto-create Urgent Support Ticket in MongoDB
              try {
                const ticket = await TicketModel.create({
                  ticketNumber: `TICK-TIMEOUT-${Date.now().toString().slice(-6)}`,
                  customerId: item.customerId,
                  subject: `UNANSWERED CALL: Queue Timeout (${item.exotelCallSid})`,
                  description: `Caller ${item.fromNumber || item.customerId} waited ${waitSeconds}s in queue without agent pickup.`,
                  priority: 'URGENT',
                  status: 'OPEN',
                  tags: ['queue-timeout', 'unanswered-call'],
                });

                // Socket.IO notification
                try {
                  const io = getIO();
                  io.to('live_agents').emit('queue:timeout_eviction', {
                    callSid: item.exotelCallSid,
                    ticketId: ticket._id,
                    ticketNumber: ticket.ticketNumber,
                  });
                } catch (_) {}
              } catch (ticketErr) {
                logger.error({ ticketErr }, 'Error creating ticket for timed out call');
              }
            }
          } catch (_) {}
        }
      }
    } catch (err) {
      logger.error({ err }, 'Error in QueueTimeoutWorker loop');
    }
  }
}
