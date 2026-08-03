import { AuthenticatedSocket } from '../interfaces/socket-user.interface.js';
import { verifyToken } from '../../shared/utils/jwt.utils.js';
import { logger } from '../../config/logger.config.js';

export const socketAuthMiddleware = (socket: AuthenticatedSocket, next: (err?: Error) => void) => {
  const token =
    socket.handshake.auth?.token ||
    socket.handshake.headers?.authorization?.split(' ')[1] ||
    (socket.handshake.query?.token as string);

  if (!token) {
    logger.warn({ socketId: socket.id }, '❌ Socket authentication failed: Token missing');
    return next(new Error('Authentication token missing'));
  }

  try {
    const decoded: any = verifyToken(token);
    socket.user = {
      id: decoded.id,
      name: decoded.name || 'Agent',
      email: decoded.email,
      role: decoded.role,
    };
    next();
  } catch (err) {
    logger.warn({ socketId: socket.id, err }, '❌ Socket authentication failed: Invalid token');
    return next(new Error('Invalid authentication token'));
  }
};
