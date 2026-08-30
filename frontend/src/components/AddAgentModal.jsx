// ==========================================
// ADD AGENT MODAL (AddAgentModal.jsx)
// ==========================================
// Form popup to collect new agent details manually without pre-filled values.

import React, { useState } from 'react';
import { X, UserPlus } from 'lucide-react';

const DEPARTMENT_OPTIONS = [
  'Customer Support',
  'Booking',
  'Payments',
  'Sales'
];

export default function AddAgentModal({ isOpen, onClose, onSave }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('Customer Support');
  const [status, setStatus] = useState('Offline');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !email.trim()) return;

    onSave({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      department,
      status,
      totalCalls: 0
    });

    // Reset form fields to empty / default
    setName('');
    setPhone('');
    setEmail('');
    setDepartment('Customer Support');
    setStatus('Offline');
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <UserPlus size={20} className="modal-icon" />
            <h2 className="modal-title">Create New Agent</h2>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {/* Full Name Field */}
          <div className="form-group">
            <label htmlFor="agentFullName">Full Name</label>
            <input
              id="agentFullName"
              type="text"
              className="input-field"
              placeholder="e.g. Sanya Mehta"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Phone Field */}
          <div className="form-group">
            <label htmlFor="agentPhone">Phone Number</label>
            <input
              id="agentPhone"
              type="text"
              className="input-field"
              placeholder="e.g. +91 98765 66666"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="agentEmail">Email Address</label>
            <input
              id="agentEmail"
              type="email"
              className="input-field"
              placeholder="e.g. sanya@astrobharat.ai"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Department Field */}
          <div className="form-group">
            <label htmlFor="agentDepartment">Department</label>
            <select
              id="agentDepartment"
              className="input-field select-field"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              {DEPARTMENT_OPTIONS.map((dept, idx) => (
                <option key={idx} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          {/* Status Field (Default Offline) */}
          <div className="form-group">
            <label htmlFor="agentStatus">Status</label>
            <select
              id="agentStatus"
              className="input-field select-field"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Offline">Offline</option>
              <option value="Online">Online</option>
              <option value="Busy">Busy</option>
            </select>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Create Agent
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
