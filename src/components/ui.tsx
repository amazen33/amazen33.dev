import type { ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { Evidence } from '../data/types.ts';

export const EVIDENCE: Record<Evidence, { label: string; className: string; meaning: string }> = {
  signed: {
    label: 'Signed',
    className: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
    meaning: 'Runs on the dev environment and a tester signed its receipt (Dev-verified).',
  },
  observed: {
    label: 'Observed',
    className: 'bg-sky-500/10 text-sky-300 border-sky-500/30',
    meaning: 'Runs and was observed by the owner; the signed receipt is still pending.',
  },
  emulated: {
    label: 'Emulated',
    className: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
    meaning: 'Answered by the MiniStack emulator, not by real, persistent infrastructure.',
  },
  planned: {
    label: 'Planned',
    className: 'bg-slate-500/10 text-slate-300 border-slate-500/30',
    meaning: 'Designed or decided, not running yet.',
  },
};

export function EvidenceBadge({ evidence }: { evidence: Evidence }) {
  const e = EVIDENCE[evidence];
  return (
    <span title={e.meaning} className={`inline-flex shrink-0 items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold ${e.className}`}>
      {e.label}
    </span>
  );
}

export function SectionTitle({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <div className="mb-6 max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-wider text-indigo-300">{eyebrow}</p>
      <h2 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">{title}</h2>
      {children && <div className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">{children}</div>}
    </div>
  );
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-xl border border-slate-800 bg-slate-900/60 p-5 ${className}`}>{children}</div>;
}

export function Ext({ href, children, className = '' }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center gap-0.5 text-indigo-300 underline-offset-2 hover:text-indigo-200 hover:underline focus-visible:outline-2 focus-visible:outline-indigo-400 ${className}`}
    >
      {children}
      <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
    </a>
  );
}

export function Legend() {
  return (
    <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-400">
      {(Object.keys(EVIDENCE) as Evidence[]).map((k) => (
        <span key={k} className="flex items-center gap-2">
          <EvidenceBadge evidence={k} />
          <span>{EVIDENCE[k].meaning}</span>
        </span>
      ))}
    </div>
  );
}
