import { UserModel } from '../infrastructure/user.model.js';
import { hashPassword, comparePassword } from '../../../shared/utils/crypto.utils.js';
import { generateToken, generateRefreshToken, verifyRefreshToken } from '../../../shared/utils/jwt.utils.js';
import { ConflictError, UnauthorizedError, NotFoundError } from '../../../shared/errors/AppError.js';
import { UserRole } from '../../../shared/constants/enums.js';

export class AuthService {
  async register(name: string, email: string, password: string, role: UserRole = UserRole.AGENT) {
    const existing = await UserModel.findOne({ email });
    if (existing) {
      throw new ConflictError('User email already registered');
    }

    const hashedPassword = await hashPassword(password);
    const user = await UserModel.create({
      name,
      email,
      passwordHash: hashedPassword,
      role,
    });

    const token = generateToken({ id: user._id.toString(), email: user.email, role: user.role });
    const refreshToken = generateRefreshToken({ id: user._id.toString(), email: user.email, role: user.role });

    return {
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
      token,
      refreshToken,
    };
  }

  async login(email: string, password: string) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedError('Invalid credentials');
    }

    const isMatch = await comparePassword(password, user.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedError('Invalid credentials');
    }

    const token = generateToken({ id: user._id.toString(), email: user.email, role: user.role });
    const refreshToken = generateRefreshToken({ id: user._id.toString(), email: user.email, role: user.role });

    return {
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
      token,
      refreshToken,
    };
  }

  async refresh(refreshToken: string) {
    const decoded = verifyRefreshToken(refreshToken);
    const user = await UserModel.findById(decoded.id);
    if (!user) {
      throw new NotFoundError('User not found');
    }

    const newToken = generateToken({ id: user._id.toString(), email: user.email, role: user.role });
    return { token: newToken };
  }
}
