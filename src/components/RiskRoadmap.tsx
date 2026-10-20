/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  AlertOctagon, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  ShieldAlert, 
  Sliders,
  Calendar,
  Layers,
  Flag
} from 'lucide-react';
import { STRATEGIC_RECOMMENDATIONS } from '../utils/auditData';

export const RiskRoadmap: React.FC = () => {
  const risks = [
    {
      id: 'RISK-01',
      title: 'Single-Node Hardware SPoF (cairo-1)',
      severity: 'Critical',
      impact: 'High',
      likelihood: 'High',
      mitigation: 'Implement ADR-0050 to provision 2 additional nodes for a 3-node etcd consensus cluster.',
    },
    {
      id: 'RISK-02',
      title: 'The Emulation Chasm (MiniStack Mock)',
      severity: 'Critical',
      impact: 'High',
      likelihood: 'High',
      mitigation: 'Replace in-memory MiniStack with Crossplane or real Kubernetes native CRDs for SQS/DynamoDB.',
    },
    {
      id: 'RISK-03',
      title: 'Unattended Reboot Secret Lockout',
      severity: 'High',
      impact: 'High',
      likelihood: 'Medium',
      mitigation: 'Implement TPM 2.0 or Cloud KMS auto-unseal provider for OpenBao.',
    },
    {
      id: 'RISK-04',
      title: 'Local PV Storage Data Loss',
      severity: 'High',
      impact: 'High',
      likelihood: 'Medium',
      mitigation: 'Execute WO-09 PITR restore drill; stream WAL logs to off-site S3-compatible cold storage.',
    },
    {
      id: 'RISK-05',
      title: 'Intel AMT on Flat Workload LAN',
      severity: 'Medium',
      impact: 'Medium',
      likelihood: 'Medium',
      mitigation: 'Isolate AMT interface (192.168.1.4) onto a segregated management VLAN with 802.1Q tagging.',
    },
    {
      id: 'RISK-06',
      title: 'Cognitive Governance Overhead',
      severity: 'Medium',
      impact: 'Medium',
      likelihood: 'High',
      mitigation: 'Automate verification receipts generation through synthetic CI/CD test runners.',
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Risk Assessment Matrix */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
        <div className="flex items-center gap-2 mb-2 text-rose-400 font-mono text-xs uppercase tracking-wider font-bold">
          <AlertOctagon className="w-4 h-4" />
          Enterprise Risk &amp; Vulnerability Matrix
        </div>
        <h3 className="text-xl font-black text-white mb-2">
          Prioritized Platform Deficits &amp; Blast Radii
        </h3>
        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-3xl mb-6">
          Architectural risks evaluated across <strong className="text-white">Business Impact</strong> and <strong className="text-white">Failure Probability</strong>. While software governance is mature, the underlying physical infrastructure and mock emulation layers carry systemic vulnerabilities.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {risks.map((risk) => (
            <div
              key={risk.id}
              className={`p-4 rounded-xl border flex flex-col justify-between ${
                risk.severity === 'Critical'
                  ? 'bg-rose-950/20 border-rose-500/30'
                  : 'bg-amber-950/20 border-amber-500/30'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[11px] font-bold text-slate-400">{risk.id}</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                      risk.severity === 'Critical'
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}
                  >
                    {risk.severity}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white mb-2">{risk.title}</h4>
                <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono mb-3">
                  <span>Impact: <strong className="text-slate-200">{risk.impact}</strong></span>
                  <span>•</span>
                  <span>Likelihood: <strong className="text-slate-200">{risk.likelihood}</strong></span>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 text-[11px] text-slate-300 leading-relaxed">
                <span className="text-indigo-400 font-semibold block text-[10px] uppercase">Remediation:</span>
                {risk.mitigation}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strategic Roadmap: Path to Enterprise Production */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
        <div className="flex items-center gap-2 mb-2 text-indigo-400 font-mono text-xs uppercase tracking-wider font-bold">
          <Calendar className="w-4 h-4" />
          The Architectural Roadmap
        </div>
        <h3 className="text-xl font-black text-white mb-6">
          Phased Remediation &amp; Production Foundation Path
        </h3>

        <div className="space-y-4">
          {STRATEGIC_RECOMMENDATIONS.map((rec, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-slate-950 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 max-w-3xl">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      rec.priority.includes('P0')
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : rec.priority.includes('P1')
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                    }`}
                  >
                    {rec.priority}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{rec.timeline}</span>
                  <span className="text-xs text-slate-400 font-mono">• Owner: {rec.owner}</span>
                </div>
                <h4 className="text-base font-bold text-white">{rec.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{rec.description}</p>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-[11px] font-mono text-slate-400 px-2 py-1 rounded bg-slate-900 border border-slate-800">
                  Effort: {rec.effort}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
