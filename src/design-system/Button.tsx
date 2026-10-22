import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  isLoading = false,
  disabled,
  className = '',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-colors select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-600 focus-visible:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed';

  const sizeClasses = {
    xs: 'text-xs px-2 py-1 rounded-[4px] gap-1.5 min-h-[26px]',
    sm: 'text-xs px-2.5 py-1.5 rounded-[4px] gap-1.5 min-h-[32px]',
    md: 'text-sm px-3.5 py-2 rounded-[6px] gap-2 min-h-[38px]',
    lg: 'text-sm px-4 py-2.5 rounded-[6px] gap-2.5 min-h-[44px]',
  }[size];

  const variantClasses = {
    primary: 'bg-forest-600 hover:bg-forest-700 active:bg-forest-800 text-white shadow-subtle border border-forest-700',
    secondary: 'bg-white hover:bg-bg-subtle active:bg-charcoal-100 text-charcoal-800 border border-border-subtle hover:border-border-medium shadow-subtle',
    outline: 'bg-transparent hover:bg-bg-subtle text-charcoal-800 border border-border-subtle hover:border-border-strong',
    danger: 'bg-risk-high hover:bg-red-700 active:bg-red-800 text-white shadow-subtle border border-red-800',
    ghost: 'bg-transparent hover:bg-bg-subtle text-slate-600 hover:text-charcoal-800',
  }[variant];

  return (
    <button
      disabled={disabled || isLoading}
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" aria-hidden="true" />
      ) : (
        icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>
      )}
      <span>{children}</span>
      {!isLoading && icon && iconPosition === 'right' && (
        <span className="shrink-0">{icon}</span>
      )}
    </button>
  );
};
