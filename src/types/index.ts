export type PageNav =
  | 'home'
  | 'analyzer'
  | 'results'
  | 'examples'
  | 'history'
  | 'dashboard'
  | 'methodology'
  | 'about'
  | 'safety';

export type ClassificationType =
  | 'Potential Scam Indicators Detected'
  | 'Suspicious — Verify Independently'
  | 'No Obvious Scam Indicators Detected';

export type RiskLevel = 'Critical' | 'High' | 'Medium' | 'Low' | 'Safe';

export interface IndicatorItem {
  type: string;
  severity: 'high' | 'medium' | 'low';
  quote: string;
  explanation: string;
}

export interface ObservableUrl {
  url: string;
  domain: string;
  suspiciousTraits: string[];
  safetyNotice: string;
}

export interface ScamAnalysisResult {
  referenceId: string;
  analyzedAt: string;
  classification: ClassificationType;
  riskScore: number;
  riskLevel: RiskLevel;
  riskExplanation: string;
  summary: string;
  indicators: IndicatorItem[];
  observableUrls: ObservableUrl[];
  safetyActions: string[];
  limitations: string;
  analysisMethod: string;
  isAiPowered: boolean;
  analyzedText?: string;
  channel?: string;
}

export interface ExampleMessage {
  id: string;
  title: string;
  category: 'Job Scam' | 'Banking & OTP' | 'Lottery & Prize' | 'Delivery & Phishing' | 'Impersonation' | 'Legitimate' | 'Ambiguous';
  channel: 'SMS' | 'WhatsApp' | 'Email' | 'DM' | 'Other';
  expectedRisk: 'Critical' | 'High' | 'Medium' | 'Safe';
  snippet: string;
  fullMessage: string;
  description: string;
  keySignals: string[];
}
