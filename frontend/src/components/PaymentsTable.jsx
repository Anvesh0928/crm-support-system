// ==========================================
// PAYMENTS TABLE COMPONENT (PaymentsTable.jsx)
// ==========================================
// Renders the list of payments in a clean, interactive table.

import React from 'react';
import { Eye } from 'lucide-react';

export default function PaymentsTable({ payments, onSelectPayment }) {
  if (!payments || payments.length === 0) {
    return (
      <div className="empty-table-state">
        <p>No payments found.</p>
      </div>
    );
  }

  // Status badge styling helper
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Paid':
        return 'badge-paid';
      case 'Pending':
        return 'badge-pending';
      case 'Failed':
        return 'badge-failed';
      case 'Refunded':
        return 'badge-refunded';
      default:
        return 'badge-paid';
    }
  };

  return (
    <div className="calls-table-container">
      <table className="calls-table">
        <thead>
          <tr>
            <th>Payment ID</th>
            <th>Customer</th>
            <th>Amount</th>
            <th>Payment For</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr
              key={payment.id}
              className="clickable-row"
              onClick={() => onSelectPayment(payment)}
            >
              <td style={{ fontWeight: '700', color: 'var(--primary)' }}>
                {payment.id}
              </td>
              <td style={{ fontWeight: '600' }}>{payment.customerName}</td>
              <td style={{ fontWeight: '700', color: 'var(--text-dark)' }}>
                {payment.amount}
              </td>
              <td>{payment.paymentFor}</td>
              <td style={{ color: 'var(--text-muted)' }}>{payment.date}</td>
              <td>
                <span className={`badge ${getStatusBadgeClass(payment.status)}`}>
                  {payment.status}
                </span>
              </td>
              <td onClick={(e) => e.stopPropagation()}>
                <button
                  className="btn-action-view"
                  onClick={() => onSelectPayment(payment)}
                  title="View Payment Details"
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
