import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  TrendingUp, 
  FileText, 
  ArrowRight, 
  CheckCircle2, 
  BarChart3, 
  PieChart, 
  History,
  Activity
} from 'lucide-react';
import { ScamAnalysisResult, PageNav } from '../types';
import { getHistory } from '../utils/storage';

interface DashboardPageProps {
  onViewResult: (result: ScamAnalysisResult) => void;
  onNavigate: (page: PageNav) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  onViewResult,
  onNavigate,
}) => {
  const [history, setHistory] = useState<ScamAnalysisResult[]>([]);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const total = history.length;
  const scamCount = history.filter(
    (h) => h.classification === 'Potential Scam Indicators Detected'
  ).length;
  const suspiciousCount = history.filter(
    (h) => h.classification === 'Suspicious — Verify Independently'
  ).length;
  const safeCount = history.filter(
    (h) => h.classification === 'No Obvious Scam Indicators Detected'
  ).length;

  const avgRiskScore = total > 0
    ? Math.round(history.reduce((acc, curr) => acc + curr.riskScore, 0) / total)
    : 0;

  // Compute common threat indicator types
  const indicatorCounts: Record<string, number> = {};
  history.forEach((h) => {
    h.indicators.forEach((ind) => {
      indicatorCounts[ind.type] = (indicatorCounts[ind.type] || 0) + 1;
    });
  });

  const sortedIndicators = Object.entries(indicatorCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="min-h-screen text-slate-100 py-10 cyber-grid">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-400 text-xs font-semibold mb-2">
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Workstation Metrics</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Threat Analytics Dashboard</h1>
          <p className="text-sm text-slate-400 mt-1">
            Aggregated intelligence derived from messages evaluated during your current workstation sessions.
          </p>
        </div>

        {total === 0 ? (
          /* Empty State */
          <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-12 text-center max-w-2xl mx-auto">
            <Activity className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white">No Threat Data Logged Yet</h2>
            <p className="text-sm text-slate-400 mt-2 mb-6 leading-relaxed">
              As you inspect messages using the Analyzer or load scenarios from the Example Library, your personal dashboard will calculate live risk distributions, detected threat categories, and trend indicators.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => onNavigate('analyzer')}
                className="px-6 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-colors cursor-pointer"
              >
                Launch Analyzer
              </button>
              <button
                onClick={() => onNavigate('examples')}
                className="px-6 py-2.5 rounded-xl bg-slate-800 text-slate-200 font-semibold text-xs border border-slate-700 hover:bg-slate-700 transition-colors cursor-pointer"
              >
                Load Synthetic Scenarios
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
              <div className="rounded-xl bg-slate-900/70 border border-slate-800 p-5">
                <span className="text-xs font-semibold text-slate-400 block mb-1">Total Scanned Messages</span>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-extrabold text-white">{total}</span>
                  <FileText className="w-5 h-5 text-cyan-400" />
                </div>
                <span className="text-[11px] text-slate-500 mt-2 block">100% locally cataloged</span>
              </div>

              <div className="rounded-xl bg-slate-900/70 border border-slate-800 p-5">
                <span className="text-xs font-semibold text-red-400/90 block mb-1">Potential Scams Identified</span>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-extrabold text-red-400">{scamCount}</span>
                  <ShieldAlert className="w-5 h-5 text-red-400" />
                </div>
                <span className="text-[11px] text-slate-500 mt-2 block">
                  {total > 0 ? Math.round((scamCount / total) * 100) : 0}% of scanned volume
                </span>
              </div>

              <div className="rounded-xl bg-slate-900/70 border border-slate-800 p-5">
                <span className="text-xs font-semibold text-amber-400/90 block mb-1">Suspicious / Ambiguous</span>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-extrabold text-amber-400">{suspiciousCount}</span>
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                </div>
                <span className="text-[11px] text-slate-500 mt-2 block">
                  {total > 0 ? Math.round((suspiciousCount / total) * 100) : 0}% requiring independent check
                </span>
              </div>

              <div className="rounded-xl bg-slate-900/70 border border-slate-800 p-5">
                <span className="text-xs font-semibold text-cyan-400/90 block mb-1">Average Threat Score</span>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-extrabold text-cyan-300">{avgRiskScore}</span>
                  <span className="text-xs text-slate-500">/ 100</span>
                </div>
                <span className="text-[11px] text-slate-500 mt-2 block">Composite heuristic average</span>
              </div>
            </div>

            {/* Visual Analytics Split */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Verdict Breakdown Bar */}
              <div className="rounded-xl bg-slate-900/70 border border-slate-800 p-6">
                <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-4">
                  <PieChart className="w-4 h-4 text-cyan-400" />
                  <span>Classification Proportions</span>
                </h3>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-red-400 font-semibold">Potential Scam ({scamCount})</span>
                      <span className="text-slate-400">{total > 0 ? Math.round((scamCount / total) * 100) : 0}%</span>
                    </div>
                    <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                      <div
                        className="h-full bg-red-500 rounded-full transition-all duration-500"
                        style={{ width: `${total > 0 ? (scamCount / total) * 100 : 0}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-amber-400 font-semibold">Suspicious / Ambiguous ({suspiciousCount})</span>
                      <span className="text-slate-400">{total > 0 ? Math.round((suspiciousCount / total) * 100) : 0}%</span>
                    </div>
                    <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                      <div
                        className="h-full bg-amber-500 rounded-full transition-all duration-500"
                        style={{ width: `${total > 0 ? (suspiciousCount / total) * 100 : 0}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-emerald-400 font-semibold">No Obvious Scam ({safeCount})</span>
                      <span className="text-slate-400">{total > 0 ? Math.round((safeCount / total) * 100) : 0}%</span>
                    </div>
                    <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                      <div
                        className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                        style={{ width: `${total > 0 ? (safeCount / total) * 100 : 0}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Top Detected Indicators */}
              <div className="rounded-xl bg-slate-900/70 border border-slate-800 p-6">
                <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-4">
                  <BarChart3 className="w-4 h-4 text-cyan-400" />
                  <span>Most Frequent Threat Indicators</span>
                </h3>

                {sortedIndicators.length === 0 ? (
                  <p className="text-xs text-slate-500 py-6 text-center">
                    No threat indicators recorded in your current sessions.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {sortedIndicators.map(([indName, count], idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs p-2.5 rounded-lg bg-slate-950 border border-slate-800/80">
                        <span className="font-medium text-slate-200">{indName}</span>
                        <span className="font-mono text-cyan-300 font-bold bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800/60">
                          {count} {count === 1 ? 'instance' : 'instances'}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Recent Scans Table */}
            <div className="rounded-xl bg-slate-900/70 border border-slate-800 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <History className="w-4 h-4 text-cyan-400" />
                  <span>Recent Workstation Activity</span>
                </h3>
                <button
                  onClick={() => onNavigate('history')}
                  className="text-xs text-cyan-400 hover:text-cyan-300 underline font-medium cursor-pointer"
                >
                  View Full History &rarr;
                </button>
              </div>

              <div className="space-y-2.5">
                {history.slice(0, 5).map((item) => (
                  <div
                    key={item.referenceId}
                    onClick={() => onViewResult(item)}
                    className="p-3 rounded-lg bg-slate-950 hover:bg-slate-900 border border-slate-800/80 flex items-center justify-between gap-4 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-cyan-300">{item.referenceId}</span>
                      <span className="text-xs text-slate-300 line-clamp-1 max-w-md">{item.summary}</span>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                          item.riskScore >= 70
                            ? 'bg-red-950/80 text-red-300 border-red-800'
                            : item.riskScore >= 35
                            ? 'bg-amber-950/80 text-amber-300 border-amber-800'
                            : 'bg-emerald-950/80 text-emerald-300 border-emerald-800'
                        }`}
                      >
                        {item.riskScore}/100
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
