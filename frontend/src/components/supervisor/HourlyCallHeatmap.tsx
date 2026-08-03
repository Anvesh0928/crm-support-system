import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

export const HourlyCallHeatmap: React.FC = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const hours = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);

  // Generate deterministic density values for 7 days x 24 hours
  const getDensityColor = (dayIdx: number, hourIdx: number): string => {
    // Peak hours between 09:00 and 17:00 on weekdays
    const isPeak = dayIdx < 5 && hourIdx >= 9 && hourIdx <= 17;
    const isSuperPeak = dayIdx < 5 && (hourIdx === 10 || hourIdx === 14);

    if (isSuperPeak) return 'rgba(236, 72, 153, 0.8)'; // Pink high intensity
    if (isPeak) return 'rgba(139, 92, 246, 0.6)';       // Purple medium-high
    if (hourIdx >= 8 && hourIdx <= 19) return 'rgba(56, 189, 248, 0.3)'; // Cyan low-medium
    return 'rgba(255, 255, 255, 0.05)';                // Off-peak dark
  };

  return (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>24x7 Hourly Peak Call Density Heatmap</h3>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Historical Hourly Volume Mapping for Staffing Optimization</span>
        </div>

        <div style={{ display: 'flex', gap: '8px', fontSize: '0.75rem', alignItems: 'center' }}>
          <span style={{ color: 'var(--text-muted)' }}>Intensity:</span>
          <Badge variant="info">Low</Badge>
          <Badge variant="purple">Medium</Badge>
          <Badge variant="danger">Peak Traffic</Badge>
        </div>
      </div>

      <div style={{ width: '100%', overflowX: 'auto' }}>
        <div style={{ minWidth: '700px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '50px repeat(24, 1fr)', gap: '4px', textAlign: 'center', fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
            <div />
            {hours.map((h, idx) => (
              <div key={idx}>{idx % 3 === 0 ? h.slice(0, 2) : ''}</div>
            ))}
          </div>

          {days.map((day, dIdx) => (
            <div key={day} style={{ display: 'grid', gridTemplateColumns: '50px repeat(24, 1fr)', gap: '4px', alignItems: 'center' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>{day}</span>
              {hours.map((_, hIdx) => (
                <div
                  key={hIdx}
                  title={`${day} ${hours[hIdx]}: Peak Call Density`}
                  style={{
                    height: '24px',
                    borderRadius: '4px',
                    background: getDensityColor(dIdx, hIdx),
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    transition: 'all 0.2s',
                    cursor: 'pointer',
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
