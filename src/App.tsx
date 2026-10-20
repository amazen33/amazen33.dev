/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { ExecutiveOverview } from './components/ExecutiveOverview';
import { PillarsDeepDive } from './components/PillarsDeepDive';
import { TopologyVisualizer } from './components/TopologyVisualizer';
import { AWSParityTester } from './components/AWSParityTester';
import { ADRExplorer } from './components/ADRExplorer';
import { RiskRoadmap } from './components/RiskRoadmap';
import { ArchitectMemo } from './components/ArchitectMemo';
import { ARCHITECTURE_PILLARS, KEY_ADRS } from './utils/auditData';
import { compileAuditSummary } from './utils/auditLogic';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [selectedPillarId, setSelectedPillarId] = useState<string>('substrate');

  const summary = useMemo(() => {
    return compileAuditSummary(ARCHITECTURE_PILLARS, KEY_ADRS);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        overallScore={summary.overallScore}
        grade={summary.grade}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <ExecutiveOverview
            summary={summary}
            pillars={ARCHITECTURE_PILLARS}
            onSelectPillar={(id) => {
              setSelectedPillarId(id);
              setActiveTab('pillars');
            }}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'pillars' && (
          <PillarsDeepDive
            pillars={ARCHITECTURE_PILLARS}
            selectedPillarId={selectedPillarId}
            onSelectPillar={setSelectedPillarId}
          />
        )}

        {activeTab === 'topology' && <TopologyVisualizer />}

        {activeTab === 'parity' && <AWSParityTester />}

        {activeTab === 'adrs' && <ADRExplorer />}

        {activeTab === 'roadmap' && <RiskRoadmap />}

        {activeTab === 'memo' && <ArchitectMemo />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">Twinfra Architectural Audit Suite</span>
            <span>•</span>
            <span>Principal Solutions and Cloud Architecture</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/amazen33/twinfra"
              target="_blank"
              rel="noreferrer"
              className="text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              GitHub: amazen33/twinfra
            </a>
            <span>•</span>
            <span>MIT License</span>
            <span>•</span>
            <span className="font-mono text-slate-400">Node: cairo-1 (Dell bare-metal)</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
