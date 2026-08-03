import mongoose, { Schema, model, Document, Types } from 'mongoose';
import { CallStatus, CallDirection, SentimentScore } from '../../../shared/constants/enums.js';

export interface ICallDocument extends Document {
  exotelCallSid: string;
  customerId: Types.ObjectId;
  assignedAgentId?: Types.ObjectId;
  direction: CallDirection;
  status: CallStatus;
  fromNumber: string;
  toNumber: string;
  startTime: Date;
  endTime?: Date;
  durationSeconds?: number;
  recordingUrl?: string;
  transcript: {
    speaker: 'SYSTEM_AI' | 'CUSTOMER' | 'HUMAN_AGENT';
    text: string;
    timestamp: Date;
    sentiment?: SentimentScore;
  }[];
  summary?: string;
  sentiment?: SentimentScore;
  createdAt: Date;
  updatedAt: Date;
}

const callSchema = new Schema<ICallDocument>(
  {
    exotelCallSid: { type: String, required: true, unique: true, index: true },
    customerId: { type: Schema.Types.ObjectId, ref: 'Customer', required: true, index: true },
    assignedAgentId: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    direction: { type: String, enum: Object.values(CallDirection), default: CallDirection.INBOUND },
    status: { type: String, enum: Object.values(CallStatus), default: CallStatus.INITIATED, index: true },
    fromNumber: { type: String, required: true },
    toNumber: { type: String, required: true },
    startTime: { type: Date, default: Date.now },
    endTime: { type: Date },
    durationSeconds: { type: Number, default: 0 },
    recordingUrl: { type: String },
    transcript: [
      {
        speaker: { type: String, enum: ['SYSTEM_AI', 'CUSTOMER', 'HUMAN_AGENT'], required: true },
        text: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
        sentiment: { type: String, enum: Object.values(SentimentScore) },
      },
    ],
    summary: { type: String },
    sentiment: { type: String, enum: Object.values(SentimentScore), default: SentimentScore.NEUTRAL },
  },
  { timestamps: true }
);

export const CallModel = (mongoose.models?.Call as any) || model<ICallDocument>('Call', callSchema);
