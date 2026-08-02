import { Schema, model, models } from 'mongoose';
import { INoteDocument } from '../interfaces/note.interface.js';

const noteSchema = new Schema<INoteDocument>(
  {
    entityId: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    entityType: {
      type: String,
      enum: ['CUSTOMER', 'CALL', 'TICKET'],
      required: true,
      index: true,
    },
    authorId: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    authorType: {
      type: String,
      enum: ['AGENT', 'AI_SYSTEM'],
      default: 'AGENT',
    },
    content: {
      type: String,
      required: [true, 'Note content cannot be empty'],
      trim: true,
    },
    isInternalOnly: { type: Boolean, default: true },
    tags: [{ type: String, trim: true }],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Compound polymorphic index for instant retrieval by entity
noteSchema.index({ entityId: 1, entityType: 1, createdAt: -1 });
noteSchema.index({ authorId: 1 });

export const NoteModel = (models.Note as any) || model<INoteDocument>('Note', noteSchema);

