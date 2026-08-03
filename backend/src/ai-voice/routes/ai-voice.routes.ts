import { Router } from 'express';
import { AIVoiceController } from '../controllers/ai-voice.controller.js';
import { authenticateJwt } from '../../shared/middleware/auth.middleware.js';
import { validateRequest } from '../../shared/middleware/validation.middleware.js';
import { z } from 'zod';

const router = Router();
const controller = new AIVoiceController();

const startSessionSchema = z.object({
  callSid: z.string().min(1),
  customerPhone: z.string().min(5),
  voice: z.string().optional(),
  systemPrompt: z.string().optional(),
});

router.use(authenticateJwt);

router.post('/sessions', validateRequest(startSessionSchema), controller.startSession);
router.post('/sessions/:callSid/end', controller.endSession);
router.get('/sessions/:callSid/state', controller.getSessionState);
router.get('/sessions/:callSid/memory', controller.getMemoryHistory);

export const aiVoiceRoutes = router;
