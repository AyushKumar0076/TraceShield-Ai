import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightElement?: React.ReactNode;
  isMonospace?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  label,
  helperText,
  error,
  leftIcon,
  rightElement,
  isMonospace = false,
  className = '',
  id,
  ...props
}, ref) => {
  const generatedId = React.useId();
  const inputId = id || generatedId;

  return (
    <div className="w-full flex flex-col gap-1">
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs font-semibold text-charcoal-700 select-none flex items-center justify-between"
        >
          <span>{label}</span>
          {error && <span className="text-risk-high text-[11px] font-normal">{error}</span>}
        </label>
      )}
      <div className="relative flex items-center">
        {leftIcon && (
          <span className="absolute left-2.5 text-slate-400 pointer-events-none flex items-center shrink-0">
            {leftIcon}
          </span>
        )}
        <input
          id={inputId}
          ref={ref}
          className={`
            w-full rounded-[6px] border bg-white px-3 py-1.5 text-xs text-charcoal-800
            transition-colors placeholder:text-slate-400
            border-border-subtle hover:border-border-medium
            focus:border-forest-600 focus:outline-none focus:ring-1 focus:ring-forest-600
            disabled:bg-bg-subtle disabled:text-slate-400 disabled:cursor-not-allowed
            ${leftIcon ? 'pl-8' : ''}
            ${rightElement ? 'pr-10' : ''}
            ${isMonospace ? 'font-mono text-[11px]' : ''}
            ${error ? 'border-risk-high-border focus:border-risk-high focus:ring-risk-high' : ''}
            ${className}
          `}
          {...props}
        />
        {rightElement && (
          <div className="absolute right-1.5 flex items-center">
            {rightElement}
          </div>
        )}
      </div>
      {helperText && !error && (
        <p className="text-[11px] text-slate-500 leading-tight">{helperText}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';
