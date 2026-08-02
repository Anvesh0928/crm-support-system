import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Settings, Cpu, Phone, Shield } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const [exotelSid, setExotelSid] = useState('exotel_account_sid_102');
  const [openaiModel, setOpenaiModel] = useState('gpt-4o-realtime-preview-2024-10-01');
  const [voice, setVoice] = useState('alloy');
  const [slaSeconds, setSlaSeconds] = useState(300);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Card>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <Settings size={24} color="var(--accent-cyan)" />
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>System Configuration & Settings</h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Exotel Telephony, OpenAI Realtime API & SLA Controls</span>
          </div>
        </div>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <Phone size={18} color="var(--accent-cyan)" />
            <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>Exotel Telephony Config</h4>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Exotel Account SID</label>
              <input type="text" value={exotelSid} onChange={(e) => setExotelSid(e.target.value)} className="glass-card" style={{ width: '100%', padding: '10px', color: '#fff', border: '1px solid var(--border-glass)' }} />
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Queue SLA Timeout Threshold (Seconds)</label>
              <input type="number" value={slaSeconds} onChange={(e) => setSlaSeconds(parseInt(e.target.value, 10))} className="glass-card" style={{ width: '100%', padding: '10px', color: '#fff', border: '1px solid var(--border-glass)' }} />
            </div>

            <Button variant="primary">Save Telephony Settings</Button>
          </div>
        </Card>

        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <Cpu size={18} color="var(--accent-purple)" />
            <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>OpenAI Realtime API Config</h4>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Realtime Model</label>
              <input type="text" value={openaiModel} onChange={(e) => setOpenaiModel(e.target.value)} className="glass-card" style={{ width: '100%', padding: '10px', color: '#fff', border: '1px solid var(--border-glass)' }} />
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Voice Accent</label>
              <select value={voice} onChange={(e) => setVoice(e.target.value)} className="glass-card" style={{ width: '100%', padding: '10px', color: '#fff', border: '1px solid var(--border-glass)', background: 'var(--bg-surface)' }}>
                <option value="alloy">Alloy</option>
                <option value="echo">Echo</option>
                <option value="shimmer">Shimmer</option>
              </select>
            </div>

            <Button variant="primary">Save AI Settings</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
