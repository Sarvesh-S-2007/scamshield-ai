import React, { useState } from 'react';
import { 
  Shield, 
  ShieldAlert, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Lock, 
  Search, 
  FileDown, 
  Scan, 
  ExternalLink, 
  ChevronDown, 
  ChevronUp, 
  Zap, 
  ShieldCheck, 
  EyeOff,
  Cpu
} from 'lucide-react';
import { PageNav } from '../types';
import { EXAMPLE_MESSAGES } from '../data/examples';

interface HomePageProps {
  onNavigate: (page: PageNav) => void;
  onSelectExampleForAnalyzer: (text: string, channel: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onSelectExampleForAnalyzer }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does ScamShield AI detect scam messages?',
      a: 'ScamShield AI employs a dual-tier cybersecurity architecture: first, deterministic regex rules parse high-threat syntax like OTP requests, unverified payment rails, and deceptive URLs. Second, server-side Google Gemini 3.8 Flash performs contextual social engineering analysis to detect artificial urgency, authority impersonation, and fraudulent promises.',
    },
    {
      q: 'Is my submitted message data saved or made public?',
      a: 'No. Message analysis is processed ephemerally in server memory. Sensitive tokens like passwords or OTPs are never logged. Your analysis history is saved strictly inside your local browser storage and can be wiped with one click.',
    },
    {
      q: 'Does a "No Obvious Scam Indicators Detected" verdict guarantee 100% safety?',
      a: 'No. All automated security evaluations are advisory. Sophisticated spear-phishing or novel tactics may not trigger common indicators. Always practice Zero Trust: verify unexpected requests out-of-band using official phone numbers or apps.',
    },
    {
      q: 'Can I upload a screenshot instead of typing text?',
      a: 'Yes! ScamShield AI includes an integrated OCR engine powered by Gemini Vision. You can drag and drop or upload a screenshot of an SMS, WhatsApp chat, or email. The system extracts the text for your review before analysis.',
    },
    {
      q: 'What should I do if a message is flagged as a Potential Scam?',
      a: 'Do not click any embedded links, do not reply, and never disclose OTPs or passwords. If the message claims to be from your bank or a government agency, contact them through the verified telephone number on your payment card or their official website.',
    },
  ];

  return (
    <div className="min-h-screen text-slate-100 pb-16 cyber-grid">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
        {/* Glow circles */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-500/10 via-blue-500/15 to-transparent blur-3xl pointer-events-none rounded-full" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-800/60 text-cyan-300 text-xs font-semibold shadow-inner mb-6">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>AI-Assisted Threat Intelligence • Zero-Trust Messaging Defense</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.15]">
            Stop Scams Before <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">They Reach You.</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Detect Suspicious Messages. Understand the Risk. Stay Safe Online. Analyze suspicious SMS, WhatsApp, and emails using structured AI threat heuristics.
          </p>

          {/* Action CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('analyzer')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 text-slate-950 font-bold text-sm shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <ShieldAlert className="w-5 h-5 text-slate-950 stroke-[2.5]" />
              <span>Analyze a Message Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('examples')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800/90 border border-slate-700/80 text-slate-200 font-semibold text-sm hover:border-slate-600 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Explore Example Scams</span>
              <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">12 Scenarios</span>
            </button>
          </div>

          {/* Key Assurance Indicators */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>No Registration Required</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-cyan-400" />
              <span>Zero Credential Retention</span>
            </div>
            <div className="flex items-center gap-2">
              <FileDown className="w-4 h-4 text-sky-400" />
              <span>Downloadable PDF Reports</span>
            </div>
            <div className="flex items-center gap-2">
              <Scan className="w-4 h-4 text-purple-400" />
              <span>Screenshot OCR Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Interactive Test Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 mb-16">
        <div className="rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-900/95 to-slate-900/90 border border-slate-800 p-6 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                <Zap className="w-4 h-4" />
                <span>Quick Scenario Test</span>
              </div>
              <h2 className="text-xl font-bold text-white">Test ScamShield with Synthetic Sample Incidents</h2>
              <p className="text-sm text-slate-400">Select any realistic synthetic scenario below to instantly populate the analyzer:</p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              {EXAMPLE_MESSAGES.slice(0, 3).map((ex) => (
                <button
                  key={ex.id}
                  onClick={() => onSelectExampleForAnalyzer(ex.fullMessage, ex.channel)}
                  className="px-3.5 py-2 rounded-lg bg-slate-800/90 hover:bg-slate-700/80 border border-slate-700/80 text-xs text-slate-200 hover:text-cyan-300 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span className="w-2 h-2 rounded-full bg-red-400" />
                  <span className="font-medium">{ex.category}: {ex.title.split(' ')[0]}</span>
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Capabilities / Feature Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-xs uppercase font-bold tracking-widest text-cyan-400">Cybersecurity Capabilities</h2>
          <p className="mt-2 text-3xl font-extrabold text-white">Engineered for Threat Clarity</p>
          <p className="mt-3 text-slate-400 text-sm">
            ScamShield AI doesn’t just output a generic score. It parses syntactic anomalies, extracts observable markers, and presents verifiable defense recommendations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-6 hover:border-cyan-500/40 transition-colors flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-800/50 flex items-center justify-center text-cyan-400 mb-5">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Observable Indicator Breakdown</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Highlights the exact phrases that triggered risk flags: artificial urgency, OTP harvesting, fake job deposits, and unverified payment channels.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-2 text-xs text-cyan-400 font-semibold">
              <span>Textual Evidence Extraction</span>
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-6 hover:border-cyan-500/40 transition-colors flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-950/80 border border-blue-800/50 flex items-center justify-center text-blue-400 mb-5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Observable URL Inspection</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Safely inspects domain syntax, suspicious high-risk TLDs (.xyz, .top, .vip), URL shorteners, and raw IP addresses without triggering malicious downloads.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-2 text-xs text-blue-400 font-semibold">
              <span>Zero-Click URL Safeguard</span>
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 3 */}
          <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-6 hover:border-cyan-500/40 transition-colors flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-950/80 border border-purple-800/50 flex items-center justify-center text-purple-400 mb-5">
                <FileDown className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Forensic PDF Reports</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Generate clean, verifiable PDF forensic summaries with reference IDs, indicators, risk breakdown, and official reporting contacts for reporting incidents.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-2 text-xs text-purple-400 font-semibold">
              <span>Auditable Incident Reports</span>
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Pipeline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-900">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-xs uppercase font-bold tracking-widest text-cyan-400">Analysis Pipeline</h2>
          <p className="mt-2 text-3xl font-extrabold text-white">How ScamShield Evaluates Messages</p>
          <p className="mt-3 text-slate-400 text-sm">
            A transparent 4-stage inspection model balancing deterministic threat rules with AI contextual reasoning.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="relative p-6 rounded-xl bg-slate-900/40 border border-slate-800">
            <span className="text-3xl font-black text-slate-700/80">01</span>
            <h4 className="mt-3 font-bold text-base text-white">Ingestion & Validation</h4>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              Accepts raw pasted text or extracts content from screenshots via OCR. Validates input boundaries and normalizes whitespace.
            </p>
          </div>

          <div className="relative p-6 rounded-xl bg-slate-900/40 border border-slate-800">
            <span className="text-3xl font-black text-cyan-800/80">02</span>
            <h4 className="mt-3 font-bold text-base text-white">Heuristic Syntax Filter</h4>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              Detects high-risk patterns including OTP requests, high-risk TLDs, urgent keywords, and unverified payment channels.
            </p>
          </div>

          <div className="relative p-6 rounded-xl bg-slate-900/40 border border-slate-800">
            <span className="text-3xl font-black text-blue-800/80">03</span>
            <h4 className="mt-3 font-bold text-base text-white">AI Contextual Reasoning</h4>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              Google Gemini 3.8 Flash evaluates subtle social engineering, impersonation nuances, and context to classify genuine vs fraudulent intent.
            </p>
          </div>

          <div className="relative p-6 rounded-xl bg-slate-900/40 border border-slate-800">
            <span className="text-3xl font-black text-emerald-800/80">04</span>
            <h4 className="mt-3 font-bold text-base text-white">Structured Threat Report</h4>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              Synthesizes classification, risk gauge (0-100), observable evidence quotes, and emergency safety actions into a downloadable report.
            </p>
          </div>
        </div>
      </section>

      {/* Supported Message Formats Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="rounded-2xl bg-slate-900/40 border border-slate-800/80 p-8 sm:p-10">
          <div className="max-w-2xl mb-8">
            <h3 className="text-2xl font-bold text-white">Supported Threat Vectors</h3>
            <p className="text-sm text-slate-400 mt-1">
              ScamShield AI is optimized for the most prevalent digital fraud channels across consumer and enterprise communication:
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'SMS Smishing', desc: 'Bank & delivery alerts', icon: '📱' },
              { name: 'WhatsApp & Telegram', desc: 'Task jobs & crypto', icon: '💬' },
              { name: 'Phishing Email', desc: 'CEO fraud & invoices', icon: '✉️' },
              { name: 'Direct Messages', desc: 'Social media impersonation', icon: '👥' },
              { name: 'Marketplace Scams', desc: 'Overpayment & escrow', icon: '🛒' },
              { name: 'Scareware / Tech Alert', desc: 'Fake virus warnings', icon: '⚠️' },
            ].map((v, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/60 text-center">
                <div className="text-2xl mb-2">{v.icon}</div>
                <p className="font-semibold text-xs text-slate-200">{v.name}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cybersecurity Awareness Tips Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="rounded-xl bg-gradient-to-r from-cyan-950/40 via-blue-950/40 to-slate-900 border border-cyan-800/40 p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                <Lock className="w-4 h-4" />
                <span>Zero-Trust Messaging Discipline</span>
              </div>
              <h3 className="text-xl font-bold text-white">The Golden Rule: Never Verify Through the Message Itself</h3>
              <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
                If an SMS claims your bank account is suspended, never call the phone number in that SMS and never click the link. Open your bank’s official mobile app independently or dial the physical telephone number on the back of your debit card.
              </p>
            </div>
            <button
              onClick={() => onNavigate('safety')}
              className="px-5 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shrink-0 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>Read Full Safety Guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h2 className="text-xs uppercase font-bold tracking-widest text-cyan-400">Questions & Answers</h2>
          <p className="mt-2 text-2xl sm:text-3xl font-extrabold text-white">Frequently Asked Questions</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-xl bg-slate-900/50 border border-slate-800/80 overflow-hidden transition-colors"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 text-sm font-semibold text-slate-200 hover:text-white cursor-pointer"
              >
                <span>{faq.q}</span>
                {openFaq === idx ? (
                  <ChevronUp className="w-4 h-4 text-cyan-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                )}
              </button>
              {openFaq === idx && (
                <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-slate-800/50">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <ShieldAlert className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">Received a suspicious message?</h3>
            <p className="mt-3 text-slate-400 text-sm">
              Paste the text or upload a screenshot to evaluate the threat level in seconds. It’s free, anonymous, and requires no account.
            </p>
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => onNavigate('analyzer')}
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/20 hover:scale-[1.02] transition-transform flex items-center gap-2 cursor-pointer"
              >
                <span>Open Message Analyzer</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
