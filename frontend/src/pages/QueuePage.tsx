import React from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { StatCard } from '../components/shared/StatCard';
import { ListOrdered, ShieldAlert, Zap, Clock } from 'lucide-react';

export const QueuePage: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <StatCard title="VIP Fast-Track Queue" value="2 Waiting" change="Priority SLA < 30s" icon={<Zap size={22} />} color="var(--accent-pink)" />
        <StatCard title="Standard Priority Queue" value="4 Waiting" change="Avg Wait: 18s" icon={<ListOrdered size={22} />} color="var(--accent-cyan)" />
        <StatCard title="SLA Timeout Threshold" value="300s" change="Auto-Evict to DLQ" icon={<Clock size={22} />} color="var(--accent-amber)" />
        <StatCard title="Dead-Letter Queue (DLQ)" value="0 Items" change="100% Picked Up" icon={<ShieldAlert size={22} />} color="var(--accent-rose)" />
      </div>

      <Card>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '16px' }}>Live Redis Queued Waiting Items</h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div className="glass-card" style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Badge variant="danger">VIP TIER</Badge>
                <h4 style={{ fontSize: '1rem', fontWeight: 600 }}>Caller: +1 (555) 019-9832</h4>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Required Skills: <code>tech_support</code>, <code>billing</code> | Joined 12 seconds ago
              </p>
            </div>
            <Badge variant="warning">Score: 1012</Badge>
          </div>

          <div className="glass-card" style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Badge variant="purple">ENTERPRISE TIER</Badge>
                <h4 style={{ fontSize: '1rem', fontWeight: 600 }}>Caller: +1 (555) 014-4321</h4>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Required Skills: <code>general_support</code> | Joined 24 seconds ago
              </p>
            </div>
            <Badge variant="info">Score: 524</Badge>
          </div>
        </div>
      </Card>
    </div>
  );
};
