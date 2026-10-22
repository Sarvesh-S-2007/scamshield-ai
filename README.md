# SCAMSHIELD AI — AI Scam Message Detector

> **Tagline:** Detect Suspicious Messages. Understand the Risk. Stay Safe Online.  
> **Mission:** Democratizing Threat Intelligence to shield consumers and organizations from social engineering, smishing, credential harvesting, and financial fraud.

---

## 1. Project Overview

**ScamShield AI** is a full-stack cybersecurity web application engineered to evaluate digital messages (SMS, WhatsApp, Telegram, Emails, and Direct Messages) for fraudulent intent. By combining **deterministic heuristic syntax scanning** with **Google Gemini 3.8 Flash semantic reasoning**, ScamShield AI decomposes deceptive communications into verifiable indicators, assigns a calibrated risk score, and provides actionable incident response steps along with downloadable forensic PDF reports.

---

## 2. Key Features

- **Multi-Vector Threat Evaluation:**
  - Detects OTP and credential theft attempts.
  - Identifies artificial urgency and coercive psychological triggers.
  - Exposes advance-fee fraud, fake employment/task scams, and lottery schemes.
  - Flags executive, legal, utility, and banking authority impersonation.
  - Inspects suspicious links, shorteners, high-risk TLDs (.xyz, .top, .vip), and raw IP addresses.

- **Dual-Tier Detection Pipeline:**
  1. *Tier 1:* Deterministic cybersecurity regex engine evaluating observable domain strings and sensitive keywords.
  2. *Tier 2:* Server-side Gemini 3.8 Flash model delivering structured, nuanced classification and evidence extraction.
  - *Automated Failover:* Seamless failover to deterministic heuristics if AI limits or offline conditions are encountered, transparently labeled to the user.

- **Multimodal Screenshot OCR:**
  - Extracts text from screenshots of mobile SMS, WhatsApp chats, or emails via Gemini Vision.
  - Allows the user to inspect and edit extracted text prior to running analysis.

- **Forensic PDF Threat Reports:**
  - Generates downloadable, auditable PDF reports using `jspdf`.
  - Includes ScamShield branding, unique Reference ID, timestamp, classification badge, threat score gauge, extracted evidence quotes, safety recommendations, and legal disclaimers.

- **Workstation Analytics & Privacy-Preserving History:**
  - Session history persisted exclusively in browser local storage (`localStorage`).
  - Zero server-side persistent database logging of user credentials, OTPs, or phone numbers.
  - Complete user deletion controls (delete single entry, clear all, JSON export).
  - Live analytics calculating real risk distributions from actual scanned data without fabricated metrics.

- **Comprehensive 12-Scenario Synthetic Library:**
  - Covers smishing, CEO wire fraud, task job scams, crypto arbitrage, utility threats, and verified legitimate communications with 1-click test loading.

- **Cybersecurity Self-Defense Guide & Helplines:**
  - 6 Golden Rules of anti-fraud hygiene.
  - Interactive incident containment checklist (steps to take if already compromised).
  - Direct links to US FTC, FBI IC3, India 1930 / cybercrime.gov.in, UK Action Fraud, and Australian Scamwatch.

---

## 3. Technology Stack

- **Frontend:**
  - React 19 & TypeScript
  - Tailwind CSS v4
  - Lucide React (Cybersecurity & system iconography)
  - Vite 8.3
  - jsPDF (Client-side forensic report generation)

- **Backend:**
  - Node.js & Express
  - TypeScript execution via `tsx`
  - Vite middleware integration in development mode
  - Static production asset serving in production mode

- **AI Engine:**
  - Google GenAI SDK (`@google/genai` v2.4.0)
  - Model: `gemini-3.8-flash`
  - Features: Server-side API key containment, typed structured schema, multimodal OCR vision

---

## 4. System Architecture

