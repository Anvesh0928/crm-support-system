import React from 'react';
import { Call, Utterance } from '../types';
import { TranscriptFeed } from './TranscriptFeed';
import { Phone, PhoneForwarded, ShieldAlert, Cpu, Sparkles, PlusCircle } from 'lucide-react';

interface Props {
  activeCall: Call | null;
  liveTranscript: Utterance[];
  onTakeoverCall: (callSid: string) => void;
  onCreateTicketForCall: (call: Call) => void;
}

export const LiveCallDesk: React.FC<Props> = ({ activeCall, liveTranscript, onTakeoverCall, onCreateTicketForCall }) => {
  if (!activeCall) {
    return (
      <div className="glass-panel" style={{ padding: '60px', textAlign: 'center' }}>
        <Cpu size={48} color="var(--accent-cyan)" style={{ marginBottom: '16px', opacity: 0.8 }} />
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px' }}>No Active Voice Stream Connected</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '450px', margin: '0 auto' }}>
          When an inbound IVR call connects via Exotel, live transcript feed, OpenAI Realtime API responses, and handover controls will appear here automatically.
        </p>
      </div>
    );
  }

  const isEscalated = activeCall.status === 'ESCALATED';

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
      {/* Main Transcript Panel */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid var(--border-glass)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ background: 'rgba(56, 189, 248, 0.15)', padding: '10px', borderRadius: '12px' }}>
              <Phone size={24} color="var(--accent-cyan)" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Caller: {activeCall.fromNumber}</h3>
                <span
                  style={{
                    background: isEscalated ? 'rgba(244, 63, 94, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                    color: isEscalated ? 'var(--accent-rose)' : 'var(--accent-emerald)',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                  }}
                >
                  {activeCall.status}
                </span>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Exotel SID: {activeCall.exotelCallSid}</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            {!isEscalated && (
              <button
                onClick={() => onTakeoverCall(activeCall.exotelCallSid)}
                style={{
                  background: 'linear-gradient(135deg, var(--accent-rose), var(--accent-purple))',
                  border: 'none',
                  color: '#ffffff',
                  padding: '10px 18px',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 14px rgba(244, 63, 94, 0.3)',
                }}
              >
                <PhoneForwarded size={16} /> Takeover Call (Agent)
              </button>
            )}

            <button
              onClick={() => onCreateTicketForCall(activeCall)}
              style={{
                background: 'rgba(56, 189, 248, 0.15)',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                color: 'var(--accent-cyan)',
                padding: '10px 14px',
                borderRadius: '10px',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <PlusCircle size={16} /> Create Ticket
            </button>
          </div>
        </div>

        <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Live Conversation Stream</span>
          <div className="voice-wave">
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>

        <TranscriptFeed transcript={liveTranscript.length > 0 ? liveTranscript : activeCall.transcript || []} />
      </div>

      {/* AI Assistance & Context Side Panel */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <Sparkles size={20} color="var(--accent-purple)" />
            <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>Realtime AI Co-Pilot</h4>
          </div>

          <div className="glass-card" style={{ padding: '12px', marginBottom: '12px' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Detected Intent</div>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent-cyan)' }}>Order Status & Refund Inquiry</div>
          </div>

          <div className="glass-card" style={{ padding: '12px', marginBottom: '12px' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Sentiment Analysis</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent-amber)' }}>
              <ShieldAlert size={16} /> Moderately Frustrated
            </div>
          </div>

          <div className="glass-card" style={{ padding: '12px' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Suggested Next Action</div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-primary)', lineHeight: 1.3 }}>
              Verify recent shipment tracking ID or initiate ticket escalation if delivery is delayed &gt; 3 days.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
