// ==========================================
// SIDEBAR COMPONENT (Sidebar.jsx)
// ==========================================
// Left navigation menu supporting Admin vs Agent role-based item visibility.

import React from 'react';
import {
  LayoutDashboard,
  Users,
  PhoneCall,
  Ticket,
  CalendarCheck,
  CreditCard,
  MessageSquare,
  BookOpen,
  UserCheck,
  Settings,
  Sparkles,
  Shield,
  Headphones
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, userRole = 'admin' }) {
  // Full navigation items list
  const allMenuItems = [
    { id: 'Dashboard', label: 'Dashboard', icon: LayoutDashboard, adminOnly: false },
    { id: 'Customers', label: 'Customers', icon: Users, adminOnly: false },
    { id: 'Calls', label: 'Calls', icon: PhoneCall, adminOnly: false },
    { id: 'Tickets', label: 'Tickets', icon: Ticket, adminOnly: false },
    { id: 'Bookings', label: 'Bookings', icon: CalendarCheck, adminOnly: false },
    { id: 'Payments', label: 'Payments', icon: CreditCard, adminOnly: false },
    { id: 'WhatsApp', label: 'WhatsApp', icon: MessageSquare, adminOnly: false },
    { id: 'AI Knowledge Base', label: 'AI Knowledge Base', icon: BookOpen, adminOnly: true },
    { id: 'Agents', label: 'Agents', icon: UserCheck, adminOnly: true },
    { id: 'Settings', label: 'Settings', icon: Settings, adminOnly: true },
  ];

  // Filter menu items for Agents vs Admin
  const menuItems = allMenuItems.filter((item) => {
    if (userRole === 'agent' && item.adminOnly) {
      return false; // Hide admin-only tabs for agent role
    }
    return true;
  });

  return (
    <aside className="sidebar">
      {/* Brand Header */}
      <div className="sidebar-header">
        <div className="logo-icon">
          <Sparkles size={20} />
        </div>
        <div>
          <span className="logo-text">AstroBharat</span>
          <span className="logo-tag">AI</span>
        </div>
      </div>

      {/* Role Indicator Banner */}
      <div style={{ padding: '0 16px 12px 16px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '11px',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            padding: '6px 10px',
            borderRadius: '6px',
            backgroundColor: userRole === 'admin' ? 'rgba(99, 102, 241, 0.15)' : 'rgba(16, 185, 129, 0.15)',
            color: userRole === 'admin' ? '#818cf8' : '#34d399'
          }}
        >
          {userRole === 'admin' ? <Shield size={13} /> : <Headphones size={13} />}
          <span>{userRole === 'admin' ? 'Admin Portal' : 'Agent Workspace'}</span>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="sidebar-menu">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              className={`menu-item ${isActive ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <Icon className="menu-item-icon" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