```text
[ User Client ] (Browser SPA)
       │
       ├── Text Message / Screenshot Upload
       │
       ▼
[ Server Backend ] (Express / Node.js)
       │
       ├── (Optional) /api/ocr ───> Gemini 3.8 Flash (Multimodal Vision)
       │                                     │
       │                              Extracted Text
       │                                     │
       ├── /api/analyze ─────────────────────┘
       │     │
       │     ├── [Tier 1: Deterministic Heuristic Engine]
       │     │     ├── Regex Threat Patterns (OTP, Urgency, Fees)
       │     │     └── Observable URL Syntax & TLD Inspection
       │     │
       │     └── [Tier 2: Gemini 3.8 Flash Server Call]
       │           ├── Strict JSON Schema Validation
       │           ├── Evidence Snippet Extraction
       │           └── Incident Action Synthesis
       │
       ▼
[ Structured ScamAnalysisResult ]
       │
       ├── Live Results Dashboard
       ├── LocalStorage History Persistence
       └── jsPDF Threat Report Export
```

---

## 5. Environment Variables & Configuration

Create a `.env` file in the project root:

```env
# Required for AI-powered analysis and screenshot OCR
# In Google AI Studio, this is automatically injected from user secrets.
GEMINI_API_KEY="YOUR_GEMINI_API_KEY"

# Optional port configuration (Defaults to 3000)
PORT=3000

# Application host URL
APP_URL="http://localhost:3000"
```

> **Security Note:** The `GEMINI_API_KEY` is accessed strictly in `server.ts` on the server runtime. It is never bundled into client scripts or exposed to the browser.

---

## 6. Setup & Installation

### Prerequisites
- Node.js 20+ installed
- npm or bun

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```
The server will start at `http://localhost:3000` with both Express API routes (`/api/health`, `/api/analyze`, `/api/ocr`) and Vite frontend mounted.

### Step 3: Build for Production
```bash
npm run build
npm start
```

---

## 7. Testing Instructions

1. **Verify Empty Message Validation:**
   - Navigate to **Message Analyzer**.
   - Attempt to click **Analyze Message** with empty or short text (< 8 characters).
   - Verify friendly error guidance appears.

2. **Test Synthetic Examples:**
   - Navigate to **Example Messages**.
   - Click **Load Into Working Analyzer** on *Urgent OTP Harvesting* or *Task Job Scam*.
   - Verify text loads into Analyzer and run analysis.
   - Confirm the threat score gauge (>75), high-severity indicator pills, and evidence quotes appear on the Results page.

3. **Test Legitimate Message Evaluation:**
   - Load the *Legitimate Bank Card Alert* or *Amazon Order Confirmation* sample.
   - Run analysis and verify the classification: `No Obvious Scam Indicators Detected` with low risk score.

4. **Test PDF Report Generation:**
   - On the Results page, click **Download PDF Report**.
   - Verify a cleanly formatted PDF file (`ScamShield_Report_SHIELD-XXXXXX.pdf`) is downloaded.

5. **Test History & Deletion:**
   - Navigate to **History**.
   - Verify recently scanned messages appear.
   - Test search, classification filter, single item deletion, and "Clear All".

6. **Test Failover / Offline Mode:**
   - If no Gemini key is set, the system transparently utilizes the deterministic cybersecurity heuristic engine and labels the analysis method accordingly.

---

## 8. Known Limitations & Zero-Trust Notice

- **Advisory Only:** Automated analysis is an educational defense layer. A low-risk assessment is not a formal legal guarantee of authenticity.
- **Spear Phishing:** Highly customized spear phishing that does not include external links or overt urgency may require manual verification.
- **Zero-Click Rule:** ScamShield AI inspects observable URL strings syntactically and does not fetch or execute destination code to prevent malware execution.

---

## 9. Deployment Guidelines

For deployment to Google Cloud Run or container platforms:
1. Ensure `npm run build` runs successfully.
2. Set `NODE_ENV=production`.
3. Set `PORT=3000` (or platform default).
4. Supply `GEMINI_API_KEY` in environment secrets.
5. The container entry point executes `tsx server.ts` or compiled server.
