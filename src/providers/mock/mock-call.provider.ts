import { ICallProvider, CallInitiatePayload, CallEventObject } from '../interfaces/call-provider.interface.js';
import { CallStatus } from '../../shared/constants/enums.js';

export class MockCallProvider implements ICallProvider {
  // In-memory store for tracking active simulated calls
  private activeMockCalls = new Map<string, CallEventObject>();

  async startCall(payload: CallInitiatePayload): Promise<CallEventObject> {
    const mockCallSid = `MOCK_SID_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

    const eventObject: CallEventObject = {
      callSid: mockCallSid,
      fromNumber: payload.fromNumber,
      toNumber: payload.toNumber,
      status: CallStatus.INITIATED,
      direction: payload.direction,
      timestamp: new Date().toISOString(),
    };

    this.activeMockCalls.set(mockCallSid, eventObject);
    return eventObject;
  }

  async acceptCall(callSid: string, agentId: string): Promise<CallEventObject> {
    const existingCall = this.activeMockCalls.get(callSid);
    if (!existingCall) {
      throw new Error(`Mock call with SID ${callSid} not found`);
    }

    existingCall.status = CallStatus.IN_PROGRESS;
    existingCall.assignedAgentId = agentId;
    existingCall.timestamp = new Date().toISOString();

    return existingCall;
  }

  async rejectCall(callSid: string, _reason?: string): Promise<CallEventObject> {
    const existingCall = this.activeMockCalls.get(callSid);
    if (!existingCall) {
      throw new Error(`Mock call with SID ${callSid} not found`);
    }

    existingCall.status = CallStatus.FAILED;
    existingCall.timestamp = new Date().toISOString();

    return existingCall;
  }

  async holdCall(callSid: string): Promise<CallEventObject> {
    const existingCall = this.activeMockCalls.get(callSid);
    if (!existingCall) {
      throw new Error(`Mock call with SID ${callSid} not found`);
    }

    existingCall.timestamp = new Date().toISOString();
    return existingCall;
  }

  async resumeCall(callSid: string): Promise<CallEventObject> {
    const existingCall = this.activeMockCalls.get(callSid);
    if (!existingCall) {
      throw new Error(`Mock call with SID ${callSid} not found`);
    }

    existingCall.timestamp = new Date().toISOString();
    return existingCall;
  }

  async transferCall(callSid: string, targetAgentId: string): Promise<CallEventObject> {
    const existingCall = this.activeMockCalls.get(callSid);
    if (!existingCall) {
      throw new Error(`Mock call with SID ${callSid} not found`);
    }

    existingCall.status = CallStatus.ESCALATED;
    existingCall.assignedAgentId = targetAgentId;
    existingCall.timestamp = new Date().toISOString();

    return existingCall;
  }

  async endCall(callSid: string): Promise<CallEventObject> {
    const existingCall = this.activeMockCalls.get(callSid);
    
    // Fallback if SID was cleared from memory
    const startTime = existingCall ? new Date(existingCall.timestamp).getTime() : Date.now() - 45000;
    const durationSeconds = Math.max(5, Math.floor((Date.now() - startTime) / 1000));

    const finalEvent: CallEventObject = {
      callSid,
      fromNumber: existingCall?.fromNumber || '+15550199832',
      toNumber: existingCall?.toNumber || '08045678901',
      status: CallStatus.COMPLETED,
      direction: existingCall?.direction || ('INBOUND' as any),
      assignedAgentId: existingCall?.assignedAgentId,
      durationSeconds,
      recordingUrl: `/mock-recordings/${callSid}.mp3`,
      timestamp: new Date().toISOString(),
    };

    this.activeMockCalls.delete(callSid);
    return finalEvent;
  }
}
