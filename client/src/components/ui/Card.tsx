import React from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export const Card: React.FC<Props> = ({ children, className = '', style, onClick }) => {
  return (
    <div
      className={`glass-panel ${className}`}
      onClick={onClick}
      style={{
        padding: '20px',
        ...style,
      }}
    >
      {children}
    </div>
  );
};
