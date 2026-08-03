export interface QueueConfig {
  maxWaitTimeSeconds: number;
  maxAssignmentRetries: number;
  vipTierBonusScore: number;
  enterpriseTierBonusScore: number;
  retryBonusScore: number;
}

export const DEFAULT_QUEUE_CONFIG: QueueConfig = {
  maxWaitTimeSeconds: 300, // 5 minutes SLA
  maxAssignmentRetries: 3,
  vipTierBonusScore: 1000,
  enterpriseTierBonusScore: 500,
  retryBonusScore: 200,
};
