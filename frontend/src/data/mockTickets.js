// ==========================================
// MOCK TICKETS DATA (mockTickets.js)
// ==========================================
// Central list of customer support ticket records.

export const DUMMY_TICKETS = [
  {
    id: 'TK-101',
    customerId: 1,
    customerName: 'Rahul Sharma',
    issue: 'Horoscope Report Delay',
    priority: 'High',
    status: 'Open',
    createdAt: '12 Aug 2026',
    description: 'Customer booked a Vedic Horoscope session on 10 Aug. PDF report has not been received via email yet.'
  },
  {
    id: 'TK-102',
    customerId: 2,
    customerName: 'Priya Verma',
    issue: 'UPI Payment Confirmation Error',
    priority: 'Medium',
    status: 'In Progress',
    createdAt: '12 Aug 2026',
    description: 'UPI payment was deducted from bank account but booking status did not update automatically.'
  },
  {
    id: 'TK-103',
    customerId: 3,
    customerName: 'Amit Singh',
    issue: 'Slot Rescheduling Request',
    priority: 'Low',
    status: 'Resolved',
    createdAt: '11 Aug 2026',
    description: 'Customer requested to reschedule Kundli consultation slot from 12 Aug to 15 Aug.'
  },
  {
    id: 'TK-104',
    customerId: 1,
    customerName: 'Rahul Sharma',
    issue: 'Gemstone Certificate Verification',
    priority: 'Medium',
    status: 'In Progress',
    createdAt: '10 Aug 2026',
    description: 'Customer requested lab certificate copy for recommended Blue Sapphire gemstone.'
  },
  {
    id: 'TK-105',
    customerId: 2,
    customerName: 'Priya Verma',
    issue: 'Puja Audio Recording Link Missing',
    priority: 'Low',
    status: 'Resolved',
    createdAt: '09 Aug 2026',
    description: 'Puja recording link requested after online Maha Mrityunjaya Jaap session.'
  },
  {
    id: 'TK-106',
    customerId: 3,
    customerName: 'Amit Singh',
    issue: 'Vastu Consultation Follow-up Call',
    priority: 'High',
    status: 'Open',
    createdAt: '09 Aug 2026',
    description: 'Customer requested 5-minute clarification call with Vastu expert regarding room placement.'
  }
];
