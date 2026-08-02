import { Schema, model, models } from 'mongoose';
import { IQueueDocument } from '../interfaces/queue.interface.js';

const queueWaitingItemSchema = new Schema(
  {
    callId: { type: Schema.Types.ObjectId, ref: 'Call', required: true },
    exotelCallSid: { type: String, required: true },
    customerId: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
    joinedAt: { type: Date, default: Date.now },
    priorityScore: { type: Number, default: 0 },
    customerTier: { type: String, default: 'STANDARD' },
    requiredSkills: [{ type: String, trim: true }],
  },
  { _id: false }
);

const queueSchema = new Schema<IQueueDocument>(
  {
    queueKey: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    name: { type: String, required: true, trim: true },
    department: { type: String, required: true, index: true },
    routingStrategy: {
      type: String,
      enum: ['ROUND_ROBIN', 'SKILL_BASED', 'LONGEST_IDLE'],
      default: 'SKILL_BASED',
    },
    requiredSkills: [{ type: String, trim: true, index: true }],
    maxWaitTimeSeconds: { type: Number, default: 300, min: 10 },
    activeItems: [queueWaitingItemSchema],
    isActive: { type: Boolean, default: true, index: true },
  },
  {
    timestamps: true,
  }
);

queueSchema.index({ queueKey: 1 });
queueSchema.index({ 'activeItems.callId': 1 });

export const QueueModel = (models.Queue as any) || model<IQueueDocument>('Queue', queueSchema);

