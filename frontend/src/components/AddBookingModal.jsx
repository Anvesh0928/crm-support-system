// ==========================================
// ADD BOOKING MODAL (AddBookingModal.jsx)
// ==========================================
// Form popup to collect new booking details.

import React, { useState } from 'react';
import { X, CalendarCheck } from 'lucide-react';

const CUSTOMER_OPTIONS = [
  { id: 1, name: 'Rahul Sharma' },
  { id: 2, name: 'Priya Verma' },
  { id: 3, name: 'Amit Singh' }
];

const SERVICE_OPTIONS = [
  'Astrology Consultation',
  'Kundli Consultation',
  'Pooja',
  'Course Consultation'
];

export default function AddBookingModal({ isOpen, onClose, onSave }) {
  const [selectedCustomerId, setSelectedCustomerId] = useState(1);
  const [service, setService] = useState('Astrology Consultation');
  const [date, setDate] = useState('18 Aug 2026');
  const [time, setTime] = useState('03:00 PM');
  const [status, setStatus] = useState('Pending');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const chosenCust =
      CUSTOMER_OPTIONS.find((c) => c.id === Number(selectedCustomerId)) ||
      CUSTOMER_OPTIONS[0];

    onSave({
      customerId: chosenCust.id,
      customerName: chosenCust.name,
      service,
      date,
      time,
      status
    });

    // Reset default fields
    setSelectedCustomerId(1);
    setService('Astrology Consultation');
    setDate('18 Aug 2026');
    setTime('03:00 PM');
    setStatus('Pending');
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <CalendarCheck size={20} className="modal-icon" />
            <h2 className="modal-title">Create New Booking</h2>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {/* Customer Select Field */}
          <div className="form-group">
            <label htmlFor="bookingCustomer">Customer</label>
            <select
              id="bookingCustomer"
              className="input-field select-field"
              value={selectedCustomerId}
              onChange={(e) => setSelectedCustomerId(e.target.value)}
            >
              {CUSTOMER_OPTIONS.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Service Field */}
          <div className="form-group">
            <label htmlFor="bookingService">Service</label>
            <select
              id="bookingService"
              className="input-field select-field"
              value={service}
              onChange={(e) => setService(e.target.value)}
            >
              {SERVICE_OPTIONS.map((s, idx) => (
                <option key={idx} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Date Field */}
          <div className="form-group">
            <label htmlFor="bookingDate">Date</label>
            <input
              id="bookingDate"
              type="text"
              className="input-field"
              placeholder="e.g. 18 Aug 2026"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          {/* Time Field */}
          <div className="form-group">
            <label htmlFor="bookingTime">Time</label>
            <input
              id="bookingTime"
              type="text"
              className="input-field"
              placeholder="e.g. 03:00 PM"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>

          {/* Status Field (Default Pending) */}
          <div className="form-group">
            <label htmlFor="bookingStatus">Status</label>
            <select
              id="bookingStatus"
              className="input-field select-field"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Create Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
