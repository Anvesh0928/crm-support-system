import React from 'react';
import { Utterance } from '../types';
import { Bot, User, UserCheck } from 'lucide-react';

interface Props {
  transcript: Utterance[];
}

export const TranscriptFeed: React.FC<Props> = ({ transcript }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '420px', overflowY: 'auto', paddingRight: '6px' }}>
      {transcript.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
          Waiting for live voice stream audio input...
        </div>
      ) : (
        transcript.map((item, idx) => {
          const isAI = item.speaker === 'SYSTEM_AI';
          const isAgent = item.speaker === 'HUMAN_AGENT';

          return (
            <div
              key={idx}
              style={{
                display: 'flex',
                gap: '12px',
                alignItems: 'flex-start',
                alignSelf: isAI ? 'flex-start' : isAgent ? 'center' : 'flex-end',
                maxWidth: '85%',
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: isAI
                    ? 'linear-gradient(135deg, #38bdf8, #8b5cf6)'
                    : isAgent
                    ? 'linear-gradient(135deg, #10b981, #059669)'
                    : 'rgba(255, 255, 255, 0.1)',
                  flexShrink: 0,
                }}
              >
                {isAI ? <Bot size={18} color="#fff" /> : isAgent ? <UserCheck size={18} color="#fff" /> : <User size={18} color="#fff" />}
              </div>

              <div
                style={{
                  background: isAI
                    ? 'rgba(56, 189, 248, 0.1)'
                    : isAgent
                    ? 'rgba(16, 185, 129, 0.1)'
                    : 'rgba(255, 255, 255, 0.06)',
                  border: `1px solid ${
                    isAI ? 'rgba(56, 189, 248, 0.2)' : isAgent ? 'rgba(16, 185, 129, 0.2)' : 'var(--border-glass)'
                  }`,
                  padding: '10px 14px',
                  borderRadius: '12px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', marginBottom: '4px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: isAI ? 'var(--accent-cyan)' : 'var(--text-secondary)' }}>
                    {isAI ? 'AI Assistant' : isAgent ? 'Human Agent' : 'Customer'}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </span>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: 1.4 }}>{item.text}</p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};
