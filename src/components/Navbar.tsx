import React, { useState } from 'react';
import { Shield, ShieldAlert, Cpu, History, LayoutDashboard, FileText, Info, HelpCircle, Menu, X, ArrowRight } from 'lucide-react';
import { PageNav } from '../types';

interface NavbarProps {
  currentPage: PageNav;
  onNavigate: (page: PageNav) => void;
  hasActiveResult?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, hasActiveResult }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: PageNav; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Shield className="w-4 h-4" /> },
    { id: 'analyzer', label: 'Message Analyzer', icon: <ShieldAlert className="w-4 h-4" /> },
    ...(hasActiveResult ? [{ id: 'results' as PageNav, label: 'Results', icon: <FileText className="w-4 h-4 text-cyan-400" /> }] : []),
    { id: 'examples', label: 'Examples', icon: <FileText className="w-4 h-4" /> },
    { id: 'history', label: 'History', icon: <History className="w-4 h-4" /> },
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'methodology', label: 'AI Methodology', icon: <Cpu className="w-4 h-4" /> },
    { id: 'about', label: 'About', icon: <Info className="w-4 h-4" /> },
    { id: 'safety', label: 'Safety Guide', icon: <HelpCircle className="w-4 h-4" /> },
  ];

  const handleNavClick = (page: PageNav) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <Shield className="w-5 h-5 text-slate-950 stroke-[2.5]" />
              <div className="absolute inset-0 rounded-xl ring-1 ring-white/20" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-extrabold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                  SCAMSHIELD<span className="text-cyan-400">.AI</span>
                </span>
                <span className="text-[10px] uppercase tracking-wider font-semibold bg-cyan-950 text-cyan-300 border border-cyan-800/60 px-1.5 py-0.5 rounded">
                  v2.4
                </span>
              </div>
              <p className="text-[11px] text-slate-400 -mt-0.5 hidden sm:block">AI Scam Message Detector</p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-slate-800/90 text-cyan-300 shadow-sm border border-slate-700/80'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900/80'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Button */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => handleNavClick('analyzer')}
              className="relative group overflow-hidden px-4 py-2 text-xs font-bold rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 hover:from-cyan-400 hover:to-blue-500 shadow-md shadow-cyan-500/10 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Analyze Message</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 text-slate-300 hover:text-white border border-slate-800"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-4 pt-2 pb-5 space-y-1 animate-in slide-in-from-top-2">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-cyan-950/60 text-cyan-300 border border-cyan-800/40'
                    : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            );
          })}
          <div className="pt-2 border-t border-slate-800">
            <button
              onClick={() => handleNavClick('analyzer')}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Launch Message Analyzer</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
