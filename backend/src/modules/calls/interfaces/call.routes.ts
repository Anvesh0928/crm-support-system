import { Router } from 'express';
import { CallController } from './call.controller.js';
import { authenticateJwt } from '../../../shared/middleware/auth.middleware.js';
import { validateRequest } from '../../../shared/middleware/validation.middleware.js';
import { z } from 'zod';

const router = Router();
const controller = new CallController();

const handoverSchema = z.object({
  exotelCallSid: z.string().min(1),
});

router.use(authenticateJwt);

router.get('/', controller.list);
router.get('/:id', controller.getById);
router.post('/handover', validateRequest(handoverSchema), controller.handover);

export const callRoutes = router;
