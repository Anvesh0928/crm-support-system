// ==========================================
// MOCK PAYMENTS DATA (mockPayments.js)
// ==========================================
// Central list of customer payment records.

export const DUMMY_PAYMENTS = [
  {
    id: 'PAY-001',
    customerId: 1,
    customerName: 'Rahul Sharma',
    amount: '₹1,500',
    paymentFor: 'Astrology Consultation',
    date: '12 Aug 2026',
    status: 'Paid'
  },
  {
    id: 'PAY-002',
    customerId: 2,
    customerName: 'Priya Verma',
    amount: '₹2,100',
    paymentFor: 'Kundli Consultation',
    date: '12 Aug 2026',
    status: 'Pending'
  },
  {
    id: 'PAY-003',
    customerId: 3,
    customerName: 'Amit Singh',
    amount: '₹5,000',
    paymentFor: 'Pooja',
    date: '11 Aug 2026',
    status: 'Paid'
  },
  {
    id: 'PAY-004',
    customerId: 1,
    customerName: 'Rahul Sharma',
    amount: '₹3,500',
    paymentFor: 'Course',
    date: '10 Aug 2026',
    status: 'Refunded'
  },
  {
    id: 'PAY-005',
    customerId: 2,
    customerName: 'Priya Verma',
    amount: '₹1,200',
    paymentFor: 'Astrology Consultation',
    date: '09 Aug 2026',
    status: 'Failed'
  }
];
