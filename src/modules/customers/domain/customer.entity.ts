export interface CustomerEntity {
  id: string;
  phone: string;
  name?: string;
  email?: string;
  accountTier: 'VIP' | 'STANDARD' | 'ENTERPRISE';
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}
