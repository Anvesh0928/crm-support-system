import { redisClient } from '../../../config/redis.config.js';
import { CallStatus } from '../../../shared/constants/enums.js';

export interface ActiveCallSession {
  exotelCallSid: string;
  callId: string;
  customerId: string;
  fromNumber: string;
  status: CallStatus;
  assignedAgentId?: string;
  startTime: number;
}

export class CallSessionStore {
  private getKey(sid: string): string {
    return `call:session:${sid}`;
  }

  private getTranscriptKey(sid: string): string {
    return `call:transcript:${sid}`;
  }

  async saveSession(sid: string, session: ActiveCallSession, ttlSeconds = 7200) {
    await redisClient.set(this.getKey(sid), JSON.stringify(session), 'EX', ttlSeconds);
  }

  async getSession(sid: string): Promise<ActiveCallSession | null> {
    const data = await redisClient.get(this.getKey(sid));
    return data ? JSON.parse(data) : null;
  }

  async updateStatus(sid: string, status: CallStatus) {
    const session = await this.getSession(sid);
    if (session) {
      session.status = status;
      await this.saveSession(sid, session);
    }
  }

  async appendUtterance(sid: string, utterance: { speaker: string; text: string; timestamp: string }) {
    await redisClient.rpush(this.getTranscriptKey(sid), JSON.stringify(utterance));
  }

  async getBufferedTranscript(sid: string) {
    const raw = await redisClient.lrange(this.getTranscriptKey(sid), 0, -1);
    return raw.map((item) => JSON.parse(item));
  }

  async deleteSession(sid: string) {
    await redisClient.del(this.getKey(sid));
    await redisClient.del(this.getTranscriptKey(sid));
  }
}
