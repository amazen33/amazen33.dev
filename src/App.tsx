import { useCallback, useEffect, useState } from 'react';
import { Overview } from './components/Overview.tsx';
import { Architecture } from './components/Architecture.tsx';
import { AwsApi } from './components/AwsApi.tsx';
import { Evidence } from './components/Evidence.tsx';
import { Decisions } from './components/Decisions.tsx';
import { Roadmap } from './components/Roadmap.tsx';
import { AiReview } from './components/AiReview.tsx';
import { REPO } from './data/content.ts';

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'aws', label: 'AWS compatibility' },
  { id: 'evidence', label: 'Evidence' },
  { id: 'decisions', label: 'Decisions' },
  { id: 'roadmap', label: 'Roadmap' },
  { id: 'ai-review', label: 'AI review' },
] as const;

const fromHash = () => {
  const id = window.location.hash.slice(1);
  return TABS.some((t) => t.id === id) ? id : 'overview';
};

export default function App() {
  const [tab, setTab] = useState<string>(fromHash);

  useEffect(() => {
    const onHash = () => setTab(fromHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const go = useCallback((id: string) => {
    if (id === 'overview') history.pushState(null, '', window.location.pathname);
    else window.location.hash = id;
    setTab(id);
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-indigo-600 focus:px-3 focus:py-2">
        Skip to content
      </a>
      <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <button onClick={() => go('overview')} className="flex items-center gap-3 text-left focus-visible:outline-2 focus-visible:outline-indigo-400">
            <span aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-sky-600 text-sm font-black text-white">TW</span>
            <span>
              <span className="block text-base font-bold leading-tight text-white">Twinfra</span>
              <span className="block text-xs text-slate-400">Your AWS twin, on your own infrastructure</span>
            </span>
          </button>
          <a
            href={REPO}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:border-slate-500 sm:inline-block"
          >
            GitHub
          </a>
        </div>
        <nav aria-label="Sections" className="mx-auto max-w-6xl px-4 sm:px-6">
          <ul className="no-scrollbar flex gap-1 overflow-x-auto pb-2">
            {TABS.map((t) => (
              <li key={t.id}>
                <button
                  onClick={() => go(t.id)}
                  aria-current={tab === t.id ? 'page' : undefined}
                  className={`whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium focus-visible:outline-2 focus-visible:outline-indigo-400 ${
                    tab === t.id ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                  }`}
                >
                  {t.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main id="main" className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
        {tab === 'overview' && <Overview go={go} />}
        {tab === 'architecture' && <Architecture />}
        {tab === 'aws' && <AwsApi />}
        {tab === 'evidence' && <Evidence />}
        {tab === 'decisions' && <Decisions />}
        {tab === 'roadmap' && <Roadmap />}
        {tab === 'ai-review' && <AiReview />}
      </main>

      <footer className="border-t border-slate-800 py-6 text-xs text-slate-400">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <span>Twinfra is open source under the MIT licence. Status as of 21 October 2026.</span>
          <span className="flex gap-4">
            <a href={REPO} target="_blank" rel="noreferrer" className="hover:text-slate-200">Source code</a>
            <a href="https://amazen33.dev" className="hover:text-slate-200">Built by Ahmed Mazen</a>
          </span>
        </div>
      </footer>
    </div>
  );
}
