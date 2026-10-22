import React from 'react';
import { 
  Cpu, 
  ShieldCheck, 
  Layers, 
  Terminal, 
  AlertTriangle, 
  CheckCircle2, 
  FileCode, 
  Eye, 
  ArrowRight,
  Shield,
  HelpCircle
} from 'lucide-react';
import { PageNav } from '../types';

interface MethodologyPageProps {
  onNavigate: (page: PageNav) => void;
}

export const MethodologyPage: React.FC<MethodologyPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen text-slate-100 py-10 cyber-grid">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-400 text-xs font-semibold mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>Technical Whitepaper & Architecture</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            AI Threat Detection Methodology
          </h1>
          <p className="mt-2 text-sm text-slate-400 leading-relaxed">
            An open, transparent breakdown of the heuristic pipeline, AI contextual models, indicator taxonomies, and architectural boundaries governing ScamShield AI.
          </p>
        </div>

        {/* Core Architectural Honesty Box */}
        <div className="mb-10 p-6 rounded-2xl bg-gradient-to-r from-blue-950/40 via-cyan-950/30 to-slate-900 border border-cyan-800/60 text-slate-300 text-xs sm:text-sm leading-relaxed space-y-3">
          <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm">
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
            <span>Honest Architectural Disclosure</span>
          </div>
          <p>
            ScamShield AI utilizes <strong>server-side Google Gemini 3.8 Flash</strong> coupled with deterministic heuristic threat rules. We do not claim to run an isolated offline Scikit-Learn SVM or Random Forest model; instead, we deploy state-of-the-art Large Language Model semantic reasoning constrained by strict JSON schema definitions and cybersecurity taxonomies.
          </p>
          <p className="text-slate-400 text-xs">
            This approach provides superior handling of multilingual social engineering, contextual nuances, slang, and novel impersonation templates compared to static n-gram classifiers.
          </p>
        </div>

        {/* 2-Tier Inspection Pipeline */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            <span>Two-Tier Inspection Architecture</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl bg-slate-900/70 border border-slate-800 p-6 space-y-3">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">Tier 1: Deterministic Heuristic Engine</span>
              <h3 className="text-base font-bold text-white">Syntactic Threat Filtering</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Before sending data to the AI model, our backend applies pattern-matching regular expressions to identify deterministic threat markers:
              </p>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                <li>Direct demands for OTP, 2FA codes, or PINs.</li>
                <li>High-risk disposable top-level domains (.xyz, .top, .vip, .work).</li>
                <li>Known URL shorteners masking true destination hosts.</li>
                <li>Raw numerical IP addresses used as web endpoints.</li>
                <li>Keywords indicating irreversible payment rails (gift cards, USDT, Western Union).</li>
              </ul>
              <div className="pt-2 text-[11px] text-slate-500 font-mono">
                Function: Fast, offline fallback & structural link validation.
              </div>
            </div>

            <div className="rounded-xl bg-slate-900/70 border border-slate-800 p-6 space-y-3">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider block">Tier 2: Gemini 3.8 Flash Model</span>
              <h3 className="text-base font-bold text-white">Contextual Semantic Reasoning</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                The message and extracted link metadata are passed to Gemini 3.8 Flash with a cybersecurity threat evaluation prompt:
              </p>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                <li>Analyzes psychological manipulation: artificial urgency, fear, greed.</li>
                <li>Detects authority impersonation (CEOs, banks, tax revenue, courier dispatch).</li>
                <li>Verifies logical consistency of offers (e.g. paying $500/day for liking videos).</li>
                <li>Extracts specific verbatim evidence quotes from the submitted message.</li>
                <li>Outputs strictly typed schema for reproducible client consumption.</li>
              </ul>
              <div className="pt-2 text-[11px] text-slate-500 font-mono">
                Function: Nuanced contextual comprehension & tailored safety actions.
              </div>
            </div>
          </div>
        </div>

        {/* Threat Indicator Taxonomy */}
        <div className="mb-12 rounded-2xl bg-slate-900/50 border border-slate-800 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
            <Terminal className="w-5 h-5 text-cyan-400" />
            <span>Scam Indicator Taxonomy</span>
          </h2>
          <p className="text-xs text-slate-400 mb-6">
            ScamShield AI systematically scores text against 10 documented threat vectors:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {[
              {
                name: 'Credential & OTP Harvesting',
                desc: 'Requests for one-time passcodes, passwords, or PINs under the guise of fraud verification.',
              },
              {
                name: 'Artificial Urgency & Coercion',
                desc: 'Deadlines (15 mins, 24 hours), threats of account suspension, fines, or arrest.',
              },
              {
                name: 'Fake Employment & Task Scams',
                desc: 'Work-from-home offers demanding upfront security deposits or paying for liking social media posts.',
              },
              {
                name: 'Advance-Fee / Lottery Fraud',
                desc: 'Claims of winning an un-entered lottery, inheritance, or grant requiring legal clearance fees.',
              },
              {
                name: 'Courier & Delivery Smishing',
                desc: 'Fake undelivered package notifications asking for minor redelivery fee ($1.50) to steal credit card data.',
              },
              {
                name: 'Executive & Authority Impersonation',
                desc: 'Spoofing company leaders, legal officers, or bank managers to trigger emergency wire transfers.',
              },
              {
                name: 'Deceptive Lookalike Domains',
                desc: 'Typo-squatting, subdomain stacking (e.g. usps.update-portal.xyz), or URL shorteners.',
              },
              {
                name: 'Irreversible Payment Demands',
                desc: 'Pressure to transact via untraceable rails: gift cards, Bitcoin/USDT, CashApp, or Zelle.',
              },
              {
                name: 'Tech Support Scareware',
                desc: 'Bogus virus notifications locking screens with instructions to call a scam call center.',
              },
              {
                name: 'Utility Shutoff Scams',
                desc: 'Immediate threats to cut off electricity or water unless paid through personal phone numbers.',
              },
            ].map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-lg bg-slate-950 border border-slate-800/80">
                <span className="font-bold text-white block mb-1">{idx + 1}. {item.name}</span>
                <span className="text-slate-400">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Model Limitations & Zero-Trust Notice */}
        <div className="mb-12 rounded-xl bg-slate-900/70 border border-amber-800/50 p-6 space-y-4">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <span>Important Technical Limitations & Failures</span>
          </div>

          <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
            <p>
              <strong>1. Advisory Nature:</strong> An AI assessment is never legal proof of fraud or proof of safety. A "No Obvious Scam Indicators Detected" verdict simply indicates that our models found no known scam heuristics. Zero-day attacks or bespoke spear-phishing may evade detection.
            </p>
            <p>
              <strong>2. Adversarial Evasion:</strong> Malicious actors frequently modify wording, insert intentional misspellings, or use image-only screenshots to bypass standard keyword detectors.
            </p>
            <p>
              <strong>3. Contextual Blindspots:</strong> Without knowing the recipient's personal relationship with the sender, the system cannot verify if an email from "Alex" asking for an invoice review is legitimate or a compromised account.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-4">
          <button
            onClick={() => onNavigate('analyzer')}
            className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Test the Methodology in Message Analyzer</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
