import mongoose from 'mongoose';
import { env } from './env.config.js';
import { logger } from './logger.config.js';

export const connectMongoDB = async (): Promise<typeof mongoose> => {
  try {
    mongoose.set('strictQuery', true);
    const conn = await mongoose.connect(env.MONGODB_URI, {
      maxPoolSize: 50,
      minPoolSize: 10,
      socketTimeoutMS: 45000,
    });
    logger.info(`🍃 MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    logger.error({ error }, '❌ MongoDB Connection Failure');
    throw error;
  }
};
