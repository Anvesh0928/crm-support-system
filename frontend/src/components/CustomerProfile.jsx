// ==========================================
// CUSTOMER PROFILE COMPONENT (CustomerProfile.jsx)
// ==========================================
// Renders detailed information, summary stats, activity history, and sub-tabs for a customer.
// Connected with Customer Calls and Customer Tickets filtered by customerId.

import React, { useState } from 'react';
import {
  ArrowLeft,
  Phone,
  Mail,
  Globe,
  PhoneCall,
  Ticket,
  CalendarCheck,
  CreditCard,
  Activity,
  Eye,
  PhoneIncoming,
  PhoneOutgoing
} from 'lucide-react';
import ComingSoon from './ComingSoon';
import CallDetails from './CallDetails';
import TicketDetails from './TicketDetails';
import { DUMMY_CALLS } from '../data/mockCalls';
import { DUMMY_TICKETS } from '../data/mockTickets';

export default function CustomerProfile({ customer, onBack, tickets: propTickets, onUpdateTicket }) {
  // Sub-tabs state
  const [activeTab, setActiveTab] = useState('Overview');

  // State for viewing call / ticket details within the profile
  const [selectedCall, setSelectedCall] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);

  if (!customer) return null;

  // Filter calls matching this specific customer by customerId
  const customerCalls = DUMMY_CALLS.filter(
    (c) => c.customerId === customer.id
  );

  // Filter tickets matching this specific customer by customerId or customerName
  const allTickets = propTickets || DUMMY_TICKETS;
  const customerTickets = allTickets.filter(
    (t) =>
      t.customerId === customer.id ||
      (t.customerName && t.customerName.toLowerCase() === customer.name.toLowerCase())
  );

  // Helper for Status badge styles
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
      case 'Open':
        return 'badge-open';
      case 'In Progress':
        return 'badge-inprogress';
      default:
        return 'badge-resolved';
    }
  };

  // Helper for Priority badge styles
  const getPriorityBadgeClass = (priority) => {
    switch (priority) {
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

  // Sub-tabs definition
  const tabs = [
    { id: 'Overview', label: 'Overview' },
    { id: 'Calls', label: 'Calls' },
    { id: 'Tickets', label: 'Tickets' },
    { id: 'Bookings', label: 'Bookings' },
    { id: 'Payments', label: 'Payments' },
    { id: 'WhatsApp', label: 'WhatsApp' }
  ];

  return (
    <div className="profile-container">
      {/* Back Button to return to Customer List */}
      <button className="btn-back" onClick={onBack}>
        <ArrowLeft size={16} />
        Back to Customers
      </button>

      {/* Profile Header Banner */}
      <div className="profile-header-card">
        <div className="profile-avatar">
          {customer.name.charAt(0).toUpperCase()}
        </div>
        <div className="profile-main-info">
          <h2 className="profile-name">{customer.name}</h2>
          <div className="profile-meta-tags">
            <span className="meta-tag">
              <Phone size={13} /> {customer.phone}
            </span>
            <span className="meta-tag">
              <Mail size={13} /> {customer.email}
            </span>
            <span className="meta-tag">
              <Globe size={13} /> {customer.language}
            </span>
            <span
              className={`badge ${
                customer.status === 'Active' ? 'badge-resolved' : 'badge-pending'
              }`}
            >
              {customer.status}
            </span>
          </div>
        </div>
      </div>

      {/* Sub Navigation Tabs */}
      <div className="profile-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`profile-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => {
              setActiveTab(tab.id);
              setSelectedCall(null);
              setSelectedTicket(null);
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'Overview' && (
        <div className="profile-content-grid">
          {/* Left Column: Basic Info & Summary */}
          <div className="profile-left-col">
            {/* 1. Basic Information */}
            <div className="content-section">
              <h3 className="section-title" style={{ marginBottom: '16px' }}>
                Basic Information
              </h3>
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">Full Name</span>
                  <span className="info-value">{customer.name}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Phone Number</span>
                  <span className="info-value">{customer.phone}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Email Address</span>
                  <span className="info-value">{customer.email}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Preferred Language</span>
                  <span className="info-value">{customer.language}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Customer Status</span>
                  <span className="info-value">{customer.status}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Created Date</span>
                  <span className="info-value">{customer.createdAt || '2026-01-15'}</span>
                </div>
              </div>
            </div>

            {/* 2. Customer Summary */}
            <div className="content-section" style={{ marginTop: '20px' }}>
              <h3 className="section-title" style={{ marginBottom: '16px' }}>
                Customer Summary
              </h3>
              <div className="summary-cards-mini">
                <div className="mini-card">
                  <PhoneCall size={18} className="mini-icon icon-blue" />
                  <span className="mini-label">Total Calls</span>
                  <span className="mini-value">{customerCalls.length}</span>
                </div>

                <div className="mini-card">
                  <Ticket size={18} className="mini-icon icon-amber" />
                  <span className="mini-label">Open Tickets</span>
                  <span className="mini-value">{customerTickets.filter(t => t.status !== 'Resolved').length}</span>
                </div>

                <div className="mini-card">
                  <CalendarCheck size={18} className="mini-icon icon-purple" />
                  <span className="mini-label">Bookings</span>
                  <span className="mini-value">{customer.bookings || 0}</span>
                </div>

                <div className="mini-card">
                  <CreditCard size={18} className="mini-icon icon-emerald" />
                  <span className="mini-label">Payments</span>
                  <span className="mini-value">{customer.payments || '₹0'}</span>
                </div>
              </div>
              <div className="last-contact-banner">
                <span>Last Contact: <strong>{customer.lastContact || 'N/A'}</strong></span>
              </div>
            </div>
          </div>

          {/* Right Column: Recent Activity derived from real call data */}
          <div className="profile-right-col">
            <div className="content-section">
              <div className="section-header">
                <h3 className="section-title">Recent Activity</h3>
                <Activity size={18} color="var(--text-muted)" />
              </div>

              {customerCalls.length === 0 ? (
                <div className="empty-table-state" style={{ padding: '20px 0' }}>
                  <p>No recent activity found.</p>
                </div>
              ) : (
                <div className="activity-timeline">
                  {customerCalls.map((call) => (
                    <div key={call.id} className="timeline-item">
                      <div className="timeline-icon-box">
                        <PhoneCall size={16} />
                      </div>
                      <div className="timeline-body">
                        <div className="timeline-header">
                          <span className="timeline-type">Call · {call.intent}</span>
                          <span className={`badge ${getStatusBadgeClass(call.status)}`}>
                            {call.status}
                          </span>
                        </div>
                        <p className="timeline-desc">{call.summary}</p>
                        <span className="timeline-time">
                          {call.date} · {call.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Calls Sub-tab Content */}
      {activeTab === 'Calls' && (
        selectedCall ? (
          <CallDetails call={selectedCall} onBack={() => setSelectedCall(null)} />
        ) : (
          <div className="content-section">
            <div className="section-header">
              <h3 className="section-title">Customer Calls</h3>
            </div>

            {customerCalls.length === 0 ? (
              <div className="empty-table-state">
                <p>No calls found for this customer.</p>
              </div>
            ) : (
              <div className="calls-table-container">
                <table className="calls-table">
                  <thead>
                    <tr>
                      <th>Date & Time</th>
                      <th>Call Type</th>
                      <th>Intent</th>
                      <th>Duration</th>
                      <th>Status</th>
                      <th>Handled By</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customerCalls.map((call) => (
                      <tr
                        key={call.id}
                        className="clickable-row"
                        onClick={() => setSelectedCall(call)}
                      >
                        <td style={{ color: 'var(--text-muted)' }}>
                          {call.date} at {call.time}
                        </td>
                        <td>
                          <span
                            className={`badge ${
                              call.type === 'Incoming' ? 'badge-incoming' : 'badge-outgoing'
                            }`}
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                          >
                            {call.type === 'Incoming' ? (
                              <PhoneIncoming size={12} />
                            ) : (
                              <PhoneOutgoing size={12} />
                            )}
                            {call.type}
                          </span>
                        </td>
                        <td style={{ fontWeight: '600' }}>{call.intent}</td>
                        <td>{call.duration}</td>
                        <td>
                          <span className={`badge ${getStatusBadgeClass(call.status)}`}>
                            {call.status}
                          </span>
                        </td>
                        <td>
                          <span
                            className={`badge ${
                              call.handledBy === 'AI' ? 'badge-incoming' : 'badge-transferred'
                            }`}
                          >
                            {call.handledBy}
                          </span>
                        </td>
                        <td onClick={(e) => e.stopPropagation()}>
                          <button
                            className="btn-action-view"
                            onClick={() => setSelectedCall(call)}
                            title="View Call Details"
                          >
                            <Eye size={14} style={{ marginRight: '4px' }} />
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )
      )}

      {/* Tickets Sub-tab Content */}
      {activeTab === 'Tickets' && (
        selectedTicket ? (
          <TicketDetails
            ticket={selectedTicket}
            onBack={() => setSelectedTicket(null)}
            onUpdateTicket={(updated) => {
              setSelectedTicket(updated);
              if (onUpdateTicket) onUpdateTicket(updated);
            }}
          />
        ) : (
          <div className="content-section">
            <div className="section-header">
              <h3 className="section-title">Customer Tickets</h3>
            </div>

            {customerTickets.length === 0 ? (
              <div className="empty-table-state">
                <p>No tickets found for this customer.</p>
              </div>
            ) : (
              <div className="calls-table-container">
                <table className="calls-table">
                  <thead>
                    <tr>
                      <th>Ticket ID</th>
                      <th>Issue</th>
                      <th>Priority</th>
                      <th>Status</th>
                      <th>Created</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customerTickets.map((ticket) => (
                      <tr
                        key={ticket.id}
                        className="clickable-row"
                        onClick={() => setSelectedTicket(ticket)}
                      >
                        <td style={{ fontWeight: '700', color: 'var(--primary)' }}>
                          {ticket.id}
                        </td>
                        <td style={{ fontWeight: '600' }}>{ticket.issue}</td>
                        <td>
                          <span className={`badge ${getPriorityBadgeClass(ticket.priority)}`}>
                            {ticket.priority}
                          </span>
                        </td>
                        <td>
                          <span className={`badge ${getStatusBadgeClass(ticket.status)}`}>
                            {ticket.status}
                          </span>
                        </td>
                        <td style={{ color: 'var(--text-muted)' }}>{ticket.createdAt}</td>
                        <td onClick={(e) => e.stopPropagation()}>
                          <button
                            className="btn-action-view"
                            onClick={() => setSelectedTicket(ticket)}
                            title="View Ticket Details"
                          >
                            <Eye size={14} style={{ marginRight: '4px' }} />
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )
      )}

      {/* Render Coming Soon for other sub-tabs */}
      {activeTab !== 'Overview' && activeTab !== 'Calls' && activeTab !== 'Tickets' && (
        <ComingSoon title={`${customer.name}'s ${activeTab}`} />
      )}
    </div>
  );
}
