// ==========================================
// CALL DETAILS COMPONENT (CallDetails.jsx)
// ==========================================
// Renders comprehensive detail view for a single call record,
// including Call Information, Handled By, Call Summary, Resolution,
// Call Recording placeholder, and a full Conversation transcript.

import React from 'react';
import {
  ArrowLeft,
  Phone,
  Calendar,
  Timer,
  Bot,
  UserCheck,
  FileText,
  CheckCircle2,
  PhoneIncoming,
  PhoneOutgoing,
  MessageSquare,
  Volume2,
  Play
} from 'lucide-react';

export default function CallDetails({ call, onBack }) {
  if (!call) return null;

  // Get CSS class for Status badge
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Answered':
        return 'badge-answered';
      case 'Resolved':
        return 'badge-resolved';
      case 'Missed':
        return 'badge-missed';
      case 'Transferred':
        return 'badge-transferred';
      default:
        return 'badge-resolved';
    }
  };

  const isAi = call.handledBy === 'AI';

  return (
    <div className="profile-container">
      {/* Back Button */}
      <button className="btn-back" onClick={onBack}>
        <ArrowLeft size={16} />
        Back to Calls
      </button>

      {/* Title Header Card */}
      <div className="profile-header-card">
        <div className="profile-avatar" style={{ background: isAi ? 'linear-gradient(135deg, #06b6d4, #3b82f6)' : 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
          {isAi ? <Bot size={28} /> : <UserCheck size={28} />}
        </div>
        <div className="profile-main-info">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <h2 className="profile-name">Call #{call.id} — {call.customerName}</h2>
            <span className={`badge ${getStatusBadgeClass(call.status)}`}>
              {call.status}
            </span>
          </div>
          <div className="profile-meta-tags">
            <span className="meta-tag">
              <Phone size={14} /> {call.phone}
            </span>
            <span className="meta-tag">
              <Calendar size={14} /> {call.date} at {call.time}
            </span>
            <span className="meta-tag">
              <Timer size={14} /> Duration: {call.duration}
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="profile-content-grid">
        {/* Left Box: Call Information */}
        <div className="content-section">
          <div className="section-header">
            <h3 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Phone size={18} color="var(--primary)" />
              Call Information
            </h3>
          </div>

          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Customer</span>
              <span className="info-value">{call.customerName}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Phone</span>
              <span className="info-value">{call.phone}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Call Type</span>
              <span className="info-value" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                {call.type === 'Incoming' ? <PhoneIncoming size={14} color="#3730a3" /> : <PhoneOutgoing size={14} color="#6b21a8" />}
                {call.type}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">Intent</span>
              <span className="info-value">{call.intent}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Date</span>
              <span className="info-value">{call.date}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Time</span>
              <span className="info-value">{call.time}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Duration</span>
              <span className="info-value">{call.duration}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Status</span>
              <span className="info-value">
                <span className={`badge ${getStatusBadgeClass(call.status)}`}>
                  {call.status}
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Right Box: Summary, Resolution, Agent details & Call Recording */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Agent / AI Card */}
          <div className="content-section">
            <div className="section-header" style={{ marginBottom: '10px' }}>
              <h3 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {isAi ? <Bot size={18} color="var(--primary)" /> : <UserCheck size={18} color="var(--primary)" />}
                Handled By
              </h3>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span className={`badge ${isAi ? 'badge-incoming' : 'badge-transferred'}`} style={{ padding: '6px 14px', fontSize: '13px', fontWeight: '700' }}>
                Handled By: {call.handledBy}
              </span>
            </div>
          </div>

          {/* Call Summary Card */}
          <div className="content-section">
            <div className="section-header" style={{ marginBottom: '10px' }}>
              <h3 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileText size={18} color="var(--primary)" />
                Call Summary
              </h3>
            </div>
            <p style={{ fontSize: '14px', color: 'var(--text-dark)', lineHeight: '1.6' }}>
              {call.summary || 'Customer called regarding consultation booking.'}
            </p>
          </div>

          {/* Resolution Card */}
          <div className="content-section">
            <div className="section-header" style={{ marginBottom: '10px' }}>
              <h3 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={18} color="#059669" />
                Resolution
              </h3>
            </div>
            <p style={{ fontSize: '14px', color: 'var(--text-dark)', lineHeight: '1.6' }}>
              {call.resolution || 'Customer was provided with consultation information.'}
            </p>
          </div>

          {/* Call Recording Placeholder Card */}
          <div className="content-section">
            <div className="section-header" style={{ marginBottom: '10px' }}>
              <h3 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Volume2 size={18} color="var(--primary)" />
                Call Recording
              </h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                className="btn-secondary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  width: 'fit-content',
                  opacity: 0.75,
                  cursor: 'not-allowed'
                }}
                disabled
              >
                <Play size={14} fill="currentColor" />
                ▶ Play Recording
              </button>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                Recording not available
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Full-width Conversation Section */}
      <div className="content-section conversation-box">
        <div className="section-header" style={{ marginBottom: '16px' }}>
          <h3 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MessageSquare size={18} color="var(--primary)" />
            Conversation
          </h3>
        </div>

        {!call.conversation || call.conversation.length === 0 ? (
          <div className="empty-table-state">
            <p>No conversation transcript available.</p>
          </div>
        ) : (
          <div className="conversation-container">
            {call.conversation.map((msg, index) => {
              const isCustomer = msg.speaker === 'customer';
              const speakerLabel = isCustomer
                ? call.customerName
                : (call.handledBy === 'AI' ? 'AI Assistant' : 'Human Agent');

              return (
                <div
                  key={index}
                  className={`chat-bubble-wrapper ${isCustomer ? 'chat-customer' : 'chat-agent'}`}
                >
                  <div className="chat-speaker-name">{speakerLabel}</div>
                  <div className="chat-bubble">
                    <p className="chat-message">{msg.message}</p>
                    <span className="chat-timestamp">{msg.time}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
