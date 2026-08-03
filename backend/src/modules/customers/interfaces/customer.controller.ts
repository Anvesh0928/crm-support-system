import { Request, Response, NextFunction } from 'express';
import { CustomerService } from '../application/customer.service.js';

const customerService = new CustomerService();

export class CustomerController {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string || '1', 10);
      const limit = parseInt(req.query.limit as string || '20', 10);
      const result = await customerService.listCustomers(limit, page);
      return res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const customer = await customerService.getCustomerById(req.params.id);
      return res.status(200).json({ success: true, data: customer });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const updated = await customerService.updateCustomer(req.params.id, req.body);
      return res.status(200).json({ success: true, data: updated });
    } catch (error) {
      next(error);
    }
  }
}
