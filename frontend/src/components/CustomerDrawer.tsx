import React from 'react';
import { Customer } from '../types';
import { User, Phone, Mail, Award, Calendar } from 'lucide-react';

interface Props {
  customers: Customer[];
}

export const CustomerDrawer: React.FC<Props> = ({ customers }) => {
  return (
    <div className="glass-panel" style={{ padding: '24px' }}>
      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '16px' }}>Customer Profiles Directory</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
        {customers.length === 0 ? (
          <p style={{ color: 'var(--text-muted)' }}>No customer profiles found.</p>
        ) : (
          customers.map((c) => (
            <div key={c._id} className="glass-card" style={{ padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--accent-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <User size={20} color="#fff" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>{c.name}</h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ID: {c._id.slice(-6)}</span>
                  </div>
                </div>

                <span
                  style={{
                    background: c.accountTier === 'VIP' ? 'rgba(236, 72, 153, 0.2)' : 'rgba(56, 189, 248, 0.2)',
                    color: c.accountTier === 'VIP' ? 'var(--accent-pink)' : 'var(--accent-cyan)',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                  }}
                >
                  {c.accountTier}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Phone size={14} color="var(--accent-cyan)" /> {c.phone}
                </div>
                {c.email && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Mail size={14} color="var(--accent-purple)" /> {c.email}
                  </div>
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Calendar size={14} color="var(--text-muted)" /> Registered {new Date(c.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
