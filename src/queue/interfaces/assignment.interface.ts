import { QueuedCallItem } from './queue-item.interface.js';

export interface CallAssignmentResult {
  success: boolean;
  assignedAgentId?: string;
  callItem?: QueuedCallItem;
  assignedAt?: string;
  message?: string;
}
