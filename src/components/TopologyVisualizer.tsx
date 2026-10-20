/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Server, 
  Shield, 
  HardDrive, 
  Cpu, 
  Zap, 
  AlertOctagon, 
  RefreshCw, 
  ArrowRight,
  Radio,
  CheckCircle2,
  Lock,
  Layers
} from 'lucide-react';
import { SYSTEM_TOPOLOGY_NODES } from '../utils/auditData';

export const TopologyVisualizer: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('node-host');
  const [simulatedFailure, setSimulatedFailure] = useState<
    'none' | 'router-loss' | 'host-down' | 'openbao-sealed' | 'ministack-crash'
  >('none');

  const selectedNode =
    SYSTEM_TOPOLOGY_NODES.find((n) => n.id === selectedNodeId) ||
    SYSTEM_TOPOLOGY_NODES[0];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top banner: Physical Environment Specs */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <h3 className="text-base font-bold text-white tracking-tight">
              Physical Topology: twinfra-dev-cairo-1 Environment
            </h3>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl">
            Bare-metal Dell host with dual GbE NICs, static IP Netplan binding, upstream kubeadm Kubernetes 1.30, and Cilium native eBPF routing (PodCIDR: 10.110.0.0/16, ServiceCIDR: 10.111.0.0/16).
          </p>
        </div>

        {/* Interactive Failure Simulator Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold text-slate-400">Chaos Injection:</span>
          <select
            value={simulatedFailure}
            onChange={(e) => setSimulatedFailure(e.target.value as any)}
            className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200 font-medium focus:ring-1 focus:ring-indigo-500 outline-none"
          >
            <option value="none">Normal State (Baseline)</option>
            <option value="router-loss">Simulate 40s Router Loss (WO-36)</option>
            <option value="host-down">Simulate Host Hardware Failure (SPoF)</option>
            <option value="openbao-sealed">Simulate Unattended Reboot (Vault Seal)</option>
            <option value="ministack-crash">Simulate MiniStack Pod Crash</option>
          </select>
        </div>
      </div>

      {/* Failure Mode Banner if active */}
      {simulatedFailure !== 'none' && (
        <div
          className={`p-4 rounded-xl border flex items-start gap-3 animate-fadeIn ${
            simulatedFailure === 'router-loss'
              ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
              : 'bg-rose-950/40 border-rose-500/50 text-rose-300'
          }`}
        >
          <AlertOctagon className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed">
            {simulatedFailure === 'router-loss' && (
              <div>
                <strong className="font-bold text-emerald-200">WO-36 Static Address Resilience Verified:</strong> Host retains static IP <code className="bg-slate-900 px-1 py-0.5 rounded">192.168.1.3</code> through a 40-second router outage. Zero DHCP lease drop, zero pod restarts. Netplan rollback safety gap verified at 0.245 seconds (WO-36a).
              </div>
            )}
            {simulatedFailure === 'host-down' && (
              <div>
                <strong className="font-bold text-rose-200">TOTAL PLATFORM BLACKOUT (Critical SPoF):</strong> Single Dell host failure halts control plane, etcd, PostgreSQL, APISIX gateway, and all tenant apps. No peer node exists to take over raft quorum. Storage on Local PV is isolated until manual hardware resuscitation.
              </div>
            )}
            {simulatedFailure === 'openbao-sealed' && (
              <div>
                <strong className="font-bold text-rose-200">SECRETS LOCKED:</strong> Upon unexpected reboot, OpenBao starts in <span className="underline">SEALED</span> state. Database credentials and TLS certificates cannot be decrypted until operators perform manual multi-key PGP unseal ceremony.
              </div>
            )}
            {simulatedFailure === 'ministack-crash' && (
              <div>
                <strong className="font-bold text-rose-200">DATA LOSS IN TIER 2/3 EMULATION:</strong> MiniStack container restart clears all in-memory SQS queues, SNS subscriptions, and DynamoDB items. Workloads relying on mock state crash or enter undefined state.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Interactive Topology Graph */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-950 border border-slate-800 relative">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-indigo-400" /> Layered Architecture &amp; Failure Blast Radius
            </h4>
            <span className="text-[11px] text-slate-400">Click any component to inspect</span>
          </div>

          <div className="space-y-4">
            {/* Zone 1: Edge & Client Layer */}
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <Radio className="w-3 h-3 text-sky-400" /> Zone 1: Edge &amp; Client Access
              </div>
              <div className="grid grid-cols-2 gap-2">
                {SYSTEM_TOPOLOGY_NODES.filter((n) => n.category === 'Edge' || n.category === 'Hardware').map((node) => {
                  const isSelected = node.id === selectedNodeId;
                  return (
                    <button
                      key={node.id}
                      onClick={() => setSelectedNodeId(node.id)}
                      className={`p-3 rounded-lg text-left transition-all border ${
                        isSelected
                          ? 'border-indigo-500 bg-indigo-950/40 shadow-sm shadow-indigo-500/20'
                          : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-xs font-bold text-slate-200">{node.label}</div>
                      <div className="text-[11px] text-slate-400">{node.sublabel}</div>
                      <div className="text-[10px] font-mono text-indigo-400 mt-1">{node.ip}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Zone 2: Substrate & Network Fabric */}
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <Server className="w-3 h-3 text-emerald-400" /> Zone 2: Bare-Metal Substrate &amp; eBPF Fabric
              </div>
              <div className="grid grid-cols-2 gap-2">
                {SYSTEM_TOPOLOGY_NODES.filter((n) => n.category === 'Substrate' || n.category === 'Network').map((node) => {
                  const isSelected = node.id === selectedNodeId;
                  const isHostDown = simulatedFailure === 'host-down';
                  return (
                    <button
                      key={node.id}
                      onClick={() => setSelectedNodeId(node.id)}
                      className={`p-3 rounded-lg text-left transition-all border ${
                        isHostDown
                          ? 'border-rose-500/50 bg-rose-950/30 opacity-50'
                          : isSelected
                          ? 'border-indigo-500 bg-indigo-950/40 shadow-sm shadow-indigo-500/20'
                          : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-xs font-bold text-slate-200">{node.label}</div>
                      <div className="text-[11px] text-slate-400">{node.sublabel}</div>
                      <div className="text-[10px] font-mono text-emerald-400 mt-1">{node.protocol}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Zone 3: Control Plane & Gateway Services */}
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <Shield className="w-3 h-3 text-indigo-400" /> Zone 3: Gateway, Identity &amp; Secrets
              </div>
              <div className="grid grid-cols-3 gap-2">
                {SYSTEM_TOPOLOGY_NODES.filter((n) => ['Gateway', 'Identity', 'Security'].includes(n.category)).map((node) => {
                  const isSelected = node.id === selectedNodeId;
                  const isSealed = simulatedFailure === 'openbao-sealed' && node.id === 'node-openbao';
                  return (
                    <button
                      key={node.id}
                      onClick={() => setSelectedNodeId(node.id)}
                      className={`p-2.5 rounded-lg text-left transition-all border ${
                        isSealed
                          ? 'border-rose-500 bg-rose-950/60 animate-pulse'
                          : isSelected
                          ? 'border-indigo-500 bg-indigo-950/40 shadow-sm shadow-indigo-500/20'
                          : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-xs font-bold text-slate-200 truncate">{node.label}</div>
                      <div className="text-[10px] text-slate-400 truncate">{node.sublabel}</div>
                      <div className="text-[9px] font-mono text-indigo-300 mt-0.5">{node.protocol}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Zone 4: Data & Compute Engine */}
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <HardDrive className="w-3 h-3 text-amber-400" /> Zone 4: Data Layer, Emulation &amp; Workloads
              </div>
              <div className="grid grid-cols-4 gap-2">
                {SYSTEM_TOPOLOGY_NODES.filter((n) => ['Database', 'Cache', 'Emulation', 'Compute'].includes(n.category)).map((node) => {
                  const isSelected = node.id === selectedNodeId;
                  const isMiniCrash = simulatedFailure === 'ministack-crash' && node.id === 'node-ministack';
                  return (
                    <button
                      key={node.id}
                      onClick={() => setSelectedNodeId(node.id)}
                      className={`p-2.5 rounded-lg text-left transition-all border ${
                        isMiniCrash
                          ? 'border-rose-500 bg-rose-950/60 animate-pulse'
                          : isSelected
                          ? 'border-indigo-500 bg-indigo-950/40 shadow-sm shadow-indigo-500/20'
                          : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-xs font-bold text-slate-200 truncate">{node.label}</div>
                      <div className="text-[10px] text-slate-400 truncate">{node.sublabel}</div>
                      <div className="text-[9px] font-mono text-amber-300 mt-0.5">{node.category}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Selected Component Inspection Panel */}
        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono uppercase text-indigo-400 tracking-wider">
                Node Telemetry &amp; Boundary
              </span>
              <span
                className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                  selectedNode.status === 'warning'
                    ? 'bg-amber-500/20 text-amber-300'
                    : 'bg-emerald-500/20 text-emerald-300'
                }`}
              >
                {selectedNode.status.toUpperCase()}
              </span>
            </div>

            <h4 className="text-lg font-bold text-white mb-1">{selectedNode.label}</h4>
            <p className="text-xs text-slate-400 mb-4">{selectedNode.sublabel}</p>

            <div className="space-y-3 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Category</span>
                <span className="text-slate-200 font-medium">{selectedNode.category}</span>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Protocol &amp; Port</span>
                <span className="text-slate-200 font-mono text-[11px]">{selectedNode.protocol}</span>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Network Location</span>
                <span className="text-slate-200 font-mono text-[11px]">{selectedNode.ip}</span>
              </div>

              {selectedNode.warningText && (
                <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-500/30 text-amber-300 text-xs">
                  <strong>Architectural Warning:</strong> {selectedNode.warningText}
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/80">
            <h5 className="text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
              Failure Impact Assessment
            </h5>
            <p className="text-xs text-slate-400 leading-normal">
              {selectedNode.id === 'node-host'
                ? 'Catastrophic. Host is single point of failure for all data, control, and network planes.'
                : selectedNode.id === 'node-amt'
                ? 'Security risk. AMT on untagged user subnet could permit LAN-based IPMI takeover.'
                : selectedNode.id === 'node-cilium'
                ? 'High. Cilium handles default-deny eBPF filtering. BPF map corruption halts internal pod-to-pod routing.'
                : selectedNode.id === 'node-cnpg'
                ? 'Severe. Relies on Local PV. Any disk damage loses PostgreSQL tables and pgvector embedding indices.'
                : selectedNode.id === 'node-ministack'
                ? 'Isolated. MiniStack crash resets volatile in-memory queues and tables without impacting core database.'
                : 'Standard Kubernetes service recovery via replica controller.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
