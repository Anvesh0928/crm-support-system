// ==========================================
// CALLS TABLE COMPONENT (CallsTable.jsx)
// ==========================================
// Displays the customer call records list in a structured table.

import React from 'react';
import { Eye, PhoneIncoming, PhoneOutgoing } from 'lucide-react';

export default function CallsTable({ calls, onSelectCall }) {
  if (!calls || calls.length === 0) {
    return (
      <div className="empty-table-state">
        <p>No call records found matching your search or filters.</p>
      </div>
    );
  }

  // Get CSS class for Call Type badge
  const getTypeBadgeClass = (type) => {
    return type === 'Incoming' ? 'badge-incoming' : 'badge-outgoing';
  };

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

  return (
    <div className="calls-table-container">
      <table className="calls-table">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Phone</th>
            <th>Call Type</th>
            <th>Intent</th>
            <th>Duration</th>
            <th>Status</th>
            <th>Date & Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {calls.map((call) => (
            <tr
              key={call.id}
              className="clickable-row"
              onClick={() => onSelectCall(call)}
            >
              <td style={{ fontWeight: '700', color: 'var(--primary)' }}>
                {call.customerName}
              </td>
              <td style={{ color: 'var(--text-muted)' }}>{call.phone}</td>
              <td>
                <span className={`badge ${getTypeBadgeClass(call.type)}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  {call.type === 'Incoming' ? (
                    <PhoneIncoming size={12} />
                  ) : (
                    <PhoneOutgoing size={12} />
                  )}
                  {call.type}
                </span>
              </td>
              <td>{call.intent}</td>
              <td style={{ fontWeight: '600', color: 'var(--text-dark)' }}>{call.duration}</td>
              <td>
                <span className={`badge ${getStatusBadgeClass(call.status)}`}>
                  {call.status}
                </span>
              </td>
              <td style={{ color: 'var(--text-muted)' }}>
                {call.date} at {call.time}
              </td>
              <td onClick={(e) => e.stopPropagation()}>
                <button
                  className="btn-action-view"
                  onClick={() => onSelectCall(call)}
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
  );
}
