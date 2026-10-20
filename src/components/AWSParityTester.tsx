/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Cpu, 
  Send, 
  AlertTriangle, 
  CheckCircle2, 
  Terminal, 
  ShieldAlert, 
  Code2, 
  Sparkles 
} from 'lucide-react';
import { AWS_SERVICES_PARITY } from '../utils/auditData';
import { simulateAWSCall } from '../utils/auditLogic';

export const AWSParityTester: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string>('S3');
  const [selectedAction, setSelectedAction] = useState<string>('PutObject');
  const [requestPayload, setRequestPayload] = useState<string>(
    JSON.stringify({ Bucket: 'production-workload-bucket', Key: 'report-2026.pdf' }, null, 2)
  );
  const [simulationResult, setSimulationResult] = useState<any>(null);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const handleActionChange = (service: string, action: string) => {
    setSelectedService(service);
    setSelectedAction(action);
    if (service === 'S3' && action === 'PutObject') {
      setRequestPayload(JSON.stringify({ Bucket: 'production-workload-bucket', Key: 'model.bin' }, null, 2));
    } else if (service === 'IAM' && action === 'CreateRole') {
      setRequestPayload(JSON.stringify({ RoleName: 'twinfra-app-role', AssumeRolePolicyDocument: '{}' }, null, 2));
    } else if (service === 'EC2' && action === 'RunInstances') {
      setRequestPayload(JSON.stringify({ ImageId: 'ami-ubuntu-2404', InstanceType: 't3.micro', MinCount: 1, MaxCount: 1 }, null, 2));
    } else if (service === 'SQS' && action === 'SendMessage') {
      setRequestPayload(JSON.stringify({ QueueUrl: 'http://twinfra/queue/tasks', MessageBody: '{"task":"ingest"}' }, null, 2));
    } else {
      setRequestPayload(JSON.stringify({ TableName: 'UserSessions', Item: { id: { S: 'usr_123' } } }, null, 2));
    }
  };

  const runSimulation = () => {
    setIsSimulating(true);
    let parsed = {};
    try {
      parsed = JSON.parse(requestPayload);
    } catch {
      parsed = {};
    }
    setTimeout(() => {
      const res = simulateAWSCall(selectedService, selectedAction, parsed);
      setSimulationResult(res);
      setIsSimulating(false);
    }, 200);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Intro Header */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
        <div className="flex items-center gap-2 mb-2">
          <Cpu className="w-5 h-5 text-indigo-400" />
          <h3 className="text-lg font-bold text-white tracking-tight">
            AWS Compatibility Scorecard &amp; SigV4 Parity Simulator
          </h3>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
          Twinfra’s core value proposition is <em className="text-indigo-300">&quot;Your AWS twin, on your own infrastructure&quot;</em>.
          AWS clients communicate using standard AWS SDKs, SigV4 authentication, and custom endpoints (<code className="text-amber-300">AWS_ENDPOINT_URL</code>). 
          Review the fidelity classification below and execute interactive test payloads against the APISIX SigV4 translation proxy.
        </p>
      </div>

      {/* Interactive SigV4 Simulator Console */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Request Configuration */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-400" /> SigV4 Request Dispatcher
            </h4>
            <span className="text-[11px] text-slate-400">Endpoint: https://api.dev.cairo-1.twinfra.example.com</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">AWS Service</label>
              <select
                value={selectedService}
                onChange={(e) => {
                  const s = e.target.value;
                  const defaultAct = s === 'S3' ? 'PutObject' : s === 'IAM' ? 'CreateRole' : s === 'EC2' ? 'RunInstances' : 'SendMessage';
                  handleActionChange(s, defaultAct);
                }}
                className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200 outline-none"
              >
                <option value="S3">Amazon S3 (Storage)</option>
                <option value="IAM">AWS IAM (Security)</option>
                <option value="EC2">Amazon EC2 (Compute)</option>
                <option value="SQS">Amazon SQS (Messaging)</option>
                <option value="DynamoDB">Amazon DynamoDB (NoSQL)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">Target Action</label>
              <input
                type="text"
                value={selectedAction}
                onChange={(e) => setSelectedAction(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200 font-mono outline-none"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-[11px] font-bold uppercase text-slate-400">Request JSON Parameters</label>
              <span className="text-[10px] text-slate-400 font-mono">Payload Body</span>
            </div>
            <textarea
              rows={5}
              value={requestPayload}
              onChange={(e) => setRequestPayload(e.target.value)}
              className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-emerald-400 font-mono outline-none resize-none"
            />
          </div>

          <button
            onClick={runSimulation}
            disabled={isSimulating}
            className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            {isSimulating ? 'Computing SigV4 & Routing...' : 'Dispatch Request to Twinfra APISIX Gateway'}
          </button>
        </div>

        {/* Right: Response & Gateway Telemetry */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Code2 className="w-4 h-4 text-indigo-400" /> APISIX Gateway Telemetry &amp; Routing
              </h4>
              <span className="text-[11px] text-indigo-400 font-mono">Status: {simulationResult ? '200 OK' : 'Awaiting Test'}</span>
            </div>

            {simulationResult ? (
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-300 space-y-1">
                  <div className="text-slate-400"># In-Cluster APISIX Translation</div>
                  <div><span className="text-indigo-400">X-Amz-Date:</span> 20261020T191317Z</div>
                  <div><span className="text-indigo-400">Authorization:</span> AWS4-HMAC-SHA256 Credential=test/...</div>
                  <div><span className="text-emerald-400">Target Backend:</span> {simulationResult.emulationTier}</div>
                  <div><span className="text-amber-400">Result Message:</span> {simulationResult.message}</div>
                </div>

                <div className="p-3 rounded-lg bg-indigo-950/30 border border-indigo-500/30 text-xs">
                  <div className="flex items-center gap-1.5 text-indigo-300 font-bold mb-1">
                    <Sparkles className="w-3.5 h-3.5" /> Architectural Fidelity Verdict:
                  </div>
                  <p className="text-slate-300 leading-relaxed text-[11px]">
                    {selectedService === 'S3' &&
                      'S3 PutObject/GetObject works well against durable storage. However, complex ACLs, S3 Select, and Glacier lifecycle hooks are absent.'}
                    {selectedService === 'IAM' &&
                      'Role creation succeeds, but AWS condition keys (e.g. StringEquals, aws:SourceVpc) are ignored by the Keycloak token exchange bridge.'}
                    {selectedService === 'EC2' &&
                      'RunInstances simulates an EC2 instance by spawning an isolated Kubernetes Pod. It lacks hypervisor VPC attachment and EBS volume detachment semantics.'}
                    {(selectedService === 'SQS' || selectedService === 'DynamoDB') &&
                      'CRITICAL: Backed by MiniStack in-memory process. Data will not survive pod restarts or host reboots.'}
                  </p>
                </div>
              </div>
            ) : (
              <div className="h-44 flex flex-col items-center justify-center text-slate-400 text-xs text-center p-6 border border-dashed border-slate-800 rounded-xl">
                <Terminal className="w-8 h-8 text-slate-600 mb-2" />
                Select a service and click &quot;Dispatch Request&quot; to test Twinfra’s SigV4 auth translation and backend handler.
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Reference: ADR-0029 &amp; ADR-0033</span>
            <span className="text-slate-300 font-mono">console/aws_views.py</span>
          </div>
        </div>
      </div>

      {/* Parity Service Catalog Table */}
      <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
        <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
          Complete AWS Service Catalog Parity Matrix
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px]">
                <th className="py-2.5 px-3">AWS Service</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Tier</th>
                <th className="py-2.5 px-3">Twinfra Implementation</th>
                <th className="py-2.5 px-3">Fidelity Score</th>
                <th className="py-2.5 px-3">Parity Status</th>
                <th className="py-2.5 px-3">Enterprise Caveats</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {AWS_SERVICES_PARITY.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-3 font-bold text-white">{item.service}</td>
                  <td className="py-3 px-3 text-slate-400">{item.category}</td>
                  <td className="py-3 px-3 font-mono">Tier {item.tier}</td>
                  <td className="py-3 px-3 font-mono text-indigo-300 text-[11px]">{item.twinfraBackend}</td>
                  <td className="py-3 px-3">
                    <span
                      className={`font-black ${
                        item.fidelityScore >= 80
                          ? 'text-emerald-400'
                          : item.fidelityScore >= 60
                          ? 'text-amber-400'
                          : 'text-rose-400'
                      }`}
                    >
                      {item.fidelityScore}%
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        item.parityStatus.includes('Real')
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : item.parityStatus.includes('Emulated')
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {item.parityStatus}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-400 text-[11px] max-w-xs">
                    {item.limitations[0]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
