import { CallStatus, CallDirection } from '../../shared/constants/enums.js';

export interface CallInitiatePayload {
  fromNumber: string;
  toNumber: string;
  direction: CallDirection;
  customerId?: string;
}

export interface CallEventObject {
  callSid: string;
  fromNumber: string;
  toNumber: string;
  status: CallStatus;
  direction: CallDirection;
  assignedAgentId?: string;
  recordingUrl?: string;
  durationSeconds?: number;
  timestamp: string;
}

export interface ICallProvider {
  // Initiates an incoming or outgoing telephony call session
  startCall(payload: CallInitiatePayload): Promise<CallEventObject>;

  // Accepts an incoming call by assigning a specific agent
  acceptCall(callSid: string, agentId: string): Promise<CallEventObject>;

  // Rejects or declines an incoming call
  rejectCall(callSid: string, reason?: string): Promise<CallEventObject>;

  // Places an active call session on hold
  holdCall(callSid: string): Promise<CallEventObject>;

  // Resumes a call session that was previously placed on hold
  resumeCall(callSid: string): Promise<CallEventObject>;

  // Transfers an active call to another agent or department queue
  transferCall(callSid: string, targetAgentId: string): Promise<CallEventObject>;

  // Ends an active call session and computes total call duration
  endCall(callSid: string): Promise<CallEventObject>;
}
