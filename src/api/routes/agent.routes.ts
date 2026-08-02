import { Router } from 'express';
import { AgentController } from '../controllers/agent.controller.js';
import { authenticateJwt } from '../../shared/middleware/auth.middleware.js';
import { validateRequest } from '../../shared/middleware/validation.middleware.js';
import { z } from 'zod';

const router = Router();
const controller = new AgentController();

const updateStatusSchema = z.object({
  status: z.enum(['AVAILABLE', 'BUSY', 'OFFLINE', 'BREAK']),
  activeCallSid: z.string().optional(),
});

const updateSkillsSchema = z.object({
  skills: z.array(z.string()),
  maxConcurrentCalls: z.number().min(1).max(5).optional(),
});

router.use(authenticateJwt);

router.get('/', controller.list);
router.get('/:id', controller.getById);
router.put('/:id/status', validateRequest(updateStatusSchema), controller.updateStatus);
router.put('/:id/skills', validateRequest(updateSkillsSchema), controller.updateSkills);

export const agentApiRoutes = router;
