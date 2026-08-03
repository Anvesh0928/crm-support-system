import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { LiveVoiceWave } from '../shared/LiveVoiceWave';
import { Phone, Eye, Mic, PhoneForwarded, Clock, User } from 'lucide-react';
import { Call } from '../../types';

interface Props {
  calls: Call[];
  onOpenBargeModal: (call: Call, mode: 'listen' | 'whisper' | 'barge') => void;
}

export const LiveCallsStream: React.FC<Props> = ({ calls, onOpenBargeModal }) => {
  const activeCalls = calls.filter((c) => c.status === 'IN_PROGRESS' || c.status === 'INITIATED' || c.status === 'ESCALATED');

  return (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Live Active Calls Monitor</h3>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Realtime Voice Streams & Supervisor Control Triggers</span>
        </div>
        <Badge variant="info">{activeCalls.length} Active Voice Sessions</Badge>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
        {activeCalls.length === 0 ? (
          <div className="glass-card" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
            No ongoing calls at this moment. Live active streams will populate here automatically.
          </div>
        ) : (
          activeCalls.map((c) => {
            const customerObj: any = c.customerId;
            const agentObj: any = c.assignedAgentId;

            return (
              <div key={c._id} className="glass-card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ background: 'rgba(56, 189, 248, 0.15)', padding: '10px', borderRadius: '10px' }}>
                      <Phone size={20} color="var(--accent-cyan)" />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{c.fromNumber}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>SID: {c.exotelCallSid.slice(-8)}</div>
                    </div>
                  </div>

                  <Badge variant={c.status === 'ESCALATED' ? 'warning' : 'success'}>{c.status}</Badge>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.2)', padding: '8px 12px', borderRadius: '8px', fontSize: '0.8rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>
                    <User size={12} style={{ display: 'inline', marginRight: '4px' }} />
                    Agent: <strong>{agentObj?.name || 'AI Assistant'}</strong>
                  </span>
                  <LiveVoiceWave />
                </div>

                {/* Supervisor Controls */}
                <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
                  <Button variant="secondary" size="sm" style={{ flex: 1 }} onClick={() => onOpenBargeModal(c, 'listen')}>
                    <Eye size={14} /> Listen
                  </Button>
                  <Button variant="glass" size="sm" style={{ flex: 1 }} onClick={() => onOpenBargeModal(c, 'whisper')}>
                    <Mic size={14} /> Whisper
                  </Button>
                  <Button variant="danger" size="sm" style={{ flex: 1 }} onClick={() => onOpenBargeModal(c, 'barge')}>
                    <PhoneForwarded size={14} /> Barge
                  </Button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </Card>
  );
};
