import { Router } from 'express';
import { CustomerController } from '../controllers/customer.controller.js';
import { authenticateJwt } from '../../shared/middleware/auth.middleware.js';
import { validateRequest } from '../../shared/middleware/validation.middleware.js';
import { z } from 'zod';

const router = Router();
const controller = new CustomerController();

const createCustomerSchema = z.object({
  phone: z.string().min(5),
  name: z.string().min(2),
  email: z.string().email().optional(),
  company: z.string().optional(),
  accountTier: z.enum(['VIP', 'STANDARD', 'ENTERPRISE']).optional(),
});

const updateCustomerSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
  company: z.string().optional(),
  accountTier: z.enum(['VIP', 'STANDARD', 'ENTERPRISE']).optional(),
  notesSummary: z.string().optional(),
});

router.use(authenticateJwt);

router.post('/', validateRequest(createCustomerSchema), controller.create);
router.get('/', controller.list);
router.get('/by-phone/:phone', controller.getByPhone);
router.get('/:id', controller.getById);
router.put('/:id', validateRequest(updateCustomerSchema), controller.update);
router.delete('/:id', controller.delete);

export const customerApiRoutes = router;
