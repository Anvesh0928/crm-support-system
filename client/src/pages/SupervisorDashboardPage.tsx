import React, { useState } from 'react';
import { LiveCallsStream } from '../components/supervisor/LiveCallsStream';
import { QueueMonitorCard } from '../components/supervisor/QueueMonitorCard';
import { AgentStatusMatrix } from '../components/supervisor/AgentStatusMatrix';
import { CallBargeModal } from '../components/supervisor/CallBargeModal';
import { SupervisorReports } from '../components/supervisor/SupervisorReports';
import { RecordingsHub } from '../components/supervisor/RecordingsHub';
import { AIStatsWidget } from '../components/supervisor/AIStatsWidget';
import { HourlyCallHeatmap } from '../components/supervisor/HourlyCallHeatmap';
import { StatCard } from '../components/shared/StatCard';
import { ShieldCheck, Activity, Users, ListOrdered, Cpu, Mic, FileText, BarChart2 } from 'lucide-react';
import { AgentPresence, Call } from '../types';

interface Props {
  agents: AgentPresence[];
  calls: Call[];
}

export const SupervisorDashboardPage: React.FC<Props> = ({ agents, calls }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'calls' | 'agents' | 'queue' | 'ai-stats' | 'heatmaps' | 'recordings' | 'reports'>('overview');
  const [selectedBargeCall, setSelectedBargeCall] = useState<Call | null>(null);
  const [bargeMode, setBargeMode] = useState<'listen' | 'whisper' | 'barge'>('listen');
  const [isBargeModalOpen, setIsBargeModalOpen] = useState<boolean>(false);

  const handleOpenBarge = (call: Call, mode: 'listen' | 'whisper' | 'barge') => {
    setSelectedBargeCall(call);
    setBargeMode(mode);
    setIsBargeModalOpen(true);
  };

  const tabs: { id: typeof activeTab; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Overview', icon: <ShieldCheck size={16} /> },
    { id: 'calls', label: 'Live Calls', icon: <Activity size={16} /> },
    { id: 'agents', label: 'Agent Matrix', icon: <Users size={16} /> },
    { id: 'queue', label: 'Queue Monitor', icon: <ListOrdered size={16} /> },
    { id: 'ai-stats', label: 'AI Statistics', icon: <Cpu size={16} /> },
    { id: 'heatmaps', label: 'Hourly Heatmaps', icon: <BarChart2 size={16} /> },
    { id: 'recordings', label: 'Recordings Hub', icon: <Mic size={16} /> },
    { id: 'reports', label: 'Reports', icon: <FileText size={16} /> },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Realtime KPI Bar */}
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <StatCard title="Ongoing Active Calls" value={calls.filter((c) => c.status === 'IN_PROGRESS' || c.status === 'INITIATED').length} change="Live Voice Streams" icon={<Activity size={22} />} color="var(--accent-cyan)" />
        <StatCard title="Available Agents Online" value={agents.filter((a) => a.status === 'AVAILABLE').length} change={`${agents.length} Total Roster`} icon={<Users size={22} />} color="var(--accent-emerald)" />
        <StatCard title="Live Queue Waiting Depth" value="7 Calls" change="Avg Wait: 14s" icon={<ListOrdered size={22} />} color="var(--accent-amber)" />
        <StatCard title="AI Resolution Rate" value="94.2%" change="OpenAI Realtime" icon={<Cpu size={22} />} color="var(--accent-purple)" />
      </div>

      {/* Tab Bar Navigation */}
      <div className="glass-panel" style={{ padding: '6px', display: 'flex', gap: '6px', overflowX: 'auto' }}>
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === t.id ? 'var(--accent-blue)' : 'transparent',
              color: activeTab === t.id ? '#ffffff' : 'var(--text-secondary)',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* Dynamic Tab Content */}
      {activeTab === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <LiveCallsStream calls={calls} onOpenBargeModal={handleOpenBarge} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <QueueMonitorCard />
            <AIStatsWidget />
          </div>
          <AgentStatusMatrix agents={agents} />
        </div>
      )}

      {activeTab === 'calls' && <LiveCallsStream calls={calls} onOpenBargeModal={handleOpenBarge} />}

      {activeTab === 'agents' && <AgentStatusMatrix agents={agents} />}

      {activeTab === 'queue' && <QueueMonitorCard />}

      {activeTab === 'ai-stats' && <AIStatsWidget />}

      {activeTab === 'heatmaps' && <HourlyCallHeatmap />}

      {activeTab === 'recordings' && <RecordingsHub />}

      {activeTab === 'reports' && <SupervisorReports />}

      {/* Call Barge / Listen / Whisper Modal */}
      <CallBargeModal
        call={selectedBargeCall}
        initialMode={bargeMode}
        isOpen={isBargeModalOpen}
        onClose={() => setIsBargeModalOpen(false)}
      />
    </div>
  );
};
