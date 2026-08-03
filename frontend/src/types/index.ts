export type UserRole = 'ADMIN' | 'AGENT' | 'SUPERVISOR';
export type AgentStatus = 'AVAILABLE' | 'BUSY' | 'OFFLINE' | 'BREAK';
export type CallStatus = 'INITIATED' | 'IN_PROGRESS' | 'AI_HANDLED' | 'ESCALATED' | 'COMPLETED' | 'FAILED';
export type TicketStatus = 'OPEN' | 'IN_PROGRESS' | 'PENDING_CUSTOMER' | 'RESOLVED' | 'CLOSED';
export type TicketPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface AgentPresence {
  agentId: string;
  name: string;
  email: string;
  status: AgentStatus;
  activeCallSid?: string;
  updatedAt: string;
}

export interface Customer {
  _id: string;
  phone: string;
  name: string;
  email?: string;
  accountTier: 'VIP' | 'STANDARD' | 'ENTERPRISE';
  notes?: string;
  createdAt: string;
}

export interface Utterance {
  speaker: 'SYSTEM_AI' | 'CUSTOMER' | 'HUMAN_AGENT';
  text: string;
  timestamp: string;
  sentiment?: string;
}

export interface Call {
  _id: string;
  exotelCallSid: string;
  customerId: Customer | string;
  assignedAgentId?: User | string;
  direction: 'INBOUND' | 'OUTBOUND';
  status: CallStatus;
  fromNumber: string;
  toNumber: string;
  startTime: string;
  endTime?: string;
  durationSeconds?: number;
  recordingUrl?: string;
  transcript: Utterance[];
  summary?: string;
}

export interface Ticket {
  _id: string;
  ticketNumber: string;
  customerId: Customer | string;
  assignedAgentId?: User | string;
  subject: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  aiSummary?: string;
  tags?: string[];
  createdAt: string;
}
