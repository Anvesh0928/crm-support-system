// ==========================================
// AGENTS TABLE COMPONENT (AgentsTable.jsx)
// ==========================================
// Renders the list of support agents in a clean, interactive table.

import React from 'react';
import { Eye } from 'lucide-react';

export default function AgentsTable({ agents, onSelectAgent }) {
  if (!agents || agents.length === 0) {
    return (
      <div className="empty-table-state">
        <p>No agents found.</p>
      </div>
    );
  }

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
    <div className="calls-table-container">
      <table className="calls-table">
        <thead>
          <tr>
            <th>Agent Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Department</th>
            <th>Status</th>
            <th>Total Calls</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {agents.map((agent) => (
            <tr
              key={agent.id}
              className="clickable-row"
              onClick={() => onSelectAgent(agent)}
            >
              <td style={{ fontWeight: '700', color: 'var(--text-dark)' }}>
                {agent.name}
              </td>
              <td style={{ color: 'var(--text-muted)' }}>{agent.phone}</td>
              <td style={{ color: 'var(--text-muted)' }}>{agent.email}</td>
              <td style={{ fontWeight: '600' }}>{agent.department}</td>
              <td>
                <span className={`badge ${getStatusBadgeClass(agent.status)}`}>
                  {agent.status}
                </span>
              </td>
              <td style={{ fontWeight: '600', color: 'var(--primary)' }}>
                {agent.totalCalls}
              </td>
              <td onClick={(e) => e.stopPropagation()}>
                <button
                  className="btn-action-view"
                  onClick={() => onSelectAgent(agent)}
                  title="View Agent Details"
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
