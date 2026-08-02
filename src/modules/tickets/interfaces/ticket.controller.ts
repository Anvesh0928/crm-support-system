import { Request, Response, NextFunction } from 'express';
import { TicketService } from '../application/ticket.service.js';
import { TicketStatus, TicketPriority } from '../../../shared/constants/enums.js';

const ticketService = new TicketService();

export class TicketController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const ticket = await ticketService.createTicket(req.body);
      return res.status(201).json({ success: true, data: ticket });
    } catch (error) {
      next(error);
    }
  }

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, priority, assignedAgentId, page, limit } = req.query;
      const filters = {
        status: status as TicketStatus,
        priority: priority as TicketPriority,
        assignedAgentId: assignedAgentId as string,
      };
      const pageNum = parseInt(page as string || '1', 10);
      const limitNum = parseInt(limit as string || '20', 10);

      const result = await ticketService.listTickets(filters, limitNum, pageNum);
      return res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const ticket = await ticketService.getTicketById(req.params.id);
      return res.status(200).json({ success: true, data: ticket });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const updated = await ticketService.updateTicket(req.params.id, req.body);
      return res.status(200).json({ success: true, data: updated });
    } catch (error) {
      next(error);
    }
  }
}
