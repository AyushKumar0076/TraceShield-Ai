import React from 'react';
import { Shield, Search, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '../../design-system/Button';

interface StateEmptyProps {
  currentUrl: string;
  onStartScan: () => void;
  theme?: 'dark' | 'light';
}

export const StateEmpty: React.FC<StateEmptyProps> = ({
  currentUrl,
  onStartScan,
  theme = 'dark',
}) => {
  const isDark = theme === 'dark';
  let domain = currentUrl;
  let isHttps = false;
  try {
    const parsed = new URL(currentUrl);
    domain = parsed.hostname;
    isHttps = parsed.protocol === 'https:';
  } catch {
    // fallback
  }

  return (
    <div
      className={`flex flex-col items-center justify-center p-5 text-center min-h-[300px] rounded-[6px] border transition-colors ${
        isDark ? 'bg-[#121714] border-[#1E2621]' : 'bg-white border-border-subtle'
      }`}
    >
      <div
        className={`w-12 h-12 rounded-[6px] border flex items-center justify-center mb-3 ${
          isDark
            ? 'bg-[#0A0E0C] border-[#1E2621] text-[#10B981]'
            : 'bg-bg-subtle border-border-subtle text-forest-600'
        }`}
      >
        <Shield className="w-6 h-6" />
      </div>

      <h2
        className={`text-sm font-bold leading-tight ${
          isDark ? 'text-white' : 'text-charcoal-900'
        }`}
      >
        Target Ready for Inspection
      </h2>

      <p
        className={`text-xs mt-1.5 max-w-xs leading-relaxed ${
          isDark ? 'text-[#84948C]' : 'text-charcoal-700'
        }`}
      >
        Click below to run multi-vector heuristic analysis on the active destination endpoint.
      </p>

      {/* Endpoint Pre-flight Summary */}
      <div
        className={`w-full mt-4 p-2.5 rounded-[4px] border text-left text-xs font-mono ${
          isDark ? 'bg-[#0A0E0C] border-[#1E2621]' : 'bg-bg-subtle border-border-subtle'
        }`}
      >
        <div
          className={`flex items-center justify-between py-1 border-b ${
            isDark ? 'border-[#1E2621]' : 'border-border-subtle/60'
          }`}
        >
          <span className={`font-sans text-[11px] ${isDark ? 'text-[#84948C]' : 'text-slate-500'}`}>
            Domain:
          </span>
          <span
            className={`font-semibold truncate max-w-[190px] ${
              isDark ? 'text-white' : 'text-charcoal-900'
            }`}
            title={domain}
          >
            {domain}
          </span>
        </div>
        <div
          className={`flex items-center justify-between py-1 border-b ${
            isDark ? 'border-[#1E2621]' : 'border-border-subtle/60'
          }`}
        >
          <span className={`font-sans text-[11px] ${isDark ? 'text-[#84948C]' : 'text-slate-500'}`}>
            Protocol:
          </span>
          <span className="flex items-center gap-1 font-sans text-[11px]">
            {isHttps ? (
              <>
                <CheckCircle2 className="w-3 h-3 text-[#10B981]" />
                <span className="text-[#34D399] font-semibold">HTTPS</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-3 h-3 text-risk-amber" />
                <span className="text-risk-amber font-semibold">HTTP (Unencrypted)</span>
              </>
            )}
          </span>
        </div>
        <div className="flex items-center justify-between pt-1 text-[11px]">
          <span className={`font-sans ${isDark ? 'text-[#84948C]' : 'text-slate-500'}`}>
            Engine Status:
          </span>
          <span className="text-[#10B981] font-sans font-semibold">Standby (0 flags cached)</span>
        </div>
      </div>

      <div className="mt-5 w-full">
        <Button
          variant="primary"
          size="md"
          className={`w-full justify-center ${
            isDark
              ? 'bg-[#10B981] hover:bg-[#059669] text-black font-bold border-none'
              : 'bg-forest-600 hover:bg-forest-700 text-white'
          }`}
          icon={<Search className="w-4 h-4" />}
          onClick={onStartScan}
        >
          Execute Heuristic Scan
        </Button>
      </div>

      <span
        className={`text-[10px] mt-3 font-mono ${
          isDark ? 'text-[#64746C]' : 'text-slate-400'
        }`}
      >
        Checks DNS, SSL/TLS, Lexical Entropy, Phishing Signatures
      </span>
    </div>
  );
};
