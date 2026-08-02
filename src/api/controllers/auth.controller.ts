import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service.js';
import { AuthenticatedRequest } from '../../shared/middleware/auth.middleware.js';

// We instantiate the AuthService once here. Controllers should remain lightweight 
// and handle only HTTP concerns (reading request inputs and returning HTTP status codes),
// while delegating actual business rules to the service layer.
const authService = new AuthService();

export class AuthController {
  // Handles new user registration (e.g. Agents or Admins)
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password, role } = req.body;

      // Pass input parameters to the business service layer
      const registeredUserData = await authService.register(name, email, password, role);

      // Return HTTP 201 Created status code for successful resource creation
      return res.status(201).json({
        success: true,
        data: registeredUserData,
      });
    } catch (error) {
      // Forward error to Express global error handler middleware
      next(error);
    }
  }

  // Handles authenticating an existing user and returning a JWT token
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const authSessionData = await authService.login(email, password);

      return res.status(200).json({
        success: true,
        data: authSessionData,
      });
    } catch (error) {
      next(error);
    }
  }

  // Renews an expired access token using a valid refresh token
  async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.body;

      const refreshedSession = await authService.refreshToken(refreshToken);

      return res.status(200).json({
        success: true,
        data: refreshedSession,
      });
    } catch (error) {
      next(error);
    }
  }

  // Returns the profile of the currently logged-in user attached by the JWT auth middleware
  async getMe(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      return res.status(200).json({
        success: true,
        data: { user: req.user },
      });
    } catch (error) {
      next(error);
    }
  }
}
