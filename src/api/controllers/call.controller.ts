import { Request, Response, NextFunction } from 'express';
import { CallService } from '../services/call.service.js';
import { CallStatusType } from '../../database/index.js';

const callService = new CallService();

export class CallController {
  async initiate(req: Request, res: Response, next: NextFunction) {
    try {
      const call = await callService.initiateCall(req.body);
      return res.status(201).json({ success: true, data: call });
    } catch (error) {
      next(error);
    }
  }

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string || '1', 10);
      const limit = parseInt(req.query.limit as string || '20', 10);
      const status = req.query.status as CallStatusType;

      const result = await callService.listCalls(page, limit, status);
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

  async transfer(req: Request, res: Response, next: NextFunction) {
    try {
      const { agentId } = req.body;
      const call = await callService.transferCall(req.params.id, agentId);
      return res.status(200).json({ success: true, data: call });
    } catch (error) {
      next(error);
    }
  }

  async end(req: Request, res: Response, next: NextFunction) {
    try {
      const { summary, recordingUrl } = req.body;
      const call = await callService.endCall(req.params.id, summary, recordingUrl);
      return res.status(200).json({ success: true, data: call });
    } catch (error) {
      next(error);
    }
  }
}
