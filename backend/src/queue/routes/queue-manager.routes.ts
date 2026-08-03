import { Router } from 'express';
import { QueueManagerController } from '../controllers/queue-manager.controller.js';
import { authenticateJwt } from '../..//shared/middleware/auth.middleware.js';
import { validateRequest } from '../../shared/middleware/validation.middleware.js';
import { z } from 'zod';

const router = Router();
const controller = new QueueManagerController();

const enqueueSchema = z.object({
  callId: z.string().min(1),
  exotelCallSid: z.string().min(1),
  customerId: z.string().min(1),
  customerTier: z.enum(['VIP', 'STANDARD', 'ENTERPRISE']).optional(),
  department: z.string().optional(),
  requiredSkills: z.array(z.string()).optional(),
});

router.use(authenticateJwt);

router.post('/enqueue', validateRequest(enqueueSchema), controller.enqueue);
router.post('/process-next', controller.processNext);
router.get('/depth', controller.getDepth);

export const queueManagerRoutes = router;
