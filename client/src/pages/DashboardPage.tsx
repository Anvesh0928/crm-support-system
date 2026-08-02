import React from 'react';
import { StatCard } from '../components/shared/StatCard';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { PhoneCall, Users, Ticket, Cpu, Activity, Clock } from 'lucide-react';
import { Call, Ticket as TicketType, AgentPresence } from '../types';

interface Props {
  calls: Call[];
  tickets: TicketType[];
  agents: AgentPresence[];
}

export const DashboardPage: React.FC<Props> = ({ calls, tickets, agents }) => {
  const activeCount = calls.filter((c) => c.status === 'IN_PROGRESS' || c.status === 'INITIATED' || c.status === 'ESCALATED').length;
  const availableAgentsCount = agents.filter((a) => a.status === 'AVAILABLE').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Stat Cards */}
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <StatCard title="Active Concurrent Calls" value={activeCount} change="⚡ Realtime Voice Stream" icon={<Activity size={22} />} color="var(--accent-cyan)" />
        <StatCard title="Available Agents Online" value={availableAgentsCount} change={`${agents.length} Total Registered`} icon={<Users size={22} />} color="var(--accent-emerald)" />
        <StatCard title="Open Support Tickets" value={tickets.filter((t) => t.status === 'OPEN').length} change="Automatic AI Escalations" icon={<Ticket size={22} />} color="var(--accent-purple)" />
        <StatCard title="AI Resolution Rate" value="94.2%" change="+2.4% vs last week" icon={<Cpu size={22} />} color="var(--accent-pink)" />
      </div>

      {/* Grid Content */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        {/* Active Call Activity Stream */}
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Live Call Stream Activity</h3>
            <Badge variant="info">Live Feed</Badge>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {calls.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '30px' }}>No calls recorded yet.</p>
            ) : (
              calls.slice(0, 5).map((c) => (
                <div key={c._id} className="glass-card" style={{ padding: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ background: 'rgba(56, 189, 248, 0.15)', padding: '10px', borderRadius: '10px' }}>
                      <PhoneCall size={18} color="var(--accent-cyan)" />
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.92rem' }}>{c.fromNumber}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Exotel SID: {c.exotelCallSid}</div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <Badge variant={c.status === 'COMPLETED' ? 'success' : c.status === 'ESCALATED' ? 'warning' : 'info'}>{c.status}</Badge>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                      <Clock size={12} style={{ display: 'inline', marginRight: '3px' }} />
                      {new Date(c.startTime).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>

        {/* Live Agent Presence Matrix */}
        <Card>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px' }}>Agent Presence Roster</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {agents.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>No agents online.</p>
            ) : (
              agents.map((a) => (
                <div key={a.agentId} className="glass-card" style={{ padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{a.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{a.email}</div>
                  </div>
                  <Badge variant={a.status === 'AVAILABLE' ? 'success' : a.status === 'BUSY' ? 'warning' : 'danger'}>{a.status}</Badge>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};
