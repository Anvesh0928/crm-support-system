import React from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { AgentPresence, AgentStatus, User } from '../types';
import { UserCheck, Clock, Coffee, ShieldAlert, PhoneCall } from 'lucide-react';

interface Props {
  currentUser: User | null;
  agentStatus: AgentStatus;
  onStatusChange: (status: AgentStatus) => void;
  activeAgents: AgentPresence[];
}

export const AgentPanelPage: React.FC<Props> = ({ currentUser, agentStatus, onStatusChange, activeAgents }) => {
  const statusBadges: { id: AgentStatus; label: string; icon: React.ReactNode }[] = [
    { id: 'AVAILABLE', label: 'Available', icon: <UserCheck size={16} /> },
    { id: 'BUSY', label: 'On Active Call', icon: <Clock size={16} /> },
    { id: 'BREAK', label: 'On Break', icon: <Coffee size={16} /> },
    { id: 'OFFLINE', label: 'Offline', icon: <ShieldAlert size={16} /> },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Agent Workspace: {currentUser?.name}</h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Email: {currentUser?.email}</span>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            {statusBadges.map((st) => (
              <Button
                key={st.id}
                variant={agentStatus === st.id ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => onStatusChange(st.id)}
              >
                {st.icon} {st.label}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <Card>
          <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '12px' }}>Your Daily Performance</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div className="glass-card" style={{ padding: '12px', display: 'flex', justifyContent: 'space-between' }}>
              <span>Calls Handled Today</span>
              <strong>18 Calls</strong>
            </div>
            <div className="glass-card" style={{ padding: '12px', display: 'flex', justifyContent: 'space-between' }}>
              <span>Average Call Handle Time</span>
              <strong>2m 14s</strong>
            </div>
            <div className="glass-card" style={{ padding: '12px', display: 'flex', justifyContent: 'space-between' }}>
              <span>CSAT Rating</span>
              <strong style={{ color: 'var(--accent-emerald)' }}>4.9 / 5.0</strong>
            </div>
          </div>
        </Card>

        <Card>
          <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '12px' }}>Team Agent Status Roster</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {activeAgents.map((a) => (
              <div key={a.agentId} className="glass-card" style={{ padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{a.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{a.email}</div>
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
