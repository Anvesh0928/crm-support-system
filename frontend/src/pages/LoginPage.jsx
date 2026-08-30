// ==========================================
// LOGIN PAGE COMPONENT (LoginPage.jsx)
// ==========================================
// Supports separate Admin and Agent role logins with quick demo buttons.

import React, { useState } from 'react';
import { Sparkles, Shield, UserCheck } from 'lucide-react';

export default function LoginPage({ onLogin }) {
  const [role, setRole] = useState('admin'); // 'admin' | 'agent'
  const [email, setEmail] = useState('admin@astrobharat.ai');
  const [password, setPassword] = useState('123456');

  // Handle switching role tabs in login
  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    if (selectedRole === 'admin') {
      setEmail('admin@astrobharat.ai');
    } else {
      setEmail('ananya@astrobharat.ai');
    }
    setPassword('123456');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const name =
      role === 'admin'
        ? 'System Administrator'
        : email.includes('ananya')
        ? 'Ananya Sharma'
        : 'Support Agent';

    onLogin({
      email,
      role,
      name
    });
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        {/* Brand Header */}
        <div className="login-header">
          <div className="brand-badge">
            <Sparkles size={16} /> AstroBharatAI
          </div>
          <h1 className="login-title">Support Portal Login</h1>
          <p className="login-subtitle">Choose your login portal type below</p>
        </div>

        {/* Role Selector Tabs */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '20px',
            backgroundColor: '#f1f5f9',
            padding: '4px',
            borderRadius: '10px'
          }}
        >
          <button
            type="button"
            style={{
              flex: 1,
              padding: '10px 14px',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '700',
              fontSize: '13px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              backgroundColor: role === 'admin' ? '#ffffff' : 'transparent',
              color: role === 'admin' ? 'var(--primary)' : 'var(--text-muted)',
              boxShadow: role === 'admin' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
            }}
            onClick={() => handleRoleSelect('admin')}
          >
            <Shield size={16} />
            Admin Portal
          </button>

          <button
            type="button"
            style={{
              flex: 1,
              padding: '10px 14px',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '700',
              fontSize: '13px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              backgroundColor: role === 'agent' ? '#ffffff' : 'transparent',
              color: role === 'agent' ? '#10b981' : 'var(--text-muted)',
              boxShadow: role === 'agent' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
            }}
            onClick={() => handleRoleSelect('agent')}
          >
            <UserCheck size={16} />
            Agent Portal
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">
              {role === 'admin' ? 'Admin Email Address' : 'Agent Email Address'}
            </label>
            <input
              id="email"
              type="email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="btn-primary">
            Sign In as {role === 'admin' ? 'Admin' : 'Agent'}
          </button>
        </form>

        {/* Quick One-Click Demo Buttons */}
        <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #e2e8f0' }}>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: '600' }}>
            💡 Quick Demo Sign In:
          </p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="button"
              className="btn-secondary"
              style={{ flex: 1, fontSize: '12px', padding: '8px' }}
              onClick={() => {
                onLogin({
                  email: 'admin@astrobharat.ai',
                  role: 'admin',
                  name: 'System Administrator'
                });
              }}
            >
              👑 Login as Admin
            </button>

            <button
              type="button"
              className="btn-secondary"
              style={{ flex: 1, fontSize: '12px', padding: '8px' }}
              onClick={() => {
                onLogin({
                  email: 'ananya@astrobharat.ai',
                  role: 'agent',
                  name: 'Ananya Sharma'
                });
              }}
            >
              🎧 Login as Agent
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
