import React from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ShieldCheck, Eye, Mic, PhoneForwarded } from 'lucide-react';
import { AgentPresence, Call } from '../types';

interface Props {
  agents: AgentPresence[];
  calls: Call[];
}

export const SupervisorPage: React.FC<Props> = ({ agents, calls }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Card>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <ShieldCheck size={24} color="var(--accent-purple)" />
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Supervisor Live Command Center</h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Realtime Barge-In, Silent Monitoring & Agent Roster</span>
          </div>
        </div>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <Card>
          <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '14px' }}>Active Call Sessions (Barge / Monitor)</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {calls.slice(0, 3).map((c) => (
              <div key={c._id} className="glass-card" style={{ padding: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{c.fromNumber}</div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Exotel SID: {c.exotelCallSid}</span>
                </div>

                <div style={{ display: 'flex', gap: '6px' }}>
                  <Button variant="secondary" size="sm"><Eye size={14} /> Listen</Button>
                  <Button variant="glass" size="sm"><Mic size={14} /> Whisper</Button>
                  <Button variant="danger" size="sm"><PhoneForwarded size={14} /> Barge</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '14px' }}>Supervisor Agent Matrix</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {agents.map((a) => (
              <div key={a.agentId} className="glass-card" style={{ padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{a.name}</div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{a.email}</span>
                </div>
                <Badge variant={a.status === 'AVAILABLE' ? 'success' : a.status === 'BUSY' ? 'warning' : 'danger'}>{a.status}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
