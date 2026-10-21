import { CheckCircle2, Circle } from 'lucide-react';
import { AFTER_RELEASE, RELEASE_PLAN } from '../data/content.ts';
import type { Milestone } from '../data/types.ts';
import { SectionTitle } from './ui.tsx';

function Timeline({ items }: { items: Milestone[] }) {
  return (
    <ol className="relative space-y-5 border-l border-slate-800 pl-6">
      {items.map((m) => (
        <li key={m.title} className="relative">
          <span className="absolute -left-[33px] top-0.5 rounded-full bg-slate-950">
            {m.done ? (
              <CheckCircle2 aria-label="Done" className="h-4 w-4 text-emerald-400" />
            ) : (
              <Circle aria-label="Upcoming" className="h-4 w-4 text-slate-500" />
            )}
          </span>
          <div className="text-xs font-semibold text-indigo-300">{m.when}</div>
          <div className="font-bold text-white">{m.title}</div>
          <p className="mt-1 text-sm text-slate-300">{m.detail}</p>
        </li>
      ))}
    </ol>
  );
}

export function Roadmap() {
  return (
    <div>
      <SectionTitle eyebrow="Roadmap" title="The road to v0.1.0, and after">
        <p>
          Dates are targets, not promises: a step moves only when its evidence is in. Every release goes through Dev,
          Candidate and Stable streams with semantic versions.
        </p>
      </SectionTitle>
      <div className="grid gap-10 lg:grid-cols-2">
        <section aria-labelledby="release-title">
          <h3 id="release-title" className="mb-4 text-lg font-bold text-white">v0.1.0 release</h3>
          <Timeline items={RELEASE_PLAN} />
        </section>
        <section aria-labelledby="after-title">
          <h3 id="after-title" className="mb-4 text-lg font-bold text-white">After v0.1.0, toward Foundation 1.0</h3>
          <Timeline items={AFTER_RELEASE} />
        </section>
      </div>
    </div>
  );
}
