import React, { useState } from 'react';
import { ThreatAnalysisReport } from '../../types/threat';
import { EvidenceRow } from '../../design-system/EvidenceRow';
import { Server, Lock, Calendar } from 'lucide-react';

interface EvidenceSectionProps {
  report: ThreatAnalysisReport;
  onOpenRawTelemetry?: () => void;
  theme?: 'dark' | 'light';
}

export const EvidenceSection: React.FC<EvidenceSectionProps> = ({
  report,
  onOpenRawTelemetry,
  theme = 'dark',
}) => {
  const isDark = theme === 'dark';
  const [filter, setFilter] = useState<'all' | 'flagged' | 'clean'>('all');

  const filteredEvidence = report.evidence.filter((item) => {
    if (filter === 'flagged') return item.status === 'flag' || item.status === 'warning';
    if (filter === 'clean') return item.status === 'pass';
    return true;
  });

  const flaggedCount = report.evidence.filter(
    (e) => e.status === 'flag' || e.status === 'warning'
  ).length;

  return (
    <div className="flex flex-col gap-2.5">
      {/* Evidence Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <h2
            className={`text-xs font-bold uppercase tracking-wider ${
              isDark ? 'text-white' : 'text-charcoal-900'
            }`}
          >
            Indicators & Evidence
          </h2>
          <span
            className={`text-[10px] font-mono font-medium px-1.5 py-0.2 rounded border ${
              isDark
                ? 'bg-[#121714] border-[#1E2621] text-[#94A39B]'
                : 'bg-bg-subtle border-border-subtle text-slate-600'
            }`}
          >
            {report.evidence.length}
          </span>
        </div>

        {/* Filter pills */}
        <div
          className={`flex items-center gap-1 p-0.5 rounded-[4px] border text-[10px] ${
            isDark ? 'bg-[#0A0E0C] border-[#1E2621]' : 'bg-bg-subtle border-border-subtle'
          }`}
        >
          <button
            onClick={() => setFilter('all')}
            className={`px-1.5 py-0.5 rounded-[3px] font-medium transition-colors ${
              filter === 'all'
                ? isDark
                  ? 'bg-[#1E2621] text-white shadow-subtle'
                  : 'bg-white text-charcoal-900 shadow-subtle'
                : isDark
                ? 'text-[#84948C] hover:text-white'
                : 'text-slate-500 hover:text-charcoal-800'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('flagged')}
            className={`px-1.5 py-0.5 rounded-[3px] font-medium transition-colors ${
              filter === 'flagged'
                ? isDark
                  ? 'bg-[#2A1215] text-[#FCA5A5] shadow-subtle border border-[#EF4444]/40'
                  : 'bg-white text-risk-high shadow-subtle'
                : isDark
                ? 'text-[#84948C] hover:text-white'
                : 'text-slate-500 hover:text-charcoal-800'
            }`}
          >
            Flags ({flaggedCount})
          </button>
          <button
            onClick={() => setFilter('clean')}
            className={`px-1.5 py-0.5 rounded-[3px] font-medium transition-colors ${
              filter === 'clean'
                ? isDark
                  ? 'bg-[#0E281C] text-[#6EE7B7] shadow-subtle border border-[#10B981]/40'
                  : 'bg-white text-forest-700 shadow-subtle'
                : isDark
                ? 'text-[#84948C] hover:text-white'
                : 'text-slate-500 hover:text-charcoal-800'
            }`}
          >
            Clean
          </button>
        </div>
      </div>

      {/* Domain Infrastructure Summary Bar */}
      <div
        className={`grid grid-cols-2 gap-1.5 p-2 rounded-[4px] border text-[11px] ${
          isDark
            ? 'bg-[#121714] border-[#1E2621] text-[#F1F5F3]'
            : 'bg-white border-border-subtle text-charcoal-800'
        }`}
      >
        <div className="flex items-center gap-1.5 truncate">
          <Calendar className="w-3 h-3 text-[#10B981] shrink-0" />
          <span className={isDark ? 'text-[#84948C]' : 'text-slate-500'}>Age:</span>
          <span className="font-mono font-semibold truncate">
            {report.meta.domainAgeDays !== undefined
              ? report.meta.domainAgeDays === 1
                ? '1 day (<24h)'
                : `${report.meta.domainAgeDays} days`
              : 'Unverified'}
          </span>
        </div>

        <div className="flex items-center gap-1.5 truncate">
          <Lock className="w-3 h-3 text-[#10B981] shrink-0" />
          <span className={isDark ? 'text-[#84948C]' : 'text-slate-500'}>TLS:</span>
          <span className="font-mono font-semibold truncate" title={report.meta.tlsIssuer}>
            {report.meta.tlsIssuer
              ? report.meta.tlsIssuer.startsWith("Let's Encrypt")
                ? "Let's Encrypt"
                : report.meta.tlsIssuer.split(' ')[0]
              : 'None'}
          </span>
        </div>

        <div
          className={`flex items-center gap-1.5 truncate col-span-2 pt-1 border-t ${
            isDark ? 'border-[#1E2621]' : 'border-border-subtle/60'
          }`}
        >
          <Server className="w-3 h-3 text-[#38BDF8] shrink-0" />
          <span className={isDark ? 'text-[#84948C]' : 'text-slate-500'}>Host ASN:</span>
          <span className="font-mono truncate" title={report.meta.asn}>
            {report.meta.asn || 'Unresolved'}
          </span>
        </div>
      </div>

      {/* Filtered Evidence Rows */}
      <div className="flex flex-col gap-1.5">
        {filteredEvidence.length === 0 ? (
          <div
            className={`p-3 text-center rounded-[4px] border text-xs ${
              isDark
                ? 'bg-[#121714] border-[#1E2621] text-[#84948C]'
                : 'bg-bg-subtle border-border-subtle text-slate-500'
            }`}
          >
            No indicators matching the selected filter.
          </div>
        ) : (
          filteredEvidence.map((indicator) => (
            <EvidenceRow key={indicator.id} indicator={indicator} theme={theme} />
          ))
        )}
      </div>

      {onOpenRawTelemetry && (
        <button
          onClick={onOpenRawTelemetry}
          className={`text-left text-[11px] font-mono underline-offset-2 hover:underline self-start pt-1 transition-colors ${
            isDark ? 'text-[#38BDF8] hover:text-[#7DD3FC]' : 'text-slate-500 hover:text-forest-700'
          }`}
        >
          View raw JSON telemetry payload »
        </button>
      )}
    </div>
  );
};
