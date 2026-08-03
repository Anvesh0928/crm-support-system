import { Server as SocketIOServer } from 'socket.io';
import { SocketEvent, IncomingCallPopupPayload, AgentStatusChangedPayload, QueueDepthChangedPayload, DashboardStatsTickPayload } from '../interfaces/socket-event.interface.js';
import { logger } from '../../config/logger.config.js';

export class SocketEmitterService {
  private static instance: SocketEmitterService;
  private io: SocketIOServer | null = null;

  private constructor() {}

  static getInstance(): SocketEmitterService {
    if (!SocketEmitterService.instance) {
      SocketEmitterService.instance = new SocketEmitterService();
    }
    return SocketEmitterService.instance;
  }

  setIO(io: SocketIOServer) {
    this.io = io;
  }

  emitToUser(userId: string, event: SocketEvent, payload: any) {
    if (!this.io) return;
    this.io.to(`user:${userId}`).emit(event, payload);
  }

  emitToAgents(event: SocketEvent, payload: any) {
    if (!this.io) return;
    this.io.to('role:agent').emit(event, payload);
  }

  emitToSupervisors(event: SocketEvent, payload: any) {
    if (!this.io) return;
    this.io.to('role:supervisor').emit(event, payload);
  }

  emitIncomingCallPopup(agentId: string, payload: IncomingCallPopupPayload) {
    logger.info({ agentId, callSid: payload.callSid }, '🔔 Emitting Incoming Call Popup');
    this.emitToUser(agentId, SocketEvent.CALL_INCOMING, payload);
  }

  broadcastAgentStatus(payload: AgentStatusChangedPayload) {
    if (!this.io) return;
    this.io.to('role:agent').to('role:supervisor').emit(SocketEvent.AGENT_STATUS_CHANGED, payload);
  }

  broadcastQueueDepth(department: string, payload: QueueDepthChangedPayload) {
    if (!this.io) return;
    this.io.to(`queue:${department.toLowerCase()}`).to('role:supervisor').emit(SocketEvent.QUEUE_DEPTH_CHANGED, payload);
  }

  broadcastDashboardTick(payload: DashboardStatsTickPayload) {
    this.emitToSupervisors(SocketEvent.DASHBOARD_STATS_TICK, payload);
  }
}
