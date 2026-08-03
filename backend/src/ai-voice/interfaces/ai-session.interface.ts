export interface AISessionConfig {
  callSid: string;
  customerPhone: string;
  voice?: string;
  systemPrompt?: string;
  temperature?: number;
}

export interface AISessionState {
  callSid: string;
  customerPhone: string;
  startTime: string;
  turnCount: number;
  lastDetectedIntent?: string;
  sentiment: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE' | 'FRUSTRATED';
  isEscalated: boolean;
}
