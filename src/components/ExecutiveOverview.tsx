/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp,
  Cpu,
  Lock,
  Database,
  FileCheck2,
  HardDrive
} from 'lucide-react';
import { ArchitecturePillar, AuditSummary } from '../utils/auditLogic';

interface ExecutiveOverviewProps {
  summary: AuditSummary;
  pillars: ArchitecturePillar[];
  onSelectPillar: (pillarId: string) => void;
  onNavigateTab: (tabId: string) => void;
}

export const ExecutiveOverview: React.FC<ExecutiveOverviewProps> = ({
  summary,
  pillars,
  onSelectPillar,
  onNavigateTab,
}) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Executive Brief */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-indigo-950/60 border border-slate-800 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
              L7/L8 Principal Solutions &amp; Cloud Architect Review
            </span>
            <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Target: github.com/amazen33/twinfra
            </span>
            <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
              Status: v0.1.0 Acceptance Candidate
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-4">
            Executive Architecture Critique &amp; System Assessment
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-4xl mb-6">
            <strong className="text-white">Twinfra</strong> is an extraordinarily ambitious and methodologically disciplined initiative to provide an AWS-compatible private cloud infrastructure on bare-metal Ubuntu and upstream Kubernetes. It is characterized by an <span className="text-emerald-400 font-semibold">unprecedented degree of architectural transparency</span>, adhering strictly to its self-imposed <span className="text-indigo-300 font-semibold">ADR-0052 &quot;Evidence First&quot;</span> governance rule that forbids unsubstantiated marketing claims.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-800/80">
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
                <CheckCircle2 className="w-4 h-4" /> The Masterstroke
              </div>
              <p className="text-xs text-slate-300 leading-normal">
                Zero-trust eBPF networking (Cilium default-deny in &amp; out), strict licence hygiene (zero SSPL/BSL, Valkey over Redis), and uncompromising separation of static design vs verified physical evidence.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
                <AlertTriangle className="w-4 h-4" /> The Critical Bottleneck
              </div>
              <p className="text-xs text-slate-300 leading-normal">
                Single-Node Failure Domain (<code className="text-amber-300">cairo-1 @ 192.168.1.3</code>). Local PV storage and un-clustered etcd mean any hardware fault or disk degradation results in complete platform outage.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
                <TrendingUp className="w-4 h-4" /> The Architectural Pivot
              </div>
              <p className="text-xs text-slate-300 leading-normal">
                Abandon generic mock daemons (MiniStack) for Tier 2/3 services. Focus ruthlessly on cloud-native protocol parity: S3 API, RDS/Postgres wire, and OIDC federation before expanding.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Architecture Vital Signs KPI Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Zero-Trust Posture</span>
            <Lock className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400">91/100</div>
          <div className="text-xs text-slate-400 mt-1">Cilium eBPF deny-all + PSS restricted</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Governance Rigour</span>
            <FileCheck2 className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-black text-indigo-400">97/100</div>
          <div className="text-xs text-slate-400 mt-1">54 ADRs • ADR-0052 Evidence-First</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Availability &amp; Quorum</span>
            <HardDrive className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-black text-rose-400">52/100</div>
          <div className="text-xs text-slate-400 mt-1">Single Dell host • Local PV only</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">AWS Parity Fidelity</span>
            <Cpu className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-400">58/100</div>
          <div className="text-xs text-slate-400 mt-1">SigV4 gateway active • MiniStack mock</div>
        </div>
      </div>

      {/* Pillars Scorecard Breakdown */}
      <div className="rounded-xl bg-slate-900/50 border border-slate-800 p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Architectural Domain Scorecard &amp; Readiness
            </h3>
            <p className="text-xs text-slate-400">
              Evaluated against ISO/IEC 25010 systems engineering standards and AWS Well-Architected Framework principles.
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('pillars')}
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
          >
            Explore Detailed Pillars <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pillars.map((pillar) => {
            const statusBg =
              pillar.status === 'superior'
                ? 'border-emerald-500/30 bg-emerald-950/20'
                : pillar.status === 'acceptable'
                ? 'border-blue-500/30 bg-blue-950/20'
                : pillar.status === 'warning'
                ? 'border-amber-500/30 bg-amber-950/20'
                : 'border-rose-500/30 bg-rose-950/20';

            const scoreColor =
              pillar.score >= 85
                ? 'text-emerald-400'
                : pillar.score >= 70
                ? 'text-blue-400'
                : pillar.score >= 60
                ? 'text-amber-400'
                : 'text-rose-400';

            return (
              <div
                key={pillar.id}
                onClick={() => {
                  onSelectPillar(pillar.id);
                  onNavigateTab('pillars');
                }}
                className={`p-4 rounded-xl border transition-all duration-150 cursor-pointer hover:scale-[1.01] hover:border-indigo-500/50 ${statusBg}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-300">{pillar.name}</span>
                  <span className={`text-base font-black ${scoreColor}`}>
                    {pillar.score}%
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-800 rounded-full h-1.5 mb-3 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      pillar.score >= 85
                        ? 'bg-emerald-400'
                        : pillar.score >= 70
                        ? 'bg-blue-400'
                        : pillar.score >= 60
                        ? 'bg-amber-400'
                        : 'bg-rose-500'
                    }`}
                    style={{ width: `${pillar.score}%` }}
                  />
                </div>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">
                  {pillar.summary}
                </p>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/60">
                  <span className="font-mono">{pillar.evidenceState.slice(0, 24)}...</span>
                  <span className="text-indigo-400 font-medium hover:underline flex items-center gap-0.5">
                    View <ArrowRight className="w-2.5 h-2.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* The Architectural Dilemma: Process vs Velocity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center gap-2 mb-3">
            <Database className="w-5 h-5 text-indigo-400" />
            <h4 className="text-base font-bold text-white">The Emulation Chasm (MiniStack vs Real)</h4>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed mb-4">
            Twinfra categorizes AWS services into Tier 1 (Real), Tier 2 (Scoped), and Tier 3 (Emulated). While APISIX correctly terminates AWS SigV4, backing EC2 and DynamoDB with MiniStack (in-memory mock) creates a false sense of compatibility:
          </p>
          <ul className="space-y-2 text-xs text-slate-400 list-disc list-inside">
            <li><strong className="text-slate-200">No Persistence in Mock Services:</strong> SQS queues and DynamoDB tables exist only in RAM; restarting MiniStack wipes tenant data.</li>
            <li><strong className="text-slate-200">CDK / Terraform Frustration:</strong> Real Terraform AWS providers make dozens of subtle metadata and tag requests that generic mock daemons fail to answer accurately.</li>
            <li><strong className="text-slate-200">Architectural Recommendation:</strong> Deprecate MiniStack for Tier 2/3 services. Focus purely on Cloud-Native standard interfaces: S3 wire protocol, PostgreSQL wire protocol, and Kubernetes CRDs.</li>
          </ul>
        </div>

        <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center gap-2 mb-3">
            <HardDrive className="w-5 h-5 text-amber-400" />
            <h4 className="text-base font-bold text-white">The Single-Node Physical Reality</h4>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed mb-4">
            The platform runs on a single Dell bare-metal server (<code className="text-amber-300">twinfra-dev-cairo-1</code>). While WO-36 proves network resilience through a 40-second router outage without dropping DHCP leases, the hardware blast radius is total:
          </p>
          <ul className="space-y-2 text-xs text-slate-400 list-disc list-inside">
            <li><strong className="text-slate-200">Zero etcd Fault Tolerance:</strong> In etcd raft consensus, a 1-node cluster can tolerate exactly 0 node failures. A single kernel panic stops the API server.</li>
            <li><strong className="text-slate-200">Local PV Traps:</strong> PostgreSQL and OpenBao store data on local NVMe/SATA partitions. Pods cannot be scheduled to another host without manual volume migration.</li>
            <li><strong className="text-slate-200">Immediate Action:</strong> Execute ADR-0050 to expand to 3 nodes before running application workloads.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
