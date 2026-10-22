import React, { useState } from 'react';
import { 
  HelpCircle, 
  ShieldAlert, 
  ShieldCheck, 
  Lock, 
  PhoneCall, 
  ExternalLink, 
  AlertTriangle, 
  CheckCircle2, 
  KeyRound, 
  CreditCard, 
  Briefcase, 
  Mail, 
  LifeBuoy,
  FileWarning
} from 'lucide-react';
import { PageNav } from '../types';

interface SafetyGuidePageProps {
  onNavigate: (page: PageNav) => void;
}

export const SafetyGuidePage: React.FC<SafetyGuidePageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'rules' | 'anatomy' | 'response' | 'reporting'>('rules');

  return (
    <div className="min-h-screen text-slate-100 py-10 cyber-grid">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-400 text-xs font-semibold mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Digital Self-Defense Field Manual</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Cybersecurity & Privacy Guide
          </h1>
          <p className="mt-2 text-sm text-slate-400 leading-relaxed">
            Essential tactical protocols to shield yourself against social engineering, protect financial accounts, and report active fraud.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: 'rules', label: '6 Golden Defense Rules', icon: <Lock className="w-4 h-4" /> },
            { id: 'anatomy', label: 'Anatomy of an Attack', icon: <ShieldAlert className="w-4 h-4" /> },
            { id: 'response', label: 'If You Already Clicked', icon: <LifeBuoy className="w-4 h-4" /> },
            { id: 'reporting', label: 'Official Reporting Hotlines', icon: <PhoneCall className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content 1: 6 Golden Rules */}
        {activeTab === 'rules' && (
          <div className="space-y-5">
            {[
              {
                title: '1. Never Share One-Time Passwords (OTPs) or PINs',
                desc: 'Bank representatives, tech support agents, and delivery drivers NEVER need your OTP. An OTP is the cryptographic authorization key to your account. Anyone asking for it is attempting an unauthorized login or fund transfer.',
                icon: <KeyRound className="w-6 h-6 text-cyan-400" />,
                badge: 'Rule of Absolute Secrecy',
              },
              {
                title: '2. Verify Payment Requests Independently Out-of-Band',
                desc: 'If an invoice, boss, or landlord requests payment via email or text, call their known, pre-saved phone number before transferring money. Never rely on the contact information provided in the incoming message itself.',
                icon: <CreditCard className="w-6 h-6 text-blue-400" />,
                badge: 'Verification Mandate',
              },
              {
                title: '3. Never Open Unverified Links or Download APKs',
                desc: 'Fraudulent SMS messages frequently route victims to lookalike login portals or prompt Android APK downloads that intercept SMS messages. If an alert claims an address or password needs updating, visit the official site manually.',
                icon: <Lock className="w-6 h-6 text-purple-400" />,
                badge: 'Zero-Click Discipline',
              },
              {
                title: '4. Check Job Offers Before Paying Any "Security Deposits"',
                desc: 'Legitimate employers will never ask candidates to pay an upfront "registration kit fee", "workstation deposit", or conduct official interviews solely via unmoderated Telegram channels.',
                icon: <Briefcase className="w-6 h-6 text-emerald-400" />,
                badge: 'Employment Safety',
              },
              {
                title: '5. Contact Financial Institutions Directly',
                desc: 'If you receive an alarming notification that your bank card is suspended or a wire is pending, look at the physical plastic card in your wallet and call the customer service number on the back.',
                icon: <PhoneCall className="w-6 h-6 text-amber-400" />,
                badge: 'Trusted Channels Only',
              },
              {
                title: '6. Report Suspicious Messages Immediately',
                desc: 'Forward spam and smishing SMS to 7726 (SPAM on US/UK carriers). Report fraudulent portals to national agencies to trigger registrar takedowns and protect vulnerable citizens.',
                icon: <LifeBuoy className="w-6 h-6 text-red-400" />,
                badge: 'Collective Defense',
              },
            ].map((rule, idx) => (
              <div
                key={idx}
                className="rounded-xl bg-slate-900/60 border border-slate-800 p-6 flex flex-col sm:flex-row items-start gap-5 hover:border-slate-700 transition-colors"
              >
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 shrink-0">
                  {rule.icon}
                </div>
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-base font-bold text-white">{rule.title}</h3>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-cyan-300">
                      {rule.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{rule.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab Content 2: Anatomy of an Attack */}
        {activeTab === 'anatomy' && (
          <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-8 space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Psychological Manipulation in Social Engineering</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Scams succeed not by hacking computers, but by hacking human emotions. Attackers exploit predictable cognitive biases:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-red-400 text-sm block">1. The Fear & Urgency Trigger</span>
                <p className="text-slate-400 leading-relaxed">
                  "Your account will be suspended in 15 minutes", "Arrest warrant issued", "Electricity disconnected at 8:00 PM". High emotional arousal bypasses critical analytical thinking and rushes victims into compliance.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-amber-400 text-sm block">2. The Greed & Opportunity Hook</span>
                <p className="text-slate-400 leading-relaxed">
                  "Selected for $850,000 lottery", "Earn $500 daily liking YouTube videos", "Guaranteed 15% daily crypto arbitrage". The promise of effortless riches blinds targets to the upfront fees being extorted.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-cyan-400 text-sm block">3. False Authority Impersonation</span>
                <p className="text-slate-400 leading-relaxed">
                  Displaying logos of trusted institutions: USPS, FedEx, PayPal, Chase, Microsoft, Police, or IRS. Fraudsters count on institutional obedience to disguise suspicious domains.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-purple-400 text-sm block">4. The Sunk Cost Trap</span>
                <p className="text-slate-400 leading-relaxed">
                  Once a victim pays an initial minor fee (e.g. $1.85 redelivery or $49 registration), the scammer invents escalating "clearance fees" or "tax bonds," convincing the victim to keep paying to recover what was already lost.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 3: If You Already Clicked */}
        {activeTab === 'response' && (
          <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-8 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-red-950/80 border border-red-800 text-red-300 text-xs font-bold mb-3">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Incident Response Checklist</span>
              </div>
              <h3 className="text-2xl font-bold text-white">What To Do If You Already Fell For a Scam</h3>
              <p className="text-xs text-slate-400 mt-1">
                Act immediately. Speed is critical to limit financial loss and identity compromise:
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 flex items-start gap-4">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-red-950 border border-red-800 text-red-400 font-bold shrink-0">
                  1
                </div>
                <div>
                  <strong className="text-white text-sm block mb-1">Freeze Compromised Cards & Accounts Immediately</strong>
                  <p className="text-slate-400 leading-relaxed">
                    Open your official banking app and immediately lock the debit/credit card entered on the fake page. Call your bank’s fraud line directly to initiate chargeback disputes and cancel compromised card numbers.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 flex items-start gap-4">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-950 border border-amber-800 text-amber-400 font-bold shrink-0">
                  2
                </div>
                <div>
                  <strong className="text-white text-sm block mb-1">Change Passwords & Enable Hardware 2FA</strong>
                  <p className="text-slate-400 leading-relaxed">
                    If you entered a password, change it immediately across that service and any other site where you reused that password. Log out of all active web sessions and switch to an Authenticator app (e.g. Google Authenticator) or security key instead of SMS OTP.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 flex items-start gap-4">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-400 font-bold shrink-0">
                  3
                </div>
                <div>
                  <strong className="text-white text-sm block mb-1">Freeze Your Credit Report (Identity Theft Defense)</strong>
                  <p className="text-slate-400 leading-relaxed">
                    If you shared your Social Security Number, PAN, National ID, or date of birth, contact the major credit bureaus (Equifax, Experian, TransUnion) to place a free security freeze on your credit file to prevent new credit lines from being opened in your name.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 flex items-start gap-4">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-950 border border-purple-800 text-purple-400 font-bold shrink-0">
                  4
                </div>
                <div>
                  <strong className="text-white text-sm block mb-1">File Official Police & Cybercrime Reports</strong>
                  <p className="text-slate-400 leading-relaxed">
                    Retain screenshots, message timestamps, phone numbers, and payment transaction IDs. File an official complaint with your national cybercrime bureau to document the fraud for your bank’s recovery claim.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 4: Reporting Hotlines */}
        {activeTab === 'reporting' && (
          <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-8 space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Global Cybercrime Hotlines & Portals</h3>
              <p className="text-xs text-slate-400">
                Official government and telecommunication channels dedicated to investigating online financial fraud:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-white text-sm block">United States</span>
                <p className="text-slate-400">Federal Trade Commission & FBI Cyber Unit</p>
                <div className="pt-2 space-y-1.5">
                  <a href="https://reportfraud.ftc.gov" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between text-cyan-400 hover:underline">
                    <span>FTC ReportFraud Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <a href="https://ic3.gov" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between text-cyan-400 hover:underline">
                    <span>FBI Internet Crime Complaint Center (IC3)</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-white text-sm block">India</span>
                <p className="text-slate-400">Indian Cyber Crime Coordination Centre (I4C)</p>
                <div className="pt-2 space-y-1.5">
                  <div className="text-emerald-400 font-bold text-sm">Citizen Financial Cyber Fraud Helpline: 1930</div>
                  <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between text-cyan-400 hover:underline">
                    <span>National Cyber Crime Reporting Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-white text-sm block">United Kingdom</span>
                <p className="text-slate-400">City of London Police / Action Fraud</p>
                <div className="pt-2 space-y-1.5">
                  <div className="text-cyan-300 font-medium">Action Fraud Hotline: 0300 123 2040</div>
                  <span className="text-slate-400 block">Forward Smishing SMS to: 7726 (free)</span>
                  <a href="https://actionfraud.police.uk" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between text-cyan-400 hover:underline">
                    <span>Action Fraud Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-white text-sm block">Australia</span>
                <p className="text-slate-400">National Anti-Scam Centre / Scamwatch</p>
                <div className="pt-2 space-y-1.5">
                  <a href="https://scamwatch.gov.au" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between text-cyan-400 hover:underline">
                    <span>Scamwatch Official Reporting</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <a href="https://cyber.gov.au" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between text-cyan-400 hover:underline">
                    <span>Australian Cyber Security Centre</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
