import React from 'react';
import { Modal } from '../../design-system/Modal';
import { ShieldCheck, Calendar, GitCommit } from 'lucide-react';
import { Button } from '../../design-system/Button';

interface UnimplementedModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureTitle: string;
  featureDescription: string;
  plannedMilestone?: string;
}

export const UnimplementedModal: React.FC<UnimplementedModalProps> = ({
  isOpen,
  onClose,
  featureTitle,
  featureDescription,
  plannedMilestone = "Phase 2 — SOC Enterprise Orchestration",
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={featureTitle}
      subtitle="Modular Capability in Development"
      footerActions={
        <Button size="sm" variant="secondary" onClick={onClose}>
          Acknowledge & Close
        </Button>
      }
    >
      <div className="space-y-3">
        <p className="text-xs text-charcoal-700 leading-relaxed">
          {featureDescription}
        </p>

        <div className="p-2.5 rounded-[4px] bg-bg-subtle border border-border-subtle text-xs space-y-1.5 font-mono">
          <div className="flex items-center gap-1.5 text-slate-700">
            <Calendar className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span className="font-sans text-[11px] text-slate-500">Milestone:</span>
            <span className="font-semibold text-charcoal-900">{plannedMilestone}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-700">
            <GitCommit className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span className="font-sans text-[11px] text-slate-500">API Interface:</span>
            <span className="text-[11px] text-slate-600">/api/v1/soc/actions/*</span>
          </div>
        </div>

        <div className="flex items-start gap-2 p-2 rounded-[4px] bg-forest-50 border border-forest-200 text-forest-900 text-[11px]">
          <ShieldCheck className="w-4 h-4 text-forest-600 shrink-0 mt-0.5" />
          <p className="leading-tight">
            TRACEShield AI policy guarantees that only verified, integrated enterprise endpoints receive automated threat response dispatches.
          </p>
        </div>
      </div>
    </Modal>
  );
};
