import { Request, Response, NextFunction } from 'express';
import { RedisQueueManager } from '../services/redis-queue.manager.js';
import { CallAssignmentEngine } from '../services/call-assignment.engine.js';
import { QueuedCallItem } from '../interfaces/queue-item.interface.js';

const queueManager = new RedisQueueManager();
const assignmentEngine = new CallAssignmentEngine();

export class QueueManagerController {
  async enqueue(req: Request, res: Response, next: NextFunction) {
    try {
      const { callId, exotelCallSid, customerId, customerTier, department, requiredSkills } = req.body;

      const item: QueuedCallItem = {
        callId,
        exotelCallSid,
        customerId,
        customerTier: customerTier || 'STANDARD',
        department: department || 'support',
        requiredSkills: requiredSkills || [],
        priorityScore: 0,
        joinedAt: new Date().toISOString(),
        retryCount: 0,
      };

      await queueManager.enqueue(item);
      return res.status(201).json({ success: true, data: item });
    } catch (error) {
      next(error);
    }
  }

  async processNext(req: Request, res: Response, next: NextFunction) {
    try {
      const department = (req.query.department as string) || 'support';
      const result = await assignmentEngine.processAndAssign(department);
      return res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async getDepth(req: Request, res: Response, next: NextFunction) {
    try {
      const department = (req.query.department as string) || 'support';
      const depth = await queueManager.getQueueDepth(department);
      return res.status(200).json({ success: true, data: depth });
    } catch (error) {
      next(error);
    }
  }
}
