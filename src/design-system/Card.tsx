import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'subtle' | 'outline' | 'flat';
  noPadding?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  noPadding = false,
  className = '',
  ...props
}) => {
  const variantStyles = {
    default: 'bg-white border border-border-subtle shadow-subtle',
    subtle: 'bg-bg-subtle border border-border-subtle',
    outline: 'bg-transparent border border-border-subtle',
    flat: 'bg-white border-none',
  }[variant];

  const paddingStyle = noPadding ? '' : 'p-3.5';

  return (
    <div
      className={`rounded-[6px] ${variantStyles} ${paddingStyle} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
