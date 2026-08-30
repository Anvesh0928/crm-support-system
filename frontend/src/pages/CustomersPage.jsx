// ==========================================
// CUSTOMERS PAGE COMPONENT (CustomersPage.jsx)
// ==========================================
// Core module page managing search, list table, add modal, and customer profile details.

import React, { useState, useEffect } from 'react';
import { UserPlus, Search, CheckCircle } from 'lucide-react';
import CustomerTable from '../components/CustomerTable';
import AddCustomerModal from '../components/AddCustomerModal';
import CustomerProfile from '../components/CustomerProfile';

// Initial default dummy customers list
const INITIAL_CUSTOMERS = [
  {
    id: 1,
    name: 'Rahul Sharma',
    phone: '+91 9876543210',
    email: 'rahul@example.com',
    language: 'Hindi',
    totalCalls: 5,
    openTickets: 1,
    bookings: 2,
    payments: '₹4,999',
    lastContact: 'Today',
    status: 'Active',
    createdAt: '2026-01-15'
  },
  {
    id: 2,
    name: 'Priya Verma',
    phone: '+91 9876543222',
    email: 'priya@example.com',
    language: 'English',
    totalCalls: 3,
    openTickets: 0,
    bookings: 1,
    payments: '₹2,500',
    lastContact: 'Yesterday',
    status: 'Active',
    createdAt: '2026-02-01'
  },
  {
    id: 3,
    name: 'Amit Singh',
    phone: '+91 9876543233',
    email: 'amit@example.com',
    language: 'Hinglish',
    totalCalls: 8,
    openTickets: 2,
    bookings: 4,
    payments: '₹8,200',
    lastContact: '2 days ago',
    status: 'Inactive',
    createdAt: '2026-01-20'
  }
];

export default function CustomersPage({ tickets, onUpdateTicket }) {
  // State for customer records, initialized from localStorage if available
  const [customers, setCustomers] = useState(() => {
    try {
      const saved = localStorage.getItem('astrobharatai_customers');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.log('Error reading customers from localStorage:', e);
    }
    return INITIAL_CUSTOMERS;
  });

  // Search filter query state
  const [searchQuery, setSearchQuery] = useState('');

  // Selected customer for Profile view (null = showing list)
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Modal visibility state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Success message banner state
  const [successMessage, setSuccessMessage] = useState('');

  // Synchronize initial data with backend if available and not set locally
  useEffect(() => {
    async function syncBackendCustomers() {
      try {
        const response = await fetch('http://localhost:5000/api/customers');
        const data = await response.json();
        if (data && data.success && Array.isArray(data.customers) && data.customers.length > 0) {
          // If local storage is empty, populate from backend
          const saved = localStorage.getItem('astrobharatai_customers');
          if (!saved) {
            setCustomers(data.customers);
            localStorage.setItem('astrobharatai_customers', JSON.stringify(data.customers));
          }
        }
      } catch (error) {
        console.log('Backend server offline. Relying on browser local storage persistence.', error);
      }
    }

    syncBackendCustomers();
  }, []);

  // Filter customers by name or phone query safely
  const filteredCustomers = (customers || []).filter((c) => {
    if (!c) return false;
    const q = searchQuery.toLowerCase();
    const nameMatch = c.name ? c.name.toLowerCase().includes(q) : false;
    const phoneMatch = c.phone ? c.phone.toLowerCase().includes(q) : false;
    return nameMatch || phoneMatch;
  });

  // Handle saving a new customer
  const handleSaveCustomer = async (newCustData) => {
    const newCustObj = {
      id: Date.now(),
      ...newCustData,
      totalCalls: 0,
      openTickets: 0,
      bookings: 0,
      payments: '₹0',
      lastContact: 'Just now',
      status: 'Active',
      createdAt: new Date().toISOString().split('T')[0]
    };

    // Update state and save to browser local storage for persistence across refreshes
    const updatedCustomers = [newCustObj, ...customers];
    setCustomers(updatedCustomers);
    try {
      localStorage.setItem('astrobharatai_customers', JSON.stringify(updatedCustomers));
    } catch (e) {
      console.log('Error saving customer to localStorage:', e);
    }

    // Send to backend if available
    try {
      await fetch('http://localhost:5000/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCustData)
      });
    } catch (e) {
      console.log('Backend post skipped or offline:', e);
    }

    // Close modal and show success toast
    setIsModalOpen(false);
    setSuccessMessage(`Customer "${newCustData.name}" added successfully!`);

    // Auto clear notification after 4 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 4000);
  };

  // If a customer is selected, render their Profile View
  if (selectedCustomer) {
    return (
      <CustomerProfile
        customer={selectedCustomer}
        onBack={() => setSelectedCustomer(null)}
        tickets={tickets}
        onUpdateTicket={onUpdateTicket}
      />
    );
  }

  // Otherwise render the Customer List page
  return (
    <div className="customers-page">
      {/* Success Notification Banner */}
      {successMessage && (
        <div className="toast-success">
          <CheckCircle size={18} />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Top Section Header & Add Button */}
      <div className="customers-header">
        <div>
          <h1 className="page-title">Customers</h1>
          <p className="page-subtitle">View and manage AstroBharatAI customers.</p>
        </div>

        <button
          className="btn-primary-action"
          onClick={() => setIsModalOpen(true)}
        >
          <UserPlus size={18} style={{ marginRight: '6px' }} />
          + Add Customer
        </button>
      </div>

      {/* Search Input Bar */}
      <div className="customers-controls">
        <div className="search-box-large">
          <Search size={18} color="#94a3b8" />
          <input
            type="text"
            className="search-input"
            placeholder="Search customer by name or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Customers List Table */}
      <div className="content-section" style={{ marginTop: '20px' }}>
        <CustomerTable
          customers={filteredCustomers}
          onSelectCustomer={setSelectedCustomer}
        />
      </div>

      {/* Modal Dialog for Adding Customer */}
      <AddCustomerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveCustomer}
      />
    </div>
  );
}
