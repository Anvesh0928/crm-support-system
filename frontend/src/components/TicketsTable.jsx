// ==========================================
// TICKETS TABLE COMPONENT (TicketsTable.jsx)
// ==========================================
// Renders list of support tickets in a clean, interactive table with inline status/priority controls.

import React from 'react';
import { Eye, CheckCircle2 } from 'lucide-react';

export default function TicketsTable({ tickets, onSelectTicket, onUpdateTicket }) {
  if (!tickets || tickets.length === 0) {
    return (
      <div className="empty-table-state">
        <p>No tickets found matching your search.</p>
      </div>
    );
  }

  // Priority badge styling
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

  // Status badge styling
  const getStatusBadgeClass = (status) => {
    switch (status) {
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

  return (
    <div className="calls-table-container">
      <table className="calls-table">
        <thead>
          <tr>
            <th>Ticket ID</th>
            <th>Customer</th>
            <th>Issue</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Created</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr
              key={ticket.id}
              className="clickable-row"
              onClick={() => onSelectTicket(ticket)}
            >
              <td style={{ fontWeight: '700', color: 'var(--primary)' }}>
                {ticket.id}
              </td>
              <td style={{ fontWeight: '600' }}>{ticket.customerName}</td>
              <td>{ticket.issue}</td>
              <td onClick={(e) => e.stopPropagation()}>
                <select
                  value={ticket.priority}
                  onChange={(e) => {
                    if (onUpdateTicket) {
                      onUpdateTicket({ ...ticket, priority: e.target.value });
                    }
                  }}
                  className={`badge ${getPriorityBadgeClass(ticket.priority)}`}
                  style={{
                    border: 'none',
                    cursor: 'pointer',
                    outline: 'none',
                    fontFamily: 'inherit'
                  }}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </td>
              <td onClick={(e) => e.stopPropagation()}>
                <select
                  value={ticket.status}
                  onChange={(e) => {
                    if (onUpdateTicket) {
                      onUpdateTicket({ ...ticket, status: e.target.value });
                    }
                  }}
                  className={`badge ${getStatusBadgeClass(ticket.status)}`}
                  style={{
                    border: 'none',
                    cursor: 'pointer',
                    outline: 'none',
                    fontFamily: 'inherit'
                  }}
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </td>
              <td style={{ color: 'var(--text-muted)' }}>{ticket.createdAt}</td>
              <td onClick={(e) => e.stopPropagation()}>
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                  <button
                    className="btn-action-view"
                    onClick={() => onSelectTicket(ticket)}
                    title="View Ticket Details"
                  >
                    <Eye size={14} style={{ marginRight: '4px' }} />
                    View
                  </button>

                  {ticket.status !== 'Resolved' && (
                    <button
                      className="btn-action-view"
                      style={{ color: '#059669', borderColor: '#a7f3d0', backgroundColor: '#ecfdf5' }}
                      onClick={() => {
                        if (onUpdateTicket) {
                          onUpdateTicket({ ...ticket, status: 'Resolved' });
                        }
                      }}
                      title="Close Ticket"
                    >
                      <CheckCircle2 size={13} style={{ marginRight: '3px' }} />
                      Close
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
