import { Router } from 'express';
import { MockWebhookController } from '../controllers/mock-webhook.controller.js';

const router = Router();
const controller = new MockWebhookController();

router.post('/incoming-call', controller.simulateIncomingCall);
router.post('/agent-answer', controller.simulateAgentAnswer);
router.post('/call-ended', controller.simulateCallEnded);
router.post('/ai-resolution', controller.simulateAIResolution);
router.post('/recording-ready', controller.simulateRecordingReady);

export const mockWebhookRoutes = router;
