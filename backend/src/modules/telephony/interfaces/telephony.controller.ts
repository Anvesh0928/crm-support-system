import { Request, Response, NextFunction } from 'express';
import { TelephonyService } from '../application/telephony.service.js';

const telephonyService = new TelephonyService();

export class TelephonyController {
  async handleInboundCall(req: Request, res: Response, next: NextFunction) {
    try {
      const { CallSid, From, To, CallStatus } = req.body;
      const { xml } = await telephonyService.handleInboundCallWebhook({
        CallSid: CallSid || `EX_${Date.now()}`,
        From: From || '+15550199',
        To: To || '+180055501',
        CallStatus,
      });

      res.set('Content-Type', 'text/xml');
      return res.status(200).send(xml);
    } catch (error) {
      next(error);
    }
  }

  async handleStatusCallback(req: Request, res: Response, next: NextFunction) {
    try {
      const { CallSid, Status, RecordingUrl } = req.body;
      await telephonyService.handleCallStatusCallback({ CallSid, Status, RecordingUrl });
      return res.status(200).json({ success: true });
    } catch (error) {
      next(error);
    }
  }

  async initiateOutbound(req: Request, res: Response, next: NextFunction) {
    try {
      const { fromNumber, toNumber } = req.body;
      const result = await telephonyService.initiateOutboundCall(fromNumber, toNumber);
      return res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }
}
