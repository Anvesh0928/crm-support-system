import { Response, NextFunction } from 'express';
import { AgentService } from '../application/agent.service.js';
import { AuthenticatedRequest } from '../../../shared/middleware/auth.middleware.js';

const agentService = new AgentService();

export class AgentController {
  async getLiveAgents(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const agents = await agentService.getAllActiveAgents();
      return res.status(200).json({ success: true, data: agents });
    } catch (error) {
      next(error);
    }
  }

  async updateStatus(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { status, activeCallSid } = req.body;
      const agentId = req.user!.id;
      const updated = await agentService.setAgentStatus(agentId, status, activeCallSid);
      return res.status(200).json({ success: true, data: updated });
    } catch (error) {
      next(error);
    }
  }
}
