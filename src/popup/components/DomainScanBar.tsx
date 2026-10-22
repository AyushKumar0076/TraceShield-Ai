import React, { useState } from 'react';
import { Globe, Search, RefreshCw, Edit3, Check } from 'lucide-react';
import { Button } from '../../design-system/Button';

interface DomainScanBarProps {
  currentUrl: string;
  isScanning: boolean;
  onScan: (url: string) => void;
  theme?: 'dark' | 'light';
}

export const DomainScanBar: React.FC<DomainScanBarProps> = ({
  currentUrl,
  isScanning,
  onScan,
  theme = 'dark',
}) => {
  const isDark = theme === 'dark';
  const [isEditing, setIsEditing] = useState(false);
  const [urlInput, setUrlInput] = useState(currentUrl);

  const getDomainFromUrl = (url: string) => {
    try {
      const parsed = new URL(url);
      return parsed.hostname;
    } catch {
      return url.replace(/^https?:\/\//, '').split('/')[0] || url;
    }
  };

  const handleScanClick = () => {
    if (isEditing) {
      onScan(urlInput.trim());
      setIsEditing(false);
    } else {
      onScan(currentUrl);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleScanClick();
    } else if (e.key === 'Escape') {
      setUrlInput(currentUrl);
      setIsEditing(false);
    }
  };

  return (
    <div
      className={`px-3 py-2 border-b shrink-0 transition-colors ${
        isDark ? 'bg-[#121714] border-[#1E2621]' : 'bg-white border-border-subtle'
      }`}
    >
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between text-[11px] font-medium">
          <span
            className={`flex items-center gap-1.5 ${
              isDark ? 'text-[#84948C]' : 'text-slate-500'
            }`}
          >
            <Globe className="w-3 h-3 text-[#10B981]" />
            <span className="font-mono text-[10px] tracking-wide uppercase">Target Endpoint</span>
          </span>
          <button
            onClick={() => {
              if (!isEditing) {
                setUrlInput(currentUrl);
              }
              setIsEditing(!isEditing);
            }}
            className={`text-[11px] flex items-center gap-1 underline-offset-2 hover:underline focus-visible:outline-none rounded px-1 transition-colors ${
              isDark
                ? 'text-[#38BDF8] hover:text-[#7DD3FC]'
                : 'text-slate-500 hover:text-forest-700'
            }`}
          >
            {isEditing ? (
              <>
                <Check className="w-3 h-3" />
                <span>Done</span>
              </>
            ) : (
              <>
                <Edit3 className="w-3 h-3" />
                <span>Edit URL</span>
              </>
            )}
          </button>
        </div>

        {isEditing ? (
          <div className="relative">
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="https://example.com/path"
              className={`w-full text-xs font-mono px-2.5 py-1.5 rounded-[4px] border focus:outline-none transition-colors ${
                isDark
                  ? 'bg-[#0A0E0C] border-[#222B26] text-[#F1F5F3] focus:border-[#10B981]'
                  : 'bg-bg-subtle border-border-subtle text-charcoal-900 focus:border-forest-600 focus:bg-white'
              }`}
              autoFocus
              aria-label="Target URL to inspect"
            />
          </div>
        ) : (
          <div
            className={`flex items-center justify-between border rounded-[4px] px-2.5 py-1.5 min-w-0 ${
              isDark
                ? 'bg-[#0A0E0C] border-[#1E2621]'
                : 'bg-bg-subtle/80 border-border-subtle'
            }`}
          >
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] shrink-0" />
              <span
                className={`text-xs font-mono font-medium truncate ${
                  isDark ? 'text-[#F1F5F3]' : 'text-charcoal-900'
                }`}
                title={currentUrl}
              >
                {getDomainFromUrl(currentUrl)}
              </span>
            </div>
            <span
              className={`text-[9px] font-mono px-1 py-0.2 rounded border shrink-0 ml-2 ${
                isDark
                  ? 'border-[#1E2621] bg-[#121714] text-[#84948C]'
                  : 'border-border-subtle bg-white text-slate-500'
              }`}
            >
              Passive Check
            </span>
          </div>
        )}

        <div className="flex items-center gap-2 pt-0.5">
          <Button
            variant="primary"
            size="sm"
            className={`w-full justify-center ${
              isDark
                ? 'bg-[#10B981] hover:bg-[#059669] text-black font-semibold border-none'
                : 'bg-forest-600 hover:bg-forest-700 text-white'
            }`}
            onClick={handleScanClick}
            isLoading={isScanning}
            icon={isScanning ? undefined : <Search className="w-3.5 h-3.5" />}
          >
            {isScanning ? 'Executing Multi-Modal Analysis...' : 'Scan Website'}
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => onScan(currentUrl)}
            disabled={isScanning}
            className={`px-2 ${
              isDark
                ? 'bg-[#0A0E0C] hover:bg-[#1E2621] text-[#F1F5F3] border-[#1E2621]'
                : 'bg-white hover:bg-bg-subtle text-charcoal-800 border-border-subtle'
            }`}
            title="Refresh Scan"
            aria-label="Refresh Scan"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>
    </div>
  );
};
