import React from 'react';
import { PhoneCall, Users, Ticket, Activity, LogOut, Bot } from 'lucide-react';
import { User } from '../types';

interface Props {
  activeTab: 'desk' | 'tickets' | 'calls' | 'customers';
  setActiveTab: (tab: 'desk' | 'tickets' | 'calls' | 'customers') => void;
  currentUser: User | null;
  onLogout: () => void;
}

export const Navbar: React.FC<Props> = ({ activeTab, setActiveTab, currentUser, onLogout }) => {
  return (
    <header className="glass-panel" style={{ margin: '16px', padding: '12px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ background: 'linear-gradient(135deg, #38bdf8, #8b5cf6)', padding: '10px', borderRadius: '12px', display: 'flex' }}>
          <Bot size={24} color="#ffffff" />
        </div>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>
            Enterprise AI <span className="gradient-text">Customer CRM</span>
          </h2>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Exotel + OpenAI Realtime Voice Engine</p>
        </div>
      </div>

      <nav style={{ display: 'flex', gap: '8px', background: 'rgba(255, 255, 255, 0.04)', padding: '4px', borderRadius: '12px' }}>
        <button
          onClick={() => setActiveTab('desk')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            borderRadius: '8px',
            border: 'none',
            background: activeTab === 'desk' ? 'var(--accent-blue)' : 'transparent',
            color: activeTab === 'desk' ? '#ffffff' : 'var(--text-secondary)',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          <Activity size={18} /> Live Agent Desk
        </button>

        <button
          onClick={() => setActiveTab('tickets')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            borderRadius: '8px',
            border: 'none',
            background: activeTab === 'tickets' ? 'var(--accent-blue)' : 'transparent',
            color: activeTab === 'tickets' ? '#ffffff' : 'var(--text-secondary)',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          <Ticket size={18} /> Tickets
        </button>

        <button
          onClick={() => setActiveTab('calls')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            borderRadius: '8px',
            border: 'none',
            background: activeTab === 'calls' ? 'var(--accent-blue)' : 'transparent',
            color: activeTab === 'calls' ? '#ffffff' : 'var(--text-secondary)',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          <PhoneCall size={18} /> Call Logs
        </button>

        <button
          onClick={() => setActiveTab('customers')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            borderRadius: '8px',
            border: 'none',
            background: activeTab === 'customers' ? 'var(--accent-blue)' : 'transparent',
            color: activeTab === 'customers' ? '#ffffff' : 'var(--text-secondary)',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          <Users size={18} /> Customers
        </button>
      </nav>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {currentUser && (
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>{currentUser.name}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)' }}>{currentUser.role}</div>
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
