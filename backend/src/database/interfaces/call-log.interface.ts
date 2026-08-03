import { Document, Types } from 'mongoose';

export type CallEventType =
  | 'SPEECH_RECOGNIZED'
  | 'AI_TOOL_EXECUTED'
  | 'DTMF_PRESSED'
  | 'STATE_CHANGED'
  | 'AGENT_ASSIGNED'
  | 'WEBHOOK_RECEIVED'
  | 'ERROR';

export interface ICallLogDocument extends Document {
  callId: Types.ObjectId;
  exotelCallSid: string;
  eventType: CallEventType;
  speaker?: 'SYSTEM_AI' | 'CUSTOMER' | 'HUMAN_AGENT';
  payload: Record<string, any>;
  executionDurationMs?: number;
  timestamp: Date;
  createdAt: Date;
}
