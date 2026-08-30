// ==========================================
// TICKET DETAILS COMPONENT (TicketDetails.jsx)
// ==========================================
// Fully functional Ticket Details view supporting Status updates, Priority changes,
// closing/re-opening tickets, and adding resolution notes.

import React, { useState } from 'react';
import {
  ArrowLeft,
  Ticket,
  User,
  AlertCircle,
  Calendar,
  FileText,
  CheckCircle,
  RefreshCw,
  Edit3,
  MessageSquare
} from 'lucide-react';

export default function TicketDetails({ ticket, onBack, onUpdateTicket }) {
  const [status, setStatus] = useState(ticket?.status || 'Open');
  const [priority, setPriority] = useState(ticket?.priority || 'Medium');
  const [resolutionNote, setResolutionNote] = useState(ticket?.resolutionNote || '');
  const [saveSuccess, setSaveSuccess] = useState('');

  if (!ticket) return null;

  // Priority badge styling
  const getPriorityBadgeClass = (p) => {
    switch (p) {
      case 'High':
        return 'badge-high';
      case 'Medium':
        return 'badge-medium';
      case 'Low':
        return 'badge-low';
      default:
        return 'badge-low';
    }
  };

  // Status badge styling
  const getStatusBadgeClass = (s) => {
    switch (s) {
      case 'Open':
        return 'badge-open';
      case 'In Progress':
        return 'badge-inprogress';
      case 'Resolved':
        return 'badge-resolved';
      default:
        return 'badge-resolved';
    }
  };

  // Helper to commit changes to parent component
  const handleApplyChanges = (newStatus, newPriority, newNote) => {
    const updated = {
      ...ticket,
      status: newStatus !== undefined ? newStatus : status,
      priority: newPriority !== undefined ? newPriority : priority,
      resolutionNote: newNote !== undefined ? newNote : resolutionNote,
      updatedAt: new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      })
    };

    if (onUpdateTicket) {
      onUpdateTicket(updated);
    }

    setSaveSuccess('Ticket updated successfully!');
    setTimeout(() => setSaveSuccess(''), 3000);
  };

  // Quick 1-click action to close / resolve ticket
  const handleCloseTicket = () => {
    setStatus('Resolved');
    handleApplyChanges('Resolved', priority, resolutionNote);
  };

  // Quick action to re-open ticket
  const handleReopenTicket = () => {
    setStatus('Open');
    handleApplyChanges('Open', priority, resolutionNote);
  };

  return (
    <div className="profile-container">
      {/* Back Button */}
      <button className="btn-back" onClick={onBack}>
        <ArrowLeft size={16} />
        Back to Tickets
      </button>

      {/* Success Notification Banner */}
      {saveSuccess && (
        <div className="toast-success" style={{ marginBottom: '16px' }}>
          <CheckCircle size={18} />
          <span>{saveSuccess}</span>
        </div>
      )}

      {/* Title Header Card */}
      <div className="profile-header-card">
        <div
          className="profile-avatar"
          style={{
            background:
              status === 'Resolved'
                ? 'linear-gradient(135deg, #10b981, #059669)'
                : 'linear-gradient(135deg, #f59e0b, #d97706)'
          }}
        >
          <Ticket size={28} />
        </div>

        <div className="profile-main-info">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <h2 className="profile-name">
              {ticket.id} — {ticket.issue}
            </h2>
            <span className={`badge ${getStatusBadgeClass(status)}`}>
              {status}
            </span>
            <span className={`badge ${getPriorityBadgeClass(priority)}`}>
              {priority} Priority
            </span>
          </div>

          <div className="profile-meta-tags">
            <span className="meta-tag">
              <User size={14} /> Customer: {ticket.customerName}
            </span>
            <span className="meta-tag">
              <Calendar size={14} /> Created: {ticket.createdAt}
            </span>
          </div>
        </div>

        {/* Header Action Button */}
        <div style={{ marginLeft: 'auto' }}>
          {status !== 'Resolved' ? (
            <button
              className="btn-primary-action"
              style={{ backgroundColor: '#10b981', borderColor: '#10b981' }}
              onClick={handleCloseTicket}
            >
              <CheckCircle size={16} style={{ marginRight: '6px' }} />
              Close Ticket
            </button>
          ) : (
            <button
              className="btn-secondary"
              onClick={handleReopenTicket}
            >
              <RefreshCw size={16} style={{ marginRight: '6px' }} />
              Re-open Ticket
            </button>
          )}
        </div>
      </div>

      {/* Main Details & Controls Grid */}
      <div className="profile-content-grid">
        {/* Left Column: Ticket Info & Live Action Controls */}
        <div className="content-section">
          <div className="section-header" style={{ marginBottom: '16px' }}>
            <h3 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertCircle size={18} color="var(--primary)" />
              Ticket Information & Controls
            </h3>
          </div>

          <div className="info-grid" style={{ marginBottom: '20px' }}>
            <div className="info-item">
              <span className="info-label">Ticket ID</span>
              <span className="info-value">{ticket.id}</span>
            </div>

            <div className="info-item">
              <span className="info-label">Customer</span>
              <span className="info-value">{ticket.customerName}</span>
            </div>

            <div className="info-item">
              <span className="info-label">Issue</span>
              <span className="info-value">{ticket.issue}</span>
            </div>

            <div className="info-item">
              <span className="info-label">Created Date</span>
              <span className="info-value">{ticket.createdAt}</span>
            </div>

            {/* Editable Status Dropdown */}
            <div className="info-item">
              <span className="info-label">Change Status</span>
              <select
                className="input-field select-field"
                value={status}
                onChange={(e) => {
                  const newStatus = e.target.value;
                  setStatus(newStatus);
                  handleApplyChanges(newStatus, priority, resolutionNote);
                }}
                style={{ padding: '6px 10px', fontSize: '13px', marginTop: '4px' }}
              >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved (Closed)</option>
              </select>
            </div>

            {/* Editable Priority Dropdown */}
            <div className="info-item">
              <span className="info-label">Change Priority</span>
              <select
                className="input-field select-field"
                value={priority}
                onChange={(e) => {
                  const newPriority = e.target.value;
                  setPriority(newPriority);
                  handleApplyChanges(status, newPriority, resolutionNote);
                }}
                style={{ padding: '6px 10px', fontSize: '13px', marginTop: '4px' }}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Column: Description & Resolution Notes */}
        <div className="profile-right-col" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Issue Description Card */}
          <div className="content-section">
            <div className="section-header" style={{ marginBottom: '12px' }}>
              <h3 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileText size={18} color="var(--primary)" />
                Issue Description
              </h3>
            </div>
            <p style={{ fontSize: '14px', color: 'var(--text-dark)', lineHeight: '1.6' }}>
              {ticket.description || 'No description provided.'}
            </p>
          </div>

          {/* Resolution & Agent Notes Card */}
          <div className="content-section">
            <div className="section-header" style={{ marginBottom: '12px' }}>
              <h3 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MessageSquare size={18} color="var(--primary)" />
                Resolution / Agent Notes
              </h3>
            </div>

            <textarea
              className="input-field"
              rows={3}
              placeholder="Add resolution notes or action updates here..."
              value={resolutionNote}
              onChange={(e) => setResolutionNote(e.target.value)}
              style={{ width: '100%', resize: 'vertical', marginBottom: '12px', fontSize: '13.5px' }}
            />

            <button
              className="btn-primary"
              onClick={() => handleApplyChanges(status, priority, resolutionNote)}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <Edit3 size={14} />
              Save Note & Updates
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
