import test from 'node:test';
import assert from 'node:assert/strict';
import { countByStatus, filterAdrs } from './adrs.ts';
import { ADRS } from '../data/adrs.ts';
import { AWS_SERVICES, LAYERS, RECEIPTS } from '../data/content.ts';

test('the ADR list matches the Twinfra index', () => {
  assert.equal(ADRS.length, 50);
  assert.equal(new Set(ADRS.map((a) => a.id)).size, 50);
  assert.equal(ADRS.find((a) => a.id === 'ADR-0005')?.title, 'Pgvector as the application vector store');
});

test('filterAdrs matches id or title, case-insensitively, within a status', () => {
  assert.deepEqual(filterAdrs(ADRS, 'adr-0052', 'all').map((a) => a.id), ['ADR-0052']);
  assert.ok(filterAdrs(ADRS, 'LICENCE', 'all').length >= 3);
  assert.ok(filterAdrs(ADRS, '', 'Proposed').every((a) => a.status === 'Proposed'));
  assert.deepEqual(filterAdrs(ADRS, 'no such decision', 'all'), []);
});

test('countByStatus adds up to the whole list', () => {
  const counts = countByStatus(ADRS);
  assert.equal(Object.values(counts).reduce((a, b) => a + b, 0), ADRS.length);
});

test('no AWS service claims to be real before its backend exists', () => {
  assert.ok(AWS_SERVICES.every((s) => s.status !== ('real' as string)));
});

test('every signed component cites a receipt-backed work order', () => {
  const orders = RECEIPTS.map((r) => r.workOrder);
  for (const layer of LAYERS) {
    for (const c of layer.components.filter((c) => c.evidence === 'signed')) {
      assert.ok(orders.some((wo) => c.note.includes(wo)), `${c.name} has no signed receipt`);
    }
  }
});

test('receipt links point at the Twinfra repository', () => {
  assert.ok(RECEIPTS.every((r) => r.href.startsWith('https://github.com/amazen33/twinfra/blob/main/docs/acceptance/')));
});
