import { CustomerModel } from '../infrastructure/customer.model.js';
import { NotFoundError } from '../../../shared/errors/AppError.js';

export class CustomerService {
  async findOrCreateByPhone(phone: string, defaultName = 'Valued Caller') {
    let customer = await CustomerModel.findOne({ phone });
    if (!customer) {
      customer = await CustomerModel.create({ phone, name: defaultName });
    }
    return customer;
  }

  async getCustomerById(id: string) {
    const customer = await CustomerModel.findById(id);
    if (!customer) {
      throw new NotFoundError('Customer not found');
    }
    return customer;
  }

  async listCustomers(limit = 20, page = 1) {
    const skip = (page - 1) * limit;
    const [customers, total] = await Promise.all([
      CustomerModel.find().sort({ updatedAt: -1 }).skip(skip).limit(limit),
      CustomerModel.countDocuments(),
    ]);
    return { customers, total, page, totalPages: Math.ceil(total / limit) };
  }

  async updateCustomer(id: string, updateData: Partial<{ name: string; email: string; accountTier: string; notes: string }>) {
    const customer = await CustomerModel.findByIdAndUpdate(id, updateData, { new: true });
    if (!customer) {
      throw new NotFoundError('Customer not found');
    }
    return customer;
  }
}
