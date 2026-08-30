// ==========================================
// PAYMENT DETAILS COMPONENT (PaymentDetails.jsx)
// ==========================================
// Renders detailed view for a single customer payment record.

import React from 'react';
import { ArrowLeft, CreditCard, User, Calendar, DollarSign, CheckCircle } from 'lucide-react';

export default function PaymentDetails({ payment, onBack }) {
  if (!payment) return null;

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
    <div className="profile-container">
      {/* Back Button */}
      <button className="btn-back" onClick={onBack}>
        <ArrowLeft size={16} />
        Back to Payments
      </button>

      {/* Header Banner Card */}
      <div className="profile-header-card">
        <div
          className="profile-avatar"
          style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}
        >
          <CreditCard size={28} />
        </div>
        <div className="profile-main-info">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <h2 className="profile-name">{payment.id} — {payment.amount}</h2>
            <span className={`badge ${getStatusBadgeClass(payment.status)}`}>
              {payment.status}
            </span>
          </div>
          <div className="profile-meta-tags">
            <span className="meta-tag">
              <User size={14} /> {payment.customerName}
            </span>
            <span className="meta-tag">
              <Calendar size={14} /> Date: {payment.date}
            </span>
            <span className="meta-tag">
              <DollarSign size={14} /> For: {payment.paymentFor}
            </span>
          </div>
        </div>
      </div>

      {/* Payment Information Grid */}
      <div className="content-section" style={{ marginTop: '20px' }}>
        <div className="section-header" style={{ marginBottom: '16px' }}>
          <h3 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle size={18} color="var(--primary)" />
            Payment Details
          </h3>
        </div>

        <div className="info-grid">
          <div className="info-item">
            <span className="info-label">Payment ID</span>
            <span className="info-value">{payment.id}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Customer</span>
            <span className="info-value">{payment.customerName}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Amount</span>
            <span className="info-value" style={{ fontWeight: '700', color: 'var(--primary)' }}>
              {payment.amount}
            </span>
          </div>
          <div className="info-item">
            <span className="info-label">Payment For</span>
            <span className="info-value">{payment.paymentFor}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Transaction Date</span>
            <span className="info-value">{payment.date}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Status</span>
            <span className="info-value">
              <span className={`badge ${getStatusBadgeClass(payment.status)}`}>
                {payment.status}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
