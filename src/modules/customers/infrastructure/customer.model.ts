import { Schema, model, models, Document } from 'mongoose';

export interface ICustomerDocument extends Document {
  phone: string;
  name?: string;
  email?: string;
  accountTier: 'VIP' | 'STANDARD' | 'ENTERPRISE';
  notes?: string;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const customerSchema = new Schema<ICustomerDocument>(
  {
    phone: { type: String, required: true, unique: true, index: true },
    name: { type: String, trim: true, default: 'Valued Caller' },
    email: { type: String, lowercase: true },
    accountTier: { type: String, enum: ['VIP', 'STANDARD', 'ENTERPRISE'], default: 'STANDARD' },
    notes: { type: String },
    metadata: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

export const CustomerModel = (models.Customer as any) || model<ICustomerDocument>('Customer', customerSchema);
