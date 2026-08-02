import { Document, Types } from 'mongoose';

export type NoteEntityType = 'CUSTOMER' | 'CALL' | 'TICKET';
export type AuthorType = 'AGENT' | 'AI_SYSTEM';

export interface INoteDocument extends Document {
  entityId: Types.ObjectId;
  entityType: NoteEntityType;
  authorId: Types.ObjectId;
  authorType: AuthorType;
  content: string;
  isInternalOnly: boolean;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}
