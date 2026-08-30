// ==========================================
// AGENT DETAILS COMPONENT (AgentDetails.jsx)
// ==========================================
// Renders detailed view for a single support agent record.

import React from 'react';
import { ArrowLeft, UserCheck, Phone, Mail, Building, PhoneCall, ShieldCheck } from 'lucide-react';

export default function AgentDetails({ agent, onBack }) {
  if (!agent) return null;

  // Status badge styling helper
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Online':
        return 'badge-online';
      case 'Offline':
        return 'badge-offline';
      case 'Busy':
        return 'badge-busy';
      default:
        return 'badge-online';
    }
  };

  return (
    <div className="profile-container">
      {/* Back Button */}
      <button className="btn-back" onClick={onBack}>
        <ArrowLeft size={16} />
        Back to Agents
      </button>

      {/* Header Banner Card */}
      <div className="profile-header-card">
        <div
          className="profile-avatar"
          style={{ background: 'linear-gradient(135deg, #0ea5e9, #0284c7)' }}
        >
          <UserCheck size={28} />
        </div>
        <div className="profile-main-info">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <h2 className="profile-name">{agent.name}</h2>
            <span className={`badge ${getStatusBadgeClass(agent.status)}`}>
              {agent.status}
            </span>
          </div>
          <div className="profile-meta-tags">
            <span className="meta-tag">
              <ShieldCheck size={14} /> Agent ID: {agent.id}
            </span>
            <span className="meta-tag">
              <Building size={14} /> Dept: {agent.department}
            </span>
            <span className="meta-tag">
              <PhoneCall size={14} /> Total Calls: {agent.totalCalls}
            </span>
          </div>
        </div>
      </div>

      {/* Agent Information Grid */}
      <div className="content-section" style={{ marginTop: '20px' }}>
        <div className="section-header" style={{ marginBottom: '16px' }}>
          <h3 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <UserCheck size={18} color="var(--primary)" />
            Agent Information
          </h3>
        </div>

        <div className="info-grid">
          <div className="info-item">
            <span className="info-label">Agent ID</span>
            <span className="info-value">{agent.id}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Full Name</span>
            <span className="info-value">{agent.name}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Phone Number</span>
            <span className="info-value">{agent.phone}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Email Address</span>
            <span className="info-value">{agent.email}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Department</span>
            <span className="info-value">{agent.department}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Current Status</span>
            <span className="info-value">
              <span className={`badge ${getStatusBadgeClass(agent.status)}`}>
                {agent.status}
              </span>
            </span>
          </div>
          <div className="info-item">
            <span className="info-label">Total Handled Calls</span>
            <span className="info-value" style={{ fontWeight: '700', color: 'var(--primary)' }}>
              {agent.totalCalls}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
