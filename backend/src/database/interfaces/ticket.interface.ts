import { Document, Types } from 'mongoose';

export type TicketStatusType = 'OPEN' | 'IN_PROGRESS' | 'PENDING_CUSTOMER' | 'RESOLVED' | 'CLOSED';
export type TicketPriorityType = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

export interface ITicketActivityHistory {
  action: string;
  actorId: Types.ObjectId;
  actorType: 'AGENT' | 'AI_SYSTEM' | 'CUSTOMER';
  previousStatus?: TicketStatusType;
  newStatus?: TicketStatusType;
  timestamp: Date;
}

export interface ITicketDocument extends Document {
  ticketNumber: string;
  customerId: Types.ObjectId;
  assignedAgentId?: Types.ObjectId;
  callId?: Types.ObjectId;
  subject: string;
  description: string;
  status: TicketStatusType;
  priority: TicketPriorityType;
  tags?: string[];
  aiSummary?: string;
  slaDueDate?: Date;
  history: ITicketActivityHistory[];
  resolvedAt?: Date;
  closedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
