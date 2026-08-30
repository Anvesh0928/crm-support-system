// ==========================================
// ASTROBHARATAI BACKEND SERVER (Node.js + Express)
// ==========================================
// This file runs our server. It handles HTTP requests from the React frontend.

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS so our React frontend can communicate with backend
app.use(cors());

// Middleware to parse incoming JSON data
app.use(express.json());

// ------------------------------------------
// DUMMY DATA FOR DASHBOARD & CUSTOMERS
// ------------------------------------------
const dashboardStats = {
  totalCustomers: 1248,
  todaysCalls: 84,
  openTickets: 12,
  aiResolvedCalls: 68
};

const recentCalls = [
  {
    id: 1,
    customer: "Rahul Sharma",
    phone: "+91 9876543210",
    intent: "Kundli Matching Query",
    status: "AI Resolved",
    time: "10:42 AM"
  },
  {
    id: 2,
    customer: "Priya Verma",
    phone: "+91 9876543222",
    intent: "Horoscope Booking",
    status: "Transferred",
    time: "11:15 AM"
  },
  {
    id: 3,
    customer: "Amit Singh",
    phone: "+91 9876543233",
    intent: "Gemstone Consultation",
    status: "AI Resolved",
    time: "11:50 AM"
  },
  {
    id: 4,
    customer: "Sneha Reddy",
    phone: "+91 9711223344",
    intent: "Puja Slot Availability",
    status: "Pending Ticket",
    time: "12:30 PM"
  },
  {
    id: 5,
    customer: "Vikram Malhotra",
    phone: "+91 9654321098",
    intent: "Vastu Shastra Guide",
    status: "AI Resolved",
    time: "01:10 PM"
  }
];

// Initial Dummy Customers List for Customers Module
let customers = [
  {
    id: 1,
    name: "Rahul Sharma",
    phone: "+91 9876543210",
    email: "rahul@example.com",
    language: "Hindi",
    totalCalls: 5,
    openTickets: 1,
    bookings: 2,
    payments: "₹4,999",
    lastContact: "Today",
    status: "Active",
    createdAt: "2026-01-15"
  },
  {
    id: 2,
    name: "Priya Verma",
    phone: "+91 9876543222",
    email: "priya@example.com",
    language: "English",
    totalCalls: 3,
    openTickets: 0,
    bookings: 1,
    payments: "₹2,500",
    lastContact: "Yesterday",
    status: "Active",
    createdAt: "2026-02-01"
  },
  {
    id: 3,
    name: "Amit Singh",
    phone: "+91 9876543233",
    email: "amit@example.com",
    language: "Hinglish",
    totalCalls: 8,
    openTickets: 2,
    bookings: 4,
    payments: "₹8,200",
    lastContact: "2 days ago",
    status: "Inactive",
    createdAt: "2026-01-20"
  }
];

// ------------------------------------------
// API ROUTES
// ------------------------------------------

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ message: "AstroBharatAI Customer Support API is running!" });
});

// Dashboard data endpoint
app.get('/api/dashboard', (req, res) => {
  res.json({
    success: true,
    stats: dashboardStats,
    recentCalls: recentCalls
  });
});

// GET all customers
app.get('/api/customers', (req, res) => {
  res.json({
    success: true,
    customers: customers
  });
});

// POST add a new customer
app.post('/api/customers', (req, res) => {
  const { name, phone, email, language } = req.body;

  if (!name || !phone || !email) {
    return res.status(400).json({ success: false, message: 'Name, phone, and email are required.' });
  }

  const newCustomer = {
    id: Date.now(),
    name,
    phone,
    email,
    language: language || 'Hindi',
    totalCalls: 0,
    openTickets: 0,
    bookings: 0,
    payments: '₹0',
    lastContact: 'Just now',
    status: 'Active',
    createdAt: new Date().toISOString().split('T')[0]
  };

  customers.unshift(newCustomer);

  res.status(201).json({
    success: true,
    message: 'Customer added successfully!',
    customer: newCustomer
  });
});

// Start listening for requests
app.listen(PORT, () => {
  console.log(`Server is running smoothly on http://localhost:${PORT}`);
});
