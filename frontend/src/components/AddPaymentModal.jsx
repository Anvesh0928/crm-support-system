// ==========================================
// ADD PAYMENT MODAL (AddPaymentModal.jsx)
// ==========================================
// Form popup to collect new payment details manually without predefined values.

import React, { useState } from 'react';
import { X, CreditCard } from 'lucide-react';

export default function AddPaymentModal({ isOpen, onClose, onSave }) {
  const [customerName, setCustomerName] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentFor, setPaymentFor] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('Pending');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customerName.trim() || !amount.trim() || !paymentFor.trim() || !date.trim()) return;

    const formattedAmount = amount.trim().startsWith('₹')
      ? amount.trim()
      : `₹${amount.trim()}`;

    // Map customerName to customerId if matching existing dummy customers
    const customerMap = {
      'rahul sharma': 1,
      'priya verma': 2,
      'amit singh': 3
    };
    const customerId =
      customerMap[customerName.trim().toLowerCase()] || Date.now();

    onSave({
      customerId,
      customerName: customerName.trim(),
      amount: formattedAmount,
      paymentFor: paymentFor.trim(),
      date: date.trim(),
      status
    });

    // Reset form fields to empty
    setCustomerName('');
    setAmount('');
    setPaymentFor('');
    setDate('');
    setStatus('Pending');
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <CreditCard size={20} className="modal-icon" />
            <h2 className="modal-title">Create New Payment</h2>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {/* Customer Name Field (Manual Entry) */}
          <div className="form-group">
            <label htmlFor="paymentCustomerName">Customer Name</label>
            <input
              id="paymentCustomerName"
              type="text"
              className="input-field"
              placeholder="Enter customer name (e.g. Rahul Sharma)"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
            />
          </div>

          {/* Amount Field (Manual Entry) */}
          <div className="form-group">
            <label htmlFor="paymentAmount">Amount</label>
            <input
              id="paymentAmount"
              type="text"
              className="input-field"
              placeholder="e.g. ₹1,500"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          {/* Payment For Field (Manual Text Input Entry) */}
          <div className="form-group">
            <label htmlFor="paymentFor">Payment For</label>
            <input
              id="paymentFor"
              type="text"
              className="input-field"
              placeholder="e.g. Astrology Consultation"
              value={paymentFor}
              onChange={(e) => setPaymentFor(e.target.value)}
              required
            />
          </div>

          {/* Date Field (Manual Entry) */}
          <div className="form-group">
            <label htmlFor="paymentDate">Date</label>
            <input
              id="paymentDate"
              type="text"
              className="input-field"
              placeholder="e.g. 12 Aug 2026"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          {/* Status Field (Default Pending) */}
          <div className="form-group">
            <label htmlFor="paymentStatus">Status</label>
            <select
              id="paymentStatus"
              className="input-field select-field"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
              <option value="Failed">Failed</option>
              <option value="Refunded">Refunded</option>
            </select>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Create Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
