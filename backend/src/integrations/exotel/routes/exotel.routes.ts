import { Router } from 'express';
import { ExotelWebhookController } from '../controllers/exotel-webhook.controller.js';
import { authenticateJwt } from '../../../shared/middleware/auth.middleware.js';
import { validateRequest } from '../../../shared/middleware/validation.middleware.js';
import { z } from 'zod';

const router = Router();
const controller = new ExotelWebhookController();

const outboundSchema = z.object({
  fromNumber: z.string().min(5),
  toNumber: z.string().min(5),
});

// Webhook endpoints (Public with HMAC Signature check inside controller)
router.post('/webhooks/passthru', controller.handleInboundPassthru);
router.post('/webhooks/status', controller.handleStatusCallback);
router.post('/webhooks/recording', controller.handleRecordingCallback);

// Call Control Endpoints (Protected with JWT Auth)
router.post('/calls/outbound', authenticateJwt, validateRequest(outboundSchema), controller.initiateOutboundCall);
router.post('/calls/:callSid/end', authenticateJwt, controller.endCall);

export const exotelRoutes = router;
