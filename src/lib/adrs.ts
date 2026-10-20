import type { Adr } from '../data/types.ts';

export function filterAdrs(adrs: Adr[], query: string, status: string): Adr[] {
  const q = query.trim().toLowerCase();
  return adrs.filter(
    (adr) =>
      (status === 'all' || adr.status === status) &&
      (q === '' || adr.id.toLowerCase().includes(q) || adr.title.toLowerCase().includes(q)),
  );
}

export function countByStatus(adrs: Adr[]): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const adr of adrs) counts[adr.status] = (counts[adr.status] ?? 0) + 1;
  return counts;
}
