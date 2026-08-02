import { AgentPresenceStore, AgentPresence } from '../../modules/agents/infrastructure/agent-presence.store.js';
import { AgentModel } from '../../database/index.js';
import { logger } from '../../config/logger.config.js';

const presenceStore = new AgentPresenceStore();

export class SkillMatcherService {
  /**
   * Finds the best available agent whose skills intersect with call requirements and capacity allows
   */
  async findBestAvailableAgent(requiredSkills: string[], department?: string): Promise<AgentPresence | null> {
    const allPresences = await presenceStore.getAllPresences();

    // Filter available agents
    let availableAgents = allPresences.filter((a) => a.status === 'AVAILABLE');

    if (availableAgents.length === 0) {
      return null;
    }

    // Query DB for skills and capacity validation
    const agentIds = availableAgents.map((a) => a.agentId);
    const dbAgents = await AgentModel.find({
      _id: { $in: agentIds },
      isDeleted: false,
    });

    const candidateMap = new Map(dbAgents.map((a) => [a._id.toString(), a]));

    // Filter candidates matching required skills & current capacity
    const eligibleCandidates = availableAgents.filter((presence) => {
      const dbAgent = candidateMap.get(presence.agentId);
      if (!dbAgent) return false;

      // Department match check if specified
      if (department && dbAgent.department.toLowerCase() !== department.toLowerCase()) {
        return false;
      }

      // Capacity check
      if (dbAgent.currentActiveCallsCount >= dbAgent.maxConcurrentCalls) {
        return false;
      }

      // Skill intersection check
      if (requiredSkills && requiredSkills.length > 0) {
        const hasAllSkills = requiredSkills.every((reqSkill) =>
          dbAgent.skills.some((s) => s.toLowerCase() === reqSkill.toLowerCase())
        );
        if (!hasAllSkills) return false;
      }

      return true;
    });

    if (eligibleCandidates.length === 0) {
      return null;
    }

    // Sort candidates by current active calls count (ascending) to balance load
    eligibleCandidates.sort((a, b) => {
      const dbA = candidateMap.get(a.agentId)!;
      const dbB = candidateMap.get(b.agentId)!;
      return dbA.currentActiveCallsCount - dbB.currentActiveCallsCount;
    });

    logger.info({ chosenAgent: eligibleCandidates[0].agentId }, '🎯 Matched available agent for queued call');
    return eligibleCandidates[0];
  }
}
