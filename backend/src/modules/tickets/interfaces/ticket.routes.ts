import { Router } from 'express';
import { TicketController } from './ticket.controller.js';
import { authenticateJwt } from '../../../shared/middleware/auth.middleware.js';
import { validateRequest } from '../../../shared/middleware/validation.middleware.js';
import { z } from 'zod';

const router = Router();
const controller = new TicketController();

const createTicketSchema = z.object({
  customerId: z.string().min(1),
  subject: z.string().min(3),
  description: z.string().min(5),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).optional(),
  assignedAgentId: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

const updateTicketSchema = z.object({
  status: z.enum(['OPEN', 'IN_PROGRESS', 'PENDING_CUSTOMER', 'RESOLVED', 'CLOSED']).optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).optional(),
  assignedAgentId: z.string().optional(),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

router.use(authenticateJwt);

router.post('/', validateRequest(createTicketSchema), controller.create);
router.get('/', controller.list);
router.get('/:id', controller.getById);
router.put('/:id', validateRequest(updateTicketSchema), controller.update);

export const ticketRoutes = router;
