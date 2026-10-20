/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Server, 
  ShieldCheck, 
  Cpu, 
  Activity, 
  FileText, 
  ExternalLink,
  Layers,
  Sparkles
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  overallScore: number;
  grade: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  overallScore,
  grade,
}) => {
  const tabs = [
    { id: 'overview', label: 'Executive Scorecard' },
    { id: 'pillars', label: 'Architectural Pillars' },
    { id: 'topology', label: 'Topology & Blast Radius' },
    { id: 'parity', label: 'AWS Parity Simulator' },
    { id: 'adrs', label: 'ADR & Evidence Matrix' },
    { id: 'roadmap', label: 'Risk & Remediation' },
    { id: 'memo', label: 'Principal Architect Memo' },
  ];

  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar with repo details & status badges */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-3 gap-3 border-b border-slate-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 via-sky-600 to-blue-700 flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white font-black tracking-wider">
              TW
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-slate-100 tracking-tight">
                  Twinfra Architecture Review
                </h1>
                <span className="px-2 py-0.5 text-xs font-semibold rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  amazen33/twinfra
                </span>
                <a
                  href="https://github.com/amazen33/twinfra"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="View Twinfra on GitHub"
                  className="text-slate-400 hover:text-slate-200 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              <p className="text-xs text-slate-400">
                Target Node: <span className="text-slate-300 font-mono">twinfra-dev-cairo-1 (Dell bare-metal @ 192.168.1.3)</span> • Kernel 6.8+ • Cilium eBPF
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-slate-900 border border-slate-800">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-xs text-slate-300 font-medium">ADR-0052 Evidence-First</span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-slate-900 border border-slate-800">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              <span className="text-xs text-slate-300 font-medium">Single Node (cairo-1)</span>
            </div>

            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-indigo-950 to-slate-900 border border-indigo-500/30">
              <span className="text-xs text-slate-400">Readiness Score:</span>
              <span className="text-sm font-bold text-indigo-300">{overallScore}/100</span>
              <span className="px-1.5 py-0.5 text-xs font-black rounded bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                {grade}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 overflow-x-auto py-2 no-scrollbar" aria-label="Architecture Review Tabs">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md whitespace-nowrap transition-all duration-150 flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/30 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                {tab.id === 'overview' && <Activity className="w-3.5 h-3.5" />}
                {tab.id === 'pillars' && <Layers className="w-3.5 h-3.5" />}
                {tab.id === 'topology' && <Server className="w-3.5 h-3.5" />}
                {tab.id === 'parity' && <Cpu className="w-3.5 h-3.5" />}
                {tab.id === 'adrs' && <FileText className="w-3.5 h-3.5" />}
                {tab.id === 'memo' && <Sparkles className="w-3.5 h-3.5" />}
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
