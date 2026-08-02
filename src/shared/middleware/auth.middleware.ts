import { Request, Response, NextFunction } from 'express';
import { verifyToken, JwtPayload } from '../utils/jwt.utils.js';
import { UnauthorizedError, ForbiddenError } from '../errors/AppError.js';
import { UserRole } from '../constants/enums.js';

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

export const authenticateJwt = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Authorization header missing or invalid'));
  }

  const token = authHeader.split(' ')[1];
  try {
    const payload = verifyToken(token);
    req.user = payload;
    next();
  } catch (err) {
    next(err);
  }
};

export const authorizeRoles = (...roles: UserRole[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new UnauthorizedError('User authentication context missing'));
    }
    if (!roles.includes(req.user.role as UserRole)) {
      return next(new ForbiddenError('Insufficient role permission'));
    }
    next();
  };
};
