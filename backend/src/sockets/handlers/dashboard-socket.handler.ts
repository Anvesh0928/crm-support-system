import { AuthenticatedSocket } from '../interfaces/socket-user.interface.js';
import { SocketEvent } from '../interfaces/socket-event.interface.js';
import { SocketEmitterService } from '../services/socket-emitter.service.js';
import { AgentPresenceStore } from '../../modules/agents/infrastructure/agent-presence.store.js';
import { CallModel } from '../../database/index.js';
import { logger } from '../../config/logger.config.js';

const presenceStore = new AgentPresenceStore();
const emitterService = SocketEmitterService.getInstance();
let dashboardTickerTimer: NodeJS.Timeout | null = null;

export const startDashboardTicker = () => {
  if (dashboardTickerTimer) return;
  dashboardTickerTimer = setInterval(async () => {
    try {
      const presences = await presenceStore.getAllPresences();
      const availableCount = presences.filter((p) => p.status === 'AVAILABLE').length;
      const busyCount = presences.filter((p) => p.status === 'BUSY').length;

      const activeCalls = await CallModel.countDocuments({ status: { $in: ['INITIATED', 'IN_PROGRESS', 'ESCALATED'] } });

      emitterService.broadcastDashboardTick({
        activeCallsCount: activeCalls,
        availableAgentsCount: availableCount,
        busyAgentsCount: busyCount,
        totalWaitingInQueue: 0,
        aiResolutionRateToday: 92,
        avgWaitTimeSeconds: 14,
        timestamp: new Date().toISOString(),
      });
    } catch (_) {}
  }, 3000);
};

export const registerDashboardSocketHandlers = (socket: AuthenticatedSocket) => {
  socket.on(SocketEvent.HEARTBEAT_PING, () => {
    socket.emit(SocketEvent.HEARTBEAT_PONG, { timestamp: new Date().toISOString() });
  });

  socket.on(SocketEvent.CLIENT_RESYNC, () => {
    logger.info({ userId: socket.user?.id }, '🔄 Client requested state resynchronization');
    socket.emit('socket:resync_ack', { status: 'SYNCED', timestamp: new Date().toISOString() });
  });
};
