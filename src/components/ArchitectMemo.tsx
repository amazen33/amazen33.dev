/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  FileText, 
  Copy, 
  Check, 
  Printer, 
  Sparkles, 
  ShieldCheck, 
  Award,
  BookOpen
} from 'lucide-react';

export const ArchitectMemo: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = document.getElementById('memo-content')?.innerText || '';
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top action bar */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-slate-900/80 border border-slate-800">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-indigo-400" />
          <span className="text-sm font-bold text-white">Principal Solutions &amp; Cloud Architect Memorandum</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied to Clipboard' : 'Copy Full Memo'}
          </button>
          <button
            onClick={handlePrint}
            className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs text-white font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            Print / Export PDF
          </button>
        </div>
      </div>

      {/* Formal Memo Body */}
      <div
        id="memo-content"
        className="p-8 sm:p-12 rounded-2xl bg-slate-950 border border-slate-800 text-slate-300 space-y-8 font-sans leading-relaxed shadow-2xl max-w-5xl mx-auto"
      >
        {/* Memo Header */}
        <div className="border-b border-slate-800 pb-6 space-y-2 font-mono text-xs text-slate-400">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div><strong className="text-slate-200">TO:</strong> Ahmed Mazen (@amazen33), Platform Lead</div>
            <div><strong className="text-slate-200">DATE:</strong> October 20, 2026</div>
            <div><strong className="text-slate-200">FROM:</strong> Principal Solutions &amp; Cloud Architect</div>
            <div><strong className="text-slate-200">SUBJECT:</strong> Architectural Audit &amp; Systems Critique: Twinfra</div>
            <div><strong className="text-slate-200">REPOSITORY:</strong> https://github.com/amazen33/twinfra</div>
            <div><strong className="text-slate-200">CLASSIFICATION:</strong> Enterprise Architecture Review</div>
          </div>
        </div>

        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            1. Executive Verdict &amp; Architectural Summary
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            <strong>Twinfra (v0.1.0 Acceptance Candidate)</strong> represents one of the most intellectually honest and methodologically disciplined open-source infrastructure projects in recent memory. By formally enacting <strong>ADR-0052 (&quot;Evidence First&quot;)</strong>, the platform explicitly decouples approved paper architecture from empirically proven running systems. It rejects vanity marketing claims and enforces strict physical evidence gates on bare metal (Dell host <code className="text-indigo-300">cairo-1</code>).
          </p>
          <p className="text-xs sm:text-sm text-slate-300">
            From a distributed systems and cloud architecture standpoint, Twinfra excels in <strong>zero-trust network containment (Cilium eBPF default-deny)</strong>, <strong>licence hygiene (zero SSPL/BSL, Valkey over Redis, Perses over Grafana)</strong>, and <strong>low-level host kernel tuning (HugePages, cgroups v2, Netplan transactional rollbacks)</strong>. However, its enterprise viability is currently held hostage by two fundamental design liabilities:
          </p>
          <ol className="list-decimal list-inside space-y-1.5 text-xs sm:text-sm text-slate-300 pl-2">
            <li><strong className="text-rose-400">The Single-Node Physical Blast Radius:</strong> Concentrating control-plane etcd, CloudNativePG, OpenBao, and APISIX on a single Dell bare-metal host with Local PVs creates a zero-fault-tolerant architecture where any hardware failure precipitates a total platform blackout.</li>
            <li><strong className="text-amber-400">The Emulation Chasm:</strong> Attempting to emulate full AWS service suites (EC2, SQS, DynamoDB) via in-memory mock daemons (MiniStack) provides a surface façade that inevitably shatters when subjected to production CDK, Terraform providers, or stateful transactional semantics.</li>
          </ol>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            2. The Emulation Chasm: Façade vs. Real Engine
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Twinfra’s core mission statement is <em>&quot;Your AWS twin, on your own infrastructure&quot;</em>. The system implements an APISIX SigV4 authentication gateway that parses AWS request signatures and routes requests to backends.
          </p>
          <p className="text-xs sm:text-sm text-slate-300">
            While ADR-0029 and ADR-0033 admirably categorize services into Tier 1 (Real), Tier 2 (Scoped), and Tier 3 (Emulated), running MiniStack in platform-services introduces severe operational risks:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-slate-300 pl-2">
            <li><strong>State Volatility:</strong> SQS messages, DynamoDB tables, and SNS topics reside purely in RAM. A pod restart or OOM kill silently wipes application state.</li>
            <li><strong>API Semantic Fidelity:</strong> Real AWS services feature subtle distributed behaviors (eventual consistency in S3, IAM condition key evaluations, transaction rollbacks in CloudFormation). Mock daemons return hardcoded XML/JSON structures that break against real production workloads.</li>
            <li><strong>Architectural Prescription:</strong> Abandon generic mock daemons. Refocus Twinfra as a <strong>Cloud-Native Standardized Protocol Provider</strong>: deliver enterprise-grade S3-compatible storage (via MinIO or Ceph), PostgreSQL wire compatibility (via CloudNativePG), and OIDC identity federation (via Keycloak), rather than simulating an entire proprietary AWS hyperscaler on bare metal.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            3. Hardware Substrate, Quorum &amp; Disaster Recovery
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            The retirement of WSL2 (ADR-0045) in favor of the dedicated Dell host <code className="text-indigo-300">twinfra-dev-cairo-1</code> was an essential architectural graduation. The verification of static address retention through a 40-second router outage (WO-36) and the 0.245s Netplan transaction rollback safety (WO-36a) demonstrate deep Linux systems acumen.
          </p>
          <p className="text-xs sm:text-sm text-slate-300">
            Nonetheless, enterprise cloud platforms must be built for failure:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-slate-300 pl-2">
            <li><strong>etcd Consensus Quorum:</strong> A single-node Kubernetes control plane has zero fault tolerance. In accordance with ADR-0050, Twinfra must join at least two additional nodes to form a true 3-node etcd cluster before onboarding any production workloads.</li>
            <li><strong>Storage Persistence &amp; Local PVs:</strong> PostgreSQL and OpenBao currently rely on host Local PersistentVolumes. Without distributed storage replication (e.g. Rook-Ceph or Longhorn), data cannot failover to another physical node.</li>
            <li><strong>Disaster Recovery Gaps:</strong> Work Order WO-09 (PITR drill and backup verification) remains Pending. Backups that have not undergone a validated restore drill are purely hypothetical.</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            4. Security Architecture &amp; The Zero-Trust Model
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            The security posture of Twinfra is exemplary. Cilium native eBPF with bidirectional default-deny network policies ensures that pods cannot communicate unless an explicit policy permits the connection. Restricting all application pods from running as root, dropping all Linux capabilities, and forbidding hostPath volumes adheres to CIS Kubernetes Benchmarks.
          </p>
          <p className="text-xs sm:text-sm text-slate-300">
            <strong>Key Vulnerabilities Requiring Remediation:</strong>
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-slate-300 pl-2">
            <li><strong>Intel AMT Out-of-Band Exposure:</strong> The AMT management interface (<code className="text-amber-300">192.168.1.4</code>) sits on the same flat `/24` subnet as user and host traffic. It must be segregated into an isolated 802.1Q tagged management VLAN.</li>
            <li><strong>OpenBao Boot Sealing:</strong> While PGP unsealing is cryptographically sound, an unexpected node reboot halts all secret decryption until human operators intervene. TPM 2.0 or an automated transit KMS key unseal must be implemented.</li>
          </ul>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            5. Governance &amp; Cognitive Load
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Twinfra maintains 54 ADRs, dozens of work orders, a strict licence ladder (ADR-0054), SBOM vulnerability gates (Grype/Syft), and custom static analysis tools. This process ensures high integrity, but creates significant cognitive overhead for a single-maintainer project.
          </p>
          <p className="text-xs sm:text-sm text-slate-300">
            <strong>Recommendation:</strong> Automate acceptance receipt generation via synthetic test runners so that code merges automatically sign off work orders once integration tests pass on <code className="text-indigo-300">cairo-1</code>.
          </p>
        </section>

        {/* Sign-off */}
        <div className="pt-6 border-t border-slate-800 text-xs font-mono text-slate-400">
          <div>Report prepared by: Principal Solutions &amp; Cloud Architect</div>
          <div>Standards Reference: ISO/IEC 25010 • AWS Well-Architected • CIS K8s Benchmark</div>
        </div>
      </div>
    </div>
  );
};
