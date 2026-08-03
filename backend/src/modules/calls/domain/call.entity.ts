import { CallStatus, CallDirection, SentimentScore } from '../../../shared/constants/enums.js';

export interface TranscriptUtterance {
  speaker: 'SYSTEM_AI' | 'CUSTOMER' | 'HUMAN_AGENT';
  text: string;
  timestamp: Date;
  sentiment?: SentimentScore;
}

export interface CallEntity {
  id: string;
  exotelCallSid: string;
  customerId: string;
  assignedAgentId?: string;
  direction: CallDirection;
  status: CallStatus;
  fromNumber: string;
  toNumber: string;
  startTime: Date;
  endTime?: Date;
  durationSeconds?: number;
  recordingUrl?: string;
  transcript: TranscriptUtterance[];
  summary?: string;
  sentiment?: SentimentScore;
  createdAt: Date;
  updatedAt: Date;
}
