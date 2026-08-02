import { BaseRepository } from './base.repository.js';
import { AgentModel, IAgentDocument, AgentPresenceState } from '../../database/index.js';

export class AgentRepository extends BaseRepository<IAgentDocument> {
  constructor() {
    super(AgentModel);
  }

  async findAvailableBySkills(skills: string[]): Promise<IAgentDocument[]> {
    const filter: any = {
      status: 'AVAILABLE' as AgentPresenceState,
      isDeleted: false,
    };

    if (skills && skills.length > 0) {
      filter.skills = { $in: skills };
    }

    return this.model.find(filter).sort({ currentActiveCallsCount: 1 }).exec();
  }

  async updatePresence(agentId: string, status: AgentPresenceState, activeCallSid?: string): Promise<IAgentDocument | null> {
    const updateData: any = { status };
    if (activeCallSid !== undefined) {
      updateData.activeCallSid = activeCallSid;
    }
    return this.model.findByIdAndUpdate(agentId, updateData, { new: true }).exec();
  }
}
