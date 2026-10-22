import React from 'react';
import { ThreatAnalysisReport } from '../../types/threat';
import { Button } from '../../design-system/Button';
import { CheckCircle2, ShieldBan, FileDown, Flag } from 'lucide-react';

interface ActionNextStepsProps {
  report: ThreatAnalysisReport;
  onTriggerFeature: (featureName: string, description: string) => void;
  theme?: 'dark' | 'light';
}

export const ActionNextSteps: React.FC<ActionNextStepsProps> = ({
  report,
  onTriggerFeature,
  theme = 'dark',
}) => {
  const isDark = theme === 'dark';
  const isHighRisk = report.riskLevel === 'high';
  const isSuspicious = report.riskLevel === 'suspicious';

  return (
    <div
      className={`flex flex-col gap-2 p-3 border rounded-[6px] transition-colors ${
        isDark ? 'bg-[#121714] border-[#1E2621]' : 'bg-white border-border-subtle'
      }`}
    >
      <div className="flex items-center justify-between">
        <h3
          className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
            isDark ? 'text-white' : 'text-charcoal-900'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
          <span>Analyst Guidance & Next Steps</span>
        </h3>
        <span
          className={`text-[10px] font-mono ${
            isDark ? 'text-[#84948C]' : 'text-slate-500'
          }`}
        >
          Protocol: TRC-DEF-04
        </span>
      </div>

      <ol
        className={`list-decimal list-outside pl-4 space-y-1.5 text-xs leading-snug ${
          isDark ? 'text-[#C5D2CB]' : 'text-charcoal-700'
        }`}
      >
        {report.nextSteps.map((step, idx) => (
          <li key={idx} className="pl-0.5">
            <span>{step}</span>
          </li>
        ))}
      </ol>

      {/* Practical Action Bar */}
      <div
        className={`mt-2 pt-2 border-t flex items-center gap-2 flex-wrap ${
          isDark ? 'border-[#1E2621]' : 'border-border-subtle'
        }`}
      >
        {isHighRisk && (
          <Button
            variant="danger"
            size="xs"
            icon={<ShieldBan className="w-3 h-3" />}
            onClick={() =>
              onTriggerFeature(
                'Perimeter Blocklist Push',
                'Instantly propagate this FQDN to Palo Alto, Fortinet, and Cloudflare Gateway DNS firewalls.'
              )
            }
          >
            Push DNS Block
          </Button>
        )}

        {isSuspicious && (
          <Button
            variant="secondary"
            size="xs"
            className={
              isDark
                ? 'bg-[#0A0E0C] hover:bg-[#1E2621] text-[#FCD34D] border-[#F59E0B]/40'
                : 'text-risk-amber'
            }
            icon={<ShieldBan className="w-3 h-3" />}
            onClick={() =>
              onTriggerFeature(
                'Sandbox Detonation',
                'Forward the destination endpoint to the automated browser isolation sandbox for dynamic DOM inspection.'
              )
            }
          >
            Detonate in Sandbox
          </Button>
        )}

        <Button
          variant="secondary"
          size="xs"
          className={
            isDark
              ? 'bg-[#0A0E0C] hover:bg-[#1E2621] text-[#F1F5F3] border-[#1E2621]'
              : ''
          }
          icon={<FileDown className="w-3 h-3 text-[#38BDF8]" />}
          onClick={() =>
            onTriggerFeature(
              'Export STIX 2.1 IOC Bundle',
              'Generate a standardized STIX/TAXII threat intelligence packet with indicators and observable objects.'
            )
          }
        >
          Export IOC
        </Button>

        <Button
          variant="ghost"
          size="xs"
          icon={<Flag className="w-3 h-3 opacity-60" />}
          className={`ml-auto ${
            isDark
              ? 'text-[#84948C] hover:text-white hover:bg-[#161C19]'
              : 'text-slate-500 hover:text-charcoal-800'
          }`}
          onClick={() =>
            onTriggerFeature(
              'Report False Positive',
              'Submit false positive feedback with supporting domain certificate data to the TRACEShield threat intelligence team.'
            )
          }
        >
          Feedback
        </Button>
      </div>
    </div>
  );
};
