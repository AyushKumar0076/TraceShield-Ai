import React from 'react';
import { RiskLevel, CheckStatus } from '../types/threat';

interface BadgeProps {
  children?: React.ReactNode;
  risk?: RiskLevel;
  status?: CheckStatus;
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  risk,
  status,
  size = 'md',
  className = '',
}) => {
  const sizeClasses = size === 'sm' 
    ? 'text-[11px] px-1.5 py-0.5 font-medium' 
    : 'text-xs px-2 py-0.5 font-medium';

  // Risk Level Badges
  if (risk) {
    switch (risk) {
      case 'high':
        return (
          <span
            className={`inline-flex items-center gap-1 rounded-[4px] border border-risk-high-border bg-risk-high-bg text-risk-high-text font-semibold uppercase tracking-wider whitespace-nowrap shrink-0 ${sizeClasses} ${className}`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-risk-high" aria-hidden="true" />
            {children || 'High Risk'}
          </span>
        );
      case 'suspicious':
        return (
          <span
            className={`inline-flex items-center gap-1 rounded-[4px] border border-risk-amber-border bg-risk-amber-bg text-risk-amber-text font-semibold uppercase tracking-wider whitespace-nowrap shrink-0 ${sizeClasses} ${className}`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-risk-amber" aria-hidden="true" />
            {children || 'Suspicious'}
          </span>
        );
      case 'low':
        return (
          <span
            className={`inline-flex items-center gap-1 rounded-[4px] border border-risk-low-border bg-risk-low-bg text-risk-low-text font-semibold uppercase tracking-wider whitespace-nowrap shrink-0 ${sizeClasses} ${className}`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-risk-low" aria-hidden="true" />
            {children || 'Low Risk'}
          </span>
        );
      case 'unassessed':
      default:
        return (
          <span
            className={`inline-flex items-center gap-1 rounded-[4px] border border-border-subtle bg-bg-subtle text-slate-600 font-medium whitespace-nowrap shrink-0 ${sizeClasses} ${className}`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" aria-hidden="true" />
            {children || 'Unassessed'}
          </span>
        );
    }
  }

  // Evidence Status Badges
  if (status) {
    switch (status) {
      case 'flag':
        return (
          <span
            className={`inline-flex items-center rounded-[4px] border border-risk-high-border bg-risk-high-bg text-risk-high-text font-semibold text-[10px] px-1.5 py-0.5 uppercase tracking-wider whitespace-nowrap shrink-0 ${className}`}
          >
            Flagged
          </span>
        );
      case 'warning':
        return (
          <span
            className={`inline-flex items-center rounded-[4px] border border-risk-amber-border bg-risk-amber-bg text-risk-amber-text font-semibold text-[10px] px-1.5 py-0.5 uppercase tracking-wider whitespace-nowrap shrink-0 ${className}`}
          >
            Warning
          </span>
        );
      case 'pass':
        return (
          <span
            className={`inline-flex items-center rounded-[4px] border border-risk-low-border bg-risk-low-bg text-risk-low-text font-semibold text-[10px] px-1.5 py-0.5 uppercase tracking-wider whitespace-nowrap shrink-0 ${className}`}
          >
            Pass
          </span>
        );
      case 'info':
      default:
        return (
          <span
            className={`inline-flex items-center rounded-[4px] border border-border-subtle bg-slate-100 text-slate-700 font-medium text-[10px] px-1.5 py-0.5 whitespace-nowrap shrink-0 ${className}`}
          >
            Info
          </span>
        );
    }
  }

  return (
    <span
      className={`inline-flex items-center rounded-[4px] border border-border-subtle bg-bg-subtle text-charcoal-700 font-medium ${sizeClasses} ${className}`}
    >
      {children}
    </span>
  );
};
