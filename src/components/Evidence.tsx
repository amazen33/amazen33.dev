import { CheckCircle2, Circle } from 'lucide-react';
import { FOUNDATION_GATE, RECEIPTS, REPO } from '../data/content.ts';
import { Card, Ext, SectionTitle } from './ui.tsx';

const LADDER = [
  { name: 'Proposed', text: 'A design, not yet decided.' },
  { name: 'Accepted (design)', text: 'The owner decided it. There is no live evidence yet.' },
  { name: 'Dev-verified', text: 'Live on the dev environment, with a receipt whose tester sign-off is Accepted.' },
  { name: 'Production-accepted', text: 'Live on a production profile, with a receipt. None exists today.' },
];

export function Evidence() {
  return (
    <div className="space-y-10">
      <SectionTitle eyebrow="Evidence first" title="Nothing counts until it is signed">
        <p>
          Many platforms describe what they will do. Twinfra separates design from proof:{' '}
          <Ext href={`${REPO}/blob/main/docs/adr/0052-evidence-first-foundation-1-0.md`}>ADR-0052</Ext> gives every decision
          exactly one status, and the README may never claim more than that status. Evidence from a retired environment is
          labelled Historical and does not count.
        </p>
      </SectionTitle>

      <section aria-labelledby="ladder-title">
        <h3 id="ladder-title" className="mb-3 text-lg font-bold text-white">The status ladder</h3>
        <ol className="grid gap-3 md:grid-cols-4">
          {LADDER.map((step, i) => (
            <li key={step.name}>
              <Card className="h-full">
                <div className="text-xs font-semibold text-indigo-300">Step {i + 1}</div>
                <div className="mt-1 font-bold text-white">{step.name}</div>
                <p className="mt-2 text-sm text-slate-300">{step.text}</p>
              </Card>
            </li>
          ))}
        </ol>
        <p className="mt-3 text-sm text-slate-400">Off the ladder: Deferred (kept for reference) and Superseded (replaced by a named decision).</p>
      </section>

      <section aria-labelledby="receipts-title">
        <h3 id="receipts-title" className="mb-1 text-lg font-bold text-white">Signed receipts</h3>
        <p className="mb-4 text-sm text-slate-400">
          A receipt records what was tested, on which revision, and who signed it. Each link opens the receipt in the repository.
        </p>
        <div className="grid gap-3 md:grid-cols-2">
          {RECEIPTS.map((r) => (
            <Card key={r.workOrder}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-xs font-semibold text-emerald-300">{r.workOrder}</span>
                  <h4 className="font-bold text-white">{r.title}</h4>
                </div>
                <Ext href={r.href} className="text-xs">Receipt</Ext>
              </div>
              <p className="mt-2 text-sm text-slate-300">{r.proves}</p>
            </Card>
          ))}
        </div>
      </section>

      <section aria-labelledby="gate-title">
        <h3 id="gate-title" className="mb-1 text-lg font-bold text-white">The Foundation 1.0 gate</h3>
        <p className="mb-4 max-w-3xl text-sm text-slate-400">
          New product features wait until every row below is Dev-verified with a tester's sign-off. Only then is
          Foundation 1.0 released on the Stable stream.
        </p>
        <ul className="divide-y divide-slate-800 rounded-xl border border-slate-800">
          {FOUNDATION_GATE.map((row) => (
            <li key={row.area} className="flex items-start gap-3 bg-slate-950/40 px-4 py-3">
              {row.done ? (
                <CheckCircle2 aria-label="Signed" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
              ) : (
                <Circle aria-label="Open" className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
              )}
              <span className="flex-1 text-sm text-slate-200">{row.area}</span>
              <span className="shrink-0 font-mono text-xs text-slate-400">{row.work}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
