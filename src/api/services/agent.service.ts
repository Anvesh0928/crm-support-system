import { AgentRepository } from '../repositories/agent.repository.js';
import { NotFoundError } from '../../shared/errors/AppError.js';
import { AgentPresenceState } from '../../database/index.js';

export class AgentService {
  private agentRepo = new AgentRepository();

  async listAgents(skills?: string[], page = 1, limit = 20) {
    if (skills && skills.length > 0) {
      const data = await this.agentRepo.findAvailableBySkills(skills);
      return { data, total: data.length, page: 1, limit: data.length, totalPages: 1 };
    }
    return this.agentRepo.paginate({ isDeleted: false }, page, limit, { status: 1 });
  }

  async getAgentById(id: string) {
    const agent = await this.agentRepo.findById(id);
    if (!agent || agent.isDeleted) {
      throw new NotFoundError('Agent not found');
    }
    return agent;
  }

  async updateStatus(agentId: string, status: AgentPresenceState, activeCallSid?: string) {
    await this.getAgentById(agentId);
    return this.agentRepo.updatePresence(agentId, status, activeCallSid);
  }

  async updateSkills(agentId: string, skills: string[], maxConcurrentCalls?: number) {
    await this.getAgentById(agentId);
    const updateData: any = { skills };
    if (maxConcurrentCalls) {
      updateData.maxConcurrentCalls = maxConcurrentCalls;
    }
    return this.agentRepo.update(agentId, updateData);
  }
}
