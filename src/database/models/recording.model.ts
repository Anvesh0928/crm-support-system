import { Schema, model, models } from 'mongoose';
import { IRecordingDocument } from '../interfaces/recording.interface.js';

const recordingSchema = new Schema<IRecordingDocument>(
  {
    callId: {
      type: Schema.Types.ObjectId,
      ref: 'Call',
      required: true,
      unique: true,
      index: true,
    },
    exotelCallSid: { type: String, required: true, index: true },
    recordingUrl: { type: String, required: true },
    storageProvider: {
      type: String,
      enum: ['S3', 'EXOTEL', 'AZURE_BLOB', 'GCS'],
      default: 'EXOTEL',
    },
    storageKey: { type: String, sparse: true },
    format: {
      type: String,
      enum: ['MP3', 'WAV', 'OGG', 'AAC'],
      default: 'MP3',
    },
    durationSeconds: { type: Number, required: true, min: 0 },
    fileSizeBytes: { type: Number, min: 0 },
    checksumSha256: { type: String },
    transcriptionStatus: {
      type: String,
      enum: ['PENDING', 'IN_PROGRESS', 'COMPLETED', 'FAILED'],
      default: 'PENDING',
      index: true,
    },
    transcriptionText: { type: String },
    retentionExpiryDate: { type: Date },
    isEncrypted: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

recordingSchema.index({ callId: 1 });
recordingSchema.index({ exotelCallSid: 1 });
recordingSchema.index({ storageKey: 1 }, { sparse: true });
// TTL Index for regulatory data retention expiry
recordingSchema.index({ retentionExpiryDate: 1 }, { expireAfterSeconds: 0 });

export const RecordingModel = (models.Recording as any) || model<IRecordingDocument>('Recording', recordingSchema);

