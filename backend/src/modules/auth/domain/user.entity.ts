import { UserRole } from '../../../shared/constants/enums.js';

export interface UserEntity {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  department?: string;
  createdAt: Date;
  updatedAt: Date;
}
