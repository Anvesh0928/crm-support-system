import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Table } from '../components/ui/Table';
import { Badge } from '../components/ui/Badge';
import { Customer } from '../types';
import { Phone, Mail, Calendar, User } from 'lucide-react';

interface Props {
  customers: Customer[];
}

export const CustomerProfilePage: React.FC<Props> = ({ customers }) => {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const columns = [
    {
      header: 'Customer Name',
      accessor: (c: Customer) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--accent-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <User size={16} color="#fff" />
          </div>
          <div>
            <div style={{ fontWeight: 600 }}>{c.name}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ID: {c._id.slice(-6)}</div>
          </div>
        </div>
      ),
    },
    {
      header: 'Phone Number',
      accessor: (c: Customer) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Phone size={14} color="var(--accent-cyan)" /> {c.phone}
        </div>
      ),
    },
    {
      header: 'Account Tier',
      accessor: (c: Customer) => (
        <Badge variant={c.accountTier === 'VIP' ? 'danger' : c.accountTier === 'ENTERPRISE' ? 'purple' : 'info'}>
          {c.accountTier}
        </Badge>
      ),
    },
    {
      header: 'Actions',
      accessor: (c: Customer) => (
        <button
          onClick={() => setSelectedCustomer(c)}
          style={{ background: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.3)', color: 'var(--accent-cyan)', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}
        >
          View Profile
        </button>
      ),
    },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: selectedCustomer ? '2fr 1fr' : '1fr', gap: '20px' }}>
      <Card>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '16px' }}>Customer Profiles Directory</h3>
        <Table columns={columns} data={customers} keyExtractor={(c) => c._id} />
      </Card>

      {selectedCustomer && (
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Customer Details</h4>
            <button onClick={() => setSelectedCustomer(null)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>Close</button>
          </div>

          <div className="glass-card" style={{ padding: '16px', marginBottom: '16px' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '8px' }}>{selectedCustomer.name}</h4>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div><Phone size={14} style={{ display: 'inline', marginRight: '6px' }} /> {selectedCustomer.phone}</div>
              {selectedCustomer.email && <div><Mail size={14} style={{ display: 'inline', marginRight: '6px' }} /> {selectedCustomer.email}</div>}
              <div><Calendar size={14} style={{ display: 'inline', marginRight: '6px' }} /> Joined {new Date(selectedCustomer.createdAt).toLocaleDateString()}</div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
