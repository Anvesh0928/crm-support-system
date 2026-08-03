import { Document, Types } from 'mongoose';

export type StorageProviderType = 'S3' | 'EXOTEL' | 'AZURE_BLOB' | 'GCS';
export type AudioFormatType = 'MP3' | 'WAV' | 'OGG' | 'AAC';
export type TranscriptionStatusType = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';

export interface IRecordingDocument extends Document {
  callId: Types.ObjectId;
  exotelCallSid: string;
  recordingUrl: string;
  storageProvider: StorageProviderType;
  storageKey?: string;
  format: AudioFormatType;
  durationSeconds: number;
  fileSizeBytes?: number;
  checksumSha256?: string;
  transcriptionStatus: TranscriptionStatusType;
  transcriptionText?: string;
  retentionExpiryDate?: Date;
  isEncrypted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
