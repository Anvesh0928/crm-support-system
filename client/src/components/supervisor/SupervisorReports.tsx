import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { BarChart3, TrendingUp, Clock, UserCheck } from 'lucide-react';

export const SupervisorReports: React.FC = () => {
  return (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Supervisor SLA & Operations Performance Reports</h3>
        <Badge variant="success">Weekly SLA Compliance: 98.4%</Badge>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        <div className="glass-card" style={{ padding: '16px' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Average Handle Time (AHT)</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>2m 18s</div>
          <span style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)' }}>-12s lower than target</span>
        </div>

        <div className="glass-card" style={{ padding: '16px' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Abandonment Rate</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>0.4%</div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-emerald)' }}>Within 2% SLA Limit</span>
        </div>

        <div className="glass-card" style={{ padding: '16px' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>First Call Resolution (FCR)</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-purple)' }}>91.6%</div>
          <span style={{ fontSize: '0.75rem', color: 'var(--accent-purple)' }}>+3.2% vs previous month</span>
        </div>
      </div>
    </Card>
  );
};
