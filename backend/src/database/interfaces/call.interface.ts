import { Document, Types } from 'mongoose';

export type CallDirectionType = 'INBOUND' | 'OUTBOUND';
export type CallStatusType = 'INITIATED' | 'IN_PROGRESS' | 'AI_HANDLED' | 'ESCALATED' | 'COMPLETED' | 'FAILED';
export type SentimentScoreType = 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE' | 'FRUSTRATED';

export interface ITranscriptEntry {
  speaker: 'SYSTEM_AI' | 'CUSTOMER' | 'HUMAN_AGENT';
  text: string;
  timestamp: Date;
  sentiment?: SentimentScoreType;
  confidenceScore?: number;
}

export interface ICallDocument extends Document {
  exotelCallSid: string;
  customerId: Types.ObjectId;
  assignedAgentId?: Types.ObjectId;
  direction: CallDirectionType;
  status: CallStatusType;
  fromNumber: string;
  toNumber: string;
  startTime: Date;
  endTime?: Date;
  durationSeconds?: number;
  aiHandled: boolean;
  transferredToAgent: boolean;
  recordingUrl?: string;
  transcript: ITranscriptEntry[];
  summary?: string;
  sentiment: SentimentScoreType;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}
