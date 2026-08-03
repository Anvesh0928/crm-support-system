import { OpenAIRealtimeService } from './openai-realtime.service.js';
import { ConversationMemoryService } from './conversation-memory.service.js';
import { IntentDetectorService } from './intent-detector.service.js';
// We import using '.js' extension here because TypeScript in NodeNext mode 
// requires JavaScript file extensions for relative module resolution.
import { CRMToolExecutor } from './crm-tool.executor.js';
import { AISessionConfig, AISessionState } from '../interfaces/ai-session.interface.js';
import { env } from '../../config/env.config.js';
import { logger } from '../../config/logger.config.js';

export class VoiceOrchestratorService {
  private memoryService = new ConversationMemoryService();
  private intentDetector = new IntentDetectorService();
  private toolExecutor = new CRMToolExecutor();
  private activeSessions = new Map<string, { service: OpenAIRealtimeService; state: AISessionState }>();

  startSession(config: AISessionConfig): OpenAIRealtimeService {
    logger.info({ callSid: config.callSid, phone: config.customerPhone }, '🎙️ Starting AI Voice Session Orchestrator');

    const systemPrompt =
      config.systemPrompt ||
      `You are an enterprise AI Support Assistant for a Customer Support CRM. 
You speak politely, clearly, and concisely. Caller Phone: ${config.customerPhone}.
Use the provided tools for looking up customer profiles, creating support tickets, or escalating to human agents.`;

    const tools = this.toolExecutor.getToolDefinitions();

    const state: AISessionState = {
      callSid: config.callSid,
      customerPhone: config.customerPhone,
      startTime: new Date().toISOString(),
      turnCount: 0,
      sentiment: 'NEUTRAL',
      isEscalated: false,
    };

    const realtimeService = new OpenAIRealtimeService({
      instructions: systemPrompt,
      voice: config.voice || env.OPENAI_VOICE,
      tools,
    });

    realtimeService.connect(
      async (event) => {
        await this.handleOpenAIEvent(config.callSid, realtimeService, state, event);
      },
      (err) => {
        logger.error({ err, callSid: config.callSid }, '❌ AI Voice Session Error');
      }
    );

    this.activeSessions.set(config.callSid, { service: realtimeService, state });
    return realtimeService;
  }

  private async handleOpenAIEvent(callSid: string, realtimeService: OpenAIRealtimeService, state: AISessionState, event: any) {
    if (event.type === 'response.audio_transcript.delta') {
      // Append AI response chunk to conversation memory
      await this.memoryService.appendTurn(callSid, {
        speaker: 'SYSTEM_AI',
        text: event.delta,
        timestamp: new Date().toISOString(),
      });
    } else if (event.type === 'conversation.item.input_audio_transcription.completed') {
      const userText = event.transcript;
      state.turnCount++;

      // 1. Append Customer speech to memory
      await this.memoryService.appendTurn(callSid, {
        speaker: 'CUSTOMER',
        text: userText,
        timestamp: new Date().toISOString(),
      });

      // 2. Intent & Escalation Analysis
      const analysis = this.intentDetector.analyzeTranscript(userText);
      state.lastDetectedIntent = analysis.category;
      state.sentiment = analysis.sentiment;

      logger.info({ callSid, analysis }, '🧠 Intent & Sentiment Analyzed');

      // 3. Trigger Escalation if frustration detected
      if (analysis.requiresHumanEscalation && !state.isEscalated) {
        state.isEscalated = true;
        logger.warn({ callSid, reason: analysis.escalationReason }, '🚨 Escalation Triggered via Voice Layer!');
        await this.toolExecutor.executeTool('escalate_to_human_agent', { reason: analysis.escalationReason }, callSid);
      }
    } else if (event.type === 'response.function_call_arguments.done') {
      // 4. Tool Execution via Node API Services (Zero Direct DB Calls!)
      const toolName = event.name;
      const callId = event.call_id;
      const args = JSON.parse(event.arguments);

      const result = await this.toolExecutor.executeTool(toolName, args, callSid);
      realtimeService.sendToolResult(callId, result);

      await this.memoryService.appendTurn(callSid, {
        speaker: 'TOOL_RESULT',
        text: JSON.stringify(result),
        timestamp: new Date().toISOString(),
        metadata: { toolName, args },
      });
    }
  }

  endSession(callSid: string) {
    const session = this.activeSessions.get(callSid);
    if (session) {
      session.service.close();
      this.activeSessions.delete(callSid);
      logger.info({ callSid }, '⏹️ Ended AI Voice Session Orchestrator');
    }
  }

  getSessionState(callSid: string): AISessionState | null {
    const session = this.activeSessions.get(callSid);
    return session ? session.state : null;
  }
}
