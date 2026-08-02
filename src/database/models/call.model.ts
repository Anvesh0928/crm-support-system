import { Schema, model, models } from 'mongoose';
import { ICallDocument } from '../interfaces/call.interface.js';

const transcriptEntrySchema = new Schema(
  {
    speaker: {
      type: String,
      enum: ['SYSTEM_AI', 'CUSTOMER', 'HUMAN_AGENT'],
      required: true,
    },
    text: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    sentiment: {
      type: String,
      enum: ['POSITIVE', 'NEUTRAL', 'NEGATIVE', 'FRUSTRATED'],
      default: 'NEUTRAL',
    },
    confidenceScore: { type: Number, min: 0, max: 1 },
  },
  { _id: false }
);

const callSchema = new Schema<ICallDocument>(
  {
    exotelCallSid: {
      type: String,
      required: [true, 'Exotel Call SID is required'],
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
    direction: {
      type: String,
      enum: ['INBOUND', 'OUTBOUND'],
      default: 'INBOUND',
    },
    status: {
      type: String,
      enum: ['INITIATED', 'IN_PROGRESS', 'AI_HANDLED', 'ESCALATED', 'COMPLETED', 'FAILED'],
      default: 'INITIATED',
      index: true,
    },
    fromNumber: { type: String, required: true, trim: true },
    toNumber: { type: String, required: true, trim: true },
    startTime: { type: Date, default: Date.now, index: true },
    endTime: { type: Date },
    durationSeconds: { type: Number, default: 0, min: 0 },
    aiHandled: { type: Boolean, default: true, index: true },
    transferredToAgent: { type: Boolean, default: false },
    recordingUrl: { type: String },
    transcript: [transcriptEntrySchema],
    summary: { type: String },
    sentiment: {
      type: String,
      enum: ['POSITIVE', 'NEUTRAL', 'NEGATIVE', 'FRUSTRATED'],
      default: 'NEUTRAL',
      index: true,
    },
    metadata: { type: Schema.Types.Mixed },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// High throughput indexes
callSchema.index({ exotelCallSid: 1 });
callSchema.index({ customerId: 1, createdAt: -1 });
callSchema.index({ assignedAgentId: 1, status: 1 });
callSchema.index({ status: 1, createdAt: -1 });

// Virtual link to CallLogs
callSchema.virtual('logs', {
  ref: 'CallLog',
  localField: '_id',
  foreignField: 'callId',
});

// Virtual link to Recording
callSchema.virtual('recording', {
  ref: 'Recording',
  localField: '_id',
  foreignField: 'callId',
  justOne: true,
});

export const CallModel = (models.Call as any) || model<ICallDocument>('Call', callSchema);

