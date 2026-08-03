import { Router } from 'express';
import { AgentController } from './agent.controller.js';
import { authenticateJwt } from '../../../shared/middleware/auth.middleware.js';
import { validateRequest } from '../../../shared/middleware/validation.middleware.js';
import { z } from 'zod';

const router = Router();
const controller = new AgentController();

const updateStatusSchema = z.object({
  status: z.enum(['AVAILABLE', 'BUSY', 'OFFLINE', 'BREAK']),
  activeCallSid: z.string().optional(),
});

router.use(authenticateJwt);

router.get('/live', controller.getLiveAgents);
router.post('/status', validateRequest(updateStatusSchema), controller.updateStatus);

export const agentRoutes = router;
