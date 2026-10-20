import { ChevronDown } from 'lucide-react';
import { LAYERS } from '../data/content.ts';
import { EvidenceBadge, Legend, SectionTitle } from './ui.tsx';

export function Architecture() {
  return (
    <div>
      <SectionTitle eyebrow="Architecture" title="How Twinfra is put together">
        <p>
          Requests flow from the top layer down. Each component carries its evidence level, so you can see at a glance
          what runs and is signed off, what only runs, what is emulated and what is still a plan. Hover a badge to see what
          it means.
        </p>
      </SectionTitle>

      <div className="mb-6"><Legend /></div>

      <ol className="space-y-2">
        {LAYERS.map((layer, i) => (
          <li key={layer.id}>
            <section aria-labelledby={`layer-${layer.id}`} className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 sm:p-5">
              <h3 id={`layer-${layer.id}`} className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                {i + 1}. {layer.title}
              </h3>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {layer.components.map((c) => (
                  <div key={c.name} className="rounded-lg border border-slate-800 bg-slate-950/60 p-3">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-sm font-semibold text-white">{c.name}</span>
                      <EvidenceBadge evidence={c.evidence} />
                    </div>
                    <p className="mt-1 text-xs text-slate-400">{c.detail}</p>
                    <p className="mt-2 text-xs leading-relaxed text-slate-300">{c.note}</p>
                  </div>
                ))}
              </div>
            </section>
            {i < LAYERS.length - 2 && (
              <div aria-hidden="true" className="flex justify-center py-1 text-slate-600">
                <ChevronDown className="h-4 w-4" />
              </div>
            )}
          </li>
        ))}
      </ol>

      <p className="mt-6 max-w-3xl text-sm text-slate-400">
        Observability sits beside the stack rather than in the request path. The dev environment is reached through private
        tunnels today; it is not exposed to the internet.
      </p>
    </div>
  );
}
