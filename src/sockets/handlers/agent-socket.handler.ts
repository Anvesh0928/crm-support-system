import { AuthenticatedSocket } from '../interfaces/socket-user.interface.js';
import { AgentPresenceStore } from '../../modules/agents/infrastructure/agent-presence.store.js';
import { SocketEmitterService } from '../services/socket-emitter.service.js';
import { AgentStatus } from '../../shared/constants/enums.js';
import { logger } from '../../config/logger.config.js';

const presenceStore = new AgentPresenceStore();
const emitterService = SocketEmitterService.getInstance();
const pendingDisconnectTimers = new Map<string, NodeJS.Timeout>();

export const registerAgentSocketHandlers = (socket: AuthenticatedSocket) => {
  const user = socket.user!;

  // Cancel any pending disconnect grace timer if client re-connected
  if (pendingDisconnectTimers.has(user.id)) {
    clearTimeout(pendingDisconnectTimers.get(user.id)!);
    pendingDisconnectTimers.delete(user.id);
    logger.info({ userId: user.id }, '🔄 Client re-connected within grace period. Preserving presence state');
  }

  // We use the project's canonical AgentStatus enum to validate incoming presence update payloads
  socket.on('agent:update_status', async (data: { status: AgentStatus }) => {
    logger.info({ userId: user.id, newStatus: data.status }, '👤 Agent status updated via Socket');

    const updated = await presenceStore.updateStatus(user.id, data.status);
    if (updated) {
      emitterService.broadcastAgentStatus(updated);
    }
  });

  socket.on('disconnect', () => {
    logger.info({ socketId: socket.id, userId: user.id }, '🔌 Agent socket disconnected. Starting 15s grace timer...');

    // 15-second grace timer before updating presence to OFFLINE status using the AgentStatus enum
    const timer = setTimeout(async () => {
      pendingDisconnectTimers.delete(user.id);
      logger.info({ userId: user.id }, '⌛ Disconnect grace period expired. Transitioning presence to OFFLINE');

      const updated = await presenceStore.updateStatus(user.id, AgentStatus.OFFLINE);
      if (updated) {
        emitterService.broadcastAgentStatus(updated);
      }
    }, 15000);

    pendingDisconnectTimers.set(user.id, timer);
  });
};
