import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError.js';
import { logger } from '../../config/logger.config.js';
import { env } from '../../config/env.config.js';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error({ err, url: req.url, method: req.method }, '❌ Unhandled Request Error');

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      error: {
        message: err.message,
        statusCode: err.statusCode,
      },
    });
  }

  const statusCode = 500;
  return res.status(statusCode).json({
    success: false,
    error: {
      message: env.NODE_ENV === 'production' ? 'Internal server error' : err.message,
      statusCode,
      stack: env.NODE_ENV === 'development' ? err.stack : undefined,
    },
  });
};
