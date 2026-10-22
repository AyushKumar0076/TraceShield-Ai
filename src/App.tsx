import React, { useState } from 'react';
import { PopupApp } from './popup/PopupApp';
import { DashboardLayout } from './dashboard/DashboardLayout';
import { MOCK_SAFE_REPORT, MOCK_SUSPICIOUS_REPORT, MOCK_MALICIOUS_REPORT } from './popup/mockData';
import { PopupViewState, ThreatAnalysisReport } from './types/threat';
import { 
  Shield, 
  Monitor, 
  Smartphone, 
  Columns, 
  CheckCircle2, 
  AlertTriangle, 
  AlertCircle, 
  Clock,
  Sun,
  Moon
} from 'lucide-react';
import { UnimplementedModal } from './popup/components/UnimplementedModal';

type AppMode = 'popup-inspector' | 'dashboard' | 'side-by-side';

export const App: React.FC = () => {
  const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const initialMode = (urlParams?.get('view') as AppMode) || 'popup-inspector';
  const paramState = urlParams?.get('state');

  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const isDark = theme === 'dark';
  const [appMode, setAppMode] = useState<AppMode>(initialMode);
  
  // Extension simulator controls
  const [simState, setSimState] = useState<PopupViewState>(
    paramState === 'empty' ? 'empty' :
    paramState === 'scanning' ? 'scanning' :
    paramState === 'error' ? 'error' : 'result'
  );

  const getInitialReport = (): ThreatAnalysisReport => {
    if (paramState === 'safe') return MOCK_SAFE_REPORT;
    if (paramState === 'suspicious') return MOCK_SUSPICIOUS_REPORT;
    return MOCK_MALICIOUS_REPORT;
  };

  const [simReport, setSimReport] = useState<ThreatAnalysisReport>(getInitialReport());
  const [targetTabUrl, setTargetTabUrl] = useState<string>(
    urlParams?.get('state') === 'safe' ? 'https://leetcode.com' :
    urlParams?.get('state') === 'suspicious' ? 'https://netmirror.gg/10/en-in' :
    'https://micros0ft-account-login.tk/security-checkpoint?session=893bf'
  );

  // Modal for roadmap feature previews
  const [roadmapModal, setRoadmapModal] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
  }>({
    isOpen: false,
    title: '',
    description: '',
  });

  const handleStatePreset = (state: PopupViewState, report?: ThreatAnalysisReport, url?: string) => {
    setSimState(state);
    if (report) setSimReport(report);
    if (url) setTargetTabUrl(url);
  };

  const openRoadmap = (title: string, description: string) => {
    setRoadmapModal({
      isOpen: true,
      title,
      description,
    });
  };

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors ${
        isDark ? 'bg-[#0A0E0C] text-[#F1F5F3]' : 'bg-bg-primary text-charcoal-900'
      }`}
    >
      {/* Top Bar styled to match the website */}
      <header
        className={`px-4 py-2 border-b flex items-center justify-between shrink-0 z-20 transition-colors ${
          isDark ? 'bg-[#0D110F] border-[#1E2621]' : 'bg-white border-border-subtle'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div
              className={`w-6 h-6 rounded-[4px] border flex items-center justify-center font-bold text-xs ${
                isDark
                  ? 'bg-[#121714] border-[#10B981]/50 text-[#10B981]'
                  : 'bg-forest-600 border-forest-700 text-white'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
            </div>
            <div className="flex items-center gap-1.5 leading-none">
              <span className="text-xs font-black tracking-wider uppercase">
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
          </div>

          <span className={isDark ? 'text-[#3E4E45]' : 'text-slate-300'}>|</span>

          <span
            className={`text-xs font-mono hidden sm:inline ${
              isDark ? 'text-[#84948C]' : 'text-slate-500'
            }`}
          >
            Digital Trust Platform &amp; Extension Engine
          </span>
        </div>

        {/* View Switcher Tabs */}
        <div
          className={`flex items-center gap-1 p-1 rounded-[6px] border text-xs font-mono ${
            isDark ? 'bg-[#121714] border-[#1E2621]' : 'bg-bg-subtle border-border-subtle'
          }`}
        >
          <button
            onClick={() => setAppMode('popup-inspector')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-[4px] font-medium transition-colors ${
              appMode === 'popup-inspector'
                ? isDark
                  ? 'bg-[#1E2621] text-white font-semibold'
                  : 'bg-white text-charcoal-900 shadow-subtle font-semibold'
                : isDark
                ? 'text-[#84948C] hover:text-white'
                : 'text-slate-600 hover:text-charcoal-900'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5 text-[#10B981]" />
            <span>Extension Popup</span>
          </button>

          <button
            onClick={() => setAppMode('dashboard')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-[4px] font-medium transition-colors ${
              appMode === 'dashboard'
                ? isDark
                  ? 'bg-[#1E2621] text-white font-semibold'
                  : 'bg-white text-charcoal-900 shadow-subtle font-semibold'
                : isDark
                ? 'text-[#84948C] hover:text-white'
                : 'text-slate-600 hover:text-charcoal-900'
            }`}
          >
            <Monitor className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>Website Console</span>
          </button>

          <button
            onClick={() => setAppMode('side-by-side')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-[4px] font-medium transition-colors ${
              appMode === 'side-by-side'
                ? isDark
                  ? 'bg-[#1E2621] text-white font-semibold'
                  : 'bg-white text-charcoal-900 shadow-subtle font-semibold'
                : isDark
                ? 'text-[#84948C] hover:text-white'
                : 'text-slate-600 hover:text-charcoal-900'
            }`}
          >
            <Columns className="w-3.5 h-3.5" />
            <span>Split View</span>
          </button>
        </div>

        {/* Theme Toggle & Status Pills */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-[4px] border text-xs font-mono transition-colors ${
              isDark
                ? 'border-[#1E2621] bg-[#121714] text-amber-300 hover:text-amber-200'
                : 'border-border-subtle bg-white text-slate-700 hover:text-charcoal-900'
            }`}
          >
            {isDark ? (
              <>
                <Sun className="w-3 h-3 text-amber-400" />
                <span>Light</span>
              </>
            ) : (
              <>
                <Moon className="w-3 h-3 text-slate-600" />
                <span>Dark</span>
              </>
            )}
          </button>

          <div
            className={`hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] border text-xs font-mono ${
              isDark
                ? 'border-[#1E2621] bg-[#121714] text-[#34D399]'
                : 'border-forest-200 bg-forest-50 text-forest-800'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
            <span className="font-semibold text-[11px]">Engine: Calibrated</span>
          </div>
        </div>
      </header>

      {/* Main Harness Views */}
      {appMode === 'dashboard' && (
        <main className="flex-1 overflow-hidden">
          <DashboardLayout
            onOpenExtensionPopup={() => setAppMode('popup-inspector')}
            onTriggerFeature={openRoadmap}
            initialTheme={theme}
          />
        </main>
      )}

      {appMode === 'popup-inspector' && (
        <main className="flex-1 flex flex-col items-center p-6 overflow-y-auto">
          {/* Extension Test Harness Controls */}
          <div
            className={`w-full max-w-4xl border rounded-[6px] p-4 mb-6 shadow-subtle space-y-3 transition-colors ${
              isDark ? 'bg-[#121714] border-[#1E2621]' : 'bg-white border-border-subtle'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xs font-bold font-mono uppercase tracking-wider text-white">
                  Chrome Extension Viewport Simulator
                </h2>
                <p className={`text-xs mt-0.5 ${isDark ? 'text-[#84948C]' : 'text-slate-500'}`}>
                  Test the extension popup across real evaluation states and edge cases.
                </p>
              </div>

              {/* State Presets */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  onClick={() => handleStatePreset('result', MOCK_MALICIOUS_REPORT, 'https://micros0ft-account-login.tk/security-checkpoint')}
                  className={`px-2 py-1 rounded-[4px] text-xs font-mono border transition-colors flex items-center gap-1 ${
                    simState === 'result' && simReport.riskLevel === 'high'
                      ? 'bg-[#2A1014] border-[#EF4444] text-[#FCA5A5]'
                      : isDark
                      ? 'bg-[#0A0E0C] border-[#1E2621] text-[#94A39B] hover:text-white'
                      : 'bg-white border-border-subtle text-slate-700 hover:bg-bg-subtle'
                  }`}
                >
                  <AlertCircle className="w-3 h-3 text-risk-high" />
                  <span>High Risk (Phishing)</span>
                </button>

                <button
                  onClick={() => handleStatePreset('result', MOCK_SUSPICIOUS_REPORT, 'https://netmirror.gg/10/en-in')}
                  className={`px-2 py-1 rounded-[4px] text-xs font-mono border transition-colors flex items-center gap-1 ${
                    simState === 'result' && simReport.riskLevel === 'suspicious'
                      ? 'bg-[#2A1C06] border-[#F59E0B] text-[#FCD34D]'
                      : isDark
                      ? 'bg-[#0A0E0C] border-[#1E2621] text-[#94A39B] hover:text-white'
                      : 'bg-white border-border-subtle text-slate-700 hover:bg-bg-subtle'
                  }`}
                >
                  <AlertTriangle className="w-3 h-3 text-risk-amber" />
                  <span>Suspicious (netmirror.gg)</span>
                </button>

                <button
                  onClick={() => handleStatePreset('result', MOCK_SAFE_REPORT, 'https://leetcode.com')}
                  className={`px-2 py-1 rounded-[4px] text-xs font-mono border transition-colors flex items-center gap-1 ${
                    simState === 'result' && simReport.riskLevel === 'low'
                      ? 'bg-[#062417] border-[#10B981] text-[#6EE7B7]'
                      : isDark
                      ? 'bg-[#0A0E0C] border-[#1E2621] text-[#94A39B] hover:text-white'
                      : 'bg-white border-border-subtle text-slate-700 hover:bg-bg-subtle'
                  }`}
                >
                  <CheckCircle2 className="w-3 h-3 text-[#10B981]" />
                  <span>Low Risk (LeetCode)</span>
                </button>

                <button
                  onClick={() => handleStatePreset('scanning')}
                  className={`px-2 py-1 rounded-[4px] text-xs font-mono border transition-colors flex items-center gap-1 ${
                    simState === 'scanning'
                      ? 'bg-[#0E281C] border-[#10B981] text-[#34D399]'
                      : isDark
                      ? 'bg-[#0A0E0C] border-[#1E2621] text-[#94A39B] hover:text-white'
                      : 'bg-white border-border-subtle text-slate-700 hover:bg-bg-subtle'
                  }`}
                >
                  <Clock className="w-3 h-3 text-[#10B981]" />
                  <span>Scanning Progress</span>
                </button>

                <button
                  onClick={() => handleStatePreset('empty')}
                  className={`px-2 py-1 rounded-[4px] text-xs font-mono border transition-colors ${
                    simState === 'empty'
                      ? 'bg-[#161C19] border-[#10B981] text-[#34D399]'
                      : isDark
                      ? 'bg-[#0A0E0C] border-[#1E2621] text-[#94A39B] hover:text-white'
                      : 'bg-white border-border-subtle text-slate-700 hover:bg-bg-subtle'
                  }`}
                >
                  Ready / Standby
                </button>
              </div>
            </div>

            {/* Design Tokens Bar */}
            <div
              className={`pt-2 border-t grid grid-cols-5 gap-2 text-[11px] font-mono ${
                isDark ? 'border-[#1E2621]' : 'border-border-subtle'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-[2px] bg-[#0A0E0C] border border-[#1E2621]" />
                <span className={isDark ? 'text-[#84948C]' : 'text-slate-600'}>Dark: #0A0E0C</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-[2px] bg-[#121714] border border-[#1E2621]" />
                <span className={isDark ? 'text-[#84948C]' : 'text-slate-600'}>Card: #121714</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-[2px] bg-[#10B981]" />
                <span className={isDark ? 'text-[#84948C]' : 'text-slate-600'}>Accent: #10B981</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-[2px] bg-[#38BDF8]" />
                <span className={isDark ? 'text-[#84948C]' : 'text-slate-600'}>Cyan: #38BDF8</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-[2px] bg-[#1E2621]" />
                <span className={isDark ? 'text-[#84948C]' : 'text-slate-600'}>Border: #1E2621</span>
              </div>
            </div>
          </div>

          {/* Chrome Extension Frame Simulator */}
          <div
            className={`w-[420px] rounded-[8px] border shadow-elevated overflow-hidden ${
              isDark
                ? 'bg-[#141A17] border-[#1E2621]'
                : 'bg-charcoal-100 border-border-subtle'
            }`}
          >
            {/* Chrome Browser Mini Toolbar */}
            <div
              className={`px-3 py-2 border-b flex items-center justify-between text-xs ${
                isDark ? 'bg-[#0D110F] border-[#1E2621]' : 'bg-charcoal-200 border-charcoal-300'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
              </div>

              {/* Simulated Address Bar */}
              <div
                className={`flex-1 mx-3 px-2 py-0.5 rounded border text-[11px] font-mono truncate text-center ${
                  isDark
                    ? 'bg-[#0A0E0C] border-[#1E2621] text-[#94A39B]'
                    : 'bg-white border-border-subtle text-charcoal-700'
                }`}
              >
                {targetTabUrl}
              </div>

              {/* Extension Icon Pin */}
              <div
                className="w-6 h-6 rounded bg-[#10B981] text-black flex items-center justify-center shrink-0 shadow-xs"
                title="TRACEShield AI Extension"
              >
                <Shield className="w-3.5 h-3.5 text-black" />
              </div>
            </div>

            {/* Popup Canvas Container */}
            <div
              className={`p-3 flex justify-center ${
                isDark ? 'bg-[#0A0E0C]' : 'bg-charcoal-50'
              }`}
            >
              <PopupApp
                key={`${simState}-${simReport.scanId}-${theme}`}
                initialState={simState}
                initialReport={simReport}
                onOpenDashboard={() => setAppMode('dashboard')}
                isEmbedded={true}
                initialTheme={theme}
              />
            </div>
          </div>
        </main>
      )}

      {appMode === 'side-by-side' && (
        <main className="flex-1 flex overflow-hidden">
          {/* Dashboard (Left 65%) */}
          <div
            className={`flex-1 border-r overflow-hidden ${
              isDark ? 'border-[#1E2621]' : 'border-border-subtle'
            }`}
          >
            <DashboardLayout
              onOpenExtensionPopup={() => {}}
              onTriggerFeature={openRoadmap}
              initialTheme={theme}
            />
          </div>

          {/* Extension Popup Live Panel (Right 35%) */}
          <div
            className={`w-[440px] p-6 overflow-y-auto flex flex-col items-center ${
              isDark ? 'bg-[#0D110F]' : 'bg-bg-subtle'
            }`}
          >
            <div className="w-full mb-3 flex items-center justify-between">
              <span
                className={`text-xs font-bold font-mono uppercase tracking-wider ${
                  isDark ? 'text-white' : 'text-charcoal-900'
                }`}
              >
                Extension Viewport (390px)
              </span>
              <span
                className={`text-[10px] font-mono ${
                  isDark ? 'text-[#84948C]' : 'text-slate-500'
                }`}
              >
                Live Integration
              </span>
            </div>

            <PopupApp
              initialState="result"
              initialReport={MOCK_MALICIOUS_REPORT}
              onOpenDashboard={() => setAppMode('dashboard')}
              isEmbedded={true}
              initialTheme={theme}
            />
          </div>
        </main>
      )}

      {/* Global Unimplemented Modal */}
      <UnimplementedModal
        isOpen={roadmapModal.isOpen}
        onClose={() => setRoadmapModal({ ...roadmapModal, isOpen: false })}
        featureTitle={roadmapModal.title}
        featureDescription={roadmapModal.description}
      />
    </div>
  );
};

export default App;
