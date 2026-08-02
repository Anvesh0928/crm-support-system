import { Schema, model, models } from 'mongoose';
import { ICustomerDocument } from '../interfaces/customer.interface.js';

const phoneRegex = /^\+?[1-9]\d{1,14}$/;

const addressSchema = new Schema(
  {
    street: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    postalCode: { type: String, trim: true },
    country: { type: String, trim: true, default: 'US' },
  },
  { _id: false }
);

const customerMetricsSchema = new Schema(
  {
    totalCallsCount: { type: Number, default: 0, min: 0 },
    totalTicketsCount: { type: Number, default: 0, min: 0 },
    lastCallTimestamp: { type: Date },
    sentimentAvgScore: { type: Number, min: -1.0, max: 1.0, default: 0.0 },
  },
  { _id: false }
);

const customerSchema = new Schema<ICustomerDocument>(
  {
    phone: {
      type: String,
      required: [true, 'Customer phone number is required'],
      unique: true,
      trim: true,
      validate: {
        validator: (v: string) => phoneRegex.test(v),
        message: (props) => `${props.value} is not a valid E.164 phone number!`,
      },
    },
    secondaryPhones: [
      {
        type: String,
        trim: true,
        validate: {
          validator: (v: string) => phoneRegex.test(v),
          message: (props) => `${props.value} is not a valid secondary phone number!`,
        },
      },
    ],
    name: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
      default: 'Valued Customer',
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      sparse: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    company: { type: String, trim: true },
    accountTier: {
      type: String,
      enum: {
        values: ['VIP', 'STANDARD', 'ENTERPRISE'],
        message: '{VALUE} is not a supported account tier',
      },
      default: 'STANDARD',
      index: true,
    },
    address: { type: addressSchema },
    metrics: { type: customerMetricsSchema, default: () => ({}) },
    customFields: { type: Schema.Types.Mixed },
    notesSummary: { type: String },
    isDeleted: { type: Boolean, default: false, index: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for high performance
customerSchema.index({ phone: 1 });
customerSchema.index({ email: 1 }, { sparse: true });
customerSchema.index({ accountTier: 1, createdAt: -1 });
customerSchema.index({ isDeleted: 1, phone: 1 });

// Virtual relationship to Calls
customerSchema.virtual('calls', {
  ref: 'Call',
  localField: '_id',
  foreignField: 'customerId',
});

// Virtual relationship to Tickets
customerSchema.virtual('tickets', {
  ref: 'Ticket',
  localField: '_id',
  foreignField: 'customerId',
});

export const CustomerModel = (models.Customer as any) || model<ICustomerDocument>('Customer', customerSchema);

