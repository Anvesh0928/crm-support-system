import WebSocket from 'ws';
import { env } from '../../config/env.config.js';
import { logger } from '../../config/logger.config.js';

export interface OpenAIRealtimeSessionOptions {
  instructions: string;
  voice: string;
  tools: any[];
}

export class OpenAIRealtimeService {
  private ws: WebSocket | null = null;
  private isConnected = false;

  constructor(private options: OpenAIRealtimeSessionOptions) {}

  connect(onMessage: (event: any) => void, onError: (err: any) => void) {
    // If mock key, bypass real WebSocket connection and use dev mock response generator
    if (!env.OPENAI_API_KEY || env.OPENAI_API_KEY.startsWith('mock_')) {
      logger.info('🤖 Initializing Mock OpenAI Realtime API Service (Dev)');
      this.isConnected = true;
      setTimeout(() => {
        onMessage({
          type: 'response.audio_transcript.delta',
          delta: 'Hello! I am your AI Voice Assistant. How can I help you today?',
        });
      }, 400);
      return;
    }

    const url = `wss://api.openai.com/v1/realtime?model=${env.OPENAI_REALTIME_MODEL}`;

    this.ws = new WebSocket(url, {
      headers: {
        Authorization: `Bearer ${env.OPENAI_API_KEY}`,
        'OpenAI-Beta': 'realtime=v1',
      },
    });

    this.ws.on('open', () => {
      logger.info('🤖 Connected to OpenAI Realtime API WebSocket');
      this.isConnected = true;
      this.updateSession();
    });

    this.ws.on('message', (data: WebSocket.RawData) => {
      try {
        const event = JSON.parse(data.toString());
        onMessage(event);
      } catch (err) {
        logger.error({ err }, 'Error parsing OpenAI Realtime message');
      }
    });

    this.ws.on('error', (err) => {
      logger.error({ err }, '❌ OpenAI Realtime WebSocket Error');
      onError(err);
    });

    this.ws.on('close', () => {
      logger.info('🤖 OpenAI Realtime WebSocket Connection Closed');
      this.isConnected = false;
    });
  }

  private updateSession() {
    if (!this.ws || !this.isConnected) return;
    const sessionUpdate = {
      type: 'session.update',
      session: {
        modalities: ['text', 'audio'],
        instructions: this.options.instructions,
        voice: this.options.voice,
        input_audio_format: 'pcm16',
        output_audio_format: 'pcm16',
        tools: this.options.tools,
        turn_detection: { type: 'server_vad' },
      },
    };
    this.ws.send(JSON.stringify(sessionUpdate));
  }

  sendAudioChunk(base64PcmChunk: string) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(
        JSON.stringify({
          type: 'input_audio_buffer.append',
          audio: base64PcmChunk,
        })
      );
    }
  }

  sendToolResult(callId: string, output: any) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(
        JSON.stringify({
          type: 'conversation.item.create',
          item: {
            type: 'function_call_output',
            call_id: callId,
            output: JSON.stringify(output),
          },
        })
      );
      this.ws.send(JSON.stringify({ type: 'response.create' }));
    }
  }

  close() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}
