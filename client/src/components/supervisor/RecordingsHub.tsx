import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Table } from '../ui/Table';
import { Badge } from '../ui/Badge';
import { PlayCircle, Download, FileText, Search } from 'lucide-react';

export const RecordingsHub: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const mockRecordings = [
    { id: 'REC-101', callSid: 'EX_9832101', from: '+1 (555) 019-9832', duration: '2m 14s', provider: 'EXOTEL', format: 'MP3', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', date: '2026-08-02 12:45' },
    { id: 'REC-102', callSid: 'EX_9832102', from: '+1 (555) 014-4321', duration: '1m 45s', provider: 'S3', format: 'WAV', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', date: '2026-08-02 11:30' },
  ];

  const columns = [
    {
      header: 'Recording ID / Caller',
      accessor: (r: any) => (
        <div>
          <div style={{ fontWeight: 600 }}>{r.from}</div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>SID: {r.callSid}</span>
        </div>
      ),
    },
    { header: 'Duration', accessor: (r: any) => r.duration },
    { header: 'Storage Provider', accessor: (r: any) => <Badge variant="purple">{r.provider}</Badge> },
    {
      header: 'Actions',
      accessor: (r: any) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <a href={r.url} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
            <Badge variant="info"><PlayCircle size={14} /> Listen</Badge>
          </a>
        </div>
      ),
    },
  ];

  return (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Voice Call Recordings Library</h3>
        <div style={{ position: 'relative' }}>
          <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '10px', top: '10px' }} />
          <input
            type="text"
            placeholder="Search recording by phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="glass-card"
            style={{ padding: '8px 12px 8px 34px', color: '#fff', fontSize: '0.85rem' }}
          />
        </div>
      </div>

      <Table columns={columns} data={mockRecordings} keyExtractor={(r) => r.id} />
    </Card>
  );
};
