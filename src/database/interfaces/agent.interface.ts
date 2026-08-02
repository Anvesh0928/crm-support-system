import { Document, Types } from 'mongoose';

export type AgentPresenceState = 'AVAILABLE' | 'BUSY' | 'OFFLINE' | 'BREAK';
export type AgentRoleType = 'AGENT' | 'SUPERVISOR' | 'ADMIN';

export interface IAgentPerformanceMetrics {
  totalHandledCalls: number;
  totalResolvedTickets: number;
  avgCallDurationSeconds: number;
  csatAverageRating: number;
}

export interface IAgentDocument extends Document {
  userId: Types.ObjectId;
  name: string;
  email: string;
  role: AgentRoleType;
  department: string;
  skills: string[];
  status: AgentPresenceState;
  activeCallSid?: string;
  maxConcurrentCalls: number;
  currentActiveCallsCount: number;
  supervisorId?: Types.ObjectId;
  metrics: IAgentPerformanceMetrics;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
