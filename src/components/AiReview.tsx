import { CheckCircle2, Lightbulb, XCircle, Ban } from 'lucide-react';
import { CRITIQUE } from '../data/content.ts';
import { Card, SectionTitle } from './ui.tsx';

export function AiReview() {
  return (
    <div className="space-y-10">
      <SectionTitle eyebrow="Case study" title="We asked an AI to review Twinfra">
        <p>{CRITIQUE.intro}</p>
        <p className="mt-2 text-xs text-slate-400">Review generated on {CRITIQUE.date}; fact-checked against the repository on 21 October 2026.</p>
      </SectionTitle>

      <section aria-labelledby="right-title">
        <h3 id="right-title" className="mb-4 flex items-center gap-2 text-lg font-bold text-white">
          <CheckCircle2 aria-hidden="true" className="h-5 w-5 text-emerald-400" /> What it got right, and what we do about it
        </h3>
        <div className="grid gap-3 md:grid-cols-2">
          {CRITIQUE.right.map((r) => (
            <Card key={r.point}>
              <p className="font-semibold text-white">{r.point}</p>
              <p className="mt-2 text-sm text-slate-300">{r.response}</p>
            </Card>
          ))}
        </div>
      </section>

      <section aria-labelledby="wrong-title">
        <h3 id="wrong-title" className="mb-4 flex items-center gap-2 text-lg font-bold text-white">
          <XCircle aria-hidden="true" className="h-5 w-5 text-rose-400" /> What it got wrong
        </h3>
        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead className="bg-slate-900 text-xs uppercase tracking-wider text-slate-400">
              <tr>
                <th scope="col" className="w-1/2 px-4 py-3">The AI said</th>
                <th scope="col" className="px-4 py-3">The evidence says</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {CRITIQUE.wrong.map((c) => (
                <tr key={c.claim} className="bg-slate-950/40 align-top">
                  <td className="px-4 py-3 text-slate-400">{c.claim}</td>
                  <td className="px-4 py-3 text-slate-200">{c.fact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="declined-title">
        <h3 id="declined-title" className="mb-4 flex items-center gap-2 text-lg font-bold text-white">
          <Ban aria-hidden="true" className="h-5 w-5 text-amber-400" /> Advice we declined
        </h3>
        <div className="grid gap-3 md:grid-cols-2">
          {CRITIQUE.declined.map((d) => (
            <Card key={d.advice}>
              <p className="font-semibold text-white">{d.advice}</p>
              <p className="mt-2 text-sm text-slate-300">{d.reason}</p>
            </Card>
          ))}
        </div>
      </section>

      <section aria-labelledby="lesson-title" className="rounded-xl border border-indigo-500/30 bg-indigo-950/30 p-5">
        <h3 id="lesson-title" className="flex items-center gap-2 font-bold text-white">
          <Lightbulb aria-hidden="true" className="h-5 w-5 text-indigo-300" /> The lesson
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-200">{CRITIQUE.lesson}</p>
      </section>
    </div>
  );
}
