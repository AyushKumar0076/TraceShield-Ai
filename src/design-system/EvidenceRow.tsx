import React, { useState } from 'react';
import { EvidenceIndicator } from '../types/threat';
import { Badge } from './Badge';
import { ChevronRight, ChevronDown, CheckCircle2, AlertTriangle, AlertCircle, Info } from 'lucide-react';

interface EvidenceRowProps {
  indicator: EvidenceIndicator;
  defaultExpanded?: boolean;
  theme?: 'dark' | 'light';
}

export const EvidenceRow: React.FC<EvidenceRowProps> = ({
  indicator,
  defaultExpanded = false,
  theme = 'dark',
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const isDark = theme === 'dark';

  const getStatusIcon = (status: EvidenceIndicator['status']) => {
    switch (status) {
      case 'flag':
        return <AlertCircle className="w-3.5 h-3.5 text-risk-high shrink-0" aria-label="Flagged indicator" />;
      case 'warning':
        return <AlertTriangle className="w-3.5 h-3.5 text-risk-amber shrink-0" aria-label="Suspicious indicator" />;
      case 'pass':
        return <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0" aria-label="Clean indicator" />;
      case 'info':
      default:
        return <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" aria-label="Informational indicator" />;
    }
  };

  const getBorderAccent = (status: EvidenceIndicator['status']) => {
    switch (status) {
      case 'flag':
        return 'border-l-2 border-l-risk-high';
      case 'warning':
        return 'border-l-2 border-l-risk-amber';
      case 'pass':
        return 'border-l-2 border-l-[#10B981]';
      default:
        return 'border-l-2 border-l-border-subtle';
    }
  };

  return (
    <div
      className={`border rounded-[4px] ${getBorderAccent(indicator.status)} transition-colors ${
        isDark
          ? 'bg-[#121714] border-[#1E2621] text-[#F1F5F3]'
          : 'bg-white border-border-subtle text-charcoal-800'
      }`}
    >
      <div
        className={`px-2.5 py-2 flex items-start justify-between gap-2 cursor-pointer select-none transition-colors ${
          isDark ? 'hover:bg-[#161C18]' : 'hover:bg-bg-subtle/70'
        }`}
        onClick={() => setIsExpanded(!isExpanded)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsExpanded(!isExpanded);
          }
        }}
        aria-expanded={isExpanded}
      >
        <div className="flex items-start gap-2 min-w-0">
          <div className="mt-0.5">{getStatusIcon(indicator.status)}</div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`text-xs font-semibold leading-tight ${
                  isDark ? 'text-white' : 'text-charcoal-900'
                }`}
              >
                {indicator.title}
              </span>
              <span
                className={`text-[10px] font-medium font-mono ${
                  isDark ? 'text-[#84948C]' : 'text-slate-500'
                }`}
              >
                {indicator.category}
              </span>
            </div>
            <p
              className={`text-xs mt-0.5 leading-snug ${
                isDark ? 'text-[#C5D2CB]' : 'text-charcoal-700'
              }`}
            >
              {indicator.finding}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0 self-center">
          <Badge status={indicator.status} />
          {indicator.technicalDetails && (
            <span className={isDark ? 'text-[#64746C]' : 'text-slate-400'}>
              {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </span>
          )}
        </div>
      </div>

      {isExpanded && indicator.technicalDetails && (
        <div
          className={`px-2.5 py-1.5 border-t text-[11px] font-mono break-all select-text ${
            isDark
              ? 'bg-[#0A0E0C] border-[#1E2621] text-[#94A39B]'
              : 'bg-bg-subtle/50 border-border-subtle text-slate-700'
          }`}
        >
          <span
            className={`mr-1.5 uppercase font-sans font-semibold text-[10px] tracking-wide ${
              isDark ? 'text-[#38BDF8]' : 'text-slate-500'
            }`}
          >
            Telemetry:
          </span>
          {indicator.technicalDetails}
        </div>
      )}
    </div>
  );
};
