import { Request, Response, NextFunction } from 'express';
import { AgentService } from '../services/agent.service.js';

const agentService = new AgentService();

export class AgentController {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string || '1', 10);
      const limit = parseInt(req.query.limit as string || '20', 10);
      const skills = req.query.skills ? (req.query.skills as string).split(',') : undefined;

      const result = await agentService.listAgents(skills, page, limit);
      return res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const agent = await agentService.getAgentById(req.params.id);
      return res.status(200).json({ success: true, data: agent });
    } catch (error) {
      next(error);
    }
  }

  async updateStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, activeCallSid } = req.body;
      const updated = await agentService.updateStatus(req.params.id, status, activeCallSid);
      return res.status(200).json({ success: true, data: updated });
    } catch (error) {
      next(error);
    }
  }

  async updateSkills(req: Request, res: Response, next: NextFunction) {
    try {
      const { skills, maxConcurrentCalls } = req.body;
      const updated = await agentService.updateSkills(req.params.id, skills, maxConcurrentCalls);
      return res.status(200).json({ success: true, data: updated });
    } catch (error) {
      next(error);
    }
  }
}
