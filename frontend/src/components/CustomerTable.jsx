// ==========================================
// CUSTOMER TABLE COMPONENT (CustomerTable.jsx)
// ==========================================
// Renders the list of customers in a clean, interactive table.

import React from 'react';
import { Eye } from 'lucide-react';

export default function CustomerTable({ customers, onSelectCustomer }) {
  if (!customers || customers.length === 0) {
    return (
      <div className="empty-table-state">
        <p>No customers found matching your search.</p>
      </div>
    );
  }

  return (
    <div className="calls-table-container">
      <table className="calls-table">
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Language</th>
            <th>Total Calls</th>
            <th>Last Contact</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr
              key={customer.id}
              className="clickable-row"
              onClick={() => onSelectCustomer(customer)}
            >
              <td style={{ fontWeight: '700', color: 'var(--primary)' }}>
                {customer.name}
              </td>
              <td style={{ color: 'var(--text-muted)' }}>{customer.phone}</td>
              <td style={{ color: 'var(--text-muted)' }}>{customer.email}</td>
              <td>
                <span className="language-badge">{customer.language}</span>
              </td>
              <td style={{ fontWeight: '600' }}>{customer.totalCalls} calls</td>
              <td style={{ color: 'var(--text-muted)' }}>{customer.lastContact}</td>
              <td>
                <span
                  className={`badge ${
                    customer.status === 'Active' ? 'badge-resolved' : 'badge-pending'
                  }`}
                >
                  {customer.status}
                </span>
              </td>
              <td onClick={(e) => e.stopPropagation()}>
                <button
                  className="btn-action-view"
                  onClick={() => onSelectCustomer(customer)}
                  title="View Customer Profile"
                >
                  <Eye size={14} style={{ marginRight: '4px' }} />
                  View Profile
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
