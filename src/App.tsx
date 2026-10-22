import React, { useState, useEffect } from 'react';
import { PageNav, ScamAnalysisResult } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AnalyzerPage } from './pages/AnalyzerPage';
import { ResultsPage } from './pages/ResultsPage';
import { ExamplesPage } from './pages/ExamplesPage';
import { HistoryPage } from './pages/HistoryPage';
import { DashboardPage } from './pages/DashboardPage';
import { MethodologyPage } from './pages/MethodologyPage';
import { AboutPage } from './pages/AboutPage';
import { SafetyGuidePage } from './pages/SafetyGuidePage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageNav>('home');
  const [activeResult, setActiveResult] = useState<ScamAnalysisResult | null>(null);
  const [analyzerText, setAnalyzerText] = useState<string>('');
  const [analyzerChannel, setAnalyzerChannel] = useState<string>('SMS');
  const [healthStatus, setHealthStatus] = useState<{ isAiConfigured: boolean; model: string } | null>(null);

  useEffect(() => {
    // Check backend health
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => {
        setHealthStatus({
          isAiConfigured: !!data.isAiConfigured,
          model: data.model || 'gemini-3.8-flash',
        });
      })
      .catch((err) => {
        console.warn('Backend health check error:', err);
      });
  }, []);

  const handleNavigate = (page: PageNav) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectExampleForAnalyzer = (text: string, channel: string) => {
    setAnalyzerText(text);
    setAnalyzerChannel(channel);
    setCurrentPage('analyzer');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAnalysisComplete = (result: ScamAnalysisResult) => {
    setActiveResult(result);
    setCurrentPage('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewResultFromHistory = (result: ScamAnalysisResult) => {
    setActiveResult(result);
    setCurrentPage('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAnalyzeAnother = () => {
    setCurrentPage('analyzer');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500/20 selection:text-cyan-300">
      {/* Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        hasActiveResult={!!activeResult}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onSelectExampleForAnalyzer={handleSelectExampleForAnalyzer}
          />
        )}

        {currentPage === 'analyzer' && (
          <AnalyzerPage
            initialText={analyzerText}
            initialChannel={analyzerChannel}
            onAnalysisComplete={handleAnalysisComplete}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'results' && (
          <ResultsPage
            result={activeResult}
            onNavigate={handleNavigate}
            onAnalyzeAnother={handleAnalyzeAnother}
          />
        )}

        {currentPage === 'examples' && (
          <ExamplesPage
            onSelectExample={handleSelectExampleForAnalyzer}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'history' && (
          <HistoryPage
            onViewResult={handleViewResultFromHistory}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'dashboard' && (
          <DashboardPage
            onViewResult={handleViewResultFromHistory}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'methodology' && (
          <MethodologyPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'about' && (
          <AboutPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'safety' && (
          <SafetyGuidePage onNavigate={handleNavigate} />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
