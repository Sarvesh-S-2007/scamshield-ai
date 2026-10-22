import React, { useState, useEffect } from 'react';
import { 
  History, 
  Trash2, 
  Download, 
  Search, 
  FileText, 
  ArrowRight, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldAlert, 
  Eye, 
  Shield, 
  Info,
  Lock
} from 'lucide-react';
import { ScamAnalysisResult, PageNav } from '../types';
import { 
  getHistory, 
  deleteHistoryItem, 
  clearAllHistory, 
  exportHistoryAsJson,
  getSettings,
  saveSettings
} from '../utils/storage';
import { generateScamReportPdf } from '../utils/pdfGenerator';

interface HistoryPageProps {
  onViewResult: (result: ScamAnalysisResult) => void;
  onNavigate: (page: PageNav) => void;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({
  onViewResult,
  onNavigate,
}) => {
  const [history, setHistory] = useState<ScamAnalysisResult[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterClass, setFilterClass] = useState<string>('All');
  const [saveHistorySetting, setSaveHistorySetting] = useState<boolean>(true);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  useEffect(() => {
    setHistory(getHistory());
    setSaveHistorySetting(getSettings().saveHistory);
  }, []);

  const handleDelete = (refId: string) => {
    const updated = deleteHistoryItem(refId);
    setHistory(updated);
  };

  const handleClearAll = () => {
    clearAllHistory();
    setHistory([]);
    setShowClearConfirm(false);
  };

  const handleToggleSaveHistory = () => {
    const newSetting = !saveHistorySetting;
    setSaveHistorySetting(newSetting);
    saveSettings({ ...getSettings(), saveHistory: newSetting });
  };

  const filteredHistory = history.filter((item) => {
    const matchesFilter = filterClass === 'All' || item.classification === filterClass;
    const matchesSearch =
      !searchQuery ||
      item.referenceId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.analyzedText && item.analyzedText.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen text-slate-100 py-10 cyber-grid">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-400 text-xs font-semibold mb-2">
              <History className="w-3.5 h-3.5" />
              <span>Session Log</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Analysis History</h1>
            <p className="text-sm text-slate-400 mt-1">
              Review and export previous message threat evaluations performed on this workstation.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {history.length > 0 && (
              <>
                <button
                  onClick={exportHistoryAsJson}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Export JSON</span>
                </button>
                <button
                  onClick={() => setShowClearConfirm(true)}
                  className="px-3.5 py-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-300 text-xs font-medium border border-red-800/60 flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear All</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Clear Confirmation Modal / Banner */}
        {showClearConfirm && (
          <div className="mb-6 p-4 rounded-xl bg-red-950/80 border border-red-800 text-red-200 text-xs flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
              <span>Are you sure you want to permanently erase all locally stored analysis logs?</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleClearAll}
                className="px-3 py-1 rounded-md bg-red-600 hover:bg-red-500 text-white font-bold cursor-pointer"
              >
                Yes, Delete All
              </button>
              <button
                onClick={() => setShowClearConfirm(false)}
                className="px-3 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Privacy & Retention Disclosure */}
        <div className="mb-8 p-4 rounded-xl bg-slate-900/70 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <Lock className="w-4 h-4 text-cyan-400 shrink-0" />
            <div>
              <span className="font-semibold text-slate-200 block">Browser-Isolated Storage Disclosure:</span>
              <span>All records above are stored solely in this browser’s private localStorage. No persistent central database logs your past analyses.</span>
            </div>
          </div>
          <label className="flex items-center gap-2 cursor-pointer shrink-0 select-none">
            <input
              type="checkbox"
              checked={saveHistorySetting}
              onChange={handleToggleSaveHistory}
              className="rounded bg-slate-950 border-slate-700 text-cyan-500 focus:ring-0"
            />
            <span className="text-slate-300 text-xs">Record future scans</span>
          </label>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {['All', 'Potential Scam Indicators Detected', 'Suspicious — Verify Independently', 'No Obvious Scam Indicators Detected'].map((opt) => (
              <button
                key={opt}
                onClick={() => setFilterClass(opt)}
                className={`px-3 py-1.5 text-xs rounded-lg transition-colors cursor-pointer ${
                  filterClass === opt
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800'
                }`}
              >
                {opt === 'All' ? 'All Results' : opt.split(' ')[0]}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by ID or text..."
              className="w-full bg-slate-900/90 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 border border-slate-800 focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        {/* History List */}
        {filteredHistory.length === 0 ? (
          <div className="rounded-2xl bg-slate-900/40 border border-slate-800/80 p-12 text-center">
            <History className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-200">No Records Found</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto mb-5">
              {history.length === 0
                ? "You haven't run any message evaluations yet. Run your first analysis to track risk history."
                : "No analyses match the active search or classification filter."}
            </p>
            <button
              onClick={() => onNavigate('analyzer')}
              className="px-5 py-2.5 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-colors cursor-pointer"
            >
              Analyze a Message Now
            </button>
          </div>
        ) : (
          <div className="space-y-3.5">
            {filteredHistory.map((item) => {
              const isScam = item.classification === 'Potential Scam Indicators Detected';
              const isSuspicious = item.classification === 'Suspicious — Verify Independently';

              return (
                <div
                  key={item.referenceId}
                  className="rounded-xl bg-slate-900/70 border border-slate-800/90 p-5 hover:border-slate-700 transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 max-w-2xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold text-cyan-300 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                        {item.referenceId}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {new Date(item.analyzedAt).toLocaleString()}
                      </span>
                      <span
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${
                          isScam
                            ? 'bg-red-950/80 text-red-300 border-red-800'
                            : isSuspicious
                            ? 'bg-amber-950/80 text-amber-300 border-amber-800'
                            : 'bg-emerald-950/80 text-emerald-300 border-emerald-800'
                        }`}
                      >
                        {item.classification}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {item.summary}
                    </p>

                    {item.indicators.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        <span className="text-[10px] text-slate-400">Indicators:</span>
                        {item.indicators.slice(0, 3).map((ind, i) => (
                          <span
                            key={i}
                            className="text-[10px] px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-400"
                          >
                            {ind.type}
                          </span>
                        ))}
                        {item.indicators.length > 3 && (
                          <span className="text-[10px] text-slate-400">+{item.indicators.length - 3} more</span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Actions Column */}
                  <div className="flex items-center gap-2 shrink-0 w-full md:w-auto justify-end border-t md:border-t-0 pt-3 md:pt-0 border-slate-800/80">
                    <div className="text-right mr-3 hidden sm:block">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Score</span>
                      <span
                        className={`text-lg font-black ${
                          item.riskScore >= 70
                            ? 'text-red-400'
                            : item.riskScore >= 35
                            ? 'text-amber-400'
                            : 'text-emerald-400'
                        }`}
                      >
                        {item.riskScore}/100
                      </span>
                    </div>

                    <button
                      onClick={() => onViewResult(item)}
                      className="px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 text-xs font-bold border border-cyan-800/40 transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Details</span>
                    </button>

                    <button
                      onClick={() => generateScamReportPdf(item)}
                      title="Download PDF"
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleDelete(item.referenceId)}
                      title="Delete Entry"
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-900/60 text-slate-400 hover:text-red-300 border border-slate-700 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
