import React from 'react';
import { Call } from '../types';
import { PhoneIncoming, PhoneOutgoing, Clock } from 'lucide-react';

interface Props {
  calls: Call[];
}

export const CallHistoryList: React.FC<Props> = ({ calls }) => {
  return (
    <div className="glass-panel" style={{ padding: '24px' }}>
      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '16px' }}>Exotel Call History Logs</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {calls.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '30px' }}>No past calls logged.</p>
        ) : (
          calls.map((c) => {
            const isInbound = c.direction === 'INBOUND';
            const customerObj: any = c.customerId;
            return (
              <div key={c._id} className="glass-card" style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      background: isInbound ? 'rgba(16, 185, 129, 0.15)' : 'rgba(56, 189, 248, 0.15)',
                      padding: '10px',
                      borderRadius: '10px',
                    }}
                  >
                    {isInbound ? <PhoneIncoming size={20} color="var(--accent-emerald)" /> : <PhoneOutgoing size={20} color="var(--accent-cyan)" />}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <h4 style={{ fontSize: '1rem', fontWeight: 600 }}>{c.fromNumber}</h4>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>({c.direction})</span>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      {c.summary || 'AI Voice Session completed.'}
                    </p>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>SID: {c.exotelCallSid}</span>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: 'var(--text-primary)',
                      padding: '4px 10px',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                    }}
                  >
                    {c.status}
                  </span>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end' }}>
                    <Clock size={12} /> {c.durationSeconds ? `${c.durationSeconds}s` : 'N/A'}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
