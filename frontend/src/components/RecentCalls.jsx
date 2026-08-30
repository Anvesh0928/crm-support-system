// ==========================================
// RECENT CALLS TABLE COMPONENT (RecentCalls.jsx)
// ==========================================
// Renders 5 recent customer call logs in a clean table.

import React from 'react';

export default function RecentCalls({ calls = [] }) {
  // Fallback dummy records if server response is not loaded yet
  const defaultCalls = [
    {
      id: 1,
      customer: 'Rahul Sharma',
      phone: '+91 98765 43210',
      intent: 'Kundli Matching Query',
      status: 'AI Resolved',
      time: '10:42 AM'
    },
    {
      id: 2,
      customer: 'Priya Patel',
      phone: '+91 98123 45678',
      intent: 'Horoscope Booking',
      status: 'Transferred',
      time: '11:15 AM'
    },
    {
      id: 3,
      customer: 'Amit Verma',
      phone: '+91 99887 76655',
      intent: 'Gemstone Consultation',
      status: 'AI Resolved',
      time: '11:50 AM'
    },
    {
      id: 4,
      customer: 'Sneha Reddy',
      phone: '+91 97112 23344',
      intent: 'Puja Slot Availability',
      status: 'Pending Ticket',
      time: '12:30 PM'
    },
    {
      id: 5,
      customer: 'Vikram Malhotra',
      phone: '+91 96543 21098',
      intent: 'Vastu Shastra Guide',
      status: 'AI Resolved',
      time: '01:10 PM'
    }
  ];

  const displayCalls = calls.length > 0 ? calls : defaultCalls;

  // Function to pick status badge CSS class
  const getBadgeClass = (status) => {
    switch (status) {
      case 'AI Resolved':
        return 'badge-resolved';
      case 'Transferred':
        return 'badge-transferred';
      case 'Pending Ticket':
        return 'badge-pending';
      default:
        return 'badge-resolved';
    }
  };

  return (
    <div className="content-section">
      <div className="section-header">
        <h3 className="section-title">Recent Calls</h3>
      </div>

      <div className="calls-table-container">
        <table className="calls-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Phone</th>
              <th>Intent</th>
              <th>Status</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {displayCalls.map((call) => (
              <tr key={call.id}>
                <td style={{ fontWeight: '600' }}>{call.customer}</td>
                <td style={{ color: 'var(--text-muted)' }}>{call.phone}</td>
                <td>{call.intent}</td>
                <td>
                  <span className={`badge ${getBadgeClass(call.status)}`}>
                    {call.status}
                  </span>
                </td>
                <td style={{ color: 'var(--text-muted)' }}>{call.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
