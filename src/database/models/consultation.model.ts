import { Schema, model, models } from 'mongoose';
import { IConsultationDocument } from '../interfaces/consultation.interface.js';

const consultationSchema = new Schema<IConsultationDocument>(
  {
    callId: {
      type: Schema.Types.ObjectId,
      ref: 'Call',
      required: true,
      index: true,
    },
    requestingAgentId: {
      type: Schema.Types.ObjectId,
      ref: 'Agent',
      required: true,
      index: true,
    },
    specialistAgentId: {
      type: Schema.Types.ObjectId,
      ref: 'Agent',
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: ['WARM_TRANSFER', 'SUPERVISOR_BARGE', 'ADVISORY_WHISPER'],
      required: true,
    },
    status: {
      type: String,
      enum: ['REQUESTED', 'ACCEPTED', 'REJECTED', 'COMPLETED', 'CANCELLED'],
      default: 'REQUESTED',
      index: true,
    },
    notes: { type: String },
    requestedAt: { type: Date, default: Date.now },
    acceptedAt: { type: Date },
    endedAt: { type: Date },
    durationSeconds: { type: Number, default: 0, min: 0 },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

consultationSchema.index({ callId: 1 });
consultationSchema.index({ requestingAgentId: 1, status: 1 });
consultationSchema.index({ specialistAgentId: 1, status: 1 });

export const ConsultationModel = (models.Consultation as any) || model<IConsultationDocument>('Consultation', consultationSchema);

