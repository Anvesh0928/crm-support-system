export type TelephonyEventType =
  | 'TELEPHONY_CALL_INITIATED'
  | 'TELEPHONY_CALL_RINGING'
  | 'TELEPHONY_CALL_CONNECTED'
  | 'TELEPHONY_DTMF_RECEIVED'
  | 'TELEPHONY_RECORDING_READY'
  | 'TELEPHONY_CALL_ENDED'
  | 'TELEPHONY_CALL_FAILED';

export interface NormalizedTelephonyEvent {
  eventId: string;
  eventType: TelephonyEventType;
  exotelCallSid: string;
  fromNumber: string;
  toNumber: string;
  direction: 'INBOUND' | 'OUTBOUND';
  status: string;
  digitsPressed?: string;
  recordingUrl?: string;
  durationSeconds?: number;
  rawPayload: Record<string, any>;
  timestamp: Date;
}
