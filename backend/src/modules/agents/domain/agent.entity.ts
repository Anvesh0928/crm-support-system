import { AgentStatus } from '../../../shared/constants/enums.js';

export interface AgentPresenceEntity {
  agentId: string;
  name: string;
  email: string;
  status: AgentStatus;
  activeCallSid?: string;
  lastActive: Date;
}
