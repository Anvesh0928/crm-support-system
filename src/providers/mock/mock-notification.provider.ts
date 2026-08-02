import { INotificationProvider } from '../interfaces/notification-provider.interface.js';
import { SocketEmitterService } from '../../sockets/services/socket-emitter.service.js';
import { logger } from '../../config/logger.config.js';

export class MockNotificationProvider implements INotificationProvider {
  private socketEmitter = SocketEmitterService.getInstance();

  async notify(channel: string, eventName: string, payload: Record<string, unknown>): Promise<void> {
    logger.info({ channel, eventName }, '📢 Mock Notification Event Dispatched');

    if (channel === 'agents') {
      this.socketEmitter.emitToAgents(eventName as any, payload);
    } else if (channel === 'supervisors') {
      this.socketEmitter.emitToSupervisors(eventName as any, payload);
    } else if (channel.startsWith('user:')) {
      const userId = channel.replace('user:', '');
      this.socketEmitter.emitToUser(userId, eventName as any, payload);
    }
  }
}
