import React, { useState, useEffect } from 'react';
import { ThreatAnalysisReport, PopupViewState } from '../types/threat';
import { analyzeUrlThreat } from './threatAnalyzer';
import { PopupHeader } from './components/PopupHeader';
import { DomainScanBar } from './components/DomainScanBar';
import { RiskSummaryBanner } from './components/RiskSummaryBanner';
import { EvidenceSection } from './components/EvidenceSection';
import { ActionNextSteps } from './components/ActionNextSteps';
import { StateEmpty } from './components/StateEmpty';
import { StateLoading } from './components/StateLoading';
import { StateError } from './components/StateError';
import { UnimplementedModal } from './components/UnimplementedModal';
import { Modal } from '../design-system/Modal';

export interface PopupAppProps {
  initialReport?: ThreatAnalysisReport;
  initialState?: PopupViewState;
  onOpenDashboard?: () => void;
  isEmbedded?: boolean;
  initialTheme?: 'dark' | 'light';
}

export const PopupApp: React.FC<PopupAppProps> = ({
  initialReport,
  initialState = 'empty',
  onOpenDashboard,
  isEmbedded = false,
  initialTheme = 'dark',
}) => {
  const [theme, setTheme] = useState<'dark' | 'light'>(initialTheme);
  const [viewState, setViewState] = useState<PopupViewState>(initialState);
  const [currentUrl, setCurrentUrl] = useState<string>(
    initialReport ? initialReport.url : 'https://micros0ft-account-login.tk/security-checkpoint?session=893bf'
  );
  const [activeReport, setActiveReport] = useState<ThreatAnalysisReport | null>(initialReport || null);
  const [errorMessage, setErrorMessage] = useState<string>(
    'Unable to resolve target domain DNS records or establish connection.'
  );

  // Unimplemented feature modal state
  const [unimplementedModal, setUnimplementedModal] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
  }>({
    isOpen: false,
    title: '',
    description: '',
  });

  // Raw telemetry inspection modal
  const [showRawTelemetry, setShowRawTelemetry] = useState(false);

  // Query active Chrome tab if running in real extension context
  useEffect(() => {
    if (typeof chrome !== 'undefined' && chrome.tabs && chrome.tabs.query) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs && tabs[0] && tabs[0].url) {
          const tabUrl = tabs[0].url;
          if (!tabUrl.startsWith('chrome://') && !tabUrl.startsWith('chrome-extension://')) {
            setCurrentUrl(tabUrl);
            if (!isEmbedded) {
              setViewState('empty');
              setActiveReport(null);
            }
          }
        }
      });
    }
  }, [isEmbedded]);

  const handleScan = (targetUrl: string) => {
    setCurrentUrl(targetUrl);
    setViewState('scanning');

    setTimeout(() => {
      const lower = targetUrl.toLowerCase();
      if (lower.includes('error') || lower.includes('fail') || lower.includes('timeout')) {
        setErrorMessage('DNS query timed out after 3 retries against authoritative nameserver.');
        setViewState('error');
      } else {
        const report = analyzeUrlThreat(targetUrl);
        setActiveReport(report);
        setViewState('result');
      }
    }, 1500);
  };

  const getDomain = (url: string) => {
    try {
      return new URL(url).hostname;
    } catch {
      return url.replace(/^https?:\/\//, '').split('/')[0] || url;
    }
  };

  const handleTriggerFeature = (title: string, description: string) => {
    setUnimplementedModal({
      isOpen: true,
      title,
      description,
    });
  };

  const isDark = theme === 'dark';

  return (
    <div
      className={`w-full max-w-[400px] min-h-[580px] max-h-[680px] flex flex-col font-sans overflow-hidden transition-colors ${
        isDark
          ? 'bg-[#0A0E0C] text-[#F1F5F3] border-[#1E2621]'
          : 'bg-bg-primary text-charcoal-900 border-border-subtle'
      } ${isEmbedded ? 'rounded-[6px] border shadow-elevated' : 'border'}`}
    >
      {/* Sleek Header matching Website Branding */}
      <PopupHeader
        onOpenDashboard={onOpenDashboard}
        onOpenSettings={() =>
          handleTriggerFeature(
            'SOC Engine Configuration',
            'Configures custom YARA-L rules, local proxy interception thresholds, and enterprise SIEM webhook endpoints.'
          )
        }
        theme={theme}
        onToggleTheme={() => setTheme(isDark ? 'light' : 'dark')}
      />

      {/* Target Domain & Scan Bar */}
      <DomainScanBar
        currentUrl={currentUrl}
        isScanning={viewState === 'scanning'}
        onScan={handleScan}
        theme={theme}
      />

      {/* Scrollable Viewport Content */}
      <main className="flex-1 overflow-y-auto p-3 space-y-3">
        {viewState === 'empty' && (
          <StateEmpty
            currentUrl={currentUrl}
            onStartScan={() => handleScan(currentUrl)}
            theme={theme}
          />
        )}

        {viewState === 'scanning' && (
          <StateLoading domain={getDomain(currentUrl)} theme={theme} />
        )}

        {viewState === 'error' && (
          <StateError
            targetUrl={currentUrl}
            errorMessage={errorMessage}
            onRetry={() => handleScan(currentUrl)}
            onContactSupport={() =>
              handleTriggerFeature(
                'Diagnostic Packet Collector',
                'Compiles DNS trace, certificate chain dumps, and network socket logs into a secure troubleshooting package.'
              )
            }
          />
        )}

        {viewState === 'result' && activeReport && (
          <>
            {/* Verdict Risk Summary */}
            <RiskSummaryBanner report={activeReport} theme={theme} />

            {/* Categorized Indicators & Evidence */}
            <EvidenceSection
              report={activeReport}
              onOpenRawTelemetry={() => setShowRawTelemetry(true)}
              theme={theme}
            />

            {/* Practical Next Steps */}
            <ActionNextSteps
              report={activeReport}
              onTriggerFeature={handleTriggerFeature}
              theme={theme}
            />
          </>
        )}
      </main>

      {/* Footnote / Extension Audit Bar matching website */}
      <footer
        className={`px-3 py-1.5 border-t flex items-center justify-between text-[10px] font-mono select-none shrink-0 ${
          isDark
            ? 'bg-[#0D110F] border-[#1E2621] text-[#84948C]'
            : 'bg-white border-border-subtle text-slate-500'
        }`}
      >
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
          <span>Defanging: Active</span>
        </span>
        <span className="text-[#38BDF8]">TRACESHIELD [AI]</span>
      </footer>

      {/* Unimplemented Roadmap Feature Modal */}
      <UnimplementedModal
        isOpen={unimplementedModal.isOpen}
        onClose={() => setUnimplementedModal({ ...unimplementedModal, isOpen: false })}
        featureTitle={unimplementedModal.title}
        featureDescription={unimplementedModal.description}
      />

      {/* Raw Telemetry JSON Modal */}
      {showRawTelemetry && activeReport && (
        <Modal
          isOpen={showRawTelemetry}
          onClose={() => setShowRawTelemetry(false)}
          title="Raw Telemetry IOC Payload"
          subtitle={`Report ${activeReport.scanId}`}
        >
          <div className="max-h-[360px] overflow-y-auto p-2 rounded bg-charcoal-900 text-charcoal-100 font-mono text-[11px] leading-relaxed select-text">
            <pre>{JSON.stringify(activeReport, null, 2)}</pre>
          </div>
        </Modal>
      )}
    </div>
  );
};
