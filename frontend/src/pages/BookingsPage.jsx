// ==========================================
// BOOKINGS PAGE COMPONENT (BookingsPage.jsx)
// ==========================================
// Displays customer bookings list, + Add Booking modal form, and Booking Details view.

import React, { useState } from 'react';
import { PlusCircle, CheckCircle } from 'lucide-react';
import BookingsTable from '../components/BookingsTable';
import BookingDetails from '../components/BookingDetails';
import AddBookingModal from '../components/AddBookingModal';
import { DUMMY_BOOKINGS } from '../data/mockBookings';

export default function BookingsPage() {
  const [bookings, setBookings] = useState(DUMMY_BOOKINGS);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Handle creating a new booking
  const handleSaveBooking = (newBookingData) => {
    const nextNum = bookings.length + 1;
    const formattedNum = nextNum < 10 ? `00${nextNum}` : `0${nextNum}`;
    const newBookingObj = {
      id: `BK-${formattedNum}`,
      ...newBookingData
    };

    setBookings([newBookingObj, ...bookings]);
    setIsModalOpen(false);
    setSuccessMessage(`Booking "${newBookingObj.id}" created successfully!`);

    setTimeout(() => {
      setSuccessMessage('');
    }, 4000);
  };

  // If a booking is selected, render BookingDetails view
  if (selectedBooking) {
    return (
      <BookingDetails
        booking={selectedBooking}
        onBack={() => setSelectedBooking(null)}
      />
    );
  }

  return (
    <div className="bookings-page">
      {/* Success Notification Banner */}
      {successMessage && (
        <div className="toast-success">
          <CheckCircle size={18} />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="customers-header">
        <div>
          <h1 className="page-title">Bookings</h1>
          <p className="page-subtitle">View and manage customer bookings.</p>
        </div>

        <button
          className="btn-primary-action"
          onClick={() => setIsModalOpen(true)}
        >
          <PlusCircle size={18} style={{ marginRight: '6px' }} />
          + Add Booking
        </button>
      </div>

      {/* Bookings List Table */}
      <div className="content-section" style={{ marginTop: '20px' }}>
        <BookingsTable
          bookings={bookings}
          onSelectBooking={setSelectedBooking}
        />
      </div>

      {/* Modal Dialog for Adding Booking */}
      <AddBookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveBooking}
      />
    </div>
  );
}
