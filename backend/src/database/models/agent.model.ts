import mongoose, { Schema, model } from 'mongoose';
import { IAgentDocument } from '../interfaces/agent.interface.js';

const agentMetricsSchema = new Schema(
  {
    totalHandledCalls: { type: Number, default: 0, min: 0 },
    totalResolvedTickets: { type: Number, default: 0, min: 0 },
    avgCallDurationSeconds: { type: Number, default: 0, min: 0 },
    csatAverageRating: { type: Number, default: 5.0, min: 1.0, max: 5.0 },
  },
  { _id: false }
);

const agentSchema = new Schema<IAgentDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    role: {
      type: String,
      enum: ['AGENT', 'SUPERVISOR', 'ADMIN'],
      default: 'AGENT',
      index: true,
    },
    department: { type: String, default: 'Customer Support', trim: true, index: true },
    skills: [{ type: String, trim: true, index: true }],
    status: {
      type: String,
      enum: ['AVAILABLE', 'BUSY', 'OFFLINE', 'BREAK'],
      default: 'OFFLINE',
      index: true,
    },
    activeCallSid: { type: String },
    maxConcurrentCalls: { type: Number, default: 1, min: 1, max: 5 },
    currentActiveCallsCount: { type: Number, default: 0, min: 0 },
    supervisorId: { type: Schema.Types.ObjectId, ref: 'Agent' },
    metrics: { type: agentMetricsSchema, default: () => ({}) },
    isDeleted: { type: Boolean, default: false, index: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// High-speed routing compound indexes
agentSchema.index({ status: 1, skills: 1, department: 1 });
agentSchema.index({ email: 1 });
agentSchema.index({ supervisorId: 1 });

export const AgentModel = (mongoose.models?.Agent as any) || model<IAgentDocument>('Agent', agentSchema);

