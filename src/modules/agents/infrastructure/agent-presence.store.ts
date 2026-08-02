import { redisClient } from '../../../config/redis.config.js';
import { AgentStatus } from '../../../shared/constants/enums.js';

export interface AgentPresence {
  agentId: string;
  name: string;
  email: string;
  status: AgentStatus;
  activeCallSid?: string;
  updatedAt: string;
}

export class AgentPresenceStore {
  private readonly HASH_KEY = 'crm:agent_presence';

  async setPresence(presence: AgentPresence) {
    await redisClient.hset(this.HASH_KEY, presence.agentId, JSON.stringify(presence));
  }

  async getPresence(agentId: string): Promise<AgentPresence | null> {
    const data = await redisClient.hget(this.HASH_KEY, agentId);
    return data ? JSON.parse(data) : null;
  }

  async getAllPresences(): Promise<AgentPresence[]> {
    const rawMap = await redisClient.hgetall(this.HASH_KEY);
    return Object.values(rawMap).map((json) => JSON.parse(json));
  }

  async updateStatus(agentId: string, status: AgentStatus, activeCallSid?: string) {
    const existing = await this.getPresence(agentId);
    if (existing) {
      existing.status = status;
      if (activeCallSid !== undefined) {
        existing.activeCallSid = activeCallSid;
      }
      existing.updatedAt = new Date().toISOString();
      await this.setPresence(existing);
      return existing;
    }
    return null;
  }

  async removePresence(agentId: string) {
    await redisClient.hdel(this.HASH_KEY, agentId);
  }
}
