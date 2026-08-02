import { BaseRepository } from './base.repository.js';
import { CustomerModel, ICustomerDocument } from '../../database/index.js';

export class CustomerRepository extends BaseRepository<ICustomerDocument> {
  constructor() {
    super(CustomerModel);
  }

  async findByPhone(phone: string): Promise<ICustomerDocument | null> {
    return this.model.findOne({ phone, isDeleted: false }).exec();
  }

  async findActiveCustomers(page = 1, limit = 20, accountTier?: string) {
    const filter: any = { isDeleted: false };
    if (accountTier) {
      filter.accountTier = accountTier;
    }
    return this.paginate(filter, page, limit, { updatedAt: -1 });
  }
}
