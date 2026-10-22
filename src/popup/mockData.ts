import { ThreatAnalysisReport } from '../types/threat';

export const MOCK_SAFE_REPORT: ThreatAnalysisReport = {
  scanId: "TRC-2026-90412",
  url: "https://github.com/security",
  domain: "github.com",
  ipAddress: "140.82.121.4",
  riskLevel: "low",
  verdictTitle: "Low Risk — Verified Enterprise Domain",
  verdictSummary: "Domain exhibits established operational history, verified PKI infrastructure, and no presence on active threat feed feeds.",
  scannedAt: "2026-10-22 18:24:12 UTC",
  indicatorsEvaluated: 16,
  indicatorsFlagged: 0,
  meta: {
    domainAgeDays: 5740,
    registrar: "DNStination Inc.",
    tlsIssuer: "DigiCert Global Root G2",
    tlsExpires: "2027-03-15",
    asn: "AS36459 GitHub, Inc.",
    geoCountry: "United States"
  },
  evidence: [
    {
      id: "ev-1",
      category: "Domain & Registrar",
      title: "Domain Age & Registrar Stability",
      finding: "Domain has been registered for over 15 years with consistent ownership.",
      technicalDetails: "Created 2007-10-09 | Registrar: DNStination Inc.",
      status: "pass"
    },
    {
      id: "ev-2",
      category: "SSL/TLS Integrity",
      title: "Certificate Authority & Expiry",
      finding: "Valid certificate issued by DigiCert with extended trust chain.",
      technicalDetails: "Subject CN: *.github.com | Valid until Mar 2027",
      status: "pass"
    },
    {
      id: "ev-3",
      category: "Structural Heuristics",
      title: "Lexical & Path Structure",
      finding: "Standard naming conventions; zero homoglyphs or misleading punycode found.",
      technicalDetails: "Punycode: None | Subdomain depth: 0 | Entropy score: 2.1 (Normal)",
      status: "pass"
    },
    {
      id: "ev-4",
      category: "Threat Intelligence",
      title: "Reputation Feeds & Blocklists",
      finding: "Clean record across 12 public and commercial indicator databases.",
      technicalDetails: "0/12 threat intelligence feeds flagged this FQDN",
      status: "pass"
    }
  ],
  nextSteps: [
    "No immediate defensive measures required.",
    "Session may proceed under standard enterprise endpoint proxy policy.",
    "Report remains logged in local audit cache for 24 hours."
  ]
};

export const MOCK_SUSPICIOUS_REPORT: ThreatAnalysisReport = {
  scanId: "TRC-2026-90418",
  url: "https://auth-verification-service.xyz/reset-auth",
  domain: "auth-verification-service.xyz",
  ipAddress: "194.26.29.112",
  riskLevel: "suspicious",
  verdictTitle: "Suspicious — Heuristic Anomalies Detected",
  verdictSummary: "Domain was registered within the past 7 days and utilizes generic identity keywords with low-reputation top-level domain.",
  scannedAt: "2026-10-22 18:24:45 UTC",
  indicatorsEvaluated: 16,
  indicatorsFlagged: 3,
  meta: {
    domainAgeDays: 6,
    registrar: "NameCheap, Inc.",
    tlsIssuer: "Let's Encrypt Authority R3",
    tlsExpires: "2027-01-14",
    asn: "AS48693 NetProtect",
    geoCountry: "Netherlands"
  },
  evidence: [
    {
      id: "ev-201",
      category: "Domain & Registrar",
      title: "Newly Registered Domain (NRD)",
      finding: "Domain was registered 6 days ago. High statistical correlation with disposable infrastructure.",
      technicalDetails: "Registered: 2026-10-16 | Registrar: NameCheap",
      status: "flag"
    },
    {
      id: "ev-202",
      category: "Structural Heuristics",
      title: "Identity Keyword Clustering",
      finding: "Combines generic authentication terms ('auth', 'verification') without corporate affiliation.",
      technicalDetails: "Pattern: 'auth-verification-service' on generic .xyz TLD",
      status: "warning"
    },
    {
      id: "ev-203",
      category: "SSL/TLS Integrity",
      title: "Automated Domain-Validation Certificate",
      finding: "Short-lived DV certificate issued within 48 hours of domain purchase.",
      technicalDetails: "Let's Encrypt DV | No organization validation present",
      status: "warning"
    },
    {
      id: "ev-204",
      category: "Threat Intelligence",
      title: "Passive DNS Activity",
      finding: "Limited passive DNS telemetry with sudden spike in resolution requests.",
      technicalDetails: "First observed resolution: 48h ago across 3 telemetry endpoints",
      status: "warning"
    }
  ],
  nextSteps: [
    "Do not submit corporate credentials or multi-factor authentication tokens.",
    "Verify the destination domain against the official enterprise service directory.",
    "Isolate browser tab or route via sandbox inspection proxy before interacting."
  ]
};

export const MOCK_MALICIOUS_REPORT: ThreatAnalysisReport = {
  scanId: "TRC-2026-90422",
  url: "https://micros0ft-account-login.tk/security-checkpoint?session=893bf",
  domain: "micros0ft-account-login.tk",
  ipAddress: "185.220.101.5",
  riskLevel: "high",
  verdictTitle: "High Risk — Credential Phishing & Typosquatting",
  verdictSummary: "Host exhibits homoglyph brand impersonation targeting Microsoft accounts and resolves to known bulletproof infrastructure.",
  scannedAt: "2026-10-22 18:25:01 UTC",
  indicatorsEvaluated: 16,
  indicatorsFlagged: 7,
  meta: {
    domainAgeDays: 1,
    registrar: "Freenom BV",
    tlsIssuer: "ZeroSSL RSA Domain Secure Site CA",
    tlsExpires: "2026-11-20",
    asn: "AS51852 Private Layer Inc.",
    geoCountry: "Seychelles"
  },
  evidence: [
    {
      id: "ev-301",
      category: "Structural Heuristics",
      title: "Homoglyph Impersonation (Typosquatting)",
      finding: "Character substitution detected: digit '0' used in place of lowercase 'o' in 'microsoft'.",
      technicalDetails: "Punycode homoglyph vector: micros0ft -> target: microsoft.com",
      status: "flag"
    },
    {
      id: "ev-302",
      category: "Domain & Registrar",
      title: "Zero-Day Infrastructure",
      finding: "Domain registered less than 24 hours ago via high-abuse registrar.",
      technicalDetails: "Registered: 2026-10-21 21:03 UTC | Registrar: Freenom",
      status: "flag"
    },
    {
      id: "ev-303",
      category: "Threat Intelligence",
      title: "Known Phishing Kit Signature",
      finding: "DOM signature matches known O365 reverse-proxy adversary-in-the-middle kit.",
      technicalDetails: "Matched rule: YARA_PHISH_EVILGINX_M365_v4 (Confidence: High)",
      status: "flag"
    },
    {
      id: "ev-304",
      category: "Structural Heuristics",
      title: "Obfuscated Evasion Parameters",
      finding: "Base64-encoded session query parameters used to bypass automated web scrapers.",
      technicalDetails: "Parameter 'session' decodes to hex string with client fingerprinting check",
      status: "flag"
    }
  ],
  nextSteps: [
    "Block domain immediately on perimeter firewalls and DNS resolvers.",
    "If user visited: trigger automated credential revocation for affected account.",
    "Export IOC packet to SIEM/EDR for fleet-wide exposure correlation."
  ]
};
