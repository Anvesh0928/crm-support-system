import { UserRepository } from '../repositories/user.repository.js';
import { hashPassword, comparePassword } from '../../shared/utils/crypto.utils.js';
import { generateToken, generateRefreshToken, verifyRefreshToken } from '../../shared/utils/jwt.utils.js';
import { ConflictError, UnauthorizedError, NotFoundError } from '../../shared/errors/AppError.js';
import { UserRole } from '../../shared/constants/enums.js';

export class AuthService {
  // Delegate all MongoDB database operations to the UserRepository abstraction layer.
  // This keeps database queries isolated from our business rules.
  private userRepository = new UserRepository();

  // Registers a new user account with hashed credentials
  async register(name: string, email: string, password: string, role: UserRole = UserRole.AGENT) {
    // Check if a user with this email address already exists in the database
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      // Prevent duplicate registrations by throwing a Conflict HTTP 409 error
      throw new ConflictError('User email already registered');
    }

    // Always hash plain text passwords using bcrypt before saving to storage
    const hashedPassword = await hashPassword(password);
    
    // Save the new user record via the repository layer
    const createdUser = await this.userRepository.create({
      name,
      email,
      passwordHash: hashedPassword,
      role,
    });

    // Generate JWT access token and refresh token for instant authentication
    const accessToken = generateToken({
      id: createdUser._id.toString(),
      email: createdUser.email,
      role: createdUser.role,
    });

    const refreshToken = generateRefreshToken({
      id: createdUser._id.toString(),
      email: createdUser.email,
      role: createdUser.role,
    });

    return {
      user: {
        id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        role: createdUser.role,
      },
      token: accessToken,
      refreshToken,
    };
  }

  // Authenticates an existing user credentials
  async login(email: string, password: string) {
    // Find the user record using their email address
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      // We throw a generic Unauthorized error to avoid leaking whether an email exists
      throw new UnauthorizedError('Invalid email or password');
    }

    // Compare the submitted plain password against the stored bcrypt hash
    const isPasswordValid = await comparePassword(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid email or password');
    }

    // Create session JWT tokens upon successful verification
    const accessToken = generateToken({
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    const refreshToken = generateRefreshToken({
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token: accessToken,
      refreshToken,
    };
  }

  // Generates a fresh access token using a valid refresh token
  async refreshToken(refreshToken: string) {
    // Verify the authenticity and expiration of the refresh token
    const decodedToken = verifyRefreshToken(refreshToken);
    
    const user = await this.userRepository.findById(decodedToken.id);
    if (!user) {
      throw new NotFoundError('User account not found');
    }

    const newAccessToken = generateToken({
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    return { token: newAccessToken };
  }
}
