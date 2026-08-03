import { AuthenticatedSocket } from '../interfaces/socket-user.interface.js';
import { SocketEvent } from '../interfaces/socket-event.interface.js';
import { logger } from '../../config/logger.config.js';

export const registerCallSocketHandlers = (socket: AuthenticatedSocket) => {
  socket.on('call:accept', (data: { callSid: string }) => {
    logger.info({ agentId: socket.user?.id, callSid: data.callSid }, '📞 Call Accepted via Socket Event');
    socket.emit('call:accepted_confirmed', { callSid: data.callSid, timestamp: new Date().toISOString() });
  });

  socket.on('call:decline', (data: { callSid: string; reason?: string }) => {
    logger.warn({ agentId: socket.user?.id, callSid: data.callSid, reason: data.reason }, '📞 Call Declined by Agent');
    socket.emit('call:declined_confirmed', { callSid: data.callSid });
  });
};
