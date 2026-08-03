import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Table } from '../components/ui/Table';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { Call } from '../types';
import { PhoneIncoming, PhoneOutgoing, Clock, PlayCircle } from 'lucide-react';

interface Props {
  calls: Call[];
}

export const CallHistoryPage: React.FC<Props> = ({ calls }) => {
  const [playingRecordingUrl, setPlayingRecordingUrl] = useState<string | null>(null);

  const columns = [
    {
      header: 'Direction / Caller',
      accessor: (c: Call) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ background: c.direction === 'INBOUND' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(56, 189, 248, 0.15)', padding: '8px', borderRadius: '8px' }}>
            {c.direction === 'INBOUND' ? <PhoneIncoming size={16} color="var(--accent-emerald)" /> : <PhoneOutgoing size={16} color="var(--accent-cyan)" />}
          </div>
          <div>
            <div style={{ fontWeight: 600 }}>{c.fromNumber}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>SID: {c.exotelCallSid}</div>
          </div>
        </div>
      ),
    },
    {
      header: 'Status',
      accessor: (c: Call) => <Badge variant={c.status === 'COMPLETED' ? 'success' : 'warning'}>{c.status}</Badge>,
    },
    {
      header: 'Duration',
      accessor: (c: Call) => (
        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          <Clock size={12} style={{ display: 'inline', marginRight: '4px' }} />
          {c.durationSeconds ? `${c.durationSeconds}s` : 'N/A'}
        </span>
      ),
    },
    {
      header: 'Recording',
      accessor: (c: Call) =>
        c.recordingUrl ? (
          <button
            onClick={() => setPlayingRecordingUrl(c.recordingUrl!)}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(139, 92, 246, 0.15)', border: '1px solid rgba(139, 92, 246, 0.3)', color: 'var(--accent-purple)', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}
          >
            <PlayCircle size={14} /> Listen
          </button>
        ) : (
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>No Audio</span>
        ),
    },
  ];

  return (
    <Card>
      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '16px' }}>Exotel Call History Logs</h3>
      <Table columns={columns} data={calls} keyExtractor={(c) => c._id} />

      <Modal isOpen={!!playingRecordingUrl} onClose={() => setPlayingRecordingUrl(null)} title="Call Audio Recording Player">
        {playingRecordingUrl && (
          <div style={{ padding: '20px 0', textAlign: 'center' }}>
            <audio controls src={playingRecordingUrl} style={{ width: '100%' }} />
          </div>
        )}
      </Modal>
    </Card>
  );
};
