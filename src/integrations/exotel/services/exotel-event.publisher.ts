import { RawExotelWebhookPayload } from '../interfaces/exotel-webhook.interface.js';
import { NormalizedTelephonyEvent, TelephonyEventType } from '../interfaces/exotel-event.interface.js';

export class ExotelEventPublisher {
  normalizePayload(payload: RawExotelWebhookPayload): NormalizedTelephonyEvent {
    let eventType: TelephonyEventType = 'TELEPHONY_CALL_INITIATED';

    const status = (payload.CallStatus || payload.Status || '').toLowerCase();

    if (payload.RecordingUrl) {
      eventType = 'TELEPHONY_RECORDING_READY';
    } else if (payload.Digits) {
      eventType = 'TELEPHONY_DTMF_RECEIVED';
    } else if (status === 'ringing') {
      eventType = 'TELEPHONY_CALL_RINGING';
    } else if (status === 'in-progress') {
      eventType = 'TELEPHONY_CALL_CONNECTED';
    } else if (status === 'completed') {
      eventType = 'TELEPHONY_CALL_ENDED';
    } else if (status === 'failed' || status === 'busy' || status === 'no-answer' || status === 'canceled') {
      eventType = 'TELEPHONY_CALL_FAILED';
    }

    return {
      eventId: `EVT_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      eventType,
      exotelCallSid: payload.CallSid,
      fromNumber: payload.From,
      toNumber: payload.To,
      direction: (payload.Direction || 'INBOUND').toUpperCase() as 'INBOUND' | 'OUTBOUND',
      status: payload.CallStatus || 'initiated',
      digitsPressed: payload.Digits,
      recordingUrl: payload.RecordingUrl,
      durationSeconds: payload.Duration ? parseInt(payload.Duration, 10) : undefined,
      rawPayload: payload,
      timestamp: new Date(),
    };
  }
}
