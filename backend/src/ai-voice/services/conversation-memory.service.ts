import { redisClient } from '../../config/redis.config.js';
import { logger } from '../../config/logger.config.js';

export interface TurnMemoryItem {
  speaker: 'CUSTOMER' | 'SYSTEM_AI' | 'TOOL_RESULT';
  text: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export class ConversationMemoryService {
  private getKey(callSid: string): string {
    return `ai:memory:${callSid}`;
  }

  async appendTurn(callSid: string, turn: TurnMemoryItem, ttlSeconds = 7200): Promise<void> {
    const key = this.getKey(callSid);
    await redisClient.rpush(key, JSON.stringify(turn));
    await redisClient.expire(key, ttlSeconds);
  }

  async getHistory(callSid: string): Promise<TurnMemoryItem[]> {
    const raw = await redisClient.lrange(this.getKey(callSid), 0, -1);
    return raw.map((item) => JSON.parse(item));
  }

  async clearMemory(callSid: string): Promise<void> {
    await redisClient.del(this.getKey(callSid));
    logger.info({ callSid }, '🧹 Cleared Redis Conversation Memory');
  }
}
