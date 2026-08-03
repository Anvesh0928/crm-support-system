import { Request, Response, NextFunction } from 'express';
import { ExotelWebhookService } from '../services/exotel-webhook.service.js';
import { ExotelEventPublisher } from '../services/exotel-event.publisher.js';
import { ExotelXmlBuilder } from '../services/exotel-xml.builder.js';
import { ExotelClientService } from '../services/exotel-client.service.js';
import { CallRepository } from '../../../api/repositories/call.repository.js';
import { CustomerRepository } from '../../../api/repositories/customer.repository.js';
import { RecordingModel } from '../../../database/index.js';
import { logger } from '../../../config/logger.config.js';
import { getIO } from '../../../config/socket.config.js';

const webhookService = new ExotelWebhookService();
const eventPublisher = new ExotelEventPublisher();
const clientService = new ExotelClientService();
const callRepo = new CallRepository();
const customerRepo = new CustomerRepository();

export class ExotelWebhookController {
  async handleInboundPassthru(req: Request, res: Response, next: NextFunction) {
    try {
      const rawPayload = req.body;
      const signature = (req.headers['x-exotel-signature'] as string) || '';

      // 1. Verify HMAC Signature
      if (!webhookService.verifySignature(JSON.stringify(rawPayload), signature)) {
        logger.warn({ signature }, '❌ Unauthorized Exotel Webhook Signature');
        res.set('Content-Type', 'text/xml');
        return res.status(401).send(ExotelXmlBuilder.buildFallbackResponse('Unauthorized webhook request'));
      }

      const callSid = rawPayload.CallSid || `EX_${Date.now()}`;
      const fromNumber = rawPayload.From || '+15550199';
      const toNumber = rawPayload.To || '+180055501';

      // 2. Check Redis Idempotency Lock
      const isFirstAttempt = await webhookService.acquireIdempotencyLock(callSid, 'passthru');
      if (!isFirstAttempt) {
        const streamUrl = `ws://localhost:5000/media-stream?callSid=${callSid}`;
        res.set('Content-Type', 'text/xml');
        return res.status(200).send(ExotelXmlBuilder.buildPassthruResponse('Re-connecting session', streamUrl));
      }

      // 3. Normalize to Domain Telephony Event
      const domainEvent = eventPublisher.normalizePayload(rawPayload);
      logger.info({ domainEvent }, '📡 Normalized Exotel Telephony Event');

      // 4. Create or Find Customer & Start Call Record
      let customer = await customerRepo.findByPhone(fromNumber);
      if (!customer) {
        customer = await customerRepo.create({ phone: fromNumber, name: 'Caller' });
      }

      let callRecord = await callRepo.findBySid(callSid);
      if (!callRecord) {
        callRecord = await callRepo.create({
          exotelCallSid: callSid,
          customerId: customer._id,
          fromNumber,
          toNumber,
          direction: 'INBOUND',
          status: 'INITIATED',
          startTime: new Date(),
        });
      }

      // Socket.IO Live Broadcast
      try {
        const io = getIO();
        io.to('live_agents').emit('call:started', { call: callRecord, customer });
      } catch (_) {}

      // 5. Generate Dynamic IVR XML Response
      const mediaStreamUrl = `ws://localhost:5000/media-stream?callSid=${callSid}&phone=${encodeURIComponent(fromNumber)}`;
      const xml = ExotelXmlBuilder.buildPassthruResponse('Welcome to Enterprise Support. Connecting to AI voice assistant.', mediaStreamUrl);

      res.set('Content-Type', 'text/xml');
      return res.status(200).send(xml);
    } catch (error) {
      logger.error({ error }, '❌ Error processing Exotel inbound passthru webhook');
      res.set('Content-Type', 'text/xml');
      return res.status(200).send(ExotelXmlBuilder.buildFallbackResponse());
    }
  }

  async handleStatusCallback(req: Request, res: Response, next: NextFunction) {
    try {
      const rawPayload = req.body;
      const callSid = rawPayload.CallSid;
      const status = rawPayload.CallStatus || rawPayload.Status;

      if (callSid) {
        const domainEvent = eventPublisher.normalizePayload(rawPayload);
        logger.info({ callSid, status, domainEvent }, '📞 Exotel Call Status Webhook Received');

        const callRecord = await callRepo.findBySid(callSid);
        if (callRecord) {
          let updatedStatus = callRecord.status;
          if (status === 'completed') updatedStatus = 'COMPLETED';
          else if (status === 'failed' || status === 'busy' || status === 'no-answer') updatedStatus = 'FAILED';
          else if (status === 'in-progress') updatedStatus = 'IN_PROGRESS';

          await callRepo.update(callRecord._id.toString(), {
            status: updatedStatus as any,
            endTime: status === 'completed' || status === 'failed' ? new Date() : undefined,
          });

          try {
            const io = getIO();
            io.to('live_agents').emit('call:status_updated', { exotelCallSid: callSid, status: updatedStatus });
          } catch (_) {}
        }
      }

      return res.status(200).json({ success: true });
    } catch (error) {
      next(error);
    }
  }

  async handleRecordingCallback(req: Request, res: Response, next: NextFunction) {
    try {
      const { CallSid, RecordingUrl, Duration } = req.body;
      logger.info({ CallSid, RecordingUrl, Duration }, '🎙️ Exotel Recording Callback Received');

      if (CallSid && RecordingUrl) {
        const callRecord = await callRepo.findBySid(CallSid);
        if (callRecord) {
          const durationSeconds = Duration ? parseInt(Duration, 10) : 0;

          // Upsert Recording MongoDB record
          const recording = await RecordingModel.findOneAndUpdate(
            { callId: callRecord._id },
            {
              callId: callRecord._id,
              exotelCallSid: CallSid,
              recordingUrl: RecordingUrl,
              storageProvider: 'EXOTEL',
              format: 'MP3',
              durationSeconds,
              transcriptionStatus: 'COMPLETED',
            },
            { upsert: true, new: true }
          );

          // Update Call record with recording URL
          await callRepo.update(callRecord._id.toString(), { recordingUrl: RecordingUrl });

          try {
            const io = getIO();
            io.to('live_agents').emit('call:recording_ready', { exotelCallSid: CallSid, recording });
          } catch (_) {}
        }
      }

      return res.status(200).json({ success: true });
    } catch (error) {
      next(error);
    }
  }

  async initiateOutboundCall(req: Request, res: Response, next: NextFunction) {
    try {
      const { fromNumber, toNumber } = req.body;
      const exotelRes = await clientService.connectCall({
        from: fromNumber,
        to: toNumber,
        callerId: fromNumber,
      });

      return res.status(200).json({ success: true, data: exotelRes });
    } catch (error) {
      next(error);
    }
  }

  async endCall(req: Request, res: Response, next: NextFunction) {
    try {
      const { callSid } = req.params;
      const result = await clientService.hangupCall(callSid);
      return res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }
}
