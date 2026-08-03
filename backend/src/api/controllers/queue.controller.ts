import { Request, Response, NextFunction } from 'express';
import { QueueService } from '../services/queue.service.js';

const queueService = new QueueService();

export class QueueController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const queue = await queueService.createQueue(req.body);
      return res.status(201).json({ success: true, data: queue });
    } catch (error) {
      next(error);
    }
  }

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const queues = await queueService.listQueues();
      return res.status(200).json({ success: true, data: queues });
    } catch (error) {
      next(error);
    }
  }

  async enqueue(req: Request, res: Response, next: NextFunction) {
    try {
      const { queueKey } = req.params;
      const queue = await queueService.enqueueCall(queueKey, req.body);
      return res.status(200).json({ success: true, data: queue });
    } catch (error) {
      next(error);
    }
  }

  async dequeue(req: Request, res: Response, next: NextFunction) {
    try {
      const { queueKey } = req.params;
      const { agentId } = req.body;
      const item = await queueService.dequeueNext(queueKey, agentId);
      return res.status(200).json({ success: true, data: item });
    } catch (error) {
      next(error);
    }
  }
}
