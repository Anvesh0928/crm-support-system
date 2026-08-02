import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { LiveVoiceWave } from '../shared/LiveVoiceWave';
import { Eye, Mic, PhoneForwarded, Volume2, ShieldAlert } from 'lucide-react';
import { Call } from '../../types';

interface Props {
  call: Call | null;
  initialMode: 'listen' | 'whisper' | 'barge';
  isOpen: boolean;
  onClose: () => void;
}

export const CallBargeModal: React.FC<Props> = ({ call, initialMode, isOpen, onClose }) => {
  const [activeMode, setActiveMode] = useState<'listen' | 'whisper' | 'barge'>(initialMode);

  if (!call) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Supervisor Control: ${call.fromNumber}`}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div className="glass-card" style={{ padding: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: '1rem' }}>{call.fromNumber}</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Exotel SID: {call.exotelCallSid}</div>
          </div>
          <Badge variant="warning">{call.status}</Badge>
        </div>

        {/* Live Audio Stream Monitor Status */}
        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '12px', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
            <LiveVoiceWave />
          </div>
          <span style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>
            {activeMode === 'listen' ? '👂 Silent Monitoring Active' : activeMode === 'whisper' ? '🎙️ Advisory Whisper Mode Active (Agent Only)' : '⚡ Full Supervisory Barge-In Connected'}
          </span>
        </div>

        {/* Mode Selector Buttons */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button
            variant={activeMode === 'listen' ? 'primary' : 'secondary'}
            onClick={() => setActiveMode('listen')}
            style={{ flex: 1 }}
          >
            <Eye size={16} /> Listen
          </Button>

          <Button
            variant={activeMode === 'whisper' ? 'glass' : 'secondary'}
            onClick={() => setActiveMode('whisper')}
            style={{ flex: 1 }}
          >
            <Mic size={16} /> Whisper
          </Button>

          <Button
            variant={activeMode === 'barge' ? 'danger' : 'secondary'}
            onClick={() => setActiveMode('barge')}
            style={{ flex: 1 }}
          >
            <PhoneForwarded size={16} /> Barge-In
          </Button>
        </div>

        <Button variant="secondary" onClick={onClose} style={{ marginTop: '8px' }}>
          Disconnect Supervision Channel
        </Button>
      </div>
    </Modal>
  );
};
