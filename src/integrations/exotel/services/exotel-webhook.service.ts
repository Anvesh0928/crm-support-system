import { redisClient } from '../../../config/redis.config.js';
import { env } from '../../../config/env.config.js';
import { logger } from '../../../config/logger.config.js';
import { verifyHmacSignature } from '../../../shared/utils/crypto.utils.js';

export class ExotelWebhookService {
  verifySignature(rawBodyString: string, signature: string): boolean {
    if (!env.EXOTEL_WEBHOOK_SECRET || env.EXOTEL_WEBHOOK_SECRET.startsWith('mock_')) {
      return true; // Bypass signature check in mock/dev environment
    }
    try {
      return verifyHmacSignature(rawBodyString, signature, env.EXOTEL_WEBHOOK_SECRET);
    } catch (err) {
      logger.error({ err }, 'Signature verification failed with error');
      return false;
    }
  }

  /**
   * Prevents duplicate webhook processing using Redis Idempotency Key
   */
  async acquireIdempotencyLock(callSid: string, eventStatus: string, ttlSeconds = 60): Promise<boolean> {
    const key = `exotel:idempotency:${callSid}:${eventStatus || 'event'}`;
    const acquired = await redisClient.set(key, 'LOCKED', 'EX', ttlSeconds, 'NX');
    if (!acquired) {
      logger.warn({ callSid, eventStatus }, '⚠️ Duplicate Exotel Webhook ignored via Redis Idempotency Lock');
      return false;
    }
    return true;
  }
}
