// ==========================================
// PAYMENTS PAGE COMPONENT (PaymentsPage.jsx)
// ==========================================
// Displays customer payments list, + Add Payment modal form, and Payment Details view.

import React, { useState } from 'react';
import { PlusCircle, CheckCircle } from 'lucide-react';
import PaymentsTable from '../components/PaymentsTable';
import PaymentDetails from '../components/PaymentDetails';
import AddPaymentModal from '../components/AddPaymentModal';
import { DUMMY_PAYMENTS } from '../data/mockPayments';

export default function PaymentsPage() {
  const [payments, setPayments] = useState(DUMMY_PAYMENTS);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Handle creating a new payment
  const handleSavePayment = (newPaymentData) => {
    const nextNum = payments.length + 1;
    const formattedNum = nextNum < 10 ? `00${nextNum}` : `0${nextNum}`;
    const newPaymentObj = {
      id: `PAY-${formattedNum}`,
      ...newPaymentData
    };

    setPayments([newPaymentObj, ...payments]);
    setIsModalOpen(false);
    setSuccessMessage(`Payment "${newPaymentObj.id}" created successfully!`);

    setTimeout(() => {
      setSuccessMessage('');
    }, 4000);
  };

  // If a payment is selected, render PaymentDetails view
  if (selectedPayment) {
    return (
      <PaymentDetails
        payment={selectedPayment}
        onBack={() => setSelectedPayment(null)}
      />
    );
  }

  return (
    <div className="payments-page">
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
          <h1 className="page-title">Payments</h1>
          <p className="page-subtitle">View and manage customer payment records.</p>
        </div>

        <button
          className="btn-primary-action"
          onClick={() => setIsModalOpen(true)}
        >
          <PlusCircle size={18} style={{ marginRight: '6px' }} />
          + Add Payment
        </button>
      </div>

      {/* Payments List Table */}
      <div className="content-section" style={{ marginTop: '20px' }}>
        <PaymentsTable
          payments={payments}
          onSelectPayment={setSelectedPayment}
        />
      </div>

      {/* Modal Dialog for Adding Payment */}
      <AddPaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSavePayment}
      />
    </div>
  );
}
