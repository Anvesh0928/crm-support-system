import { Router } from 'express';
import { CallController } from '../controllers/call.controller.js';
import { authenticateJwt } from '../../shared/middleware/auth.middleware.js';
import { validateRequest } from '../../shared/middleware/validation.middleware.js';
import { z } from 'zod';

const router = Router();
const controller = new CallController();

const initiateCallSchema = z.object({
  exotelCallSid: z.string().min(1),
  fromNumber: z.string().min(5),
  toNumber: z.string().min(5),
  direction: z.enum(['INBOUND', 'OUTBOUND']).optional(),
});

const transferCallSchema = z.object({
  agentId: z.string().min(1),
});

const endCallSchema = z.object({
  summary: z.string().optional(),
  recordingUrl: z.string().optional(),
});

router.use(authenticateJwt);

router.post('/', validateRequest(initiateCallSchema), controller.initiate);
router.get('/', controller.list);
router.get('/:id', controller.getById);
router.post('/:id/transfer', validateRequest(transferCallSchema), controller.transfer);
router.put('/:id/end', validateRequest(endCallSchema), controller.end);

export const callApiRoutes = router;
