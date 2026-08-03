import { WebSocketServer, WebSocket } from 'ws';
import { Server as HTTPServer } from 'http';
import { parse } from 'url';
import { AIOrchestratorService } from '../application/ai-orchestrator.service.js';
import { logger } from '../../../config/logger.config.js';

const aiService = new AIOrchestratorService();

export const setupAudioStreamWebSocket = (server: HTTPServer) => {
  const wss = new WebSocketServer({ noServer: true });

  server.on('upgrade', (request, socket, head) => {
    const { pathname } = parse(request.url || '', true);
    if (pathname === '/media-stream') {
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
      });
    }
  });

  wss.on('connection', (ws: WebSocket, req) => {
    const { query } = parse(req.url || '', true);
    const callSid = (query.callSid as string) || `CALL_${Date.now()}`;
    const customerPhone = (query.phone as string) || '+15550199';

    logger.info({ callSid }, '🎙️ Exotel Media Audio Stream WebSocket Connected');

    const aiClient = aiService.createSession(callSid, customerPhone);

    ws.on('message', (message: Buffer) => {
      try {
        const payload = JSON.parse(message.toString());
        if (payload.event === 'media') {
          // Send base64 PCM audio chunk to OpenAI Realtime Client
          aiClient.sendAudioChunk(payload.media.payload);
        }
      } catch (_) {
        // Raw binary stream handling if needed
        aiClient.sendAudioChunk(message.toString('base64'));
      }
    });

    ws.on('close', () => {
      logger.info({ callSid }, '🎙️ Media Audio Stream Closed');
      aiClient.close();
    });

    ws.on('error', (err) => {
      logger.error({ err, callSid }, '❌ Media Stream WebSocket Error');
    });
  });

  return wss;
};
