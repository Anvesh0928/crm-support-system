import { IAIProvider, AIAnalysisRequest, AIAnalysisResponse } from '../interfaces/ai-provider.interface.js';

export class MockAIProvider implements IAIProvider {
  async analyzeSpeech(request: AIAnalysisRequest): Promise<AIAnalysisResponse> {
    const textLower = request.userSpeechText.toLowerCase();

    // 1. Refund Intent Rule
    if (textLower.includes('refund') || textLower.includes('money back')) {
      return {
        intent: 'REFUND',
        summary: 'Customer requested refund status.',
        responseText: 'I can certainly help you with your refund request. Let me check your transaction history.',
        isResolved: false,
        shouldEscalateToHuman: true,
        escalationReason: 'Customer requested refund processing requiring agent approval.',
      };
    }

    // 2. Wallet Balance Rule
    if (textLower.includes('wallet') || textLower.includes('balance')) {
      return {
        intent: 'WALLET',
        summary: 'Customer checked wallet balance.',
        responseText: 'Your current wallet balance is ₹550. Is there anything else I can help you with?',
        isResolved: true,
        shouldEscalateToHuman: false,
      };
    }

    // 3. Human Escalation Keyword Rule
    if (textLower.includes('agent') || textLower.includes('human') || textLower.includes('manager')) {
      return {
        intent: 'HUMAN_ESCALATION_REQUEST',
        summary: 'Customer requested human agent transfer.',
        responseText: 'Connecting you to a customer support specialist right away. Please hold.',
        isResolved: false,
        shouldEscalateToHuman: true,
        escalationReason: 'Customer explicitly requested a human support representative.',
      };
    }

    // 4. Default Knowledge Response
    return {
      intent: 'GENERAL_KNOWLEDGE',
      summary: 'General customer support inquiry.',
      responseText: 'Thank you for reaching out! How can I assist you with your account today?',
      isResolved: true,
      shouldEscalateToHuman: false,
    };
  }
}
