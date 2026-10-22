import React, { useEffect, useState } from 'react';
import { Loader2, CheckCircle2, Clock } from 'lucide-react';

interface StateLoadingProps {
  domain: string;
  theme?: 'dark' | 'light';
}

export const StateLoading: React.FC<StateLoadingProps> = ({
  domain,
  theme = 'dark',
}) => {
  const isDark = theme === 'dark';
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const steps = [
    'Extracting 24+ static lexical features & Shannon entropy',
    'Validating SSL/TLS certificate chain & Subject Alternative Names',
    'Analyzing brand homoglyph vectors & typosquatting substitutions',
    'Correlating global threat intelligence feeds & IOC signatures',
    'Synthesizing heuristic indicators into explainable verdict',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStepIndex((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 400);
    return () => clearInterval(timer);
  }, [steps.length]);

  return (
    <div
      className={`flex flex-col p-4 rounded-[6px] border transition-colors ${
        isDark ? 'bg-[#121714] border-[#1E2621]' : 'bg-white border-border-subtle'
      }`}
    >
      <div
        className={`flex items-center justify-between pb-3 border-b ${
          isDark ? 'border-[#1E2621]' : 'border-border-subtle'
        }`}
      >
        <div className="flex items-center gap-2">
          <Loader2 className="w-4 h-4 text-[#10B981] animate-spin" />
          <h3
            className={`text-xs font-bold leading-tight ${
              isDark ? 'text-white' : 'text-charcoal-900'
            }`}
          >
            Threat Analysis in Progress
          </h3>
        </div>
        <span
          className={`text-[10px] font-mono ${
            isDark ? 'text-[#84948C]' : 'text-slate-500'
          }`}
        >
          Target: {domain}
        </span>
      </div>

      <p
        className={`text-xs mt-2.5 ${
          isDark ? 'text-[#C5D2CB]' : 'text-charcoal-700'
        }`}
      >
        Executing real-time heuristic checks against target endpoint...
      </p>

      {/* Step Progress Checklist */}
      <div className="mt-3.5 space-y-2">
        {steps.map((step, idx) => {
          const isDone = idx < currentStepIndex;
          const isRunning = idx === currentStepIndex;
          const isPending = idx > currentStepIndex;

          return (
            <div
              key={idx}
              className={`flex items-center gap-2 text-xs transition-opacity duration-200 ${
                isPending ? 'opacity-40' : 'opacity-100'
              }`}
            >
              <div className="w-4 h-4 flex items-center justify-center shrink-0">
                {isDone ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                ) : isRunning ? (
                  <div className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-ping" />
                ) : (
                  <Clock className="w-3 h-3 opacity-40" />
                )}
              </div>
              <span
                className={`font-mono text-[11px] ${
                  isRunning
                    ? isDark
                      ? 'text-[#34D399] font-semibold'
                      : 'text-charcoal-900 font-semibold'
                    : isDone
                    ? isDark
                      ? 'text-[#C5D2CB]'
                      : 'text-slate-600'
                    : isDark
                    ? 'text-[#64746C]'
                    : 'text-slate-400'
                }`}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>

      <div
        className={`mt-4 pt-3 border-t flex items-center justify-between text-[10px] font-mono ${
          isDark ? 'border-[#1E2621] text-[#84948C]' : 'border-border-subtle text-slate-500'
        }`}
      >
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
          <span>ML: Calibrated (In-Memory)</span>
        </span>
        <span>Timeout: 8.0s</span>
      </div>
    </div>
  );
};
