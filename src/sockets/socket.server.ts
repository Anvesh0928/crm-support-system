import { Server as HTTPServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { redisClient, redisSubClient } from '../config/redis.config.js';
import { env } from '../config/env.config.js';
import { logger } from '../config/logger.config.js';
import { AuthenticatedSocket } from './interfaces/socket-user.interface.js';
import { socketAuthMiddleware } from './middleware/socket-auth.middleware.js';
import { SocketEmitterService } from './services/socket-emitter.service.js';
import { registerCallSocketHandlers } from './handlers/call-socket.handler.js';
import { registerAgentSocketHandlers } from './handlers/agent-socket.handler.js';
import { registerQueueSocketHandlers } from './handlers/queue-socket.handler.js';
import { registerDashboardSocketHandlers, startDashboardTicker } from './handlers/dashboard-socket.handler.js';

export const initializeSocketServer = (httpServer: HTTPServer): SocketIOServer => {
  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: env.CLIENT_URL,
      methods: ['GET', 'POST'],
      credentials: true,
    },
    transports: ['websocket', 'polling'],
    pingInterval: 25000, // Heartbeat ping every 25 seconds
    pingTimeout: 60000,  // Heartbeat timeout after 60 seconds of no pong
  });

  // Configure Redis Adapter for Horizontal Scaling
  try {
    io.adapter(createAdapter(redisClient, redisSubClient));
    logger.info('⚡ Scalable Socket.IO Redis Adapter initialized');
  } catch (err) {
    logger.warn({ err }, '⚠️ Socket.IO running without Redis adapter');
  }

  // Register Emitter Service Singleton
  SocketEmitterService.getInstance().setIO(io);

  // Authenticate Connections
  io.use(socketAuthMiddleware as any);

  // Start Live Dashboard Stats Ticker Loop
  startDashboardTicker();

  // Connection Handler
  io.on('connection', (rawSocket) => {
    const socket = rawSocket as AuthenticatedSocket;
    const user = socket.user!;

    logger.info(`🔌 Socket connected: ${socket.id} (User: ${user.name} <${user.email}>, Role: ${user.role})`);

    // Room Partitioning
    socket.join(`user:${user.id}`);

    if (user.role === 'AGENT') {
      socket.join('role:agent');
    } else if (user.role === 'SUPERVISOR' || user.role === 'ADMIN') {
      socket.join('role:agent');
      socket.join('role:supervisor');
    }

    // Register Modular Handlers
    registerCallSocketHandlers(socket);
    registerAgentSocketHandlers(socket);
    registerQueueSocketHandlers(socket);
    registerDashboardSocketHandlers(socket);
  });

  return io;
};
