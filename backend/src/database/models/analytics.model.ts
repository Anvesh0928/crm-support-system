import mongoose, { Schema, model } from 'mongoose';
import { IAnalyticsDocument } from '../interfaces/analytics.interface.js';

const sentimentBreakdownSchema = new Schema(
  {
    positive: { type: Number, default: 0, min: 0 },
    neutral: { type: Number, default: 0, min: 0 },
    negative: { type: Number, default: 0, min: 0 },
    frustrated: { type: Number, default: 0, min: 0 },
  },
  { _id: false }
);

const analyticsMetricsSchema = new Schema(
  {
    totalCalls: { type: Number, default: 0, min: 0 },
    inboundCalls: { type: Number, default: 0, min: 0 },
    outboundCalls: { type: Number, default: 0, min: 0 },
    completedCalls: { type: Number, default: 0, min: 0 },
    failedCalls: { type: Number, default: 0, min: 0 },
    aiHandledCallsCount: { type: Number, default: 0, min: 0 },
    aiResolutionRate: { type: Number, default: 0.0, min: 0, max: 100 },
    escalatedToAgentCount: { type: Number, default: 0, min: 0 },
    avgWaitTimeSeconds: { type: Number, default: 0, min: 0 },
    avgHandleTimeSeconds: { type: Number, default: 0, min: 0 },
    totalTicketsCreated: { type: Number, default: 0, min: 0 },
    totalTicketsResolved: { type: Number, default: 0, min: 0 },
    sentimentBreakdown: { type: sentimentBreakdownSchema, default: () => ({}) },
  },
  { _id: false }
);

const analyticsSchema = new Schema<IAnalyticsDocument>(
  {
    dateString: { type: String, required: true, index: true },
    periodType: {
      type: String,
      enum: ['HOURLY', 'DAILY', 'MONTHLY'],
      required: true,
      index: true,
    },
    entityType: {
      type: String,
      enum: ['SYSTEM', 'AGENT', 'QUEUE'],
      required: true,
      index: true,
    },
    entityId: { type: Schema.Types.ObjectId, index: true },
    metrics: { type: analyticsMetricsSchema, default: () => ({}) },
  },
  {
    timestamps: true,
  }
);

// Compound unique snapshot index preventing duplicate rollup entries
analyticsSchema.index(
  { dateString: 1, periodType: 1, entityType: 1, entityId: 1 },
  { unique: true }
);

export const AnalyticsModel = (mongoose.models?.Analytics as any) || model<IAnalyticsDocument>('Analytics', analyticsSchema);

