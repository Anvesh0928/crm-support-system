// ==========================================
// MAIN DASHBOARD CONTROLLER (DashboardPage.jsx)
// ==========================================
// This is the core page controlling the AstroBharatAI Customer Support dashboard layout.
// Integrates Left Sidebar, Top Header, Metric Cards, Recent Calls, Customers, Calls, Tickets, Bookings, Payments, and Agents.

import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import StatsCards from '../components/StatsCards';
import RecentCalls from '../components/RecentCalls';
import ComingSoon from '../components/ComingSoon';
import CustomersPage from './CustomersPage';
import CallsPage from './CallsPage';
import TicketsPage from './TicketsPage';
import BookingsPage from './BookingsPage';
import PaymentsPage from './PaymentsPage';
import AgentsPage from './AgentsPage';
import { DUMMY_TICKETS } from '../data/mockTickets';

export default function DashboardPage({ user, onLogout }) {
  // State to track which sidebar menu tab is active
  const [activeTab, setActiveTab] = useState('Dashboard');

  // Central tickets state for real-time ticket updates across Dashboard, Customers, and Tickets modules
  const [tickets, setTickets] = useState(DUMMY_TICKETS);

  // Dashboard metrics state
  const [stats, setStats] = useState({
    totalCustomers: 1248,
    todaysCalls: 84,
    openTickets: 12,
    aiResolvedCalls: 68
  });

  // Recent call logs state
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch dashboard data from Express backend API
  useEffect(() => {
    async function fetchDashboardData() {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/dashboard');
        const data = await response.json();

        if (data && data.success) {
          setStats(data.stats);
          setCalls(data.recentCalls);
        }
      } catch (error) {
        console.log('Backend not connected or running offline. Using default dummy data.', error);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  // Update single ticket in central state
  const handleUpdateTicket = (updatedTicket) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === updatedTicket.id ? updatedTicket : t))
    );
  };

  // Calculate dynamic count of open tickets in real-time
  const openTicketsCount = tickets.filter((t) => t.status !== 'Resolved').length;

  // Dynamic metrics object with real-time open tickets count
  const dynamicStats = {
    ...stats,
    openTickets: openTicketsCount
  };

  return (
    <div className="app-container">
      {/* 1. Left Sidebar Navigation */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} userRole={user?.role} />

      {/* 2. Main Content Wrapper */}
      <div className="main-wrapper">
        {/* 3. Top Header */}
        <Header user={user} onLogout={onLogout} />

        {/* 4. Dynamic Body Section */}
        <main className="dashboard-body">
          {/* Conditional Rendering based on active sidebar tab */}
          {activeTab === 'Dashboard' && (
            <>
              <div className="page-title-section">
                <h1 className="page-title">Dashboard</h1>
                <p className="page-subtitle">
                  Welcome to AstroBharatAI Customer Support overview
                </p>
              </div>

              {/* 4 Overview Metric Cards with Dynamic Open Tickets count */}
              <StatsCards stats={dynamicStats} />

              {/* Recent Calls Section */}
              {loading ? (
                <div className="loading-box">Loading call details...</div>
              ) : (
                <RecentCalls calls={calls} />
              )}
            </>
          )}

          {activeTab === 'Customers' && (
            <CustomersPage
              tickets={tickets}
              setTickets={setTickets}
              onUpdateTicket={handleUpdateTicket}
            />
          )}

          {activeTab === 'Calls' && <CallsPage />}

          {activeTab === 'Tickets' && (
            <TicketsPage
              tickets={tickets}
              setTickets={setTickets}
              onUpdateTicket={handleUpdateTicket}
            />
          )}

          {activeTab === 'Bookings' && <BookingsPage />}

          {activeTab === 'Payments' && <PaymentsPage />}

          {activeTab === 'Agents' && <AgentsPage />}

          {activeTab !== 'Dashboard' && activeTab !== 'Customers' && activeTab !== 'Calls' && activeTab !== 'Tickets' && activeTab !== 'Bookings' && activeTab !== 'Payments' && activeTab !== 'Agents' && (
            <>
              <div className="page-title-section">
                <h1 className="page-title">{activeTab}</h1>
                <p className="page-subtitle">Manage your {activeTab} activities</p>
              </div>
              <ComingSoon title={activeTab} />
            </>
          )}
        </main>
      </div>
    </div>
  );
}
