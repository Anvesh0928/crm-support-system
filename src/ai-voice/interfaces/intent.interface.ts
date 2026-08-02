export type IntentCategory =
  | 'ORDER_STATUS_QUERY'
  | 'REFUND_REQUEST'
  | 'TECHNICAL_SUPPORT'
  | 'BILLING_INQUIRY'
  | 'HUMAN_ESCALATION_REQUEST'
  | 'GENERAL_KNOWLEDGE';

export interface IntentAnalysisResult {
  category: IntentCategory;
  confidence: number;
  sentiment: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE' | 'FRUSTRATED';
  requiresHumanEscalation: boolean;
  escalationReason?: string;
}
