import { Router } from 'express';
import { TelephonyController } from './telephony.controller.js';
import { authenticateJwt } from '../../../shared/middleware/auth.middleware.js';
import { validateRequest } from '../../../shared/middleware/validation.middleware.js';
import { z } from 'zod';

const router = Router();
const controller = new TelephonyController();

const outboundSchema = z.object({
  fromNumber: z.string().min(5),
  toNumber: z.string().min(5),
});

// Webhook endpoints from Exotel (Public with signature check)
router.post('/exotel/inbound', controller.handleInboundCall);
router.post('/exotel/status', controller.handleStatusCallback);

// Outbound trigger endpoint (Protected)
router.post('/outbound', authenticateJwt, validateRequest(outboundSchema), controller.initiateOutbound);

export const telephonyRoutes = router;
