import { Document, Types } from 'mongoose';

export type AnalyticsPeriodType = 'HOURLY' | 'DAILY' | 'MONTHLY';
export type AnalyticsEntityType = 'SYSTEM' | 'AGENT' | 'QUEUE';

export interface IAnalyticsMetrics {
  totalCalls: number;
  inboundCalls: number;
  outboundCalls: number;
  completedCalls: number;
  failedCalls: number;
  aiHandledCallsCount: number;
  aiResolutionRate: number; // percentage 0 to 100
  escalatedToAgentCount: number;
  avgWaitTimeSeconds: number;
  avgHandleTimeSeconds: number;
  totalTicketsCreated: number;
  totalTicketsResolved: number;
  sentimentBreakdown: {
    positive: number;
    neutral: number;
    negative: number;
    frustrated: number;
  };
}

export interface IAnalyticsDocument extends Document {
  dateString: string; // e.g. "2026-08-02" or "2026-08-02-13"
  periodType: AnalyticsPeriodType;
  entityType: AnalyticsEntityType;
  entityId?: Types.ObjectId; // Null if SYSTEM level
  metrics: IAnalyticsMetrics;
  createdAt: Date;
  updatedAt: Date;
}
