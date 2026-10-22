import React from 'react';
import { 
  Info, 
  Shield, 
  Code2, 
  Lock, 
  Server, 
  Heart, 
  ArrowRight, 
  CheckCircle2, 
  Terminal,
  Globe,
  Award
} from 'lucide-react';
import { PageNav } from '../types';

interface AboutPageProps {
  onNavigate: (page: PageNav) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen text-slate-100 py-10 cyber-grid">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-400 text-xs font-semibold mb-3">
            <Info className="w-3.5 h-3.5" />
            <span>Project Mission & Technical Specifications</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            About ScamShield AI
          </h1>
          <p className="mt-2 text-sm text-slate-400 leading-relaxed">
            A cybersecurity research and engineering project built to empower individuals and organizations against social engineering and digital fraud.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-8 sm:p-10 mb-10">
          <div className="max-w-3xl space-y-4 text-slate-300 text-sm leading-relaxed">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Democratizing Threat Intelligence
            </h2>
            <p>
              Digital messaging fraud—ranging from smishing and fake job offers to executive impersonation—has exploded into a multi-billion dollar illicit global industry. While enterprise corporations spend millions on security gateways, everyday consumers and small teams often lack tools to inspect deceptive messages safely.
            </p>
            <p>
              <strong>ScamShield AI</strong> was created to bridge this gap. By combining immediate heuristic syntactic inspection with contextual LLM reasoning, we give users transparent, observable evidence of why a message is risky, enabling informed decisions before clicks occur.
            </p>
          </div>
        </div>

        {/* Tech Stack Grid */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Code2 className="w-5 h-5 text-cyan-400" />
            <span>Modern Full-Stack Architecture</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-xs">
            <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-5">
              <span className="font-bold text-white block text-sm mb-1">Frontend Runtime</span>
              <p className="text-slate-400 mb-3">React 19, TypeScript, Vite & Tailwind CSS v4</p>
              <ul className="space-y-1 text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Sub-second page transitions</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Responsive cybersecurity design system</span>
                </li>
              </ul>
            </div>

            <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-5">
              <span className="font-bold text-white block text-sm mb-1">AI Reasoning Engine</span>
              <p className="text-slate-400 mb-3">Google Gemini 3.8 Flash via @google/genai SDK</p>
              <ul className="space-y-1 text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Strict typed schema generation</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Multimodal OCR vision integration</span>
                </li>
              </ul>
            </div>

            <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-5">
              <span className="font-bold text-white block text-sm mb-1">Backend Proxy & Rules</span>
              <p className="text-slate-400 mb-3">Express & Node.js with Regex Heuristics</p>
              <ul className="space-y-1 text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Zero frontend API key exposure</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Offline deterministic rule fallback</span>
                </li>
              </ul>
            </div>

            <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-5">
              <span className="font-bold text-white block text-sm mb-1">Forensic Export Engine</span>
              <p className="text-slate-400 mb-3">Client-Side jsPDF Generator</p>
              <ul className="space-y-1 text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Auditable PDF reports</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Official incident helpline directory</span>
                </li>
              </ul>
            </div>

            <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-5">
              <span className="font-bold text-white block text-sm mb-1">Data Privacy Model</span>
              <p className="text-slate-400 mb-3">Ephemeral Server Memory & LocalStorage</p>
              <ul className="space-y-1 text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>No central database storage</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Full one-click local deletion controls</span>
                </li>
              </ul>
            </div>

            <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-5">
              <span className="font-bold text-white block text-sm mb-1">URL Safeguards</span>
              <p className="text-slate-400 mb-3">Observable Syntax & TLD Inspection</p>
              <ul className="space-y-1 text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Zero-click link inspection</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>IP host and shortener identification</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Core Cybersecurity Principles */}
        <div className="mb-12 rounded-2xl bg-slate-900/40 border border-slate-800 p-8">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Lock className="w-5 h-5 text-cyan-400" />
            <span>Guiding Cybersecurity Principles</span>
          </h2>

          <div className="space-y-5 text-xs text-slate-300">
            <div>
              <strong className="text-cyan-300 text-sm block mb-1">1. Zero Trust Messaging</strong>
              <p className="text-slate-400 leading-relaxed">
                Assume all unsolicited electronic correspondence is untrusted until confirmed through an out-of-band, authenticated channel. Never rely on caller ID, display names, or header text alone.
              </p>
            </div>

            <div>
              <strong className="text-cyan-300 text-sm block mb-1">2. Defense-in-Depth</strong>
              <p className="text-slate-400 leading-relaxed">
                Security should never depend on a single tool. Combine automated threat scanners like ScamShield with multi-factor authentication hardware keys, banking transaction alerts, and human skepticism.
              </p>
            </div>

            <div>
              <strong className="text-cyan-300 text-sm block mb-1">3. Transparency Over False Guarantees</strong>
              <p className="text-slate-400 leading-relaxed">
                We reject opaque AI scoring that gives users a false sense of absolute security. By exposing explicit evidence quotes and observable warning indicators, users learn how to spot attacks for themselves.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-4">
          <button
            onClick={() => onNavigate('analyzer')}
            className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Launch ScamShield AI Analyzer</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
