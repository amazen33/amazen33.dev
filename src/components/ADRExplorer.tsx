/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  FileText, 
  Search, 
  Filter, 
  ShieldCheck, 
  ExternalLink, 
  AlertCircle,
  FileCheck2,
  CheckCircle2,
  Clock,
  Layers
} from 'lucide-react';
import { KEY_ADRS } from '../utils/auditData';
import { filterADRs } from '../utils/auditLogic';

export const ADRExplorer: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filtered = useMemo(() => {
    return filterADRs(KEY_ADRS, searchQuery, selectedDomain, selectedStatus);
  }, [searchQuery, selectedDomain, selectedStatus]);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* ADR-0052 Feature Card: The Evidence-First Philosophy */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-950/70 via-slate-900 to-slate-900 border border-indigo-500/30">
        <div className="flex items-center gap-2 mb-2 text-indigo-400 font-mono text-xs uppercase tracking-wider font-bold">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          The Gold Standard: ADR-0052 &quot;Evidence First&quot;
        </div>
        <h3 className="text-xl font-black text-white mb-2">
          Gating Claims on Empirical Bare-Metal Evidence
        </h3>
        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-4xl mb-4">
          Following an external architecture review on 2026-10-16, Twinfra’s owner established <strong className="text-white">ADR-0052</strong>. This decision halts all new product feature development until <span className="text-indigo-300 font-bold">Foundation 1.0</span> is validated by signed tester receipts on the Dell bare-metal host (<code className="text-amber-300">cairo-1</code>). Historical test receipts from the retired WSL environment were systematically invalidated.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Proposed</span>
            <span className="text-slate-300 font-medium">Design only; no approval</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Accepted (design)</span>
            <span className="text-slate-300 font-medium">Owner approved; no live tests</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
            <span className="text-emerald-400 block text-[10px] uppercase font-bold">Dev-verified</span>
            <span className="text-emerald-300 font-medium">Live on cairo-1 + tester sign-off</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
            <span className="text-rose-400 block text-[10px] uppercase font-bold">Production-accepted</span>
            <span className="text-rose-300 font-medium">Zero claimed today</span>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search ADRs by title, number, or evidence..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 outline-none"
            >
              <option value="all">All Domains</option>
              <option value="Host/Kernel">Host/Kernel</option>
              <option value="Kubernetes/CNI">Kubernetes/CNI</option>
              <option value="Data/Storage">Data/Storage</option>
              <option value="Security/Identity">Security/Identity</option>
              <option value="Gateway/API">Gateway/API</option>
              <option value="Observability">Observability</option>
              <option value="Governance">Governance</option>
              <option value="AI/HPC">AI/HPC</option>
            </select>
          </div>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="Dev-verified">Dev-verified</option>
            <option value="Accepted (design)">Accepted (design)</option>
            <option value="Proposed">Proposed</option>
            <option value="Deferred">Deferred</option>
          </select>
        </div>
      </div>

      {/* ADR Table */}
      <div className="rounded-2xl bg-slate-900/50 border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px] bg-slate-950/60">
                <th className="py-3 px-4">ADR ID</th>
                <th className="py-3 px-4">Title &amp; Scope</th>
                <th className="py-3 px-4">Domain</th>
                <th className="py-3 px-4">Status (ADR-0052)</th>
                <th className="py-3 px-4">Criticality</th>
                <th className="py-3 px-4">Evidence / Artifact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {filtered.map((adr) => {
                const statusBadge =
                  adr.status === 'Dev-verified'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                    : adr.status === 'Accepted (design)'
                    ? 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                    : adr.status === 'Proposed'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                    : 'bg-slate-800 text-slate-400 border-slate-700';

                return (
                  <tr key={adr.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-indigo-400">{adr.id}</td>
                    <td className="py-3 px-4 font-semibold text-white max-w-sm">{adr.title}</td>
                    <td className="py-3 px-4 text-slate-400">{adr.domain}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${statusBadge}`}>
                        {adr.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-400">{adr.criticality}</td>
                    <td className="py-3 px-4 text-slate-400 font-mono text-[11px] truncate max-w-xs">
                      {adr.evidenceRef}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="py-12 text-center text-slate-400 text-xs">
            No ADR records matched your search query.
          </div>
        )}
      </div>
    </div>
  );
};
