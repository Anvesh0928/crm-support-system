import { Router } from 'express';
import { QueueController } from '../controllers/queue.controller.js';
import { authenticateJwt } from '../../shared/middleware/auth.middleware.js';
import { validateRequest } from '../../shared/middleware/validation.middleware.js';
import { z } from 'zod';

const router = Router();
const controller = new QueueController();

const createQueueSchema = z.object({
  queueKey: z.string().min(2),
  name: z.string().min(2),
  department: z.string().min(2),
  routingStrategy: z.enum(['ROUND_ROBIN', 'SKILL_BASED', 'LONGEST_IDLE']).optional(),
  requiredSkills: z.array(z.string()).optional(),
});

const enqueueSchema = z.object({
  callId: z.string().min(1),
  exotelCallSid: z.string().min(1),
  customerId: z.string().min(1),
  priorityScore: z.number().optional(),
  customerTier: z.string().optional(),
  requiredSkills: z.array(z.string()).optional(),
});

const dequeueSchema = z.object({
  agentId: z.string().optional(),
});

router.use(authenticateJwt);

router.post('/', validateRequest(createQueueSchema), controller.create);
router.get('/', controller.list);
router.post('/:queueKey/enqueue', validateRequest(enqueueSchema), controller.enqueue);
router.post('/:queueKey/dequeue', validateRequest(dequeueSchema), controller.dequeue);

export const queueApiRoutes = router;
