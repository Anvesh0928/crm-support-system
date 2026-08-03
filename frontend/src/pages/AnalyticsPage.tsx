import React from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { StatCard } from '../components/shared/StatCard';
import { BarChart3, Cpu, Users, Smile, ShieldAlert } from 'lucide-react';

export const AnalyticsPage: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <StatCard title="Total Calls Processed" value="1,248" change="+14% today" icon={<BarChart3 size={22} />} color="var(--accent-cyan)" />
        <StatCard title="AI Resolution Rate" value="94.2%" change="Automated Voice" icon={<Cpu size={22} />} color="var(--accent-purple)" />
        <StatCard title="Escalated to Agents" value="5.8%" change="72 Handovers" icon={<Users size={22} />} color="var(--accent-amber)" />
        <StatCard title="Customer Satisfaction" value="4.8 / 5.0" change="CSAT Rating" icon={<Smile size={22} />} color="var(--accent-emerald)" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <Card>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px' }}>AI vs Human Resolution Breakdown</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                <span>OpenAI Realtime AI Voice Assistant</span>
                <strong>94.2% (1,175 Calls)</strong>
              </div>
              <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px' }}>
                <div style={{ width: '94.2%', height: '100%', background: 'linear-gradient(90deg, #38bdf8, #8b5cf6)', borderRadius: '4px' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                <span>Human Support Agent Takeover</span>
                <strong>5.8% (73 Calls)</strong>
              </div>
              <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px' }}>
                <div style={{ width: '5.8%', height: '100%', background: 'linear-gradient(90deg, #f59e0b, #f43f5e)', borderRadius: '4px' }} />
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px' }}>Caller Sentiment Analytics</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div className="glass-card" style={{ padding: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Positive Tone</span>
              <Badge variant="success">68%</Badge>
            </div>
            <div className="glass-card" style={{ padding: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Neutral Tone</span>
              <Badge variant="info">24%</Badge>
            </div>
            <div className="glass-card" style={{ padding: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Frustrated / Escalated</span>
              <Badge variant="danger">8%</Badge>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
