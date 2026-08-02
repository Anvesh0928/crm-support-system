import { Document } from 'mongoose';

export type AccountTier = 'VIP' | 'STANDARD' | 'ENTERPRISE';

export interface ICustomerAddress {
  street?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

export interface ICustomerMetrics {
  totalCallsCount: number;
  totalTicketsCount: number;
  lastCallTimestamp?: Date;
  sentimentAvgScore?: number; // Normalized -1.0 to 1.0
}

export interface ICustomerDocument extends Document {
  phone: string;
  secondaryPhones?: string[];
  name: string;
  email?: string;
  company?: string;
  accountTier: AccountTier;
  address?: ICustomerAddress;
  metrics: ICustomerMetrics;
  customFields?: Record<string, any>;
  notesSummary?: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
