export interface AIAnalysisRequest {
  callSid: string;
  userSpeechText: string;
  customerPhone?: string;
}

export interface AIAnalysisResponse {
  intent: string;
  summary: string;
  responseText: string;
  isResolved: boolean;
  shouldEscalateToHuman: boolean;
  escalationReason?: string;
}

export interface IAIProvider {
  // Analyzes customer speech text to detect intent, generate responses, and flag human escalations
  analyzeSpeech(request: AIAnalysisRequest): Promise<AIAnalysisResponse>;
}
