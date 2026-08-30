// ==========================================
// ADD CUSTOMER MODAL (AddCustomerModal.jsx)
// ==========================================
// Form popup to collect new customer details.

import React, { useState } from 'react';
import { X, UserPlus } from 'lucide-react';

export default function AddCustomerModal({ isOpen, onClose, onSave }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [language, setLanguage] = useState('Hindi');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !phone || !email) return;

    // Send newly created customer data to parent
    onSave({ name, phone, email, language });

    // Reset form fields
    setName('');
    setPhone('');
    setEmail('');
    setLanguage('Hindi');
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <UserPlus size={20} className="modal-icon" />
            <h2 className="modal-title">Add New Customer</h2>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              type="text"
              className="input-field"
              placeholder="e.g. Ananya Sharma"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              id="phoneNumber"
              type="text"
              className="input-field"
              placeholder="e.g. +91 98765 43210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="emailAddr">Email Address</label>
            <input
              id="emailAddr"
              type="email"
              className="input-field"
              placeholder="e.g. ananya@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="prefLanguage">Preferred Language</label>
            <select
              id="prefLanguage"
              className="input-field select-field"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="Hindi">Hindi</option>
              <option value="English">English</option>
              <option value="Hinglish">Hinglish</option>
            </select>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Save Customer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
