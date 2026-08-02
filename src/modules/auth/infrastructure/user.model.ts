import { Schema, model, models, Document } from 'mongoose';
import { UserRole } from '../../../shared/constants/enums.js';

export interface IUserDocument extends Document {
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  department?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUserDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, index: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: Object.values(UserRole), default: UserRole.AGENT },
    department: { type: String, default: 'Customer Support' },
  },
  { timestamps: true }
);

export const UserModel = (models.User as any) || model<IUserDocument>('User', userSchema);
