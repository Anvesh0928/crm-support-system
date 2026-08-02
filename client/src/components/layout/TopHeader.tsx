import React from 'react';
import { User } from '../../types';
import { Bell, LogOut, Shield } from 'lucide-react';
import { Badge } from '../ui/Badge';

interface Props {
  currentUser: User | null;
  onLogout: () => void;
}

export const TopHeader: React.FC<Props> = ({ currentUser, onLogout }) => {
  return (
    <header className="glass-panel" style={{ padding: '12px 24px', margin: '16px 16px 0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>AI Customer Support Workspace</h3>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Realtime Voice Telephony & Live Agent Control</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{ position: 'relative', cursor: 'pointer' }}>
          <Bell size={20} color="var(--text-secondary)" />
          <span style={{ position: 'absolute', top: '-2px', right: '-2px', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-cyan)' }} />
        </div>

        {currentUser && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderLeft: '1px solid var(--border-glass)', paddingLeft: '20px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, deepskyblue, mediumpurple)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.9rem' }}>
              {currentUser.name[0]}
            </div>
            <div>
              <div style={{ fontSize: '0.88rem', fontWeight: 600 }}>{currentUser.name}</div>
              <Badge variant="purple">{currentUser.role}</Badge>
            </div>
          </div>
        )}

        <button
          onClick={onLogout}
          style={{
            background: 'rgba(244, 63, 94, 0.15)',
            border: '1px solid rgba(244, 63, 94, 0.3)',
            color: 'var(--accent-rose)',
            padding: '8px 12px',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.85rem',
            fontWeight: 600,
          }}
        >
          <LogOut size={16} /> Logout
        </button>
      </div>
    </header>
  );
};
