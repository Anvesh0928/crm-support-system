// ==========================================
// MOCK CALLS DATA (mockCalls.js)
// ==========================================
// Central list of call records used across Calls page & Customer Profile.
// Each call record is linked to a customer using the `customerId` property
// and contains a `conversation` array for chat transcripts.

export const DUMMY_CALLS = [
  {
    id: 1,
    customerId: 1, // Rahul Sharma (Customer id: 1)
    customerName: 'Rahul Sharma',
    phone: '+91 9876543210',
    type: 'Incoming',
    intent: 'Consultation',
    duration: '04:32',
    status: 'Resolved',
    date: '12 Aug 2026',
    time: '10:30 AM',
    handledBy: 'AI',
    summary: 'Customer called regarding consultation booking. Customer requested information about available consultation options.',
    resolution: 'Customer was provided with consultation information.',
    conversation: [
      {
        speaker: 'customer',
        message: 'Namaste, mujhe astrologer se consultation book karni hai.',
        time: '10:30 AM'
      },
      {
        speaker: 'ai',
        message: 'Namaste Rahul Ji! AstroBharatAI mein aapka swagat hai. Aap kis topic par consultation lena chahte hain?',
        time: '10:30 AM'
      },
      {
        speaker: 'customer',
        message: 'Career aur business growth ke regarding batana tha.',
        time: '10:31 AM'
      },
      {
        speaker: 'ai',
        message: 'Samajh gaya. Senior Acharya Ji ke paas aaj shaam 4 baje aur kal subah 11 baje slots available hain. Kaunsa timing comfortable rahega?',
        time: '10:31 AM'
      },
      {
        speaker: 'customer',
        message: 'Kal subah 11 baje ka slot book kar dijiye.',
        time: '10:32 AM'
      },
      {
        speaker: 'ai',
        message: 'Aapka slot kal subah 11 baje confirm kar diya gaya hai. Confirmation message WhatsApp par bhej diya gaya hai.',
        time: '10:32 AM'
      }
    ]
  },
  {
    id: 2,
    customerId: 2, // Priya Verma (Customer id: 2)
    customerName: 'Priya Verma',
    phone: '+91 9876543222',
    type: 'Incoming',
    intent: 'Booking',
    duration: '02:15',
    status: 'Answered',
    date: '12 Aug 2026',
    time: '11:15 AM',
    handledBy: 'Human Agent',
    summary: 'Customer called to book a horoscope reading session for upcoming family event.',
    resolution: 'Appointment scheduled for 15 Aug 2026 at 4:00 PM.',
    conversation: [
      {
        speaker: 'customer',
        message: 'Hello, I want to book a Kundli reading slot for my brother.',
        time: '11:15 AM'
      },
      {
        speaker: 'agent',
        message: 'Hello Priya Ji! I can help you with that right away. Could you share his date of birth?',
        time: '11:15 AM'
      },
      {
        speaker: 'customer',
        message: 'Yes, 14th March 1998, born in Delhi at 6:30 AM.',
        time: '11:16 AM'
      },
      {
        speaker: 'agent',
        message: 'Thank you! I have noted the birth details. The session is scheduled for 15th Aug at 4:00 PM.',
        time: '11:17 AM'
      }
    ]
  },
  {
    id: 3,
    customerId: 3, // Amit Singh (Customer id: 3)
    customerName: 'Amit Singh',
    phone: '+91 9876543233',
    type: 'Outgoing',
    intent: 'Payment',
    duration: '01:45',
    status: 'Missed',
    date: '12 Aug 2026',
    time: '11:50 AM',
    handledBy: 'AI',
    summary: 'Automated payment reminder call for pending consultation fee.',
    resolution: 'Call was missed by customer. Follow-up SMS queued.',
    conversation: [] // Empty conversation to test empty state
  },
  {
    id: 4,
    customerId: 1, // Rahul Sharma (Customer id: 1)
    customerName: 'Rahul Sharma',
    phone: '+91 9876543210',
    type: 'Incoming',
    intent: 'Booking',
    duration: '02:15',
    status: 'Answered',
    date: '11 Aug 2026',
    time: '02:20 PM',
    handledBy: 'Human Agent',
    summary: 'Customer called to follow up on consultation booking confirmation.',
    resolution: 'Booking confirmed for Acharya Ji session.',
    conversation: [
      {
        speaker: 'customer',
        message: 'Hi, Maine kal slot book kiya tha, kya Google Meet link ready hai?',
        time: '02:20 PM'
      },
      {
        speaker: 'agent',
        message: 'Ji Rahul Ji, meeting link generate ho chuka hai aur aapke registered email par send kar diya gaya hai.',
        time: '02:21 PM'
      }
    ]
  },
  {
    id: 5,
    customerId: 1, // Rahul Sharma (Customer id: 1)
    customerName: 'Rahul Sharma',
    phone: '+91 9876543210',
    type: 'Outgoing',
    intent: 'Support',
    duration: '03:10',
    status: 'Answered',
    date: '10 Aug 2026',
    time: '03:45 PM',
    handledBy: 'Human Agent',
    summary: 'Follow-up call to provide Kundli analysis report details.',
    resolution: 'Report sent to customer via email.',
    conversation: [
      {
        speaker: 'agent',
        message: 'Hello Rahul Ji, main AstroBharatAI support team se bol raha hoon. Aapki Kundli report tayar hai.',
        time: '03:45 PM'
      },
      {
        speaker: 'customer',
        message: 'Thank you! Kya report PDF format mein email par mil jayegi?',
        time: '03:46 PM'
      },
      {
        speaker: 'agent',
        message: 'Ji haan, PDF report aapke email par bhej di gayi hai.',
        time: '03:46 PM'
      }
    ]
  },
  {
    id: 6,
    customerId: 2, // Priya Verma (Customer id: 2)
    customerName: 'Priya Verma',
    phone: '+91 9876543222',
    type: 'Outgoing',
    intent: 'Support',
    duration: '05:05',
    status: 'Answered',
    date: '10 Aug 2026',
    time: '09:30 AM',
    handledBy: 'Human Agent',
    summary: 'Follow-up support call regarding remedies post-consultation.',
    resolution: 'Customer clarified steps for recommended remedies.',
    conversation: [
      {
        speaker: 'agent',
        message: 'Hello Priya Ji, calling to follow up on your remedies query.',
        time: '09:30 AM'
      },
      {
        speaker: 'customer',
        message: 'Yes, I wanted to confirm the gemstone wearing day.',
        time: '09:31 AM'
      },
      {
        speaker: 'agent',
        message: 'Yellow Sapphire should be worn on Thursday morning during Shukla Paksha.',
        time: '09:32 AM'
      }
    ]
  },
  {
    id: 7,
    customerId: 3, // Amit Singh (Customer id: 3)
    customerName: 'Amit Singh',
    phone: '+91 9876543233',
    type: 'Incoming',
    intent: 'Booking',
    duration: '03:12',
    status: 'Resolved',
    date: '10 Aug 2026',
    time: '01:15 PM',
    handledBy: 'AI',
    summary: 'Customer requested video call slot booking for marriage matching.',
    resolution: 'Slot confirmed and Google Meet link shared via WhatsApp.',
    conversation: [
      {
        speaker: 'customer',
        message: 'Marriage Kundli matching ke liye slot chahiye.',
        time: '01:15 PM'
      },
      {
        speaker: 'ai',
        message: 'Ji, horoscope matching consultation ke slots 12 Aug shaam 6 baje available hain. Confirm karoon?',
        time: '01:15 PM'
      },
      {
        speaker: 'customer',
        message: 'Haan, confirm kar dijiye.',
        time: '01:16 PM'
      }
    ]
  },
  {
    id: 8,
    customerId: 2, // Priya Verma (Customer id: 2)
    customerName: 'Priya Verma',
    phone: '+91 9876543222',
    type: 'Incoming',
    intent: 'Payment',
    duration: '01:20',
    status: 'Missed',
    date: '09 Aug 2026',
    time: '04:10 PM',
    handledBy: 'AI',
    summary: 'Customer called regarding UPI payment confirmation error.',
    resolution: 'Call disconnected before completion. Ticket created automatically.',
    conversation: []
  },
  {
    id: 9,
    customerId: 3, // Amit Singh (Customer id: 3)
    customerName: 'Amit Singh',
    phone: '+91 9876543233',
    type: 'Outgoing',
    intent: 'Consultation',
    duration: '08:40',
    status: 'Answered',
    date: '09 Aug 2026',
    time: '05:30 PM',
    handledBy: 'Human Agent',
    summary: 'Scheduled phone consultation session with Acharya Ji.',
    resolution: 'Detailed Kundli analysis provided during 8 minute call.',
    conversation: [
      {
        speaker: 'customer',
        message: 'Acharya Ji se 10 minute phone consultation karni thi.',
        time: '05:30 PM'
      },
      {
        speaker: 'agent',
        message: 'Ji Suresh Ji, Acharya Ji line par hain, main call connect kar raha hoon.',
        time: '05:31 PM'
      }
    ]
  }
];
