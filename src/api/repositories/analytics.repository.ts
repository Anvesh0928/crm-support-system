import { BaseRepository } from './base.repository.js';
import { AnalyticsModel, IAnalyticsDocument, AnalyticsPeriodType, AnalyticsEntityType } from '../../database/index.js';

export class AnalyticsRepository extends BaseRepository<IAnalyticsDocument> {
  constructor() {
    super(AnalyticsModel);
  }

  async upsertSnapshot(
    dateString: string,
    periodType: AnalyticsPeriodType,
    entityType: AnalyticsEntityType,
    entityId: string | undefined,
    metrics: any
  ): Promise<IAnalyticsDocument> {
    const filter = { dateString, periodType, entityType, entityId: entityId || null };
    return this.model.findOneAndUpdate(
      filter,
      { $set: { metrics } },
      { new: true, upsert: true }
    ).exec();
  }

  async getLatestSnapshots(periodType: AnalyticsPeriodType = 'DAILY', entityType: AnalyticsEntityType = 'SYSTEM', limit = 30) {
    return this.model.find({ periodType, entityType }).sort({ dateString: -1 }).limit(limit).exec();
  }
}
