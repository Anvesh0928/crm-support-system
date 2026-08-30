// ==========================================
// ADD TICKET MODAL (AddTicketModal.jsx)
// ==========================================
// Form popup to collect new support ticket details manually.

import React, { useState } from 'react';
import { X, Ticket } from 'lucide-react';

export default function AddTicketModal({ isOpen, onClose, onSave }) {
  const [customerName, setCustomerName] = useState('');
  const [issue, setIssue] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customerName.trim() || !issue.trim() || !description.trim()) return;

    // Send manually typed ticket data to parent
    onSave({
      customerName: customerName.trim(),
      issue: issue.trim(),
      priority,
      description: description.trim()
    });

    // Reset form fields
    setCustomerName('');
    setIssue('');
    setPriority('Medium');
    setDescription('');
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <Ticket size={20} className="modal-icon" />
            <h2 className="modal-title">Create New Support Ticket</h2>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {/* Customer Name Field (Manual Text Input) */}
          <div className="form-group">
            <label htmlFor="ticketCustomerName">Customer Name</label>
            <input
              id="ticketCustomerName"
              type="text"
              className="input-field"
              placeholder="Enter customer name (e.g. Rahul Sharma)"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
            />
          </div>

          {/* Issue Field */}
          <div className="form-group">
            <label htmlFor="ticketIssue">Issue Title</label>
            <input
              id="ticketIssue"
              type="text"
              className="input-field"
              placeholder="e.g. Consultation booking issue"
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
              required
            />
          </div>

          {/* Priority Field */}
          <div className="form-group">
            <label htmlFor="ticketPriority">Priority</label>
            <select
              id="ticketPriority"
              className="input-field select-field"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          {/* Description Field */}
          <div className="form-group">
            <label htmlFor="ticketDescription">Description</label>
            <textarea
              id="ticketDescription"
              className="input-field"
              rows={3}
              placeholder="Provide details about the customer's issue..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              style={{ resize: 'vertical' }}
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Create Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
