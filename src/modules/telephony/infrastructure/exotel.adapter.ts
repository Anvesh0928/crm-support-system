import { env } from '../../../config/env.config.js';
import { logger } from '../../../config/logger.config.js';
import { verifyHmacSignature } from '../../../shared/utils/crypto.utils.js';

export class ExotelAdapter {
  verifyWebhookSignature(payload: string, signature: string): boolean {
    if (!env.EXOTEL_WEBHOOK_SECRET || env.EXOTEL_WEBHOOK_SECRET.startsWith('mock_')) {
      return true; // Bypass signature verification in dev/mock mode
    }
    return verifyHmacSignature(payload, signature, env.EXOTEL_WEBHOOK_SECRET);
  }

  async triggerOutboundCall(fromNumber: string, toNumber: string, callerId: string) {
    logger.info({ fromNumber, toNumber, callerId }, '📞 Triggering Exotel Outbound Call');
    return {
      CallSid: `exotel_call_${Date.now()}`,
      Status: 'queued',
      From: fromNumber,
      To: toNumber,
      DateCreated: new Date().toISOString(),
    };
  }

  generateIvrResponseXml(promptText: string, streamUrl?: string): string {
    if (streamUrl) {
      return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say>${promptText}</Say>
    <Stream url="${streamUrl}" />
</Response>`;
    }

    return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say>${promptText}</Say>
</Response>`;
  }
}
