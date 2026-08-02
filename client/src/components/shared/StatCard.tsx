import React from 'react';
import { Card } from '../ui/Card';

interface Props {
  title: string;
  value: string | number;
  change?: string;
  icon: React.ReactNode;
  color?: string;
}

export const StatCard: React.FC<Props> = ({ title, value, change, icon, color = 'var(--accent-cyan)' }) => {
  return (
    <Card style={{ flex: 1, minWidth: '220px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{title}</span>
        <div style={{ background: `${color}22`, padding: '8px', borderRadius: '10px', color }}>{icon}</div>
      </div>
      <div style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '4px' }}>{value}</div>
      {change && <div style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>{change}</div>}
    </Card>
  );
};
