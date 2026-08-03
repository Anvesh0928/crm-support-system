import React, { useState } from 'react';
import { ApiService } from '../services/api.service';
import { Bot, Key, Mail, Lock } from 'lucide-react';

interface Props {
  onLoginSuccess: (token: string, user: any) => void;
}

export const LoginModal: React.FC<Props> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('agent@supportcrm.com');
  const [password, setPassword] = useState('AgentPass123!');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await ApiService.login(email, password);
      if (res.success) {
        onLoginSuccess(res.data.token, res.data.user);
      } else {
        setError(res.error?.message || 'Login failed');
      }
    } catch (err: any) {
      setError(err.message || 'Server error during authentication');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(10, 13, 20, 0.85)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
    >
      <div className="glass-panel" style={{ width: '100%', maxWidth: '420px', padding: '32px' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '16px', background: 'linear-gradient(135deg, deepskyblue, mediumpurple)', margin: '0 auto 12px auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Bot size={28} color="white" />
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700 }}>Agent Login Portal</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Enterprise AI Customer Support CRM</p>
        </div>

        {error && (
          <div style={{ background: 'rgba(244, 63, 94, 0.15)', border: '1px solid rgba(244, 63, 94, 0.3)', color: 'var(--accent-rose)', padding: '10px', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '16px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '10px 12px 10px 38px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-glass)',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '0.9rem',
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '10px 12px 10px 38px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-glass)',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '0.9rem',
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-purple))',
              border: 'none',
              color: '#fff',
              padding: '12px',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '0.95rem',
              cursor: 'pointer',
              marginTop: '8px',
            }}
          >
            {loading ? 'Authenticating...' : 'Sign In to Workspace'}
          </button>
        </form>

        <div style={{ marginTop: '20px', padding: '12px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px', fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
          <strong>Default Seed Credentials:</strong><br />
          Agent: <code>agent@supportcrm.com</code> / <code>AgentPass123!</code><br />
          Admin: <code>admin@supportcrm.com</code> / <code>AdminPass123!</code>
        </div>
      </div>
    </div>
  );
};
