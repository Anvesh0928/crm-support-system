import { TicketModel } from '../infrastructure/ticket.model.js';
import { TicketStatus, TicketPriority } from '../../../shared/constants/enums.js';
import { NotFoundError } from '../../../shared/errors/AppError.js';
import { getIO } from '../../../config/socket.config.js';

export class TicketService {
  private generateTicketNumber(): string {
    const randomHex = Math.floor(1000 + Math.random() * 9000);
    return `TICK-${Date.now().toString().slice(-6)}-${randomHex}`;
  }

  async createTicket(payload: {
    customerId: string;
    subject: string;
    description: string;
    priority?: TicketPriority;
    assignedAgentId?: string;
    callId?: string;
    aiSummary?: string;
    tags?: string[];
  }) {
    const ticketNumber = this.generateTicketNumber();
    const ticket = await TicketModel.create({
      ticketNumber,
      customerId: payload.customerId,
      subject: payload.subject,
      description: payload.description,
      priority: payload.priority || TicketPriority.MEDIUM,
      assignedAgentId: payload.assignedAgentId,
      callId: payload.callId,
      aiSummary: payload.aiSummary,
      tags: payload.tags || [],
    });

    const populated = await ticket.populate(['customerId', 'assignedAgentId']);

    try {
      const io = getIO();
      io.to('live_agents').emit('ticket:created', populated);
    } catch (_) {}

    return populated;
  }

  async listTickets(filters: { status?: TicketStatus; priority?: TicketPriority; assignedAgentId?: string }, limit = 20, page = 1) {
    const skip = (page - 1) * limit;
    const query: any = {};
    if (filters.status) query.status = filters.status;
    if (filters.priority) query.priority = filters.priority;
    if (filters.assignedAgentId) query.assignedAgentId = filters.assignedAgentId;

    const [tickets, total] = await Promise.all([
      TicketModel.find(query).sort({ updatedAt: -1 }).skip(skip).limit(limit).populate(['customerId', 'assignedAgentId']),
      TicketModel.countDocuments(query),
    ]);

    return { tickets, total, page, totalPages: Math.ceil(total / limit) };
  }

  async getTicketById(id: string) {
    const ticket = await TicketModel.findById(id).populate(['customerId', 'assignedAgentId', 'callId']);
    if (!ticket) {
      throw new NotFoundError('Ticket not found');
    }
    return ticket;
  }

  async updateTicket(id: string, updateData: Partial<{ status: TicketStatus; priority: TicketPriority; assignedAgentId: string; description: string; tags: string[] }>) {
    const ticket = await TicketModel.findByIdAndUpdate(id, updateData, { new: true }).populate(['customerId', 'assignedAgentId']);
    if (!ticket) {
      throw new NotFoundError('Ticket not found');
    }

    try {
      const io = getIO();
      io.to('live_agents').emit('ticket:updated', ticket);
    } catch (_) {}

    return ticket;
  }
}
