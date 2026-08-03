import React from 'react';
import { AgentPresence, AgentStatus } from '../types';
import { UserCheck, Clock, Coffee, ShieldAlert } from 'lucide-react';

interface Props {
  currentStatus: AgentStatus;
  onStatusChange: (newStatus: AgentStatus) => void;
  activeAgents: AgentPresence[];
}

export const AgentStatusHeader: React.FC<Props> = ({ currentStatus, onStatusChange, activeAgents }) => {
  const getStatusBadge = (status: AgentStatus) => {
    switch (status) {
      case 'AVAILABLE':
        return { color: 'var(--accent-emerald)', icon: <UserCheck size={16} />, label: 'Available' };
      case 'BUSY':
        return { color: 'var(--accent-amber)', icon: <Clock size={16} />, label: 'On Active Call' };
      case 'BREAK':
        return { color: 'var(--accent-purple)', icon: <Coffee size={16} />, label: 'On Break' };
      default:
        return { color: 'var(--text-muted)', icon: <ShieldAlert size={16} />, label: 'Offline' };
    }
  };

  const currentBadge = getStatusBadge(currentStatus);

  return (
    <div className="glass-panel" style={{ margin: '0 16px 16px 16px', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Your Agent Status:</span>
        <div style={{ display: 'flex', gap: '8px' }}>
          {(['AVAILABLE', 'BUSY', 'BREAK', 'OFFLINE'] as AgentStatus[]).map((st) => {
            const badge = getStatusBadge(st);
            const isSelected = currentStatus === st;
            return (
              <button
                key={st}
                onClick={() => onStatusChange(st)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  border: isSelected ? `1px solid ${badge.color}` : '1px solid var(--border-glass)',
                  background: isSelected ? `${badge.color}22` : 'rgba(255, 255, 255, 0.03)',
                  color: isSelected ? badge.color : 'var(--text-secondary)',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {badge.icon} {badge.label}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div className="pulse-dot" />
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
            {activeAgents.filter((a) => a.status === 'AVAILABLE' || a.status === 'BUSY').length} Active Agents Online
          </span>
        </div>
      </div>
    </div>
  );
};
