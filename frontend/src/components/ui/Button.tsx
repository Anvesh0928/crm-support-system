import React from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<Props> = ({ children, variant = 'primary', size = 'md', style, ...props }) => {
  const getStyles = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      fontWeight: 600,
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.2s ease-in-out',
      border: 'none',
    };

    const sizeStyles = {
      sm: { padding: '6px 12px', fontSize: '0.8rem' },
      md: { padding: '10px 18px', fontSize: '0.9rem' },
      lg: { padding: '14px 24px', fontSize: '1rem' },
    }[size];

    const variantStyles = {
      primary: { background: 'linear-gradient(135deg, deepskyblue, mediumpurple)', color: 'white', boxShadow: '0 4px 14px deepskyblue' },
      secondary: { background: 'darkblue', color: 'whitesmoke', border: '1px solid slategray' },
      danger: { background: 'linear-gradient(135deg, crimson, hotpink)', color: 'white', boxShadow: '0 4px 14px crimson' },
      ghost: { background: 'transparent', color: 'lightslategray' },
      glass: { background: 'midnightblue', color: 'deepskyblue', border: '1px solid deepskyblue' },
    }[variant];

    return { ...base, ...sizeStyles, ...variantStyles, ...style };
  };

  return (
    <button style={getStyles()} {...props}>
      {children}
    </button>
  );
};
