import React from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { LiveVoiceWave } from '../components/shared/LiveVoiceWave';
import { Phone, PhoneForwarded, Sparkles, User, ShieldAlert } from 'lucide-react';
import { Call, Utterance } from '../types';

interface Props {
  activeCall: Call | null;
  liveTranscript: Utterance[];
  onTakeoverCall: (callSid: string) => void;
}

export const IncomingCallsPage: React.FC<Props> = ({ activeCall, liveTranscript, onTakeoverCall }) => {
  if (!activeCall) {
    return (
      <Card style={{ padding: '60px', textAlign: 'center' }}>
        <Phone size={48} color="var(--accent-cyan)" style={{ marginBottom: '16px', opacity: 0.8 }} />
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px' }}>Waiting for Incoming Webhook...</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '450px', margin: '0 auto' }}>
          Inbound IVR calls from Exotel will stream live transcripts, AI intent scores, and takeover controls here in real time.
        </p>
      </Card>
    );
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid var(--border-glass)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ background: 'rgba(56, 189, 248, 0.15)', padding: '12px', borderRadius: '14px' }}>
              <Phone size={26} color="var(--accent-cyan)" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Caller: {activeCall.fromNumber}</h3>
                <Badge variant={activeCall.status === 'ESCALATED' ? 'warning' : 'success'}>{activeCall.status}</Badge>
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Exotel SID: {activeCall.exotelCallSid}</p>
            </div>
          </div>

          {activeCall.status !== 'ESCALATED' && (
            <Button variant="danger" onClick={() => onTakeoverCall(activeCall.exotelCallSid)}>
              <PhoneForwarded size={16} /> Takeover Call
            </Button>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Live Voice Audio Stream</span>
          <LiveVoiceWave />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '420px', overflowY: 'auto' }}>
          {(liveTranscript.length > 0 ? liveTranscript : activeCall.transcript || []).map((t, idx) => (
            <div key={idx} style={{ display: 'flex', gap: '12px', alignSelf: t.speaker === 'SYSTEM_AI' ? 'flex-start' : 'flex-end', maxWidth: '80%' }}>
              <div className="glass-card" style={{ padding: '10px 14px', background: t.speaker === 'SYSTEM_AI' ? 'rgba(56, 189, 248, 0.1)' : 'rgba(255, 255, 255, 0.05)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: t.speaker === 'SYSTEM_AI' ? 'var(--accent-cyan)' : 'var(--text-secondary)', marginBottom: '4px' }}>
                  {t.speaker}
                </div>
                <p style={{ fontSize: '0.9rem' }}>{t.text}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <Sparkles size={20} color="var(--accent-purple)" />
          <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>AI Co-Pilot Insights</h4>
        </div>

        <div className="glass-card" style={{ padding: '14px', marginBottom: '12px' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Detected Intent</div>
          <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--accent-cyan)' }}>ORDER_STATUS_QUERY</div>
        </div>

        <div className="glass-card" style={{ padding: '14px', marginBottom: '12px' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Sentiment</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', fontWeight: 600, color: 'var(--accent-amber)' }}>
            <ShieldAlert size={16} /> Moderately Frustrated
          </div>
        </div>
      </Card>
    </div>
  );
};
