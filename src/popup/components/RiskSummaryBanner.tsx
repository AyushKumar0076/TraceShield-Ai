import React from 'react';
import { ThreatAnalysisReport } from '../../types/threat';
import { Badge } from '../../design-system/Badge';
import { Clock, ShieldAlert, ShieldCheck, AlertTriangle } from 'lucide-react';

interface RiskSummaryBannerProps {
  report: ThreatAnalysisReport;
  theme?: 'dark' | 'light';
}

export const RiskSummaryBanner: React.FC<RiskSummaryBannerProps> = ({
  report,
  theme = 'dark',
}) => {
  const isDark = theme === 'dark';

  const getVerdictIcon = (risk: ThreatAnalysisReport['riskLevel']) => {
    switch (risk) {
      case 'high':
        return <ShieldAlert className="w-4 h-4 text-risk-high shrink-0" />;
      case 'suspicious':
        return <AlertTriangle className="w-4 h-4 text-[#F59E0B] shrink-0" />;
      case 'low':
        return <ShieldCheck className="w-4 h-4 text-[#10B981] shrink-0" />;
      default:
        return null;
    }
  };

  const getContainerStyle = (risk: ThreatAnalysisReport['riskLevel']) => {
    if (isDark) {
      switch (risk) {
        case 'high':
          return 'bg-[#240C0F] border-[#EF4444]/50 text-[#FCA5A5]';
        case 'suspicious':
          return 'bg-[#231806] border-[#F59E0B]/50 text-[#FCD34D]';
        case 'low':
          return 'bg-[#062316] border-[#10B981]/50 text-[#6EE7B7]';
        default:
          return 'bg-[#121714] border-[#1E2621] text-[#F1F5F3]';
      }
    }

    switch (risk) {
      case 'high':
        return 'bg-risk-high-bg border-risk-high-border text-charcoal-900';
      case 'suspicious':
        return 'bg-risk-amber-bg border-risk-amber-border text-charcoal-900';
      case 'low':
        return 'bg-risk-low-bg border-risk-low-border text-charcoal-900';
      default:
        return 'bg-white border-border-subtle text-charcoal-900';
    }
  };

  return (
    <div
      className={`p-2.5 border rounded-[6px] transition-colors ${getContainerStyle(
        report.riskLevel
      )}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-1.5 min-w-0">
          {getVerdictIcon(report.riskLevel)}
          <span
            className={`text-xs font-bold leading-tight ${
              isDark ? 'text-white' : 'text-charcoal-900'
            }`}
          >
            {report.verdictTitle}
          </span>
        </div>
        <Badge risk={report.riskLevel} size="sm" />
      </div>

      <p
        className={`text-xs mt-1.5 leading-relaxed font-normal ${
          isDark ? 'text-[#C5D2CB]' : 'text-charcoal-700'
        }`}
      >
        {report.verdictSummary}
      </p>

      {/* Factual telemetry metrics and UTC timestamp */}
      <div
        className={`mt-2.5 pt-2 border-t flex items-center justify-between text-[10px] font-tabular ${
          isDark
            ? 'border-[#26322B] text-[#84948C]'
            : 'border-charcoal-200/40 text-slate-600'
        }`}
      >
        <div className="flex items-center gap-2">
          <span>
            Evaluated:{' '}
            <strong className={isDark ? 'text-white font-semibold' : 'text-charcoal-900 font-semibold'}>
              {report.indicatorsEvaluated} checks
            </strong>
          </span>
          <span className="opacity-40">•</span>
          <span>
            Flagged:{' '}
            <strong
              className={
                report.indicatorsFlagged > 0
                  ? 'font-semibold text-risk-high'
                  : isDark
                  ? 'font-semibold text-[#10B981]'
                  : 'font-semibold text-charcoal-800'
              }
            >
              {report.indicatorsFlagged}
            </strong>
          </span>
        </div>

        <div className="flex items-center gap-1 font-mono" title="Scan verification timestamp">
          <Clock className="w-3 h-3 opacity-60" />
          <span>{report.scannedAt}</span>
        </div>
      </div>
    </div>
  );
};
