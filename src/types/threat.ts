export type RiskLevel = 'low' | 'suspicious' | 'high' | 'unassessed';

export type CheckStatus = 'pass' | 'warning' | 'flag' | 'info';

export interface EvidenceIndicator {
  id: string;
  category: 'Domain & Registrar' | 'SSL/TLS Integrity' | 'Structural Heuristics' | 'Threat Intelligence';
  title: string;
  finding: string;
  technicalDetails?: string;
  status: CheckStatus;
}

export interface ThreatAnalysisReport {
  scanId: string;
  url: string;
  domain: string;
  ipAddress?: string;
  riskLevel: RiskLevel;
  verdictTitle: string;
  verdictSummary: string;
  scannedAt: string; // ISO 8601 string or formatted UTC
  indicatorsEvaluated: number;
  indicatorsFlagged: number;
  evidence: EvidenceIndicator[];
  nextSteps: string[];
  meta: {
    domainAgeDays?: number;
    registrar?: string;
    tlsIssuer?: string;
    tlsExpires?: string;
    asn?: string;
    geoCountry?: string;
  };
}

export type PopupViewState = 
  | 'empty'
  | 'scanning'
  | 'result'
  | 'error'
  | 'unimplemented';
