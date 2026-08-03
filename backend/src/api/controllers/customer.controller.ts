import { Request, Response, NextFunction } from 'express';
import { CustomerService } from '../services/customer.service.js';

const customerService = new CustomerService();

export class CustomerController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const customer = await customerService.createCustomer(req.body);
      return res.status(201).json({ success: true, data: customer });
    } catch (error) {
      next(error);
    }
  }

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string || '1', 10);
      const limit = parseInt(req.query.limit as string || '20', 10);
      const accountTier = req.query.tier as string;

      const result = await customerService.listCustomers(page, limit, accountTier);
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

  async getByPhone(req: Request, res: Response, next: NextFunction) {
    try {
      const customer = await customerService.getCustomerByPhone(req.params.phone);
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

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await customerService.softDeleteCustomer(req.params.id);
      return res.status(200).json({ success: true, message: 'Customer soft-deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
}
