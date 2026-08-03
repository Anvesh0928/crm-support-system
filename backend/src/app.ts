import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/env.config.js';
import { errorHandler } from './shared/middleware/error-handler.middleware.js';
import apiRouter from './api/routes/index.js';
import { exotelRoutes } from './integrations/exotel/routes/exotel.routes.js';
import { queueManagerRoutes } from './queue/routes/queue-manager.routes.js';
import { aiVoiceRoutes } from './ai-voice/routes/ai-voice.routes.js';
import { mockWebhookRoutes } from './providers/routes/mock-webhook.routes.js';

export const createApp = (): Application => {
  const app: Application = express();

  // Security & Utility Middlewares
  app.use(helmet());
  app.use(cors({ origin: env.CLIENT_URL, credentials: true }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan(env.NODE_ENV === 'development' ? 'dev' : 'combined'));

  // Health Check Endpoint
  app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({
      status: 'UP',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      service: 'Enterprise AI Customer Support CRM API',
    });
  });

  // REST API Routes
  app.use('/api/v1', apiRouter);

  // Exotel Integration Webhooks & Call Control
  app.use('/api/v1/integrations/exotel', exotelRoutes);

  // Queue Manager APIs
  app.use('/api/v1/queue-manager', queueManagerRoutes);

  // AI Voice Layer APIs
  app.use('/api/v1/ai-voice', aiVoiceRoutes);

  // Mock Telephony & Provider Webhook Simulator Routes
  app.use('/api/v1/mock', mockWebhookRoutes);

  // Global Error Handler
  app.use(errorHandler);

  return app;
};
