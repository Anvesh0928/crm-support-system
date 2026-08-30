// ==========================================
// TOP HEADER COMPONENT (Header.jsx)
// ==========================================
// Displays search box, user profile details, role badge (Admin/Agent), and logout handler.

import React from 'react';
import { Search, Bell, HelpCircle, LogOut, Shield, Headphones } from 'lucide-react';

export default function Header({ user, onLogout }) {
  const userRole = user?.role || 'admin';
  const userName = user?.name || 'Support Team';
  const userEmail = user?.email || 'admin@astrobharat.ai';

  return (
    <header className="top-header">
      {/* Search Input */}
      <div className="header-left">
        <div className="search-box">
          <Search size={16} color="#94a3b8" />
          <input
            type="text"
            placeholder="Search customers, calls, tickets..."
            className="search-input"
          />
        </div>
      </div>

      {/* Right User Navigation */}
      <div className="header-right">
        <button className="icon-btn" title="Help">
          <HelpCircle size={18} />
        </button>

        <button className="icon-btn" title="Notifications">
          <Bell size={18} />
        </button>

        <div className="user-profile">
          <div
            className="user-avatar"
            style={{
              background: userRole === 'admin'
                ? 'linear-gradient(135deg, #6366f1, #4f46e5)'
                : 'linear-gradient(135deg, #10b981, #059669)'
            }}
          >
            {userName ? userName.charAt(0).toUpperCase() : 'U'}
          </div>
          <div className="user-info">
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="user-name">{userName}</span>
              <span
                className={`badge ${userRole === 'admin' ? 'badge-high' : 'badge-paid'}`}
                style={{
                  fontSize: '10px',
                  padding: '2px 6px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '3px'
                }}
              >
                {userRole === 'admin' ? <Shield size={10} /> : <Headphones size={10} />}
                {userRole === 'admin' ? 'Admin' : 'Agent'}
              </span>
            </div>
            <span className="user-role">{userEmail}</span>
          </div>
          <button className="btn-logout" onClick={onLogout} title="Logout">
            <LogOut size={14} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
