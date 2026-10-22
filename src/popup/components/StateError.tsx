import React from 'react';
import { AlertCircle, RefreshCw, HelpCircle } from 'lucide-react';
import { Button } from '../../design-system/Button';

interface StateErrorProps {
  errorMessage?: string;
  errorCode?: string;
  targetUrl: string;
  onRetry: () => void;
  onContactSupport?: () => void;
}

export const StateError: React.FC<StateErrorProps> = ({
  errorMessage = "Unable to resolve target domain DNS records or establish connection.",
  errorCode = "ERR_DNS_RESOLUTION_TIMEOUT",
  targetUrl,
  onRetry,
  onContactSupport,
}) => {
  return (
    <div className="flex flex-col p-4 bg-white rounded-[6px] border border-border-subtle">
      <div className="flex items-center gap-2 pb-2.5 border-b border-border-subtle text-risk-high">
        <AlertCircle className="w-4 h-4 shrink-0" />
        <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal-900 leading-tight">
          Analysis Interrupted — Telemetry Error
        </h3>
      </div>

      <div className="mt-3 p-2.5 rounded-[4px] bg-risk-high-bg border border-risk-high-border text-xs text-risk-high-text">
        <p className="font-medium leading-relaxed">{errorMessage}</p>
      </div>

      {/* Technical Diagnostics */}
      <div className="mt-3 p-2.5 rounded-[4px] bg-bg-subtle border border-border-subtle text-xs font-mono space-y-1">
        <div className="flex justify-between text-[11px]">
          <span className="text-slate-500 font-sans">Error Code:</span>
          <span className="font-semibold text-charcoal-900">{errorCode}</span>
        </div>
        <div className="flex justify-between text-[11px]">
          <span className="text-slate-500 font-sans">Target:</span>
          <span className="text-slate-700 truncate max-w-[200px]" title={targetUrl}>
            {targetUrl}
          </span>
        </div>
        <div className="flex justify-between text-[11px]">
          <span className="text-slate-500 font-sans">Socket Status:</span>
          <span className="text-slate-700">TCP handshake RST</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 flex items-center gap-2">
        <Button
          variant="primary"
          size="sm"
          className="w-full justify-center"
          icon={<RefreshCw className="w-3.5 h-3.5" />}
          onClick={onRetry}
        >
          Retry Scan
        </Button>

        {onContactSupport && (
          <Button
            variant="secondary"
            size="sm"
            icon={<HelpCircle className="w-3.5 h-3.5" />}
            onClick={onContactSupport}
          >
            Diagnostics
          </Button>
        )}
      </div>
    </div>
  );
};
