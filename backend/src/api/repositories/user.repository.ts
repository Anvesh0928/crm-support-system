import { BaseRepository } from './base.repository.js';
import { UserModel, IUserDocument } from '../../modules/auth/infrastructure/user.model.js';

export class UserRepository extends BaseRepository<IUserDocument> {
  constructor() {
    super(UserModel);
  }

  async findByEmail(email: string): Promise<IUserDocument | null> {
    return this.model.findOne({ email: email.toLowerCase() }).exec();
  }
}
