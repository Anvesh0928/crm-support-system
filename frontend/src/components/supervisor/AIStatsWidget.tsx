import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Cpu, Zap, Activity, CheckCircle2 } from 'lucide-react';

export const AIStatsWidget: React.FC = () => {
  return (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Cpu size={22} color="var(--accent-cyan)" />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>OpenAI Realtime AI Voice Statistics</h3>
        </div>
        <Badge variant="info">Model: gpt-4o-realtime</Badge>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '16px' }}>
        <div className="glass-card" style={{ padding: '14px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Avg Voice Latency</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>280ms</div>
        </div>
        <div className="glass-card" style={{ padding: '14px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>AI Tool Executions</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-purple)' }}>1,420</div>
        </div>
        <div className="glass-card" style={{ padding: '14px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Server VAD Accuracy</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>99.2%</div>
        </div>
        <div className="glass-card" style={{ padding: '14px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Auto Ticket Creations</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-pink)' }}>318</div>
        </div>
      </div>
    </Card>
  );
};
