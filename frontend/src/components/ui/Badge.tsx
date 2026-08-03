import React from 'react';

interface Props {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'purple';
}

export const Badge: React.FC<Props> = ({ children, variant = 'info' }) => {
  const getStyles = (): React.CSSProperties => {
    const map = {
      success: { bg: 'rgba(16, 185, 129, 0.15)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.3)' },
      warning: { bg: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', border: '1px solid rgba(245, 158, 11, 0.3)' },
      danger: { bg: 'rgba(244, 63, 94, 0.15)', color: '#f43f5e', border: '1px solid rgba(244, 63, 94, 0.3)' },
      info: { bg: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.3)' },
      purple: { bg: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6', border: '1px solid rgba(139, 92, 246, 0.3)' },
    }[variant];

    return {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      padding: '3px 10px',
      borderRadius: '20px',
      fontSize: '0.75rem',
      fontWeight: 700,
      background: map.bg,
      color: map.color,
      border: map.border,
    };
  };

  return <span style={getStyles()}>{children}</span>;
};
