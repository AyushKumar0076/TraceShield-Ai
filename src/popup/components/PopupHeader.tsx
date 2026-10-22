import React from 'react';
import { Shield, ExternalLink, Sun, Moon } from 'lucide-react';

interface PopupHeaderProps {
  onOpenDashboard?: () => void;
  onOpenSettings?: () => void;
  isDashboardView?: boolean;
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
}

export const PopupHeader: React.FC<PopupHeaderProps> = ({
  onOpenDashboard,
  isDashboardView = false,
  theme = 'dark',
  onToggleTheme,
}) => {
  const isDark = theme === 'dark';

  return (
    <header
      className={`px-3 py-2.5 border-b flex items-center justify-between shrink-0 select-none transition-colors ${
        isDark
          ? 'bg-[#0D110F] border-[#1E2621] text-[#F1F5F3]'
          : 'bg-white border-border-subtle text-charcoal-900'
      }`}
    >
      {/* Brand: TRACESHIELD [AI] Digital Trust Platform */}
      <div className="flex items-center gap-2">
        <div
          className={`w-6 h-6 rounded-[4px] border flex items-center justify-center shrink-0 ${
            isDark
              ? 'bg-[#121714] border-[#10B981]/50 text-[#10B981]'
              : 'bg-forest-600 border-forest-700 text-white'
          }`}
        >
          <Shield className="w-3.5 h-3.5" aria-hidden="true" />
        </div>
        <div>
          <div className="flex items-center gap-1.5 leading-none">
            <span className="text-[11px] font-extrabold tracking-wider uppercase">
              TRACESHIELD
            </span>
            <span
              className={`text-[9px] font-mono font-bold px-1 py-0.2 rounded border ${
                isDark
                  ? 'border-[#38BDF8]/60 bg-[#38BDF8]/10 text-[#38BDF8]'
                  : 'border-forest-600/40 bg-forest-50 text-forest-700'
              }`}
            >
              AI
            </span>
          </div>
          <p
            className={`text-[9px] font-mono leading-none mt-1 tracking-tight ${
              isDark ? 'text-[#84948C]' : 'text-slate-500'
            }`}
          >
            Digital Trust Platform
          </p>
        </div>
      </div>

      {/* Header controls & status pills */}
      <div className="flex items-center gap-1">
        {/* ML: • Calibrated pill */}
        <div
          className={`hidden sm:flex items-center gap-1 px-1.5 py-0.5 rounded border text-[9px] font-mono ${
            isDark
              ? 'bg-[#121714] border-[#1E2621] text-[#94A39B]'
              : 'bg-bg-subtle border-border-subtle text-slate-600'
          }`}
          title="ML Engine: Calibrated"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
          <span>ML: Calibrated</span>
        </div>

        {/* Defanging Active indicator */}
        <div
          className={`flex items-center gap-1 px-1.5 py-0.5 rounded border text-[9px] font-mono ${
            isDark
              ? 'bg-[#121714] border-[#1E2621] text-[#34D399]'
              : 'bg-forest-50 border-forest-200 text-forest-700'
          }`}
          title="Defanging Protocol: Active"
        >
          <Shield className="w-2.5 h-2.5" />
          <span className="hidden xs:inline">Defanging</span>
        </div>

        {/* Theme toggle: Light / Dark */}
        {onToggleTheme && (
          <button
            onClick={onToggleTheme}
            className={`p-1 rounded transition-colors ${
              isDark
                ? 'text-[#94A39B] hover:text-white hover:bg-[#1E2621]'
                : 'text-slate-500 hover:text-charcoal-900 hover:bg-bg-subtle'
            }`}
            title={`Switch to ${isDark ? 'Light' : 'Dark'} theme`}
            aria-label={`Switch to ${isDark ? 'Light' : 'Dark'} theme`}
          >
            {isDark ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5" />}
          </button>
        )}

        {/* External dashboard link */}
        {!isDashboardView && onOpenDashboard && (
          <button
            onClick={onOpenDashboard}
            className={`p-1 rounded transition-colors ${
              isDark
                ? 'text-[#94A39B] hover:text-white hover:bg-[#1E2621]'
                : 'text-slate-500 hover:text-charcoal-900 hover:bg-bg-subtle'
            }`}
            title="Open Full Console"
            aria-label="Open Full Console"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </header>
  );
};
