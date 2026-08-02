import { Request, Response, NextFunction } from 'express';
import { AnalyticsService } from '../services/analytics.service.js';

const analyticsService = new AnalyticsService();

export class AnalyticsController {
  async getOverview(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await analyticsService.getOverviewMetrics();
      return res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }

  async triggerSnapshot(req: Request, res: Response, next: NextFunction) {
    try {
      const { dateString } = req.body;
      const snapshot = await analyticsService.generateDailySnapshot(dateString);
      return res.status(200).json({ success: true, data: snapshot });
    } catch (error) {
      next(error);
    }
  }
}
