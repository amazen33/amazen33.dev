import { useMemo, useState } from 'react';
import { AWS_SERVICES, REPO } from '../data/content.ts';
import type { AwsService } from '../data/types.ts';
import { Card, Ext, SectionTitle } from './ui.tsx';

const STATUS: Record<AwsService['status'], { label: string; className: string }> = {
  emulated: { label: 'Emulated', className: 'bg-amber-500/10 text-amber-300 border-amber-500/30' },
  planned: { label: 'Planned', className: 'bg-slate-500/10 text-slate-300 border-slate-500/30' },
  'out-of-scope': { label: 'Out of scope', className: 'bg-rose-500/10 text-rose-300 border-rose-500/30' },
};

export function AwsApi() {
  const [tier, setTier] = useState<'all' | '1' | '2'>('all');
  const rows = useMemo(() => AWS_SERVICES.filter((s) => tier === 'all' || String(s.tier) === tier), [tier]);
  const emulated = AWS_SERVICES.filter((s) => s.status === 'emulated').length;

  return (
    <div>
      <SectionTitle eyebrow="AWS compatibility" title="Which AWS APIs work today">
        <p>
          Twinfra's catalogue follows <Ext href={`${REPO}/blob/main/docs/adr/0029-aws-compatible-enterprise-simulator.md`}>ADR-0029</Ext>.
          Tier 1 is the core enterprise set, Tier 2 the common extras, and Tier 3 the long tail. Every service is labelled{' '}
          <strong className="text-white">Real</strong> (real, persistent infrastructure) or <strong className="text-white">Emulated</strong>.
          Today {emulated} services answer through the emulator, and none is Real yet. This table mirrors the repository's{' '}
          <Ext href={`${REPO}/blob/main/docs/capabilities.md`}>capability table</Ext>.
        </p>
      </SectionTitle>

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <Card>
          <h3 className="text-sm font-bold text-white">What "Emulated" means</h3>
          <p className="mt-2 text-sm text-slate-300">
            MiniStack, an MIT-licensed AWS emulator, answers the call. Data lives in memory and is gone after a restart.
            Good for learning and demos, not for keeping data.
          </p>
        </Card>
        <Card>
          <h3 className="text-sm font-bold text-white">How a call flows today</h3>
          <p className="mt-2 text-sm text-slate-300">
            You sign in to the console through Keycloak. The console signs an AWS request (SigV4) and sends it to MiniStack
            inside the cluster, then shows the answer.
          </p>
        </Card>
        <Card>
          <h3 className="text-sm font-bold text-white">What "Real" will mean</h3>
          <p className="mt-2 text-sm text-slate-300">
            Real, persistent backends behind the same API: SeaweedFS for S3 and real compute for EC2 (WO-22), after the
            Foundation 1.0 gate.
          </p>
        </Card>
      </div>

      <div role="group" aria-label="Filter by tier" className="mb-3 flex gap-2">
        {(['all', '1', '2'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTier(t)}
            aria-pressed={tier === t}
            className={`rounded-md px-3 py-1.5 text-xs font-semibold focus-visible:outline-2 focus-visible:outline-indigo-400 ${
              tier === t ? 'bg-indigo-600 text-white' : 'border border-slate-700 text-slate-300 hover:text-white'
            }`}
          >
            {t === 'all' ? 'All tiers' : `Tier ${t}`}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-800">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-slate-900 text-xs uppercase tracking-wider text-slate-400">
            <tr>
              <th scope="col" className="px-4 py-3">Service</th>
              <th scope="col" className="px-4 py-3">Area</th>
              <th scope="col" className="px-4 py-3">Tier</th>
              <th scope="col" className="px-4 py-3">Status</th>
              <th scope="col" className="px-4 py-3">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {rows.map((s) => (
              <tr key={s.service} className="bg-slate-950/40">
                <th scope="row" className="px-4 py-3 font-semibold text-white">{s.service}</th>
                <td className="px-4 py-3 text-slate-400">{s.group}</td>
                <td className="px-4 py-3 text-slate-400">{s.tier}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex rounded-full border px-2 py-0.5 text-[11px] font-semibold ${STATUS[s.status].className}`}>
                    {STATUS[s.status].label}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-300">{s.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
