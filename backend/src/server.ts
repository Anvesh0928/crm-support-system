import http from 'http';
import { createApp } from './app.js';
import { env } from './config/env.config.js';
import { logger } from './config/logger.config.js';
import { connectMongoDB } from './config/mongodb.config.js';
import { initializeSocketServer } from './sockets/socket.server.js';
import { setupAudioStreamWebSocket } from './modules/ai-orchestrator/interfaces/audio-stream.handler.js';
import { QueueTimeoutWorker } from './queue/services/queue-timeout.worker.js';
import { AuthService } from './modules/auth/application/auth.service.js';
import { UserRole } from './shared/constants/enums.js';

const startServer = async () => {
  try {
    // 1. Connect MongoDB
    await connectMongoDB();

    // Seed Default Admin & Agent Users using environment configuration
    const authService = new AuthService();
    try {
      await authService.register('Admin Support', 'admin@supportcrm.com', env.DEFAULT_ADMIN_PASSWORD, UserRole.ADMIN);
      logger.info('👤 Default Admin User Created: admin@supportcrm.com');
    } catch (_) {}

    try {
      await authService.register('Sarah Agent', 'agent@supportcrm.com', env.DEFAULT_AGENT_PASSWORD, UserRole.AGENT);
      logger.info('👤 Default Agent User Created: agent@supportcrm.com');
    } catch (_) {}

    // 2. Initialize Express & HTTP Server
    const app = createApp();
    const server = http.createServer(app);

    // 3. Initialize Scalable Socket.IO Gateway with Redis Adapter
    initializeSocketServer(server);

    // 4. Initialize Media Audio Stream WebSocket Server
    setupAudioStreamWebSocket(server);

    // 5. Start Queue SLA Timeout Worker
    const queueTimeoutWorker = new QueueTimeoutWorker();
    queueTimeoutWorker.startWorker();

    // 6. Listen on Port
    server.listen(env.PORT, () => {
      logger.info(`🚀 Server running in [${env.NODE_ENV}] mode on port ${env.PORT}`);
      logger.info(`📡 Express API: http://localhost:${env.PORT}/api/v1`);
      logger.info(`🔌 Socket.IO Gateway: ws://localhost:${env.PORT}`);
      logger.info(`🎙️ Audio Media Stream: ws://localhost:${env.PORT}/media-stream`);
    });
  } catch (error) {
    logger.error({ error }, '❌ Fatal Server Startup Failure');
    process.exit(1);
  }
};

startServer();
