import { Document, Types } from 'mongoose';

export type ConsultationType = 'WARM_TRANSFER' | 'SUPERVISOR_BARGE' | 'ADVISORY_WHISPER';
export type ConsultationStatus = 'REQUESTED' | 'ACCEPTED' | 'REJECTED' | 'COMPLETED' | 'CANCELLED';

export interface IConsultationDocument extends Document {
  callId: Types.ObjectId;
  requestingAgentId: Types.ObjectId;
  specialistAgentId: Types.ObjectId;
  type: ConsultationType;
  status: ConsultationStatus;
  notes?: string;
  requestedAt: Date;
  acceptedAt?: Date;
  endedAt?: Date;
  durationSeconds?: number;
  createdAt: Date;
  updatedAt: Date;
}
