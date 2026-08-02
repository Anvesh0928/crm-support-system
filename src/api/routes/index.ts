import { Router } from 'express';
import { authApiRoutes } from './auth.routes.js';
import { customerApiRoutes } from './customer.routes.js';
import { agentApiRoutes } from './agent.routes.js';
import { callApiRoutes } from './call.routes.js';
import { queueApiRoutes } from './queue.routes.js';
import { analyticsApiRoutes } from './analytics.routes.js';

const apiRouter = Router();

apiRouter.use('/auth', authApiRoutes);
apiRouter.use('/customers', customerApiRoutes);
apiRouter.use('/agents', agentApiRoutes);
apiRouter.use('/calls', callApiRoutes);
apiRouter.use('/queue', queueApiRoutes);
apiRouter.use('/analytics', analyticsApiRoutes);

export default apiRouter;
