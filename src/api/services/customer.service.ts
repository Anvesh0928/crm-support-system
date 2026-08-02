import { CustomerRepository } from '../repositories/customer.repository.js';
import { NotFoundError, ConflictError } from '../../shared/errors/AppError.js';
import { AccountTier } from '../../database/index.js';

export class CustomerService {
  private customerRepo = new CustomerRepository();

  async createCustomer(data: { phone: string; name: string; email?: string; company?: string; accountTier?: AccountTier }) {
    const existing = await this.customerRepo.findByPhone(data.phone);
    if (existing) {
      throw new ConflictError(`Customer with phone number ${data.phone} already exists`);
    }

    return this.customerRepo.create({
      phone: data.phone,
      name: data.name,
      email: data.email,
      company: data.company,
      accountTier: data.accountTier || 'STANDARD',
    });
  }

  async getCustomerById(id: string) {
    const customer = await this.customerRepo.findById(id);
    if (!customer || customer.isDeleted) {
      throw new NotFoundError('Customer profile not found');
    }
    return customer;
  }

  async getCustomerByPhone(phone: string) {
    const customer = await this.customerRepo.findByPhone(phone);
    if (!customer) {
      throw new NotFoundError(`Customer with phone ${phone} not found`);
    }
    return customer;
  }

  async listCustomers(page = 1, limit = 20, accountTier?: string) {
    return this.customerRepo.findActiveCustomers(page, limit, accountTier);
  }

  async updateCustomer(id: string, updateData: any) {
    await this.getCustomerById(id);
    return this.customerRepo.update(id, updateData);
  }

  async softDeleteCustomer(id: string) {
    await this.getCustomerById(id);
    return this.customerRepo.softDelete(id);
  }
}
