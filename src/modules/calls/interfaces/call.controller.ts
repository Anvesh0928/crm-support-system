import { Request, Response, NextFunction } from 'express';
import { CallService } from '../application/call.service.js';
import { AuthenticatedRequest } from '../../../shared/middleware/auth.middleware.js';

const callService = new CallService();

export class CallController {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string || '1', 10);
      const limit = parseInt(req.query.limit as string || '20', 10);
      const result = await callService.listCalls(limit, page);
      return res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const call = await callService.getCallById(req.params.id);
      return res.status(200).json({ success: true, data: call });
    } catch (error) {
      next(error);
    }
  }

  async handover(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { exotelCallSid } = req.body;
      const agentId = req.user!.id;
      const call = await callService.handoverCallToAgent(exotelCallSid, agentId);
      return res.status(200).json({ success: true, data: call });
    } catch (error) {
      next(error);
    }
  }
}
