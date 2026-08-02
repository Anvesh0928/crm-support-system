import { Router } from 'express';
import { CustomerController } from './customer.controller.js';
import { authenticateJwt } from '../../../shared/middleware/auth.middleware.js';
import { validateRequest } from '../../../shared/middleware/validation.middleware.js';
import { z } from 'zod';

const router = Router();
const controller = new CustomerController();

const updateCustomerSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
  accountTier: z.enum(['VIP', 'STANDARD', 'ENTERPRISE']).optional(),
  notes: z.string().optional(),
});

router.use(authenticateJwt);

router.get('/', controller.list);
router.get('/:id', controller.getById);
router.put('/:id', validateRequest(updateCustomerSchema), controller.update);

export const customerRoutes = router;
