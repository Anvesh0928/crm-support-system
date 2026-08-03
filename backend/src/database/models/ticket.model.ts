import mongoose, { Schema, model } from 'mongoose';
import { ITicketDocument } from '../interfaces/ticket.interface.js';

const ticketActivitySchema = new Schema(
  {
    action: { type: String, required: true },
    actorId: { type: Schema.Types.ObjectId, required: true },
    actorType: { type: String, enum: ['AGENT', 'AI_SYSTEM', 'CUSTOMER'], required: true },
    previousStatus: { type: String, enum: ['OPEN', 'IN_PROGRESS', 'PENDING_CUSTOMER', 'RESOLVED', 'CLOSED'] },
    newStatus: { type: String, enum: ['OPEN', 'IN_PROGRESS', 'PENDING_CUSTOMER', 'RESOLVED', 'CLOSED'] },
    timestamp: { type: Date, default: Date.now },
  },
  { _id: false }
);

const ticketSchema = new Schema<ITicketDocument>(
  {
    ticketNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    customerId: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
      index: true,
    },
    assignedAgentId: {
      type: Schema.Types.ObjectId,
      ref: 'Agent',
      index: true,
    },
    callId: {
      type: Schema.Types.ObjectId,
      ref: 'Call',
      index: true,
    },
    subject: { type: String, required: true, trim: true, maxlength: 200 },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ['OPEN', 'IN_PROGRESS', 'PENDING_CUSTOMER', 'RESOLVED', 'CLOSED'],
      default: 'OPEN',
      index: true,
    },
    priority: {
      type: String,
      enum: ['LOW', 'MEDIUM', 'HIGH', 'URGENT'],
      default: 'MEDIUM',
      index: true,
    },
    tags: [{ type: String, trim: true, index: true }],
    aiSummary: { type: String },
    slaDueDate: { type: Date, index: true },
    history: [ticketActivitySchema],
    resolvedAt: { type: Date },
    closedAt: { type: Date },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// High-speed CRM query indexes
ticketSchema.index({ ticketNumber: 1 });
ticketSchema.index({ customerId: 1, status: 1 });
ticketSchema.index({ assignedAgentId: 1, status: 1, priority: -1 });
ticketSchema.index({ createdAt: -1 });

// Virtual relationship to Notes
ticketSchema.virtual('notes', {
  ref: 'Note',
  localField: '_id',
  foreignField: 'entityId',
  match: { entityType: 'TICKET' },
});

export const TicketModel = (mongoose.models?.Ticket as any) || model<ITicketDocument>('Ticket', ticketSchema);
