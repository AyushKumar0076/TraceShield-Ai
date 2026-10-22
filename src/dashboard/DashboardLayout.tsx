import React, { useState } from 'react';
import { 
  Shield, 
  Terminal, 
  SlidersHorizontal, 
  AlertTriangle, 
  CheckCircle2, 
  Search, 
  Clock, 
  Radio, 
  ChevronRight,
  Sun,
  Moon,
  HelpCircle,
  QrCode,
  Mail,
  History,
  BarChart3
} from 'lucide-react';
import { ThreatAnalysisReport } from '../types/threat';
import { MOCK_MALICIOUS_REPORT, MOCK_SUSPICIOUS_REPORT, MOCK_SAFE_REPORT } from '../popup/mockData';
import { Badge } from '../design-system/Badge';
import { EvidenceRow } from '../design-system/EvidenceRow';

interface DashboardLayoutProps {
  onOpenExtensionPopup?: () => void;
  onTriggerFeature?: (title: string, desc: string) => void;
  initialTheme?: 'dark' | 'light';
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  onOpenExtensionPopup,
  onTriggerFeature = () => {},
  initialTheme = 'dark',
}) => {
  const [theme, setTheme] = useState<'dark' | 'light'>(initialTheme);
  const [activeTab, setActiveTab] = useState<'overview' | 'soc' | 'url' | 'qr' | 'message' | 'history' | 'benchmarks' | 'settings'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReport, setSelectedReport] = useState<ThreatAnalysisReport>(MOCK_MALICIOUS_REPORT);
  const isDark = theme === 'dark';

  // Real evaluated investigations log
  const investigations: ThreatAnalysisReport[] = [
    MOCK_MALICIOUS_REPORT,
    MOCK_SUSPICIOUS_REPORT,
    MOCK_SAFE_REPORT,
    {
      scanId: "TRC-2026-90409",
      url: "https://paypa1-security-verification.com/login",
      domain: "paypa1-security-verification.com",
      ipAddress: "193.106.191.22",
      riskLevel: "high",
      verdictTitle: "High Risk — Brand Impersonation & Typosquatting",
      verdictSummary: "Impersonates PayPal using character '1' for 'l' with newly provisioned bulletproof registrar.",
      scannedAt: "2026-10-22 17:58:30 UTC",
      indicatorsEvaluated: 16,
      indicatorsFlagged: 6,
      meta: {
        domainAgeDays: 2,
        registrar: "Reg.ru",
        tlsIssuer: "cPanel, Inc. Certification Authority",
        tlsExpires: "2026-12-01",
        asn: "AS44050 Petersburg Internet Network",
        geoCountry: "Russian Federation"
      },
      evidence: [
        {
          id: "ev-401",
          category: "Structural Heuristics",
          title: "Homoglyph Impersonation",
          finding: "Substituted '1' for 'l' targeting paypal.com brand identity.",
          technicalDetails: "Typosquat match: paypa1 -> paypal.com",
          status: "flag"
        },
        {
          id: "ev-402",
          category: "Domain & Registrar",
          title: "High-Risk Registrar & Age",
          finding: "Domain created 48 hours ago on bulletproof hosting network.",
          status: "flag"
        }
      ],
      nextSteps: [
        "Block domain on enterprise firewall resolvers.",
        "Query SIEM for outbound DNS queries in last 72 hours."
      ]
    }
  ];

  const filteredInvestigations = investigations.filter(inv => 
    inv.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inv.scanId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inv.verdictTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className={`flex h-screen w-full font-sans overflow-hidden transition-colors ${
        isDark ? 'bg-[#0A0E0C] text-[#F1F5F3]' : 'bg-bg-primary text-charcoal-900'
      }`}
    >
      {/* Sidebar matching exact website design */}
      <aside
        className={`w-64 border-r flex flex-col shrink-0 select-none transition-colors ${
          isDark ? 'bg-[#0D110F] border-[#1E2621]' : 'bg-white border-border-subtle'
        }`}
      >
        {/* Brand: TRACESHIELD [AI] Digital Trust Platform */}
        <div
          className={`p-4 border-b flex items-center justify-between ${
            isDark ? 'border-[#1E2621]' : 'border-border-subtle'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div
              className={`w-7 h-7 rounded-[4px] border flex items-center justify-center shrink-0 ${
                isDark
                  ? 'bg-[#121714] border-[#10B981]/50 text-[#10B981]'
                  : 'bg-forest-600 border-forest-700 text-white'
              }`}
            >
              <Shield className="w-4 h-4" />
            </div>
            <div>
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
              <span
                className={`text-[9px] font-mono block mt-1 tracking-tight ${
                  isDark ? 'text-[#84948C]' : 'text-slate-500'
                }`}
              >
                Digital Trust Platform
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Sidebar Sections */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4">
          {/* Section: NAVIGATION */}
          <div>
            <div
              className={`text-[10px] font-mono font-bold tracking-widest uppercase mb-1.5 px-2 ${
                isDark ? 'text-[#5A6E63]' : 'text-slate-400'
              }`}
            >
              Navigation
            </div>
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-[4px] text-xs font-mono transition-colors ${
                activeTab === 'overview'
                  ? isDark
                    ? 'bg-[#161C19] text-[#10B981] border border-[#1E2621] font-semibold'
                    : 'bg-forest-50 text-forest-900 border border-forest-200 font-semibold'
                  : isDark
                  ? 'text-[#94A39B] hover:text-white hover:bg-[#121714]'
                  : 'text-charcoal-700 hover:bg-bg-subtle'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
              <span>Public Overview</span>
            </button>
          </div>

          {/* Section: INVESTIGATION CONSOLE */}
          <div>
            <div
              className={`text-[10px] font-mono font-bold tracking-widest uppercase mb-1.5 px-2 ${
                isDark ? 'text-[#5A6E63]' : 'text-slate-400'
              }`}
            >
              Investigation Console
            </div>

            <div className="space-y-0.5">
              <button
                onClick={() => setActiveTab('soc')}
                className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-[4px] text-xs font-mono transition-colors ${
                  activeTab === 'soc'
                    ? isDark
                      ? 'bg-[#161C19] text-[#10B981] border border-[#1E2621] font-semibold'
                      : 'bg-forest-50 text-forest-900 border border-forest-200 font-semibold'
                    : isDark
                    ? 'text-[#94A39B] hover:text-white hover:bg-[#121714]'
                    : 'text-charcoal-700 hover:bg-bg-subtle'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>SOC Dashboard</span>
              </button>

              <button
                onClick={() => setActiveTab('url')}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-[4px] text-xs font-mono transition-colors ${
                  activeTab === 'url'
                    ? isDark
                      ? 'bg-[#161C19] text-[#10B981] border border-[#1E2621] font-semibold'
                      : 'bg-forest-50 text-forest-900 border border-forest-200 font-semibold'
                    : isDark
                    ? 'text-[#94A39B] hover:text-white hover:bg-[#121714]'
                    : 'text-charcoal-700 hover:bg-bg-subtle'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-xs">🌐</span>
                  <span>URL Investigation</span>
                </div>
                <span
                  className={`text-[9px] font-mono px-1 py-0.2 rounded border ${
                    isDark
                      ? 'border-[#38BDF8]/40 bg-[#38BDF8]/10 text-[#38BDF8]'
                      : 'border-forest-600/30 bg-forest-50 text-forest-700'
                  }`}
                >
                  AI
                </span>
              </button>

              <button
                onClick={() => onTriggerFeature('QR Ingestion (Quishing)', 'Air-gapped buffer decoding for matrix payloads.')}
                className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-[4px] text-xs font-mono transition-colors ${
                  isDark
                    ? 'text-[#94A39B] hover:text-white hover:bg-[#121714]'
                    : 'text-charcoal-700 hover:bg-bg-subtle'
                }`}
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>QR Ingestion (Quishing)</span>
              </button>

              <button
                onClick={() => onTriggerFeature('Message Threat Analyzer', 'NLP heuristics for SMS (Smishing) and email social engineering detection.')}
                className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-[4px] text-xs font-mono transition-colors ${
                  isDark
                    ? 'text-[#94A39B] hover:text-white hover:bg-[#121714]'
                    : 'text-charcoal-700 hover:bg-bg-subtle'
                }`}
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Message Threat Analyzer</span>
              </button>

              <button
                onClick={() => setActiveTab('soc')}
                className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-[4px] text-xs font-mono transition-colors ${
                  isDark
                    ? 'text-[#94A39B] hover:text-white hover:bg-[#121714]'
                    : 'text-charcoal-700 hover:bg-bg-subtle'
                }`}
              >
                <History className="w-3.5 h-3.5" />
                <span>Investigation History</span>
              </button>

              <button
                onClick={() => onTriggerFeature('Model Benchmarks', 'Calibrated cross-validation metrics across collegiate research sets.')}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-[4px] text-xs font-mono transition-colors ${
                  isDark
                    ? 'text-[#94A39B] hover:text-white hover:bg-[#121714]'
                    : 'text-charcoal-700 hover:bg-bg-subtle'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>Model Benchmarks</span>
                </div>
                <span
                  className={`text-[8px] font-mono px-1 py-0.2 rounded border ${
                    isDark
                      ? 'border-[#1E2621] text-[#84948C]'
                      : 'border-border-subtle text-slate-500'
                  }`}
                >
                  Research
                </span>
              </button>

              <button
                onClick={() => onTriggerFeature('Settings & Privacy', 'Zero network execution parameters and air-gapped memory retention rules.')}
                className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-[4px] text-xs font-mono transition-colors ${
                  isDark
                    ? 'text-[#94A39B] hover:text-white hover:bg-[#121714]'
                    : 'text-charcoal-700 hover:bg-bg-subtle'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Settings & Privacy</span>
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div
          className={`p-3 border-t space-y-2 ${
            isDark ? 'border-[#1E2621] bg-[#0A0E0C]' : 'border-border-subtle bg-bg-subtle/50'
          }`}
        >
          <button
            onClick={() => onTriggerFeature('Product Tour', 'Guided walkthrough of the collegiate threat deconstruction platform.')}
            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-[4px] text-xs font-mono border transition-colors ${
              isDark
                ? 'border-[#1E2621] bg-[#121714] text-[#C5D2CB] hover:bg-[#161C19]'
                : 'border-border-subtle bg-white text-charcoal-800 hover:bg-bg-subtle'
            }`}
          >
            <div className="flex items-center gap-2">
              <HelpCircle className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>Product Tour</span>
            </div>
            <span
              className={`text-[9px] px-1 py-0.2 rounded border ${
                isDark ? 'border-[#1E2621] text-[#84948C]' : 'border-border-subtle text-slate-500'
              }`}
            >
              ?
            </span>
          </button>

          {onOpenExtensionPopup && (
            <button
              onClick={onOpenExtensionPopup}
              className={`w-full flex items-center justify-center gap-2 px-2.5 py-1.5 rounded-[4px] text-xs font-mono border font-semibold transition-colors ${
                isDark
                  ? 'border-[#10B981]/50 bg-[#10B981]/10 text-[#34D399] hover:bg-[#10B981]/20'
                  : 'border-forest-600 bg-forest-50 text-forest-700 hover:bg-forest-100'
              }`}
            >
              <Radio className="w-3.5 h-3.5 text-[#10B981]" />
              <span>Chrome Extension View</span>
            </button>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header Bar matching website screenshot */}
        <header
          className={`px-6 py-2.5 border-b flex items-center justify-between shrink-0 select-none transition-colors ${
            isDark ? 'bg-[#0D110F] border-[#1E2621]' : 'bg-white border-border-subtle'
          }`}
        >
          {/* Breadcrumb navigation */}
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className={isDark ? 'text-[#84948C]' : 'text-slate-400'}>TraceShield</span>
            <span className={isDark ? 'text-[#3E4E45]' : 'text-slate-300'}>&gt;</span>
            <span className="text-[#34D399] font-semibold">
              {activeTab === 'overview' ? 'Public Overview' : 'SOC Dashboard'}
            </span>
          </div>

          {/* Top Bar Status Badges & Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onTriggerFeature('Product Tour', 'Guided walkthrough.')}
              className={`hidden md:flex items-center gap-1.5 px-2 py-1 rounded-[4px] border text-xs font-mono ${
                isDark ? 'border-[#1E2621] bg-[#121714] text-[#C5D2CB]' : 'border-border-subtle bg-white text-slate-700'
              }`}
            >
              <HelpCircle className="w-3 h-3 text-[#38BDF8]" />
              <span>Tour</span>
              <span className={`text-[9px] px-1 rounded border ${isDark ? 'border-[#1E2621]' : 'border-border-subtle'}`}>?</span>
            </button>

            <button
              onClick={onOpenExtensionPopup}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] border text-xs font-mono ${
                isDark ? 'border-[#1E2621] bg-[#121714] text-white hover:border-[#10B981]' : 'border-border-subtle bg-white text-charcoal-900'
              }`}
            >
              <Search className="w-3 h-3 text-[#10B981]" />
              <span>Quick Scan</span>
              <span className={`text-[9px] px-1 rounded border ${isDark ? 'border-[#1E2621] text-[#84948C]' : 'border-border-subtle text-slate-500'}`}>⌘K</span>
            </button>

            {/* Light / Dark Toggle */}
            <button
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className={`flex items-center gap-1 px-2 py-1 rounded-[4px] border text-xs font-mono transition-colors ${
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

            {/* Live Operational Status Pills with green dots */}
            <div
              className={`hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] border text-[11px] font-mono ${
                isDark ? 'border-[#1E2621] bg-[#121714] text-[#34D399]' : 'border-forest-200 bg-forest-50 text-forest-800'
              }`}
            >
              <Shield className="w-3 h-3 text-[#10B981]" />
              <span>Defanging: <strong>Active</strong></span>
            </div>

            <div
              className={`hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] border text-[11px] font-mono ${
                isDark ? 'border-[#1E2621] bg-[#121714] text-[#C5D2CB]' : 'border-border-subtle bg-white text-slate-700'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
              <span>DB: <strong>Embedded</strong></span>
            </div>

            <div
              className={`hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] border text-[11px] font-mono ${
                isDark ? 'border-[#1E2621] bg-[#121714] text-[#C5D2CB]' : 'border-border-subtle bg-white text-slate-700'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
              <span>ML: <strong>Calibrated</strong></span>
            </div>
          </div>
        </header>

        {/* Dynamic Canvas: Public Overview (matching screenshot) OR SOC Console */}
        {activeTab === 'overview' ? (
          <div className="flex-1 overflow-y-auto p-8 space-y-10 max-w-6xl mx-auto w-full">
            {/* Hero Section matching screenshot */}
            <div className="text-center space-y-4 pt-4">
              <div
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono tracking-wide ${
                  isDark
                    ? 'border-[#1E2621] bg-[#121714] text-[#94A39B]'
                    : 'border-border-subtle bg-white text-slate-600'
                }`}
              >
                <span>Collegiate Cybersecurity Competition &amp; Research Engine</span>
              </div>

              <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight max-w-4xl mx-auto">
                <span className="text-[#67E8F9]">Explainable, Multi-Modal</span>{' '}
                <span className="text-white">Phishing </span>
                <span className="text-[#F43F5E]">Investigation</span>{' '}
                <span className="text-white">&amp; Digital Trust</span>
              </h1>

              <p className={`text-sm md:text-base max-w-2xl mx-auto leading-relaxed ${
                isDark ? 'text-[#84948C]' : 'text-charcoal-700'
              }`}>
                Deconstruct sophisticated cyber threats across URLs, QR codes, and suspicious messages using calibrated machine learning models and transparent security heuristics —with zero external network execution.
              </p>

              {/* Action Buttons */}
              <div className="flex items-center justify-center gap-3 pt-3 flex-wrap">
                <button
                  onClick={() => setActiveTab('url')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-[4px] text-xs font-mono font-semibold border transition-colors ${
                    isDark
                      ? 'border-[#1E2621] bg-[#121714] text-white hover:border-[#10B981]'
                      : 'border-border-subtle bg-white text-charcoal-900 shadow-subtle hover:bg-bg-subtle'
                  }`}
                >
                  <span>🌐</span>
                  <span>Launch URL Investigation</span>
                </button>

                <button
                  onClick={() => setActiveTab('soc')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-[4px] text-xs font-mono font-semibold border transition-colors ${
                    isDark
                      ? 'border-[#1E2621] bg-[#121714] text-white hover:border-[#10B981]'
                      : 'border-border-subtle bg-white text-charcoal-900 shadow-subtle hover:bg-bg-subtle'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>Open SOC Dashboard</span>
                </button>

                <button
                  onClick={() => onTriggerFeature('Model Benchmarks', 'Review collegiate research benchmarks.')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-[4px] text-xs font-mono font-semibold border transition-colors ${
                    isDark
                      ? 'border-[#1E2621] bg-[#121714] text-white hover:border-[#10B981]'
                      : 'border-border-subtle bg-white text-charcoal-900 shadow-subtle hover:bg-bg-subtle'
                  }`}
                >
                  <BarChart3 className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span>View Model Benchmarks</span>
                </button>
              </div>
            </div>

            {/* Investigation Engines Cards matching screenshot */}
            <div className="space-y-4 pt-4">
              <div className="text-center space-y-1">
                <h2 className="text-xs font-mono font-bold tracking-widest uppercase text-white">
                  INVESTIGATION ENGINES
                </h2>
                <p className={`text-xs font-mono ${isDark ? 'text-[#84948C]' : 'text-slate-500'}`}>
                  Tripartite analysis separating observed evidence, statistical predictions, and unverified data.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Engine 1: URL Phishing ML Engine */}
                <div
                  className={`p-5 rounded-[6px] border flex flex-col justify-between transition-colors ${
                    isDark
                      ? 'bg-[#121714] border-[#1E2621] hover:border-[#2A362E]'
                      : 'bg-white border-border-subtle shadow-subtle'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-bold text-white font-mono">
                        URL Phishing ML Engine
                      </h3>
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded border border-[#10B981]/50 bg-[#10B981]/10 text-[#34D399] font-bold">
                        CALIBRATED
                      </span>
                    </div>
                    <div className="text-xs text-[#38BDF8] font-mono mb-2">
                      Static 24+ feature extraction
                    </div>
                    <p className={`text-xs leading-relaxed ${isDark ? 'text-[#94A39B]' : 'text-slate-600'}`}>
                      Passive extraction of Shannon entropy, brand typosquatting, subdomain depths, IP address hosts, and punycode without touching the target server.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('url')}
                    className={`mt-4 w-full flex items-center justify-center gap-1.5 py-2 rounded-[4px] text-xs font-mono font-semibold border transition-colors ${
                      isDark
                        ? 'border-[#1E2621] bg-[#0A0E0C] text-white hover:border-[#10B981]'
                        : 'border-border-subtle bg-bg-subtle text-charcoal-900 hover:bg-charcoal-100'
                    }`}
                  >
                    <span>&rarr;</span>
                    <span>Scan Target URL</span>
                  </button>
                </div>

                {/* Engine 2: QR Ingestion (Quishing) */}
                <div
                  className={`p-5 rounded-[6px] border flex flex-col justify-between transition-colors ${
                    isDark
                      ? 'bg-[#121714] border-[#1E2621] hover:border-[#2A362E]'
                      : 'bg-white border-border-subtle shadow-subtle'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-bold text-white font-mono">
                        QR Ingestion (Quishing)
                      </h3>
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded border border-[#38BDF8]/50 bg-[#38BDF8]/10 text-[#38BDF8] font-bold">
                        IN-MEMORY
                      </span>
                    </div>
                    <div className="text-xs text-[#38BDF8] font-mono mb-2">
                      Air-gapped buffer decoding
                    </div>
                    <p className={`text-xs leading-relaxed ${isDark ? 'text-[#94A39B]' : 'text-slate-600'}`}>
                      Safely upload or drop QR images. Decodes the matrix in an isolated memory buffer without triggering automatic browser redirects, pipelining payloads to forensic analysis.
                    </p>
                  </div>
                  <button
                    onClick={() => onTriggerFeature('QR Ingestion', 'Drop or upload suspicious QR codes.')}
                    className={`mt-4 w-full flex items-center justify-center gap-1.5 py-2 rounded-[4px] text-xs font-mono font-semibold border transition-colors ${
                      isDark
                        ? 'border-[#1E2621] bg-[#0A0E0C] text-white hover:border-[#38BDF8]'
                        : 'border-border-subtle bg-bg-subtle text-charcoal-900 hover:bg-charcoal-100'
                    }`}
                  >
                    <span>&rarr;</span>
                    <span>Inspect QR Matrix</span>
                  </button>
                </div>

                {/* Engine 3: Suspicious Message Analyzer */}
                <div
                  className={`p-5 rounded-[6px] border flex flex-col justify-between transition-colors ${
                    isDark
                      ? 'bg-[#121714] border-[#1E2621] hover:border-[#2A362E]'
                      : 'bg-white border-border-subtle shadow-subtle'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-bold text-white font-mono">
                        Suspicious Message Analyzer
                      </h3>
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded border border-[#F59E0B]/50 bg-[#F59E0B]/10 text-[#FCD34D] font-bold">
                        NLP HEURISTICS
                      </span>
                    </div>
                    <div className="text-xs text-[#38BDF8] font-mono mb-2">
                      Social engineering &amp; urgency
                    </div>
                    <p className={`text-xs leading-relaxed ${isDark ? 'text-[#94A39B]' : 'text-slate-600'}`}>
                      Analyze urgent SMS (Smishing) and email text. Identifies psychological urgency pressure, credential-harvesting triggers, and unshortens embedded redirection chains.
                    </p>
                  </div>
                  <button
                    onClick={() => onTriggerFeature('Message Analyzer', 'Analyze smishing and deceptive urgency email headers.')}
                    className={`mt-4 w-full flex items-center justify-center gap-1.5 py-2 rounded-[4px] text-xs font-mono font-semibold border transition-colors ${
                      isDark
                        ? 'border-[#1E2621] bg-[#0A0E0C] text-white hover:border-[#F59E0B]'
                        : 'border-border-subtle bg-bg-subtle text-charcoal-900 hover:bg-charcoal-100'
                    }`}
                  >
                    <span>&rarr;</span>
                    <span>Analyze Message Body</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* SOC Investigation Console View */
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {/* Backed Metrics Summary Bar */}
            <div className="grid grid-cols-4 gap-3">
              <div
                className={`p-3 rounded-[6px] border transition-colors ${
                  isDark ? 'bg-[#121714] border-[#1E2621]' : 'bg-white border-border-subtle shadow-subtle'
                }`}
              >
                <div className="text-[11px] font-mono uppercase tracking-wider opacity-60">
                  Evaluated Endpoints
                </div>
                <div className="text-xl font-bold font-tabular mt-1">
                  4 <span className="text-xs font-normal opacity-60">logged</span>
                </div>
              </div>

              <div
                className={`p-3 rounded-[6px] border transition-colors ${
                  isDark
                    ? 'bg-[#240C0F] border-[#EF4444]/40 text-[#FCA5A5]'
                    : 'bg-white border-risk-high-border/60 text-risk-high shadow-subtle'
                }`}
              >
                <div className="text-[11px] font-mono uppercase tracking-wider flex items-center justify-between">
                  <span>High Risk Flagged</span>
                  <AlertTriangle className="w-3.5 h-3.5" />
                </div>
                <div className="text-xl font-bold font-tabular mt-1">
                  2 <span className="text-xs font-normal opacity-70">threats</span>
                </div>
              </div>

              <div
                className={`p-3 rounded-[6px] border transition-colors ${
                  isDark
                    ? 'bg-[#231806] border-[#F59E0B]/40 text-[#FCD34D]'
                    : 'bg-white border-risk-amber-border/60 text-risk-amber shadow-subtle'
                }`}
              >
                <div className="text-[11px] font-mono uppercase tracking-wider flex items-center justify-between">
                  <span>Suspicious Heuristics</span>
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <div className="text-xl font-bold font-tabular mt-1">
                  1 <span className="text-xs font-normal opacity-70">anomalous</span>
                </div>
              </div>

              <div
                className={`p-3 rounded-[6px] border transition-colors ${
                  isDark
                    ? 'bg-[#062316] border-[#10B981]/40 text-[#6EE7B7]'
                    : 'bg-white border-risk-low-border/60 text-forest-700 shadow-subtle'
                }`}
              >
                <div className="text-[11px] font-mono uppercase tracking-wider flex items-center justify-between">
                  <span>Verified Clean</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                </div>
                <div className="text-xl font-bold font-tabular mt-1">
                  1 <span className="text-xs font-normal opacity-70">enterprise</span>
                </div>
              </div>
            </div>

            {/* Grid: Investigations Table & Evidence Panel */}
            <div className="grid grid-cols-12 gap-4 items-start">
              {/* Table Panel */}
              <div
                className={`col-span-7 rounded-[6px] border overflow-hidden ${
                  isDark ? 'bg-[#121714] border-[#1E2621]' : 'bg-white border-border-subtle shadow-subtle'
                }`}
              >
                <div
                  className={`p-3 border-b flex items-center justify-between gap-3 ${
                    isDark ? 'border-[#1E2621]' : 'border-border-subtle'
                  }`}
                >
                  <div className="relative flex-1">
                    <Search className="w-3.5 h-3.5 opacity-40 absolute left-2.5 top-2.5" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Filter by domain, scan ID, or verdict..."
                      className={`w-full text-xs pl-8 pr-3 py-1.5 rounded-[4px] border font-mono focus:outline-none ${
                        isDark
                          ? 'bg-[#0A0E0C] border-[#1E2621] text-white focus:border-[#10B981]'
                          : 'bg-bg-subtle border-border-subtle text-charcoal-900 focus:bg-white focus:border-forest-600'
                      }`}
                    />
                  </div>
                  <span className="text-[11px] font-mono opacity-60 shrink-0">
                    {filteredInvestigations.length} results
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr
                        className={`border-b text-[11px] font-mono font-semibold ${
                          isDark
                            ? 'bg-[#0A0E0C] border-[#1E2621] text-[#84948C]'
                            : 'bg-bg-subtle/80 border-border-subtle text-slate-600'
                        }`}
                      >
                        <th className="py-2 px-3">Scan ID</th>
                        <th className="py-2 px-3">Target Domain</th>
                        <th className="py-2 px-3">Risk Assessment</th>
                        <th className="py-2 px-3">Flags</th>
                        <th className="py-2 px-3">Scanned (UTC)</th>
                        <th className="py-2 px-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody
                      className={`divide-y ${
                        isDark ? 'divide-[#1E2621]' : 'divide-border-subtle'
                      }`}
                    >
                      {filteredInvestigations.map((inv) => {
                        const isSelected = selectedReport.scanId === inv.scanId;
                        return (
                          <tr
                            key={inv.scanId}
                            onClick={() => setSelectedReport(inv)}
                            className={`cursor-pointer transition-colors ${
                              isSelected
                                ? isDark
                                  ? 'bg-[#161C19] font-medium'
                                  : 'bg-forest-50/60 font-medium'
                                : isDark
                                ? 'hover:bg-[#161C19]/50'
                                : 'hover:bg-bg-subtle/50'
                            }`}
                          >
                            <td className="py-2.5 px-3 font-mono text-[11px] opacity-70">
                              {inv.scanId}
                            </td>
                            <td className="py-2.5 px-3 font-mono font-medium max-w-[170px] truncate" title={inv.domain}>
                              {inv.domain}
                            </td>
                            <td className="py-2.5 px-3">
                              <Badge risk={inv.riskLevel} size="sm" />
                            </td>
                            <td className="py-2.5 px-3 font-tabular">
                              {inv.indicatorsFlagged > 0 ? (
                                <span className="font-semibold text-risk-high">
                                  {inv.indicatorsFlagged} / {inv.indicatorsEvaluated}
                                </span>
                              ) : (
                                <span className="text-[#10B981] font-medium">0 / {inv.indicatorsEvaluated}</span>
                              )}
                            </td>
                            <td className="py-2.5 px-3 font-mono text-[11px] opacity-60">
                              {inv.scannedAt.split(' ')[1] || inv.scannedAt}
                            </td>
                            <td className="py-2.5 px-3 text-right">
                              <ChevronRight className="w-3.5 h-3.5 inline opacity-40" />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Evidence & Technical Dossier Panel */}
              <div
                className={`col-span-5 rounded-[6px] border p-4 space-y-3.5 ${
                  isDark ? 'bg-[#121714] border-[#1E2621]' : 'bg-white border-border-subtle shadow-subtle'
                }`}
              >
                <div
                  className={`flex items-start justify-between gap-2 border-b pb-3 ${
                    isDark ? 'border-[#1E2621]' : 'border-border-subtle'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono opacity-60 font-medium">
                        {selectedReport.scanId}
                      </span>
                      <Badge risk={selectedReport.riskLevel} size="sm" />
                    </div>
                    <h2 className="text-sm font-bold mt-1 font-mono break-all text-white">
                      {selectedReport.domain}
                    </h2>
                  </div>
                </div>

                {/* Verdict text */}
                <div
                  className={`p-3 rounded-[4px] border text-xs ${
                    isDark ? 'bg-[#0A0E0C] border-[#1E2621] text-[#C5D2CB]' : 'bg-bg-subtle border-border-subtle text-charcoal-800'
                  }`}
                >
                  <div className="font-semibold mb-1 text-white">
                    {selectedReport.verdictTitle}
                  </div>
                  <p className="leading-relaxed opacity-80">
                    {selectedReport.verdictSummary}
                  </p>
                </div>

                {/* Metadata Grid */}
                <div
                  className={`grid grid-cols-2 gap-2 text-xs font-mono p-2.5 rounded-[4px] border ${
                    isDark ? 'bg-[#0A0E0C] border-[#1E2621]' : 'bg-white border-border-subtle'
                  }`}
                >
                  <div>
                    <span className="text-[10px] opacity-60 uppercase block font-sans">Domain Age:</span>
                    <span className="font-semibold">
                      {selectedReport.meta.domainAgeDays !== undefined ? `${selectedReport.meta.domainAgeDays} days` : 'Unverified'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] opacity-60 uppercase block font-sans">Registrar:</span>
                    <span className="truncate block font-semibold" title={selectedReport.meta.registrar}>
                      {selectedReport.meta.registrar || 'Private'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] opacity-60 uppercase block font-sans">TLS Issuer:</span>
                    <span className="truncate block font-semibold text-[#10B981]" title={selectedReport.meta.tlsIssuer}>
                      {selectedReport.meta.tlsIssuer || 'None'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] opacity-60 uppercase block font-sans">Resolved ASN:</span>
                    <span className="truncate block font-semibold text-[#38BDF8]" title={selectedReport.meta.asn}>
                      {selectedReport.meta.asn || 'Unresolved'}
                    </span>
                  </div>
                </div>

                {/* Indicators List */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider font-mono">
                    <span>Supporting Evidence ({selectedReport.evidence.length})</span>
                  </div>

                  <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-1">
                    {selectedReport.evidence.map((indicator) => (
                      <EvidenceRow
                        key={indicator.id}
                        indicator={indicator}
                        defaultExpanded={indicator.status === 'flag'}
                        theme={theme}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
