import WebSocket from 'ws';
import { env } from '../../../config/env.config.js';
import { logger } from '../../../config/logger.config.js';

export interface OpenAIRealtimeConfig {
  instructions: string;
  voice: string;
  tools: any[];
}

export class OpenAIRealtimeClient {
  private ws: WebSocket | null = null;
  private isConnected = false;

  constructor(private config: OpenAIRealtimeConfig) {}

  connect(onMessage: (data: any) => void, onError: (err: any) => void) {
    const url = `wss://api.openai.com/v1/realtime?model=${env.OPENAI_REALTIME_MODEL}`;

    // If key is mock, bypass real WS connection and instantiate mock handler
    if (!env.OPENAI_API_KEY || env.OPENAI_API_KEY.startsWith('mock_')) {
      logger.info('🤖 Initializing Mock OpenAI Realtime API Session (Development)');
      this.isConnected = true;
      setTimeout(() => {
        onMessage({
          type: 'response.audio_transcript.delta',
          delta: 'Hello! I am your AI Support Assistant. How may I help you today?',
        });
      }, 500);
      return;
    }

    this.ws = new WebSocket(url, {
      headers: {
        Authorization: `Bearer ${env.OPENAI_API_KEY}`,
        'OpenAI-Beta': 'realtime=v1',
      },
    });

    this.ws.on('open', () => {
      logger.info('🤖 Connected to OpenAI Realtime API');
      this.isConnected = true;
      this.sendSessionUpdate();
    });

    this.ws.on('message', (data: WebSocket.RawData) => {
      try {
        const event = JSON.parse(data.toString());
        onMessage(event);
      } catch (err) {
        logger.error({ err }, 'Error parsing OpenAI message');
      }
    });

    this.ws.on('error', (err) => {
      logger.error({ err }, '❌ OpenAI Realtime WebSocket error');
      onError(err);
    });

    this.ws.on('close', () => {
      logger.info('🤖 OpenAI Realtime WebSocket closed');
      this.isConnected = false;
    });
  }

  private sendSessionUpdate() {
    if (!this.ws || !this.isConnected) return;
    const sessionUpdate = {
      type: 'session.update',
      session: {
        modalities: ['text', 'audio'],
        instructions: this.config.instructions,
        voice: this.config.voice,
        input_audio_format: 'pcm16',
        output_audio_format: 'pcm16',
        tools: this.config.tools,
        turn_detection: { type: 'server_vad' },
      },
    };
    this.ws.send(JSON.stringify(sessionUpdate));
  }

  sendAudioChunk(base64PcmChunk: string) {
    if (!this.isConnected) return;
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(
        JSON.stringify({
          type: 'input_audio_buffer.append',
          audio: base64PcmChunk,
        })
      );
    }
  }

  sendToolOutput(callId: string, output: any) {
    if (!this.isConnected) return;
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
    }
  }
}
