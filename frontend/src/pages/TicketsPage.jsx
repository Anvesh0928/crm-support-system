// ==========================================
// TICKETS PAGE COMPONENT (TicketsPage.jsx)
// ==========================================
// Fully functional tickets module supporting ticket list, search, modal creation,
// updating priority/status, closing tickets, and adding resolution notes.

import React, { useState } from 'react';
import { Search, PlusCircle, CheckCircle } from 'lucide-react';
import TicketsTable from '../components/TicketsTable';
import TicketDetails from '../components/TicketDetails';
import AddTicketModal from '../components/AddTicketModal';
import { DUMMY_TICKETS } from '../data/mockTickets';

export default function TicketsPage({
  tickets: propTickets,
  setTickets: propSetTickets,
  onUpdateTicket: propOnUpdateTicket
}) {
  const [localTickets, setLocalTickets] = useState(DUMMY_TICKETS);

  // Use props if provided from DashboardPage, otherwise use local state
  const tickets = propTickets || localTickets;
  const setTickets = propSetTickets || setLocalTickets;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Handle creating a new ticket
  const handleSaveTicket = (newTicketData) => {
    const customerMap = {
      'rahul sharma': 1,
      'priya verma': 2,
      'amit singh': 3
    };

    const nameKey = (newTicketData.customerName || '').toLowerCase().trim();
    const customerId = customerMap[nameKey] || Date.now();

    const newTicketObj = {
      id: `TK-${101 + tickets.length}`,
      customerId,
      ...newTicketData,
      status: 'Open',
      createdAt: '12 Aug 2026'
    };

    setTickets([newTicketObj, ...tickets]);
    setIsModalOpen(false);
    setSuccessMessage(`Ticket "${newTicketObj.id}" created successfully!`);

    setTimeout(() => {
      setSuccessMessage('');
    }, 4000);
  };

  // Handle updating an existing ticket's status, priority, or resolution note
  const handleUpdateTicket = (updatedTicket) => {
    if (propOnUpdateTicket) {
      propOnUpdateTicket(updatedTicket);
    } else {
      setTickets((prevTickets) =>
        prevTickets.map((t) => (t.id === updatedTicket.id ? updatedTicket : t))
      );
    }

    if (selectedTicket && selectedTicket.id === updatedTicket.id) {
      setSelectedTicket(updatedTicket);
    }

    setSuccessMessage(
      `Ticket "${updatedTicket.id}" updated (${updatedTicket.status} · ${updatedTicket.priority} Priority)!`
    );

    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  // Filter tickets based on search query (matches Ticket ID, Customer Name, or Issue)
  const filteredTickets = tickets.filter((ticket) => {
    const q = searchQuery.toLowerCase().trim();
    if (q === '') return true;
    const idMatch = ticket.id ? ticket.id.toLowerCase().includes(q) : false;
    const nameMatch = ticket.customerName ? ticket.customerName.toLowerCase().includes(q) : false;
    const issueMatch = ticket.issue ? ticket.issue.toLowerCase().includes(q) : false;
    return idMatch || nameMatch || issueMatch;
  });

  // If a ticket is selected, render TicketDetails view
  if (selectedTicket) {
    return (
      <TicketDetails
        ticket={selectedTicket}
        onBack={() => setSelectedTicket(null)}
        onUpdateTicket={handleUpdateTicket}
      />
    );
  }

  return (
    <div className="tickets-page">
      {/* Success Notification Banner */}
      {successMessage && (
        <div className="toast-success">
          <CheckCircle size={18} />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Page Header with Header Action Button */}
      <div className="customers-header">
        <div>
          <h1 className="page-title">Tickets</h1>
          <p className="page-subtitle">View and manage customer support tickets.</p>
        </div>

        <button
          className="btn-primary-action"
          onClick={() => setIsModalOpen(true)}
        >
          <PlusCircle size={18} style={{ marginRight: '6px' }} />
          + Add Ticket
        </button>
      </div>

      {/* Search Input Bar */}
      <div className="customers-controls" style={{ marginTop: '16px' }}>
        <div className="search-box-large">
          <Search size={18} color="#94a3b8" />
          <input
            type="text"
            className="search-input"
            placeholder="Search ticket or customer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Tickets List Table Section */}
      <div className="content-section" style={{ marginTop: '20px' }}>
        <TicketsTable
          tickets={filteredTickets}
          onSelectTicket={setSelectedTicket}
          onUpdateTicket={handleUpdateTicket}
        />
      </div>

      {/* Modal Dialog for Adding Ticket */}
      <AddTicketModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTicket}
      />
    </div>
  );
}
