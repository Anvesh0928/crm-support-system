// ==========================================
// BOOKING DETAILS COMPONENT (BookingDetails.jsx)
// ==========================================
// Renders detailed view for a single customer booking record.

import React from 'react';
import { ArrowLeft, CalendarCheck, User, Calendar, Clock, Sparkles } from 'lucide-react';

export default function BookingDetails({ booking, onBack }) {
  if (!booking) return null;

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
    <div className="profile-container">
      {/* Back Button */}
      <button className="btn-back" onClick={onBack}>
        <ArrowLeft size={16} />
        Back to Bookings
      </button>

      {/* Header Banner Card */}
      <div className="profile-header-card">
        <div
          className="profile-avatar"
          style={{ background: 'linear-gradient(135deg, #7c3aed, #4f46e5)' }}
        >
          <CalendarCheck size={28} />
        </div>
        <div className="profile-main-info">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <h2 className="profile-name">{booking.id} — {booking.service}</h2>
            <span className={`badge ${getStatusBadgeClass(booking.status)}`}>
              {booking.status}
            </span>
          </div>
          <div className="profile-meta-tags">
            <span className="meta-tag">
              <User size={14} /> {booking.customerName}
            </span>
            <span className="meta-tag">
              <Calendar size={14} /> Date: {booking.date}
            </span>
            <span className="meta-tag">
              <Clock size={14} /> Time: {booking.time}
            </span>
          </div>
        </div>
      </div>

      {/* Booking Information Grid */}
      <div className="content-section" style={{ marginTop: '20px' }}>
        <div className="section-header" style={{ marginBottom: '16px' }}>
          <h3 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={18} color="var(--primary)" />
            Booking Details
          </h3>
        </div>

        <div className="info-grid">
          <div className="info-item">
            <span className="info-label">Booking ID</span>
            <span className="info-value">{booking.id}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Customer</span>
            <span className="info-value">{booking.customerName}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Service</span>
            <span className="info-value">{booking.service}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Scheduled Date</span>
            <span className="info-value">{booking.date}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Scheduled Time</span>
            <span className="info-value">{booking.time}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Status</span>
            <span className="info-value">
              <span className={`badge ${getStatusBadgeClass(booking.status)}`}>
                {booking.status}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
