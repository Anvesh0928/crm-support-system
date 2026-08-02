import React from 'react';
import { Ticket } from '../types';
import { Ticket as TicketIcon, Clock, AlertCircle } from 'lucide-react';

interface Props {
  tickets: Ticket[];
}

export const TicketList: React.FC<Props> = ({ tickets }) => {
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'URGENT':
        return { color: 'var(--accent-rose)', bg: 'rgba(244, 63, 94, 0.2)' };
      case 'HIGH':
        return { color: 'var(--accent-amber)', bg: 'rgba(245, 158, 11, 0.2)' };
      default:
        return { color: 'var(--accent-cyan)', bg: 'rgba(56, 189, 248, 0.2)' };
    }
  };

  return (
    <div className="glass-panel" style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>CRM Support Tickets</h3>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{tickets.length} Total Tickets</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {tickets.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '30px' }}>No support tickets created yet.</p>
        ) : (
          tickets.map((t) => {
            const pBadge = getPriorityBadge(t.priority);
            const customerObj: any = t.customerId;
            return (
              <div key={t._id} className="glass-card" style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <div style={{ background: 'rgba(139, 92, 246, 0.15)', padding: '10px', borderRadius: '10px' }}>
                    <TicketIcon size={20} color="var(--accent-purple)" />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-cyan)' }}>{t.ticketNumber}</span>
                      <h4 style={{ fontSize: '1rem', fontWeight: 600 }}>{t.subject}</h4>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>{t.description}</p>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '6px' }}>
                      Customer: {typeof customerObj === 'object' ? customerObj.name || customerObj.phone : customerObj} | Created {new Date(t.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                  <span
                    style={{
                      background: pBadge.bg,
                      color: pBadge.color,
                      padding: '4px 10px',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                    }}
                  >
                    {t.priority}
                  </span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent-emerald)' }}>{t.status}</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
