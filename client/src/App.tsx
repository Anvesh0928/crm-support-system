import React, { useState, useEffect } from 'react';
import { MainLayout } from './components/layout/MainLayout';
import { CRMPage } from './components/layout/Sidebar';
import { DashboardPage } from './pages/DashboardPage';
import { IncomingCallsPage } from './pages/IncomingCallsPage';
import { CustomerProfilePage } from './pages/CustomerProfilePage';
import { CallHistoryPage } from './pages/CallHistoryPage';
import { AgentPanelPage } from './pages/AgentPanelPage';
import { QueuePage } from './pages/QueuePage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { SupervisorDashboardPage } from './pages/SupervisorDashboardPage';
import { SettingsPage } from './pages/SettingsPage';
import { LoginModal } from './components/LoginModal';
import { DeveloperSimulatorPanel } from './components/shared/DeveloperSimulatorPanel';
import { ApiService } from './services/api.service';
import { initSocket, disconnectSocket } from './services/socket.service';
import { User, AgentStatus, Call, Utterance, Ticket, Customer, AgentPresence } from './types';

export const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [activePage, setActivePage] = useState<CRMPage>('dashboard');
  const [agentStatus, setAgentStatus] = useState<AgentStatus>('AVAILABLE');

  // Real-time & Cached Data States
  const [activeCall, setActiveCall] = useState<Call | null>(null);
  const [liveTranscript, setLiveTranscript] = useState<Utterance[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [calls, setCalls] = useState<Call[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [activeAgents, setActiveAgents] = useState<AgentPresence[]>([]);

  // Check for an existing saved JWT token when the application loads.
  // We use async/await inside an inner helper function because React useEffect hooks cannot be directly declared as async.
  useEffect(() => {
    const initializeUserSession = async () => {
      const savedToken = localStorage.getItem('token');
      if (!savedToken) return;

      try {
        // Fetch current user details from the backend using the saved token
        const response = await ApiService.getMe();
        
        if (response.success && response.data?.user) {
          setCurrentUser(response.data.user);
          setIsAuthenticated(true);
          setupRealtimeSocket(savedToken);
          await loadInitialData();
        } else {
          // Token is expired or invalid, so we clear it out to prevent broken state
          localStorage.removeItem('token');
        }
      } catch (error) {
        // If the server returns an auth error, wipe the invalid token cleanly
        localStorage.removeItem('token');
      }
    };

    initializeUserSession();
  }, []);

  const loadInitialData = async () => {
    try {
      const [ticketsRes, callsRes, customersRes, agentsRes] = await Promise.all([
        ApiService.getTickets(),
        ApiService.getCalls(),
        ApiService.getCustomers(),
        ApiService.getLiveAgents(),
      ]);

      if (ticketsRes.success) setTickets(ticketsRes.data.tickets || []);
      if (callsRes.success) setCalls(callsRes.data.calls || []);
      if (customersRes.success) setCustomers(customersRes.data.customers || []);
      if (agentsRes.success) setActiveAgents(agentsRes.data || []);
    } catch (err) {
      console.error('Failed to load initial data:', err);
    }
  };

  const setupRealtimeSocket = (token: string) => {
    const socket = initSocket(token);

    socket.on('call:started', (call: any) => {
      setActiveCall(call);
      setLiveTranscript([]);
    });

    socket.on('call:incoming', (data: any) => {
      setActiveCall({
        _id: data.callSid,
        exotelCallSid: data.callSid,
        customerId: data.customerName as any,
        fromNumber: data.fromNumber,
        toNumber: data.toNumber,
        direction: 'INBOUND',
        status: 'INITIATED',
        startTime: new Date().toISOString(),
        transcript: [],
      });
    });

    socket.on('call:transcript_chunk', (chunk: Utterance) => {
      setLiveTranscript((prev) => [...prev, chunk]);
    });

    socket.on('call:escalated', (data: any) => {
      setActiveCall(data.call);
    });

    socket.on('call:ended', (data: any) => {
      setActiveCall(null);
      if (data.call) {
        setCalls((prev) => [data.call, ...prev]);
      }
    });

    socket.on('ticket:created', (newTicket: Ticket) => {
      setTickets((prev) => [newTicket, ...prev]);
    });

    socket.on('agent:status_changed', (presence: AgentPresence) => {
      setActiveAgents((prev) => {
        const idx = prev.findIndex((a) => a.agentId === presence.agentId);
        if (idx >= 0) {
          const copy = [...prev];
          copy[idx] = presence;
          return copy;
        }
        return [...prev, presence];
      });
    });
  };

  const handleLoginSuccess = (token: string, user: User) => {
    localStorage.setItem('token', token);
    setCurrentUser(user);
    setIsAuthenticated(true);
    setupRealtimeSocket(token);
    loadInitialData();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    disconnectSocket();
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  const handleStatusChange = async (newStatus: AgentStatus) => {
    setAgentStatus(newStatus);
    await ApiService.updateAgentStatus(newStatus);
  };

  const handleTakeoverCall = async (exotelCallSid: string) => {
    const res = await ApiService.handoverCall(exotelCallSid);
    if (res.success) {
      setActiveCall(res.data);
      setAgentStatus('BUSY');
    }
  };

  if (!isAuthenticated) {
    return <LoginModal onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <MainLayout activePage={activePage} setActivePage={setActivePage} currentUser={currentUser} onLogout={handleLogout}>
      {activePage === 'dashboard' && <DashboardPage calls={calls} tickets={tickets} agents={activeAgents} />}

      {activePage === 'incoming-calls' && <IncomingCallsPage activeCall={activeCall} liveTranscript={liveTranscript} onTakeoverCall={handleTakeoverCall} />}

      {activePage === 'customers' && <CustomerProfilePage customers={customers} />}

      {activePage === 'call-history' && <CallHistoryPage calls={calls} />}

      {activePage === 'agent-panel' && <AgentPanelPage currentUser={currentUser} agentStatus={agentStatus} onStatusChange={handleStatusChange} activeAgents={activeAgents} />}

      {activePage === 'queue' && <QueuePage />}

      {activePage === 'analytics' && <AnalyticsPage />}

      {activePage === 'supervisor' && <SupervisorDashboardPage agents={activeAgents} calls={calls} />}

      {activePage === 'settings' && <SettingsPage />}

      {/* Developer Telephony Simulator Floating Tool */}
      <DeveloperSimulatorPanel />
    </MainLayout>
  );
};
