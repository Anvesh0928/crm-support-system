import { IntentAnalysisResult, IntentCategory } from '../interfaces/intent.interface.js';

export class IntentDetectorService {
  private readonly escalationKeywords = ['human', 'agent', 'manager', 'supervisor', 'representative', 'person', 'frustrated', 'terrible', 'angry'];

  analyzeTranscript(text: string): IntentAnalysisResult {
    const lower = text.toLowerCase();

    let sentiment: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE' | 'FRUSTRATED' = 'NEUTRAL';
    let requiresHumanEscalation = false;
    let escalationReason: string | undefined;

    // Check for explicit escalation triggers
    const matchedKeyword = this.escalationKeywords.find((kw) => lower.includes(kw));
    if (matchedKeyword) {
      sentiment = 'FRUSTRATED';
      requiresHumanEscalation = true;
      escalationReason = `Caller triggered escalation keyword: '${matchedKeyword}'`;
    } else if (lower.includes('great') || lower.includes('thank') || lower.includes('awesome') || lower.includes('perfect')) {
      sentiment = 'POSITIVE';
    } else if (lower.includes('bad') || lower.includes('wrong') || lower.includes('not working') || lower.includes('delayed')) {
      sentiment = 'NEGATIVE';
    }

    // Determine Intent Category
    let category: IntentCategory = 'GENERAL_KNOWLEDGE';
    if (requiresHumanEscalation) {
      category = 'HUMAN_ESCALATION_REQUEST';
    } else if (lower.includes('order') || lower.includes('track') || lower.includes('delivery')) {
      category = 'ORDER_STATUS_QUERY';
    } else if (lower.includes('refund') || lower.includes('cancel') || lower.includes('return')) {
      category = 'REFUND_REQUEST';
    } else if (lower.includes('bill') || lower.includes('payment') || lower.includes('invoice')) {
      category = 'BILLING_INQUIRY';
    } else if (lower.includes('error') || lower.includes('bug') || lower.includes('broken') || lower.includes('help')) {
      category = 'TECHNICAL_SUPPORT';
    }

    return {
      category,
      confidence: 0.92,
      sentiment,
      requiresHumanEscalation,
      escalationReason,
    };
  }
}
