import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';
import { authenticateJwt } from '../../shared/middleware/auth.middleware.js';
import { validateRequest } from '../../shared/middleware/validation.middleware.js';
import { z } from 'zod';

const router = Router();
const controller = new AuthController();

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['ADMIN', 'AGENT', 'SUPERVISOR']).optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const refreshSchema = z.object({
  refreshToken: z.string().min(1),
});

router.post('/register', validateRequest(registerSchema), controller.register);
router.post('/login', validateRequest(loginSchema), controller.login);
router.post('/refresh', validateRequest(refreshSchema), controller.refreshToken);
router.get('/me', authenticateJwt, controller.getMe);

export const authApiRoutes = router;
