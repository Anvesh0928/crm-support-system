export interface AIFunctionCallDefinition {
  type: 'function';
  name: string;
  description: string;
  parameters: Record<string, any>;
}

export interface AIToolExecutionPayload {
  callSid: string;
  callId: string;
  toolName: string;
  args: Record<string, any>;
}

export interface AIToolExecutionResult {
  success: boolean;
  data?: any;
  error?: string;
}
