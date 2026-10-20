/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ShieldAlert, 
  CheckCircle, 
  Lightbulb, 
  FileCode, 
  Server, 
  Cpu, 
  Lock, 
  Database, 
  FileCheck2, 
  Users
} from 'lucide-react';
import { ArchitecturePillar } from '../utils/auditLogic';

interface PillarsDeepDiveProps {
  pillars: ArchitecturePillar[];
  selectedPillarId: string;
  onSelectPillar: (id: string) => void;
}

export const PillarsDeepDive: React.FC<PillarsDeepDiveProps> = ({
  pillars,
  selectedPillarId,
  onSelectPillar,
}) => {
  const currentPillar =
    pillars.find((p) => p.id === selectedPillarId) || pillars[0];

  const [activeCodeSnippet, setActiveCodeSnippet] = useState<'ssot' | 'script' | 'security' | 'gateway'>('ssot');

  const getPillarIcon = (id: string) => {
    switch (id) {
      case 'substrate':
        return <Server className="w-4 h-4" />;
      case 'emulation':
        return <Cpu className="w-4 h-4" />;
      case 'security':
        return <Lock className="w-4 h-4" />;
      case 'data':
        return <Database className="w-4 h-4" />;
      case 'governance':
        return <FileCheck2 className="w-4 h-4" />;
      case 'tenancy':
        return <Users className="w-4 h-4" />;
      default:
        return <Server className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Pillar selector tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
        {pillars.map((pillar) => {
          const isSelected = pillar.id === currentPillar.id;
          return (
            <button
              key={pillar.id}
              onClick={() => onSelectPillar(pillar.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150 ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {getPillarIcon(pillar.id)}
              <span>{pillar.shortName}</span>
              <span
                className={`ml-1 text-[10px] px-1.5 py-0.2 rounded-full ${
                  pillar.score >= 80
                    ? 'bg-emerald-500/20 text-emerald-300'
                    : pillar.score >= 65
                    ? 'bg-amber-500/20 text-amber-300'
                    : 'bg-rose-500/20 text-rose-300'
                }`}
              >
                {pillar.score}%
              </span>
            </button>
          );
        })}
      </div>

      {/* Main selected pillar view */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Deep Dive Narrative */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div>
                <span className="text-xs font-mono uppercase text-indigo-400 tracking-wider">
                  Pillar Evaluation • Weight {currentPillar.weight}%
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                  {currentPillar.name}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 text-xs font-extrabold uppercase rounded-full border ${
                    currentPillar.status === 'superior'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : currentPillar.status === 'acceptable'
                      ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                      : currentPillar.status === 'warning'
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                      : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                  }`}
                >
                  {currentPillar.status}
                </span>
                <span className="text-2xl font-black text-white px-3 py-1 bg-slate-950 rounded-lg border border-slate-800">
                  {currentPillar.score}<span className="text-xs text-slate-400">/100</span>
                </span>
              </div>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed mb-6 bg-slate-950/40 p-3.5 rounded-xl border border-slate-800/80">
              {currentPillar.summary}
            </p>

            {/* Strengths & Weaknesses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2.5">
                  <CheckCircle className="w-4 h-4" /> Architectural Strengths
                </div>
                <ul className="space-y-2">
                  {currentPillar.strengths.map((str, idx) => (
                    <li key={idx} className="text-xs text-slate-300 flex items-start gap-1.5 leading-normal">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/20">
                <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-2.5">
                  <ShieldAlert className="w-4 h-4" /> Architectural Deficits &amp; Risks
                </div>
                <ul className="space-y-2">
                  {currentPillar.weaknesses.map((weak, idx) => (
                    <li key={idx} className="text-xs text-slate-300 flex items-start gap-1.5 leading-normal">
                      <span className="text-rose-400 font-bold">•</span>
                      <span>{weak}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Prescriptive Recommendations */}
            <div className="p-4.5 rounded-xl bg-indigo-950/20 border border-indigo-500/30">
              <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-3">
                <Lightbulb className="w-4 h-4 text-indigo-400" /> Principal Architect Prescriptions
              </div>
              <div className="space-y-2.5">
                {currentPillar.recommendations.map((rec, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                    <span className="px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono font-bold text-[10px]">
                      REC-{idx + 1}
                    </span>
                    <span className="leading-relaxed">{rec}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Evidence State:</span>
              <span className="font-mono text-slate-300 text-[11px]">{currentPillar.evidenceState}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Grounded Repository Evidence & Code Analysis */}
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
                <FileCode className="w-4 h-4 text-indigo-400" />
                Repository Artifact Evidence
              </h4>
            </div>

            <div className="flex gap-1 mb-3">
              <button
                onClick={() => setActiveCodeSnippet('ssot')}
                className={`px-2.5 py-1 text-[11px] font-medium rounded transition-colors ${
                  activeCodeSnippet === 'ssot'
                    ? 'bg-indigo-600 text-white font-semibold'
                    : 'text-slate-400 hover:bg-slate-800'
                }`}
              >
                vcloud-ssot.yaml
              </button>
              <button
                onClick={() => setActiveCodeSnippet('security')}
                className={`px-2.5 py-1 text-[11px] font-medium rounded transition-colors ${
                  activeCodeSnippet === 'security'
                    ? 'bg-indigo-600 text-white font-semibold'
                    : 'text-slate-400 hover:bg-slate-800'
                }`}
              >
                node-exceptions
              </button>
              <button
                onClick={() => setActiveCodeSnippet('gateway')}
                className={`px-2.5 py-1 text-[11px] font-medium rounded transition-colors ${
                  activeCodeSnippet === 'gateway'
                    ? 'bg-indigo-600 text-white font-semibold'
                    : 'text-slate-400 hover:bg-slate-800'
                }`}
              >
                SigV4 Gateway
              </button>
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 font-mono text-[11px] text-slate-300 overflow-x-auto leading-relaxed max-h-96">
              {activeCodeSnippet === 'ssot' && (
                <pre>{`version: '2.2'
host:
  os: ubuntu
  release: '24.04'
  minimumKernel: '6.8'
  cgroupVersion: 2
cluster:
  name: vCloud-prod-01
  dnsName: vcloud-prod-01
  minimumKubernetesVersion: '1.30'
  gitOpsRepository: amazen33/twinfra
network:
  cni: cilium
  routingMode: native
  defaultIngress: deny
  defaultEgress: deny
security:
  deprecatedAPIs: forbidden
  floatingImageTags: forbidden
  manifestValidation: kubeconform-strict
  hostPathVolumes: forbidden
  persistentStorage: CSI-or-vetted-Local-PV
  nodeHostMountException:
    status: approved
    approvedBy: user
    decision: Approve documented node exception
    policySHA256: d9799b19ff5fb...
environments:
  dev:
    region: cairo-1
    ipAddress: 192.168.1.3
    delivery: bare-metal
    interface: eno1`}</pre>
              )}

              {activeCodeSnippet === 'security' && (
                <pre>{`// security/node-exceptions.json
{
  "approvedComponents": [
    {
      "component": "kubeadm",
      "allowedMounts": ["/etc/kubernetes", "/var/lib/etcd"],
      "capabilities": ["CAP_SYS_ADMIN", "CAP_NET_ADMIN"]
    },
    {
      "component": "cilium",
      "allowedMounts": ["/sys/fs/bpf", "/run/cilium/cgroupv2"],
      "capabilities": ["CAP_BPF", "CAP_PERFMON"]
    }
  ],
  "policyEnforcement": "EXIT_42_ON_DRIFT",
  "hashVerification": "SHA-256 mandatory pre-apply"
}`}</pre>
              )}

              {activeCodeSnippet === 'gateway' && (
                <pre>{`# console/aws_views.py
def signed_request(backend, service, method='GET', path='/'):
  # APISIX terminates AWS SigV4
  # Maps to MiniStack local mock on :4566
  now = datetime.now(timezone.utc)
  date, stamp = now.strftime('%Y%m%d'), now.strftime('%Y%m%dT%H%M%SZ')
  scope = f'{date}/us-east-1/{service}/aws4_request'
  # Canonical request hashing & HMAC-SHA256 signing
  canonical = '\\n'.join([method, path, qs, headers, digest])
  signature = hmac.new(key, message.encode(), sha256).hexdigest()
  return urllib.request.Request(endpoint, headers=headers)`}</pre>
              )}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Architectural Verdict on {currentPillar.shortName}
            </h5>
            <p className="text-xs text-slate-400 leading-relaxed">
              {currentPillar.id === 'substrate' &&
                'Kernel tuning and transaction safety are exemplary. However, production readiness is blocked until two more nodes join the etcd quorum.'}
              {currentPillar.id === 'emulation' &&
                'MiniStack creates an illusion of AWS compatibility. High-velocity enterprise teams will encounter friction with CDK/Terraform.'}
              {currentPillar.id === 'security' &&
                'Security controls are elite. Default-deny eBPF and PSS restricted profiles place Twinfra ahead of most commercial Kubernetes distros.'}
              {currentPillar.id === 'data' &&
                'CNPG is the right choice, but without off-site WAL streaming, it lacks true disaster resilience.'}
              {currentPillar.id === 'governance' &&
                'World-class evidence discipline. Sets the standard for how private cloud reference platforms should be documented.'}
              {currentPillar.id === 'tenancy' &&
                'Soft namespace isolation is insufficient for true multi-tenant cloud economics. Needs hardware-assisted microVMs.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
