import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { ADRS } from '../data/adrs.ts';
import { REPO } from '../data/content.ts';
import { countByStatus, filterAdrs } from '../lib/adrs.ts';
import { Ext, SectionTitle } from './ui.tsx';

const TONE: Record<string, string> = {
  'Accepted (design)': 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30',
  Proposed: 'bg-sky-500/10 text-sky-300 border-sky-500/30',
  'Deferred (reference design)': 'bg-amber-500/10 text-amber-300 border-amber-500/30',
  Superseded: 'bg-slate-500/10 text-slate-400 border-slate-500/30',
};

export function Decisions() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const counts = useMemo(() => countByStatus(ADRS), []);
  const rows = useMemo(() => filterAdrs(ADRS, query, status), [query, status]);

  return (
    <div>
      <SectionTitle eyebrow="Decisions" title="Every architecture decision, in the open">
        <p>
          Twinfra records each significant choice as an architecture decision record (ADR): the context, the decision and
          its consequences. Statuses come straight from the repository's{' '}
          <Ext href={`${REPO}/blob/main/docs/adr/README.md`}>ADR index</Ext>. "Accepted (design)" means decided, not yet proven
          live; the receipts on the Evidence page show what is.
        </p>
      </SectionTitle>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <label className="relative flex-1">
          <span className="sr-only">Search decisions</span>
          <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by number or title, for example licence"
            className="w-full rounded-lg border border-slate-700 bg-slate-900 py-2 pl-9 pr-3 text-sm text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none"
          />
        </label>
        <label>
          <span className="sr-only">Filter by status</span>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none sm:w-auto"
          >
            <option value="all">All statuses ({ADRS.length})</option>
            {Object.entries(counts).map(([s, n]) => (
              <option key={s} value={s}>{s} ({n})</option>
            ))}
          </select>
        </label>
      </div>

      <p className="mb-2 text-xs text-slate-400" aria-live="polite">{rows.length} of {ADRS.length} decisions</p>
      <ul className="divide-y divide-slate-800 rounded-xl border border-slate-800">
        {rows.map((adr) => (
          <li key={adr.id} className="flex flex-col gap-1 bg-slate-950/40 px-4 py-3 sm:flex-row sm:items-center sm:gap-4">
            <a
              href={adr.href}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs font-semibold text-indigo-300 hover:text-indigo-200 hover:underline sm:w-20"
            >
              {adr.id}
            </a>
            <span className="flex-1 text-sm text-slate-200">{adr.title}</span>
            <span className={`inline-flex w-fit rounded-full border px-2 py-0.5 text-[11px] font-semibold ${TONE[adr.status] ?? TONE.Superseded}`}>
              {adr.status}
            </span>
          </li>
        ))}
        {rows.length === 0 && <li className="px-4 py-6 text-center text-sm text-slate-400">No decision matches that search.</li>}
      </ul>
    </div>
  );
}
