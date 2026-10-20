/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateCompositeAuditScore,
  getScoreGrade,
  filterADRs,
  compileAuditSummary,
  simulateAWSCall,
  type ArchitecturePillar,
  type ADRRecord,
} from './auditLogic.ts';

const mockPillars: ArchitecturePillar[] = [
  {
    id: 'substrate',
    name: 'Cloud-Native & Hardware Substrate',
    shortName: 'Substrate',
    score: 52,
    weight: 20,
    status: 'critical',
    summary: 'Single node blast radius',
    strengths: ['Bare metal performance', 'Kernel tuning'],
    weaknesses: ['Single node failure domain'],
    recommendations: ['Add 2 nodes for quorum'],
    evidenceState: 'cairo-1 verified',
  },
  {
    id: 'security',
    name: 'Zero-Trust Security & Policy',
    shortName: 'Security',
    score: 88,
    weight: 25,
    status: 'superior',
    summary: 'Cilium eBPF deny-all and PSS restricted',
    strengths: ['eBPF native routing', 'OpenBao PGP unseal'],
    weaknesses: ['Shared AMT subnet'],
    recommendations: ['VLAN isolation for OOB'],
    evidenceState: 'Verified in WO-31/36',
  },
  {
    id: 'governance',
    name: 'Operational Governance & Evidence',
    shortName: 'Governance',
    score: 96,
    weight: 15,
    status: 'superior',
    summary: 'ADR-0052 Evidence-first framework',
    strengths: ['Strict evidence gate', 'Zero SSPL licensing'],
    weaknesses: ['High maintainer cognitive load'],
    recommendations: ['Automate PR evidence generation'],
    evidenceState: 'Active in CI gates',
  },
];

const mockADRs: ADRRecord[] = [
  {
    id: 'ADR-0001',
    number: 1,
    title: 'Node host mounts',
    status: 'Accepted (design)',
    domain: 'Security/Identity',
    evidenceRef: 'security/node-exceptions.json',
    criticality: 'Tier-1',
  },
  {
    id: 'ADR-0036',
    number: 36,
    title: 'Host network and staging safety',
    status: 'Dev-verified',
    domain: 'Host/Kernel',
    evidenceRef: 'docs/acceptance/host-network-2026-10-15.md',
    criticality: 'Tier-1',
  },
  {
    id: 'ADR-0052',
    number: 52,
    title: 'Evidence first — Foundation 1.0 gate',
    status: 'Accepted (design)',
    domain: 'Governance',
    evidenceRef: 'Foundation 1.0 blocking checklist',
    criticality: 'Tier-1',
  },
  {
    id: 'ADR-0053',
    number: 53,
    title: 'Tenancy model — accounts and IAM',
    status: 'Proposed',
    domain: 'Security/Identity',
    evidenceRef: 'Awaiting Foundation 1.0',
    criticality: 'Tier-2',
  },
];

test('calculateCompositeAuditScore calculates weighted average correctly', () => {
  // (52*20 + 88*25 + 96*15) / (20 + 25 + 15) = (1040 + 2200 + 1440) / 60 = 4680 / 60 = 78
  const score = calculateCompositeAuditScore(mockPillars);
  assert.equal(score, 78);
});

test('getScoreGrade returns appropriate letter grade', () => {
  assert.equal(getScoreGrade(96), 'A+');
  assert.equal(getScoreGrade(88), 'B+');
  assert.equal(getScoreGrade(78), 'B');
  assert.equal(getScoreGrade(65), 'C');
  assert.equal(getScoreGrade(52), 'D');
  assert.equal(getScoreGrade(40), 'F');
});

test('filterADRs matches query and domain/status filters correctly', () => {
  const queryFiltered = filterADRs(mockADRs, 'staging', 'all', 'all');
  assert.equal(queryFiltered.length, 1);
  assert.equal(queryFiltered[0].id, 'ADR-0036');

  const domainFiltered = filterADRs(mockADRs, '', 'Security/Identity', 'all');
  assert.equal(domainFiltered.length, 2);

  const statusFiltered = filterADRs(mockADRs, '', 'all', 'Dev-verified');
  assert.equal(statusFiltered.length, 1);
  assert.equal(statusFiltered[0].id, 'ADR-0036');
});

test('compileAuditSummary gathers metrics accurately', () => {
  const summary = compileAuditSummary(mockPillars, mockADRs);
  assert.equal(summary.overallScore, 78);
  assert.equal(summary.grade, 'B');
  assert.equal(summary.totalADRs, 4);
  assert.equal(summary.verifiedADRs, 1);
  assert.equal(summary.proposedADRs, 1);
});

test('simulateAWSCall handles S3 PutObject validation', () => {
  const failRes = simulateAWSCall('s3', 'PutObject', {});
  assert.equal(failRes.success, false);
  assert.equal(failRes.statusCode, 400);

  const okRes = simulateAWSCall('s3', 'PutObject', { Bucket: 'production-assets' });
  assert.equal(okRes.success, true);
  assert.equal(okRes.statusCode, 200);
});
