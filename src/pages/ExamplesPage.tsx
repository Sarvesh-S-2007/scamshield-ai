import React, { useState } from 'react';
import { 
  FileText, 
  ArrowRight, 
  ShieldAlert, 
  ShieldCheck, 
  HelpCircle, 
  CheckCircle2, 
  Search, 
  Filter,
  Info
} from 'lucide-react';
import { EXAMPLE_MESSAGES } from '../data/examples';
import { ExampleMessage, PageNav } from '../types';

interface ExamplesPageProps {
  onSelectExample: (text: string, channel: string) => void;
  onNavigate: (page: PageNav) => void;
}

export const ExamplesPage: React.FC<ExamplesPageProps> = ({
  onSelectExample,
  onNavigate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    'Job Scam',
    'Banking & OTP',
    'Lottery & Prize',
    'Delivery & Phishing',
    'Impersonation',
    'Legitimate',
    'Ambiguous',
  ];

  const filteredExamples = EXAMPLE_MESSAGES.filter((ex) => {
    const matchesCat = selectedCategory === 'All' || ex.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      ex.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.fullMessage.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen text-slate-100 py-10 cyber-grid">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-400 text-xs font-semibold mb-3">
            <FileText className="w-3.5 h-3.5" />
            <span>Synthetic Threat Library</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Example Message Scenarios
          </h1>
          <p className="mt-2 text-sm text-slate-400 leading-relaxed">
            Examine 12 illustrative synthetic scenarios covering common digital threats as well as legitimate and ambiguous communications. Click any scenario to test it through the working AI analyzer.
          </p>
        </div>

        {/* Disclaimer Notice */}
        <div className="mb-8 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-400 flex items-center gap-2.5">
          <Info className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>
            <strong>Transparency Notice:</strong> All scenarios below are synthetic educational models constructed to demonstrate threat detection signals. They do not contain live victim credentials or active malicious infrastructure.
          </span>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search scenarios..."
              className="w-full bg-slate-900/90 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 border border-slate-800 focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        {/* Examples Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredExamples.map((ex) => {
            const isSafe = ex.expectedRisk === 'Safe';
            const isCritical = ex.expectedRisk === 'Critical';
            const isHigh = ex.expectedRisk === 'High';

            return (
              <div
                key={ex.id}
                className="rounded-xl bg-slate-900/70 border border-slate-800/90 p-6 flex flex-col justify-between hover:border-slate-700 transition-all shadow-md group"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-cyan-300">
                      {ex.category} • {ex.channel}
                    </span>

                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${
                        isCritical
                          ? 'bg-red-950/80 text-red-300 border-red-800'
                          : isHigh
                          ? 'bg-amber-950/80 text-amber-300 border-amber-800'
                          : isSafe
                          ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800'
                          : 'bg-blue-950/80 text-blue-300 border-blue-800'
                      }`}
                    >
                      Expected: {ex.expectedRisk} Risk
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {ex.title}
                  </h3>

                  <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                    {ex.description}
                  </p>

                  {/* Message Preview Box */}
                  <div className="p-3 rounded-lg bg-slate-950/90 border border-slate-800 text-xs font-mono text-slate-300 mb-4 max-h-36 overflow-y-auto whitespace-pre-wrap break-words">
                    {ex.fullMessage}
                  </div>

                  {/* Observable Signals */}
                  <div className="space-y-1 mb-5">
                    <span className="text-[11px] font-semibold text-slate-400 block">Key Indicators in Scenario:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {ex.keySignals.map((sig, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[10px] px-2 py-0.5 rounded bg-slate-800/70 border border-slate-700/60 text-slate-300"
                        >
                          {sig}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Load Button */}
                <button
                  onClick={() => onSelectExample(ex.fullMessage, ex.channel)}
                  className="w-full py-2.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 font-bold text-xs border border-cyan-800/50 hover:border-transparent transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>Load Into Working Analyzer</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {filteredExamples.length === 0 && (
          <div className="text-center py-16 text-slate-500 text-sm">
            No scenario matches your search filter. Try clearing the search query or selecting "All".
          </div>
        )}
      </div>
    </div>
  );
};
