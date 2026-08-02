import { Schema, model, models } from 'mongoose';
import { ICallLogDocument } from '../interfaces/call-log.interface.js';

const callLogSchema = new Schema<ICallLogDocument>(
  {
    callId: {
      type: Schema.Types.ObjectId,
      ref: 'Call',
      required: true,
      index: true,
    },
    exotelCallSid: { type: String, required: true, index: true },
    eventType: {
      type: String,
      enum: [
        'SPEECH_RECOGNIZED',
        'AI_TOOL_EXECUTED',
        'DTMF_PRESSED',
        'STATE_CHANGED',
        'AGENT_ASSIGNED',
        'WEBHOOK_RECEIVED',
        'ERROR',
      ],
      required: true,
      index: true,
    },
    speaker: {
      type: String,
      enum: ['SYSTEM_AI', 'CUSTOMER', 'HUMAN_AGENT'],
    },
    payload: { type: Schema.Types.Mixed, required: true },
    executionDurationMs: { type: Number },
    timestamp: { type: Date, default: Date.now, index: true },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

// Compound time-series log indexes
callLogSchema.index({ callId: 1, timestamp: 1 });
callLogSchema.index({ eventType: 1, timestamp: -1 });

export const CallLogModel = (models.CallLog as any) || model<ICallLogDocument>('CallLog', callLogSchema);

