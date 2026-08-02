import { Schema, model, models, Document, Types } from 'mongoose';
import { TicketStatus, TicketPriority } from '../../../shared/constants/enums.js';

export interface ITicketDocument extends Document {
  ticketNumber: string;
  customerId: Types.ObjectId;
  assignedAgentId?: Types.ObjectId;
  callId?: Types.ObjectId;
  subject: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  aiSummary?: string;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ticketSchema = new Schema<ITicketDocument>(
  {
    ticketNumber: { type: String, required: true, unique: true, index: true },
    customerId: { type: Schema.Types.ObjectId, ref: 'Customer', required: true, index: true },
    assignedAgentId: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    callId: { type: Schema.Types.ObjectId, ref: 'Call' },
    subject: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    status: { type: String, enum: Object.values(TicketStatus), default: TicketStatus.OPEN, index: true },
    priority: { type: String, enum: Object.values(TicketPriority), default: TicketPriority.MEDIUM, index: true },
    aiSummary: { type: String },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

export const TicketModel = (models.Ticket as any) || model<ITicketDocument>('Ticket', ticketSchema);
