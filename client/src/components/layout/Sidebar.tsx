import React from 'react';
import {
  LayoutDashboard,
  PhoneIncoming,
  Users,
  History,
  UserCheck,
  ListOrdered,
  BarChart3,
  ShieldCheck,
  Settings,
  Bot,
} from 'lucide-react';

export type CRMPage =
  | 'dashboard'
  | 'incoming-calls'
  | 'customers'
  | 'call-history'
  | 'agent-panel'
  | 'queue'
  | 'analytics'
  | 'supervisor'
  | 'settings';

interface Props {
  activePage: CRMPage;
  setActivePage: (page: CRMPage) => void;
}

export const Sidebar: React.FC<Props> = ({ activePage, setActivePage }) => {
  const navItems: { id: CRMPage; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { id: 'incoming-calls', label: 'Incoming Calls', icon: <PhoneIncoming size={18} /> },
    { id: 'customers', label: 'Customer Profile', icon: <Users size={18} /> },
    { id: 'call-history', label: 'Call History', icon: <History size={18} /> },
    { id: 'agent-panel', label: 'Agent Panel', icon: <UserCheck size={18} /> },
    { id: 'queue', label: 'Queue', icon: <ListOrdered size={18} /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={18} /> },
    { id: 'supervisor', label: 'Supervisor', icon: <ShieldCheck size={18} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={18} /> },
  ];

  return (
    <aside className="glass-panel" style={{ width: '250px', margin: '16px 0 16px 16px', padding: '20px 14px', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 32px)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px', padding: '0 8px' }}>
        <div style={{ background: 'linear-gradient(135deg, deepskyblue, mediumpurple)', padding: '10px', borderRadius: '12px', display: 'flex' }}>
          <Bot size={22} color="white" />
        </div>
        <div>
          <h2 style={{ fontSize: '1.05rem', fontWeight: 700 }}>
            Enterprise <span className="gradient-text">CRM</span>
          </h2>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Exotel + AI Voice</span>
        </div>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
        {navItems.map((item) => {
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 14px',
                borderRadius: '10px',
                border: 'none',
                background: isActive ? 'linear-gradient(135deg, rgba(56, 189, 248, 0.15), rgba(139, 92, 246, 0.15))' : 'transparent',
                color: isActive ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                fontWeight: isActive ? 700 : 500,
                fontSize: '0.88rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                textAlign: 'left',
              }}
            >
              {item.icon} {item.label}
            </button>
          );
        })}
      </nav>

      <div style={{ padding: '12px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '10px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
        AI Realtime Voice Active
      </div>
    </aside>
  );
};
