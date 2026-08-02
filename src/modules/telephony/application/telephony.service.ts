import { ExotelAdapter } from '../infrastructure/exotel.adapter.js';
import { CallService } from '../../calls/application/call.service.js';
import { CallDirection } from '../../../shared/constants/enums.js';

const exotelAdapter = new ExotelAdapter();
const callService = new CallService();

export class TelephonyService {
  async handleInboundCallWebhook(params: {
    CallSid: string;
    From: string;
    To: string;
    CallStatus?: string;
  }) {
    const callRecord = await callService.startCallSession({
      exotelCallSid: params.CallSid,
      fromNumber: params.From,
      toNumber: params.To,
      direction: CallDirection.INBOUND,
    });

    const streamWsUrl = `ws://localhost:5000/media-stream?callSid=${params.CallSid}`;
    const xml = exotelAdapter.generateIvrResponseXml(
      'Welcome to Customer Support. Connecting you to our AI Voice Assistant.',
      streamWsUrl
    );

    return { xml, callRecord };
  }

  async handleCallStatusCallback(params: {
    CallSid: string;
    Status: string;
    RecordingUrl?: string;
  }) {
    if (params.Status === 'completed' || params.Status === 'canceled' || params.Status === 'failed') {
      await callService.endCallSession(params.CallSid, params.RecordingUrl);
    }
  }

  async initiateOutboundCall(fromNumber: string, toNumber: string) {
    const exotelRes = await exotelAdapter.triggerOutboundCall(fromNumber, toNumber, fromNumber);
    const callRecord = await callService.startCallSession({
      exotelCallSid: exotelRes.CallSid,
      fromNumber: toNumber,
      toNumber: fromNumber,
      direction: CallDirection.OUTBOUND,
    });

    return { exotelRes, callRecord };
  }
}
