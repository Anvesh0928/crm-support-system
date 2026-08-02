import { Request, Response, NextFunction } from 'express';
import { VoiceOrchestratorService } from '../services/voice-orchestrator.service.js';
import { ConversationMemoryService } from '../services/conversation-memory.service.js';

const orchestrator = new VoiceOrchestratorService();
const memoryService = new ConversationMemoryService();

export class AIVoiceController {
  async startSession(req: Request, res: Response, next: NextFunction) {
    try {
      const { callSid, customerPhone, voice, systemPrompt } = req.body;
      orchestrator.startSession({ callSid, customerPhone, voice, systemPrompt });
      return res.status(201).json({ success: true, message: `AI Voice Session started for ${callSid}` });
    } catch (error) {
      next(error);
    }
  }

  async endSession(req: Request, res: Response, next: NextFunction) {
    try {
      const { callSid } = req.params;
      orchestrator.endSession(callSid);
      return res.status(200).json({ success: true, message: `AI Voice Session ended for ${callSid}` });
    } catch (error) {
      next(error);
    }
  }

  async getSessionState(req: Request, res: Response, next: NextFunction) {
    try {
      const { callSid } = req.params;
      const state = orchestrator.getSessionState(callSid);
      return res.status(200).json({ success: true, data: state });
    } catch (error) {
      next(error);
    }
  }

  async getMemoryHistory(req: Request, res: Response, next: NextFunction) {
    try {
      const { callSid } = req.params;
      const history = await memoryService.getHistory(callSid);
      return res.status(200).json({ success: true, data: history });
    } catch (error) {
      next(error);
    }
  }
}
