import { Redis } from 'ioredis';
import { env } from './env.config.js';
import { logger } from './logger.config.js';

export const redisClient = new Redis(env.REDIS_URL, {
  maxRetriesPerRequest: 3,
  retryStrategy(times) {
    const delay = Math.min(times * 100, 2000);
    return delay;
  },
});

export const redisSubClient = redisClient.duplicate();

redisClient.on('connect', () => {
  logger.info('🔴 Redis Client Connected');
});

redisClient.on('error', (err) => {
  logger.error({ err }, '❌ Redis Client Error');
});
