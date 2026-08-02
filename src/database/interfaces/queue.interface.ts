import { Document, Types } from 'mongoose';

export type RoutingStrategyType = 'ROUND_ROBIN' | 'SKILL_BASED' | 'LONGEST_IDLE';

export interface IQueueWaitingItem {
  callId: Types.ObjectId;
  exotelCallSid: string;
  customerId: Types.ObjectId;
  joinedAt: Date;
  priorityScore: number;
  customerTier: string;
  requiredSkills: string[];
}

export interface IQueueDocument extends Document {
  queueKey: string;
  name: string;
  department: string;
  routingStrategy: RoutingStrategyType;
  requiredSkills: string[];
  maxWaitTimeSeconds: number;
  activeItems: IQueueWaitingItem[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
