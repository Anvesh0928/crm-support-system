import { Server as HTTPServer } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { redisClient, redisSubClient } from './redis.config.js';
import { env } from './env.config.js';
import { logger } from './logger.config.js';
import { verifyToken } from '../shared/utils/jwt.utils.js';

let io: SocketIOServer | null = null;

export const initSocketIO = (httpServer: HTTPServer): SocketIOServer => {
  io = new SocketIOServer(httpServer, {
    cors: {
      origin: env.CLIENT_URL,
      methods: ['GET', 'POST'],
      credentials: true,
    },
    transports: ['websocket', 'polling'],
  });

  try {
    io.adapter(createAdapter(redisClient, redisSubClient));
    logger.info('⚡ Socket.IO Redis Adapter configured');
  } catch (err) {
    logger.warn({ err }, '⚠️ Socket.IO running without Redis adapter');
  }

  // Socket authentication middleware
  io.use((socket: Socket, next) => {
    const token = socket.handshake.auth.token || socket.handshake.headers.authorization?.split(' ')[1];
    if (!token) {
      return next(new Error('Authentication token missing'));
    }
    try {
      const decoded = verifyToken(token);
      (socket as any).user = decoded;
      next();
    } catch (err) {
      return next(new Error('Invalid socket auth token'));
    }
  });

  io.on('connection', (socket: Socket) => {
    const user = (socket as any).user;
    logger.info(`🔌 Socket connected: ${socket.id} (Agent/User ID: ${user?.id || 'Unknown'})`);

    socket.join(`user:${user.id}`);
    if (user.role === 'AGENT' || user.role === 'ADMIN') {
      socket.join('live_agents');
    }

    socket.on('disconnect', () => {
      logger.info(`🔌 Socket disconnected: ${socket.id}`);
    });
  });

  return io;
};

export const getIO = (): SocketIOServer => {
  if (!io) {
    throw new Error('Socket.IO not initialized!');
  }
  return io;
};
