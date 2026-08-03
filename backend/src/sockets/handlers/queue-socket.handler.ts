import { AuthenticatedSocket } from '../interfaces/socket-user.interface.js';
import { logger } from '../../config/logger.config.js';

export const registerQueueSocketHandlers = (socket: AuthenticatedSocket) => {
  socket.on('queue:subscribe', (department: string) => {
    const roomName = `queue:${department.toLowerCase()}`;
    socket.join(roomName);
    logger.info({ socketId: socket.id, roomName }, '📥 Socket subscribed to Queue Department room');
  });

  socket.on('queue:unsubscribe', (department: string) => {
    const roomName = `queue:${department.toLowerCase()}`;
    socket.leave(roomName);
    logger.info({ socketId: socket.id, roomName }, '📤 Socket unsubscribed from Queue room');
  });
};
