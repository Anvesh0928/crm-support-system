import crypto from 'crypto';
import bcrypt from 'bcryptjs';

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
};

export const comparePassword = async (candidate: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(candidate, hash);
};

export const verifyHmacSignature = (payload: string, signature: string, secret: string): boolean => {
  const expected = crypto.createHmac('sha256', secret).update(payload).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
};
