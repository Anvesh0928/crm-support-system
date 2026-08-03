export enum SocketEvent {
  // Call Events
  CALL_INCOMING = 'call:incoming',
  CALL_STARTED = 'call:started',
  CALL_TRANSCRIPT_CHUNK = 'call:transcript_chunk',
  CALL_ESCALATED = 'call:escalated',
  CALL_ENDED = 'call:ended',
  CALL_RECORDING_READY = 'call:recording_ready',

  // Agent Presence Events
  AGENT_STATUS_CHANGED = 'agent:status_changed',
  AGENT_CONNECTED = 'agent:connected',
  AGENT_DISCONNECTED = 'agent:disconnected',

  // Queue Events
  QUEUE_UPDATED = 'queue:updated',
  QUEUE_DEPTH_CHANGED = 'queue:depth_changed',
  QUEUE_TIMEOUT_EVICTION = 'queue:timeout_eviction',

  // Dashboard & System Events
  DASHBOARD_STATS_TICK = 'dashboard:stats_tick',
  CLIENT_RESYNC = 'socket:resync',
  HEARTBEAT_PING = 'heartbeat:ping',
  HEARTBEAT_PONG = 'heartbeat:pong',
}

export interface IncomingCallPopupPayload {
  callSid: string;
  fromNumber: string;
  toNumber: string;
  customerName: string;
  accountTier: string;
  joinedAt: string;
}

export interface AgentStatusChangedPayload {
  agentId: string;
  name: string;
  email: string;
  status: 'AVAILABLE' | 'BUSY' | 'OFFLINE' | 'BREAK';
  activeCallSid?: string;
  updatedAt: string;
}

export interface QueueDepthChangedPayload {
  department: string;
  vipCount: number;
  prioCount: number;
  totalWaiting: number;
}

export interface DashboardStatsTickPayload {
  activeCallsCount: number;
  availableAgentsCount: number;
  busyAgentsCount: number;
  totalWaitingInQueue: number;
  aiResolutionRateToday: number;
  avgWaitTimeSeconds: number;
  timestamp: string;
}
