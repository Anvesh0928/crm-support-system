import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Phone, PhoneOff, Cpu, Mic, Clock, Wrench, X } from 'lucide-react';

export const DeveloperSimulatorPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [lastSimulatedSid, setLastSimulatedSid] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const triggerMockApi = async (endpoint: string, payload: Record<string, any>) => {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/mock/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await response.json();
      if (json.success) {
        if (json.data?.callSid) {
          setLastSimulatedSid(json.data.callSid);
        }
        setStatusMessage(`✔ Simulated: ${endpoint}`);
      } else {
        setStatusMessage(`❌ Simulation Error`);
      }
    } catch (err: any) {
      setStatusMessage(`❌ Error: ${err.message}`);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          background: 'linear-gradient(135deg, deepskyblue, mediumpurple)',
          color: 'white',
          border: 'none',
          padding: '12px 18px',
          borderRadius: '30px',
          fontWeight: 700,
          cursor: 'pointer',
          boxShadow: '0 8px 24px deepskyblue',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          zIndex: 999,
        }}
      >
        <Wrench size={18} /> Dev Telephony Simulator
      </button>
    );
  }

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 1000, width: '360px' }}>
      <Card style={{ padding: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Wrench size={18} color="deepskyblue" />
            <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>Developer Telephony Simulator</h4>
          </div>
          <button onClick={() => setIsOpen(false)} style={{ background: 'transparent', border: 'none', color: 'slategray', cursor: 'pointer' }}>
            <X size={18} />
          </button>
        </div>

        {statusMessage && (
          <div style={{ fontSize: '0.78rem', color: 'mediumseagreen', marginBottom: '12px', fontWeight: 600 }}>
            {statusMessage}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <Button variant="primary" size="sm" onClick={() => triggerMockApi('incoming-call', { fromNumber: '+15550199832' })}>
            <Phone size={14} /> Incoming Call
          </Button>

          <Button variant="danger" size="sm" onClick={() => triggerMockApi('incoming-call', { fromNumber: '+15550144321' })}>
            <PhoneOff size={14} /> Missed Call
          </Button>

          <Button variant="secondary" size="sm" onClick={() => triggerMockApi('ai-resolution', { callSid: lastSimulatedSid, speechText: 'I want refund' })}>
            <Cpu size={14} /> AI Resolution
          </Button>

          <Button variant="glass" size="sm" onClick={() => triggerMockApi('recording-ready', { callSid: lastSimulatedSid })}>
            <Mic size={14} /> Recording Ready
          </Button>

          <Button variant="secondary" size="sm" style={{ gridColumn: '1 / -1' }} onClick={() => triggerMockApi('call-ended', { callSid: lastSimulatedSid })}>
            <Clock size={14} /> End Simulated Call
          </Button>
        </div>

        <div style={{ marginTop: '12px', fontSize: '0.72rem', color: 'slategray', borderTop: '1px solid slategray', paddingTop: '8px' }}>
          Active Provider: <Badge variant="info">CALL_PROVIDER=mock</Badge>
        </div>
      </Card>
    </div>
  );
};
