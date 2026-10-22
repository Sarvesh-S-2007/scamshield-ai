import React from 'react';
import { Shield, ExternalLink, Lock, AlertTriangle, HeartHandshake } from 'lucide-react';
import { PageNav } from '../types';

interface FooterProps {
  onNavigate: (page: PageNav) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 text-xs">
      {/* Emergency Helpline Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border-b border-slate-800/80 py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="font-semibold text-slate-200">Victim of an active financial scam or identity theft?</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 text-[11px]">
            <span className="px-2.5 py-1 bg-slate-800/90 rounded border border-slate-700/80 text-slate-200">
              <strong className="text-cyan-400">USA:</strong> Report to <a href="https://reportfraud.ftc.gov" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">FTC</a> / <a href="https://ic3.gov" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">IC3</a>
            </span>
            <span className="px-2.5 py-1 bg-slate-800/90 rounded border border-slate-700/80 text-slate-200">
              <strong className="text-cyan-400">India:</strong> Dial <strong>1930</strong> or <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">cybercrime.gov.in</a>
            </span>
            <span className="px-2.5 py-1 bg-slate-800/90 rounded border border-slate-700/80 text-slate-200">
              <strong className="text-cyan-400">UK:</strong> Action Fraud <strong>0300 123 2040</strong>
            </span>
            <span className="px-2.5 py-1 bg-slate-800/90 rounded border border-slate-700/80 text-slate-200">
              <strong className="text-cyan-400">Australia:</strong> <a href="https://scamwatch.gov.au" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">Scamwatch</a>
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 shadow-sm">
                <Shield className="w-4 h-4 text-slate-950 stroke-[2.5]" />
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                SCAMSHIELD<span className="text-cyan-400">.AI</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-md">
              Detect Suspicious Messages. Understand the Risk. Stay Safe Online. ScamShield AI utilizes multi-tier cybersecurity heuristics and Google Gemini intelligence to expose social engineering, smishing, and financial fraud.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <Lock className="w-3.5 h-3.5 text-cyan-500" />
              <span>Zero credentials stored. Client history remains isolated in local browser storage.</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2.5">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-200">Navigation</p>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-cyan-300 transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('analyzer')} className="hover:text-cyan-300 transition-colors">
                  Message Analyzer
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('examples')} className="hover:text-cyan-300 transition-colors">
                  Example Scams Library
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('history')} className="hover:text-cyan-300 transition-colors">
                  Analysis History
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('dashboard')} className="hover:text-cyan-300 transition-colors">
                  Threat Dashboard
                </button>
              </li>
            </ul>
          </div>

          {/* Educational & Principles */}
          <div className="space-y-2.5">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-200">Resources & Guide</p>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button onClick={() => onNavigate('methodology')} className="hover:text-cyan-300 transition-colors">
                  AI Threat Methodology
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('safety')} className="hover:text-cyan-300 transition-colors">
                  Cybersecurity Safety Guide
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-cyan-300 transition-colors">
                  Project About & Architecture
                </button>
              </li>
              <li>
                <a
                  href="https://consumer.ftc.gov/articles/how-recognize-and-avoid-phishing-scams"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-cyan-300 transition-colors"
                >
                  <span>FTC Anti-Phishing Guide</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal & Educational Disclaimer */}
        <div className="mt-8 pt-6 border-t border-slate-900/80 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p className="max-w-3xl leading-normal text-slate-400">
            <strong className="text-slate-300">Advisory Disclaimer:</strong> ScamShield AI is an educational cybersecurity tool. Outputs are advisory evaluations and do not constitute formal legal, financial, or cyber-forensic certification. Always perform independent verification with authenticated institutional contacts before transferring funds or sharing credentials.
          </p>
          <div className="flex items-center gap-1.5 text-slate-400 shrink-0">
            <span>Built for Cyber Defense & Education</span>
            <HeartHandshake className="w-3.5 h-3.5 text-cyan-400" />
          </div>
        </div>
      </div>
    </footer>
  );
};
