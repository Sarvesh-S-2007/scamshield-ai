import React, { useState } from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  FileDown, 
  Copy, 
  Check, 
  ArrowLeft, 
  ExternalLink, 
  Info, 
  Lock, 
  CheckCircle2, 
  AlertOctagon,
  Globe,
  Share2
} from 'lucide-react';
import { ScamAnalysisResult, PageNav } from '../types';
import { generateScamReportPdf } from '../utils/pdfGenerator';

interface ResultsPageProps {
  result: ScamAnalysisResult | null;
  onNavigate: (page: PageNav) => void;
  onAnalyzeAnother: () => void;
}

export const ResultsPage: React.FC<ResultsPageProps> = ({
  result,
  onNavigate,
  onAnalyzeAnother,
}) => {
  const [copied, setCopied] = useState(false);

  if (!result) {
    return (
      <div className="min-h-screen text-slate-100 py-16 px-4 max-w-3xl mx-auto text-center cyber-grid">
        <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800">
          <ShieldAlert className="w-12 h-12 text-slate-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white">No Active Analysis Result</h2>
          <p className="text-sm text-slate-400 mt-2 mb-6">
            Please submit a message through the Message Analyzer to view threat indicators and downloadable reports.
          </p>
          <button
            onClick={() => onNavigate('analyzer')}
            className="px-6 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-sm hover:bg-cyan-400 transition-colors cursor-pointer"
          >
            Go to Message Analyzer
          </button>
        </div>
      </div>
    );
  }

  const isScam = result.classification === 'Potential Scam Indicators Detected';
  const isSuspicious = result.classification === 'Suspicious — Verify Independently';
  const isSafe = result.classification === 'No Obvious Scam Indicators Detected';

  const handleCopySummary = () => {
    const textToCopy = `[SCAMSHIELD AI THREAT REPORT]
Reference: ${result.referenceId}
Verdict: ${result.classification}
Risk Score: ${result.riskScore}/100 (${result.riskLevel})
Summary: ${result.summary}

Detected Indicators:
${result.indicators.map((ind) => `- [${ind.severity.toUpperCase()}] ${ind.type}: ${ind.explanation}`).join('\n')}

Safety Actions:
${result.safetyActions.map((act, i) => `${i + 1}. ${act}`).join('\n')}

Generated at: ${new Date(result.analyzedAt).toLocaleString()}
ScamShield AI Advisory: ${result.limitations}`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadPdf = () => {
    generateScamReportPdf(result);
  };

  return (
    <div className="min-h-screen text-slate-100 py-10 cyber-grid">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation back and quick actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <button
            onClick={onAnalyzeAnother}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Analyze Another Message</span>
          </button>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleCopySummary}
              className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300">Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copy Summary</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownloadPdf}
              className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 text-xs font-bold shadow-md shadow-cyan-500/20 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Download PDF Report</span>
            </button>
          </div>
        </div>

        {/* Top Banner / Verdict Card */}
        <div
          className={`rounded-2xl border p-6 sm:p-8 backdrop-blur-md relative overflow-hidden shadow-2xl mb-8 ${
            isScam
              ? 'bg-gradient-to-b from-red-950/40 to-slate-900/90 border-red-800/80'
              : isSuspicious
              ? 'bg-gradient-to-b from-amber-950/40 to-slate-900/90 border-amber-800/80'
              : 'bg-gradient-to-b from-emerald-950/40 to-slate-900/90 border-emerald-800/80'
          }`}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-950/80 border border-slate-800 text-cyan-300">
                  REF: {result.referenceId}
                </span>
                <span className="text-xs text-slate-400">
                  {new Date(result.analyzedAt).toLocaleString()}
                </span>
                {result.isAiPowered ? (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300">
                    Gemini AI Active
                  </span>
                ) : (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-950 border border-amber-800 text-amber-300">
                    Heuristic Rule Engine
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                {isScam ? (
                  <AlertOctagon className="w-8 h-8 text-red-400 shrink-0" />
                ) : isSuspicious ? (
                  <AlertTriangle className="w-8 h-8 text-amber-400 shrink-0" />
                ) : (
                  <ShieldCheck className="w-8 h-8 text-emerald-400 shrink-0" />
                )}
                <h1
                  className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
                    isScam ? 'text-red-400' : isSuspicious ? 'text-amber-300' : 'text-emerald-400'
                  }`}
                >
                  {result.classification}
                </h1>
              </div>

              <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
                {result.summary}
              </p>
            </div>

            {/* Visual Risk Gauge Meter */}
            <div className="shrink-0 flex flex-col items-center justify-center p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 min-w-[150px]">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Threat Score</span>
              <div className="mt-1 flex items-baseline gap-1">
                <span
                  className={`text-4xl font-black ${
                    result.riskScore >= 70
                      ? 'text-red-400'
                      : result.riskScore >= 35
                      ? 'text-amber-400'
                      : 'text-emerald-400'
                  }`}
                >
                  {result.riskScore}
                </span>
                <span className="text-xs text-slate-500">/ 100</span>
              </div>
              <span
                className={`text-xs font-bold px-2.5 py-0.5 rounded mt-1.5 ${
                  result.riskScore >= 70
                    ? 'bg-red-950/80 text-red-300 border border-red-800'
                    : result.riskScore >= 35
                    ? 'bg-amber-950/80 text-amber-300 border border-amber-800'
                    : 'bg-emerald-950/80 text-emerald-300 border border-emerald-800'
                }`}
              >
                {result.riskLevel} Risk
              </span>
            </div>
          </div>

          {/* Rationale Bar */}
          <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-2 text-xs text-slate-400">
            <Info className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>
              <strong>Score Rationale:</strong> {result.riskExplanation}
            </span>
          </div>
        </div>

        {/* Inspected Message Sample Card */}
        {result.analyzedText && (
          <div className="rounded-xl bg-slate-900/60 border border-slate-800/80 p-5 mb-8">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-2">
              <span>Submitted Message Text Sample</span>
              <span className="text-slate-500 font-mono">{result.analyzedText.length} characters</span>
            </div>
            <pre className="text-xs font-mono text-slate-300 bg-slate-950 p-3.5 rounded-lg border border-slate-800/80 whitespace-pre-wrap break-words max-h-48 overflow-y-auto">
              {result.analyzedText}
            </pre>
          </div>
        )}

        {/* Observable Warning Indicators Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-cyan-400" />
              <span>Observable Threat Indicators ({result.indicators.length})</span>
            </h2>
            <span className="text-xs text-slate-400">Syntactic & contextual signals detected</span>
          </div>

          {result.indicators.length === 0 ? (
            <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800 text-center text-slate-400 text-sm">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
              <p className="font-semibold text-slate-200">No explicit threat indicators identified</p>
              <p className="text-xs text-slate-400 mt-1">
                The message did not exhibit typical deceptive patterns such as fake delivery links, OTP requests, or artificial urgency.
              </p>
            </div>
          ) : (
            <div className="space-y-3.5">
              {result.indicators.map((ind, i) => (
                <div
                  key={i}
                  className="rounded-xl bg-slate-900/70 border border-slate-800/90 p-5 hover:border-slate-700 transition-colors"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="font-bold text-sm text-white">{ind.type}</span>
                    <span
                      className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${
                        ind.severity === 'high'
                          ? 'bg-red-950/80 text-red-300 border-red-800'
                          : ind.severity === 'medium'
                          ? 'bg-amber-950/80 text-amber-300 border-amber-800'
                          : 'bg-blue-950/80 text-blue-300 border-blue-800'
                      }`}
                    >
                      {ind.severity} severity
                    </span>
                  </div>

                  {ind.quote && (
                    <div className="mb-2.5 p-2 rounded bg-slate-950/80 border border-slate-800 text-xs font-mono text-cyan-300">
                      <span className="text-slate-500 font-sans mr-2">Evidence snippet:</span>
                      "{ind.quote}"
                    </div>
                  )}

                  <p className="text-xs text-slate-300 leading-relaxed">
                    <strong className="text-slate-200">Why this matters: </strong>
                    {ind.explanation}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Observable URL Inspection (if present) */}
        {result.observableUrls && result.observableUrls.length > 0 && (
          <div className="mb-8 rounded-xl bg-slate-900/60 border border-slate-800 p-5">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-3">
              <Globe className="w-4 h-4 text-cyan-400" />
              <span>Observable Link & Domain Analysis (Zero-Click Safeguard)</span>
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              ScamShield AI inspects observable domain attributes without visiting or executing untrusted links:
            </p>

            <div className="space-y-3">
              {result.observableUrls.map((urlObj, idx) => (
                <div key={idx} className="p-3.5 rounded-lg bg-slate-950 border border-slate-800">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono text-xs text-cyan-300 select-all">{urlObj.url}</span>
                    <span className="text-[11px] font-mono text-slate-400">Host: {urlObj.domain}</span>
                  </div>
                  <div className="mt-2 space-y-1">
                    {urlObj.suspiciousTraits.map((trait, tIdx) => (
                      <div key={tIdx} className="flex items-center gap-2 text-xs text-amber-300/90">
                        <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-amber-400" />
                        <span>{trait}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 text-[11px] text-slate-500 italic">
                    {urlObj.safetyNotice}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommended Safety Actions */}
        <div className="mb-8 rounded-xl bg-slate-900/60 border border-slate-800 p-6">
          <h3 className="text-base font-bold text-white flex items-center gap-2 mb-4">
            <Lock className="w-5 h-5 text-cyan-400" />
            <span>Recommended Incident Response Actions</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {result.safetyActions.map((action, i) => (
              <div
                key={i}
                className="p-3.5 rounded-lg bg-slate-950/80 border border-slate-800/80 flex items-start gap-3"
              >
                <div className="flex items-center justify-center w-5 h-5 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-400 text-xs font-bold shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <span className="text-xs text-slate-300 leading-relaxed">{action}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Official Reporting Directory */}
        <div className="mb-8 rounded-xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 p-6">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-2">
            <ExternalLink className="w-4 h-4 text-cyan-400" />
            <span>Where to Report This Message Officially</span>
          </h3>
          <p className="text-xs text-slate-400 mb-4">
            Reporting scams protects others by allowing cyber authorities to seize fraudulent domains and block telecommunication spammers:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <strong className="text-white block mb-1">USA & North America</strong>
              <p className="text-slate-400 text-[11px] mb-2">Report to FTC & FBI Internet Crime Center</p>
              <div className="space-y-1">
                <a href="https://reportfraud.ftc.gov" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline block">
                  FTC ReportFraud Portal &rarr;
                </a>
                <a href="https://ic3.gov" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline block">
                  FBI IC3 Complaint Portal &rarr;
                </a>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <strong className="text-white block mb-1">India National Cyber Bureau</strong>
              <p className="text-slate-400 text-[11px] mb-2">Financial fraud & cyber threats hotline</p>
              <div className="space-y-1">
                <span className="text-emerald-400 font-bold block">Toll-Free Helpline: 1930</span>
                <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline block">
                  cybercrime.gov.in &rarr;
                </a>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <strong className="text-white block mb-1">UK & International</strong>
              <p className="text-slate-400 text-[11px] mb-2">UK Action Fraud & Mobile SPAM</p>
              <div className="space-y-1">
                <span className="text-cyan-300 block">Forward SMS to: 7726 (SPAM)</span>
                <a href="https://actionfraud.police.uk" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline block">
                  ActionFraud.police.uk &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Methodology & Limitations Footer Box */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 space-y-1.5">
          <p>
            <strong className="text-slate-300">Analysis Methodology:</strong> {result.analysisMethod}
          </p>
          <p className="text-slate-400 italic">
            <strong>Advisory Notice:</strong> {result.limitations}
          </p>
        </div>

        {/* Bottom CTA Row */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onAnalyzeAnother}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
          >
            Analyze Another Message
          </button>
          <button
            onClick={handleDownloadPdf}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <FileDown className="w-4 h-4 text-cyan-400" />
            <span>Download PDF Forensic Report</span>
          </button>
        </div>
      </div>
    </div>
  );
};
