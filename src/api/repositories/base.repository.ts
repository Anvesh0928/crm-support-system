import { Model, Document, FilterQuery, UpdateQuery } from 'mongoose';

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export class BaseRepository<T extends Document> {
  constructor(protected readonly model: Model<T>) {}

  async create(item: Partial<T>): Promise<T> {
    return this.model.create(item as any);
  }

  async findById(id: string, populate?: string | string[]): Promise<T | null> {
    const query = this.model.findById(id);
    if (populate) query.populate(populate as any);
    return query.exec();
  }

  async findOne(filter: FilterQuery<T>, populate?: string | string[]): Promise<T | null> {
    const query = this.model.findOne(filter);
    if (populate) query.populate(populate as any);
    return query.exec();
  }

  async find(filter: FilterQuery<T> = {}, populate?: string | string[], sort: any = { createdAt: -1 }): Promise<T[]> {
    const query = this.model.find(filter).sort(sort);
    if (populate) query.populate(populate as any);
    return query.exec();
  }

  async update(id: string, updateData: UpdateQuery<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  async delete(id: string): Promise<boolean> {
    const res = await this.model.findByIdAndDelete(id).exec();
    return !!res;
  }

  async softDelete(id: string): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, { isDeleted: true } as any, { new: true }).exec();
  }

  async paginate(
    filter: FilterQuery<T> = {},
    page = 1,
    limit = 20,
    sort: any = { createdAt: -1 },
    populate?: string | string[]
  ): Promise<PaginatedResult<T>> {
    const skip = (page - 1) * limit;
    const query = this.model.find(filter).sort(sort).skip(skip).limit(limit);
    if (populate) query.populate(populate as any);

    const [data, total] = await Promise.all([query.exec(), this.model.countDocuments(filter)]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
