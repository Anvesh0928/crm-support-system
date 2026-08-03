export interface QueuedCallItem {
  callId: string;
  exotelCallSid: string;
  customerId: string;
  customerTier: 'VIP' | 'STANDARD' | 'ENTERPRISE';
  department: string;
  requiredSkills: string[];
  priorityScore: number;
  joinedAt: string; // ISO date string
  retryCount: number;
}
