import React from 'react';
import { Card } from '../ui/Card';
import { Table } from '../ui/Table';
import { Badge } from '../ui/Badge';
import { AgentPresence } from '../../types';
import { UserCheck, Clock, Coffee, ShieldAlert } from 'lucide-react';

interface Props {
  agents: AgentPresence[];
}

export const AgentStatusMatrix: React.FC<Props> = ({ agents }) => {
  const columns = [
    {
      header: 'Agent Identity',
      accessor: (a: AgentPresence) => (
        <div>
          <div style={{ fontWeight: 600 }}>{a.name}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{a.email}</div>
        </div>
      ),
    },
    {
      header: 'Presence State',
      accessor: (a: AgentPresence) => (
        <Badge variant={a.status === 'AVAILABLE' ? 'success' : a.status === 'BUSY' ? 'warning' : a.status === 'BREAK' ? 'purple' : 'danger'}>
          {a.status}
        </Badge>
      ),
    },
    {
      header: 'Active Call SID',
      accessor: (a: AgentPresence) => (
        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          {a.activeCallSid ? a.activeCallSid : 'None'}
        </span>
      ),
    },
    {
      header: 'Last Presence Sync',
      accessor: (a: AgentPresence) => (
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          {new Date(a.updatedAt).toLocaleTimeString()}
        </span>
      ),
    },
  ];

  return (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Agent Status & Presence Roster Matrix</h3>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{agents.length} Total Registered Agents</span>
      </div>
      <Table columns={columns} data={agents} keyExtractor={(a) => a.agentId} />
    </Card>
  );
};
