// ==========================================
// BOOKINGS TABLE COMPONENT (BookingsTable.jsx)
// ==========================================
// Renders the list of bookings in a clean, interactive table.

import React from 'react';
import { Eye } from 'lucide-react';

export default function BookingsTable({ bookings, onSelectBooking }) {
  if (!bookings || bookings.length === 0) {
    return (
      <div className="empty-table-state">
        <p>No bookings found.</p>
      </div>
    );
  }

  // Status badge styling helper
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Confirmed':
        return 'badge-confirmed';
      case 'Pending':
        return 'badge-pending';
      case 'Cancelled':
        return 'badge-cancelled';
      case 'Completed':
        return 'badge-completed';
      default:
        return 'badge-confirmed';
    }
  };

  return (
    <div className="calls-table-container">
      <table className="calls-table">
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Customer</th>
            <th>Service</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr
              key={booking.id}
              className="clickable-row"
              onClick={() => onSelectBooking(booking)}
            >
              <td style={{ fontWeight: '700', color: 'var(--primary)' }}>
                {booking.id}
              </td>
              <td style={{ fontWeight: '600' }}>{booking.customerName}</td>
              <td>{booking.service}</td>
              <td style={{ color: 'var(--text-muted)' }}>{booking.date}</td>
              <td style={{ color: 'var(--text-muted)' }}>{booking.time}</td>
              <td>
                <span className={`badge ${getStatusBadgeClass(booking.status)}`}>
                  {booking.status}
                </span>
              </td>
              <td onClick={(e) => e.stopPropagation()}>
                <button
                  className="btn-action-view"
                  onClick={() => onSelectBooking(booking)}
                  title="View Booking Details"
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
