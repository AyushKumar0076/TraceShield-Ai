<<<<<<< HEAD
# TRACEShield AI — Threat Intelligence Platform & Chrome Extension

A professionally engineered cybersecurity threat analysis tool designed for security operations (SOC) analysts. Engineered with a deliberate, restrained, trustworthy interface inspired by mature security tools (CrowdStrike, SentinelOne, Datadog Security) without SaaS marketing clichés or decorative bloat.

---

## Strict Design System & Token Compliance

| Design Token | Value | Applied To |
| :--- | :--- | :--- |
| **Primary Background** | `#F7F8F6` | Main viewports, page canvases |
| **Primary Text** | `#202622` | Body text, headings, indicators |
| **Brand Colour** | `#176B4D` | Deep forest green logos, primary actions, confirmed low-risk verdicts |
| **Secondary Accent** | `#526779` | Muted slate blue metadata, badges, ASN tags |
| **Borders & Dividers**| `#DDE2DE` | 1px subtle neutral grey component borders |
| **Dark Surfaces** | `#171C19` | Raw IOC JSON inspector terminal |
| **High-Risk Indicator**| `#C53030` / `#991B1B` | Active phishing / credential harvesting alerts |
| **Suspicious Indicator**| `#B45309` / `#92400E` | Newly registered domains, heuristic warnings |
| **Low-Risk Indicator**| `#15803D` / `#166534` | Verified PKI, clean enterprise domains |

> **Prohibition Compliance**: Absolutely zero pink, purple, violet, magenta, or purple-blue gradients were used. Decorative blobs, neon glow, artificial AI sparkle motifs, and glassmorphism have been completely avoided.

---

## Key Capabilities

1. **Chrome Extension (Manifest V3)**
   - Designed strictly for the authentic 390px extension popup viewport.
   - Restrained header with version tag and SOC engine status pill.
   - Endpoint target bar with real tab URL auto-detection (`chrome.tabs.query`) and manual test input.
   - Factual risk verdict summary with real scan timestamp (UTC) and indicator counts (no fabricated accuracy or trust scores).
   - Categorized evidence breakdown (Domain & Registrar, SSL/TLS Integrity, Structural Heuristics, Threat Intelligence).
   - Practical analyst guidance and containment actions.
   - Complete state machine: **Empty/Ready**, **Scanning Telemetry Progress**, **Low Risk**, **Suspicious**, **High Risk**, **DNS Error**, and **Roadmap Modal**.

2. **Analyst Dashboard & Simulator Harness**
   - High-density SOC console with endpoint investigations table, evidence drawer, and verified metric counters.
   - Extension Inspector Simulator enabling one-click testing across all states.
   - Side-by-side live integration view.

---

## Getting Started

### 1. Development Server & Simulator
```bash
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 2. Build Web Application & Extension
```bash
npm run build
```
This builds both the web bundle (`dist/`) and the standalone unpacked Chrome Extension (`dist-extension/`).

### 3. Load into Google Chrome
1. Open Google Chrome and navigate to `chrome://extensions`.
2. Toggle on **Developer mode** in the top-right corner.
3. Click **Load unpacked** in the top-left corner.
4. Select the `dist-extension` directory inside `TraceShield-AI`.
5. Pin the **TRACEShield AI** icon to your toolbar and click to inspect any active tab!
=======
# TraceShield-Ai
>>>>>>> 4694f76ccbca3715acae119bc63e1d6c0564ed5b
