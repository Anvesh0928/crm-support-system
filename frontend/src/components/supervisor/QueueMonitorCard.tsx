import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { ListOrdered, Zap, Clock, ShieldAlert } from 'lucide-react';

export const QueueMonitorCard: React.FC = () => {
  return (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Realtime Queue Depth & SLA Monitor</h3>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Live Waiting Call Depth & Timeout Breach Warnings</span>
        </div>
        <Badge variant="purple">SLA SLA Limit: 300s</Badge>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '16px' }}>
        <div className="glass-card" style={{ padding: '12px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>VIP Fast-Track</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-pink)' }}>2 Calls</div>
        </div>
        <div className="glass-card" style={{ padding: '12px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Priority Queue</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>5 Calls</div>
        </div>
        <div className="glass-card" style={{ padding: '12px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Avg Wait Time</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>14s</div>
        </div>
        <div className="glass-card" style={{ padding: '12px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Dead-Letter (DLQ)</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-rose)' }}>0 Evicted</div>
        </div>
      </div>
    </Card>
  );
};
