import { TicketStatus, TicketPriority } from '../../../shared/constants/enums.js';

export interface TicketEntity {
  id: string;
  ticketNumber: string;
  customerId: string;
  assignedAgentId?: string;
  callId?: string;
  subject: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  aiSummary?: string;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}
