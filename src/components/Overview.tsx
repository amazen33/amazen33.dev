import { ArrowRight, CheckCircle2, FileCheck2, Info, Scale, ShieldCheck, GitBranch } from 'lucide-react';
import { ADRS } from '../data/adrs.ts';
import { PRINCIPLES, RECEIPTS, REPO, STATUS } from '../data/content.ts';
import { Card, Ext } from './ui.tsx';

const ICONS = [FileCheck2, Scale, ShieldCheck, GitBranch];

export function Overview({ go }: { go: (tab: string) => void }) {
  const facts = [
    { value: String(ADRS.length), label: 'architecture decisions, all public' },
    { value: String(RECEIPTS.length), label: 'signed acceptance receipts' },
    { value: '17', label: 'checks in the release acceptance suite' },
    { value: '0', label: 'AGPL, SSPL or BUSL components shipped' },
  ];
  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/70 p-6 sm:p-10">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="relative max-w-3xl">
          <p className="text-sm font-semibold text-indigo-300">Open source · MIT licence</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Your AWS twin, on your own infrastructure.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
            Twinfra is an AWS-compatible enterprise simulator. It brings AWS-style APIs, a web console and single sign-on to
            upstream Kubernetes that you run yourself, on bare metal or virtual machines. Every service is labelled
            Real or Emulated, and every capability is backed by evidence you can read.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => go('architecture')}
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
            >
              See how it works <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </button>
            <a
              href={REPO}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 hover:border-slate-500 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
            >
              Read the code on GitHub
            </a>
          </div>
        </div>
      </section>

      <section aria-labelledby="status-title" className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-5">
        <h2 id="status-title" className="flex items-center gap-2 text-sm font-bold text-amber-200">
          <Info aria-hidden="true" className="h-4 w-4" /> Where Twinfra stands today
        </h2>
        <ul className="mt-3 grid gap-2 text-sm text-slate-300 sm:grid-cols-2">
          <li><span className="font-semibold text-white">{STATUS.version}:</span> {STATUS.stage}. Stable is targeted for {STATUS.stableTarget}.</li>
          <li><span className="font-semibold text-white">Environment:</span> {STATUS.environment}.</li>
          <li className="sm:col-span-2">{STATUS.notClaimed} <button onClick={() => go('roadmap')} className="text-indigo-300 underline-offset-2 hover:underline">See the roadmap.</button></li>
        </ul>
      </section>

      <section aria-label="Key facts" className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {facts.map((f) => (
          <Card key={f.label}>
            <div className="text-3xl font-black text-white">{f.value}</div>
            <div className="mt-1 text-xs text-slate-400">{f.label}</div>
          </Card>
        ))}
      </section>

      <section aria-labelledby="principles-title">
        <h2 id="principles-title" className="mb-4 text-xl font-bold text-white">Built on four rules</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {PRINCIPLES.map((p, i) => {
            const Icon = ICONS[i];
            return (
              <Card key={p.title}>
                <div className="flex items-center gap-2">
                  <Icon aria-hidden="true" className="h-5 w-5 text-indigo-300" />
                  <h3 className="font-bold text-white">{p.title}</h3>
                  <Ext href={p.href} className="ml-auto text-xs">{p.adr}</Ext>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{p.text}</p>
              </Card>
            );
          })}
        </div>
      </section>

      <section aria-labelledby="learn-title">
        <h2 id="learn-title" className="mb-4 text-xl font-bold text-white">Learn from it</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { tab: 'evidence', title: 'How evidence works', text: 'Why nothing counts until a tester signs a receipt, and what the Foundation 1.0 gate requires.' },
            { tab: 'decisions', title: 'Read the decisions', text: 'All 50 architecture decision records, with their real status, from Proposed to Superseded.' },
            { tab: 'ai-review', title: 'What an AI review got wrong', text: 'We asked an AI model to critique Twinfra, then checked every claim against the evidence.' },
          ].map((c) => (
            <button
              key={c.tab}
              onClick={() => go(c.tab)}
              className="group rounded-xl border border-slate-800 bg-slate-900/60 p-5 text-left hover:border-indigo-500/50 focus-visible:outline-2 focus-visible:outline-indigo-400"
            >
              <h3 className="flex items-center gap-2 font-bold text-white">
                <CheckCircle2 aria-hidden="true" className="h-4 w-4 text-emerald-300" /> {c.title}
              </h3>
              <p className="mt-2 text-sm text-slate-300">{c.text}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-indigo-300 group-hover:text-indigo-200">
                Open <ArrowRight aria-hidden="true" className="h-3 w-3" />
              </span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
