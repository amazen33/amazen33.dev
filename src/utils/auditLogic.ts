/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ArchitecturePillar {
  id: string;
  name: string;
  shortName: string;
  score: number; // 0-100
  weight: number;
  status: 'superior' | 'acceptable' | 'warning' | 'critical';
  summary: string;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  evidenceState: string;
}

export interface ADRRecord {
  id: string;
  number: number;
  title: string;
  status: 'Accepted (design)' | 'Dev-verified' | 'Proposed' | 'Deferred' | 'Historical' | 'Superseded';
  domain: 'Host/Kernel' | 'Kubernetes/CNI' | 'Data/Storage' | 'Security/Identity' | 'Gateway/API' | 'Observability' | 'AI/HPC' | 'Governance';
  evidenceRef: string;
  criticality: 'Tier-1' | 'Tier-2' | 'Tier-3';
}

export interface AWSServiceParity {
  service: string;
  category: 'Compute' | 'Storage' | 'Database' | 'Security' | 'Integration' | 'Observability';
  tier: 1 | 2 | 3;
  twinfraBackend: string;
  fidelityScore: number; // 0-100
  parityStatus: 'Real (Dev-verified)' | 'Emulated (MiniStack)' | 'Planned (Crossplane)' | 'Deferred';
  limitations: string[];
  productionFit: 'Ready for Dev' | 'Prototype Only' | 'Not Supported';
}

export interface AuditSummary {
  overallScore: number;
  grade: 'A+' | 'A' | 'B+' | 'B' | 'C+' | 'C' | 'D' | 'F';
  totalADRs: number;
  verifiedADRs: number;
  proposedADRs: number;
  deferredADRs: number;
  highSeverityRisks: number;
  mediumSeverityRisks: number;
  lowSeverityRisks: number;
  primaryVerdict: string;
}

/**
 * Calculates weighted composite score for architectural pillars.
 */
export function calculateCompositeAuditScore(pillars: ArchitecturePillar[]): number {
  if (pillars.length === 0) return 0;
  const totalWeight = pillars.reduce((sum, p) => sum + p.weight, 0);
  if (totalWeight === 0) return 0;
  const weightedSum = pillars.reduce((sum, p) => sum + p.score * p.weight, 0);
  return Math.round((weightedSum / totalWeight) * 10) / 10;
}

/**
 * Assigns architectural letter grade from numeric score.
 */
export function getScoreGrade(score: number): AuditSummary['grade'] {
  if (score >= 95) return 'A+';
  if (score >= 90) return 'A';
  if (score >= 82) return 'B+';
  if (score >= 75) return 'B';
  if (score >= 68) return 'C+';
  if (score >= 60) return 'C';
  if (score >= 50) return 'D';
  return 'F';
}

/**
 * Filters ADRs by search query and domain/status filters.
 */
export function filterADRs(
  adrs: ADRRecord[],
  query: string,
  domainFilter: string,
  statusFilter: string
): ADRRecord[] {
  const cleanQuery = query.trim().toLowerCase();
  return adrs.filter((adr) => {
    const matchesQuery =
      cleanQuery === '' ||
      adr.id.toLowerCase().includes(cleanQuery) ||
      adr.title.toLowerCase().includes(cleanQuery) ||
      adr.evidenceRef.toLowerCase().includes(cleanQuery);
    const matchesDomain = domainFilter === 'all' || adr.domain === domainFilter;
    const matchesStatus = statusFilter === 'all' || adr.status === statusFilter;
    return matchesQuery && matchesDomain && matchesStatus;
  });
}

/**
 * Generates audit summary statistics.
 */
export function compileAuditSummary(
  pillars: ArchitecturePillar[],
  adrs: ADRRecord[]
): AuditSummary {
  const overallScore = calculateCompositeAuditScore(pillars);
  const grade = getScoreGrade(overallScore);

  const verifiedADRs = adrs.filter((a) => a.status === 'Dev-verified').length;
  const proposedADRs = adrs.filter((a) => a.status === 'Proposed').length;
  const deferredADRs = adrs.filter((a) => a.status === 'Deferred').length;

  return {
    overallScore,
    grade,
    totalADRs: adrs.length,
    verifiedADRs,
    proposedADRs,
    deferredADRs,
    highSeverityRisks: 3, // Single-node blast radius, AWS parity gap, unsealed key recovery
    mediumSeverityRisks: 4, // Local PV migration, Intel AMT shared LAN, heavy governance overhead, tenancy complexity
    lowSeverityRisks: 2, // License baseline tracking, doc drift
    primaryVerdict:
      'Exceptional architectural governance and zero-trust engineering discipline, but currently constrained by single-node hardware failure domains and the inherent semantic limitations of AWS API emulation.',
  };
}

/**
 * Simulates testing an AWS CLI call or SDK request against Twinfra endpoint.
 */
export function simulateAWSCall(service: string, action: string, payload: Record<string, unknown>) {
  const normalizedService = service.toLowerCase();
  
  if (normalizedService === 's3' && action === 'PutObject') {
    const bucket = (payload.Bucket as string) || '';
    if (!bucket) {
      return {
        success: false,
        statusCode: 400,
        errorCode: 'InvalidBucketName',
        message: 'The specified bucket does not exist or was omitted.',
        emulationTier: 'Tier 1 (Real Storage via CNPG/Object backend)',
      };
    }
    return {
      success: true,
      statusCode: 200,
      eTag: '"b10a8db164e0754105b7a99be72e3fe5"',
      message: `Object uploaded successfully to ${bucket}. SigV4 authentication verified by APISIX gateway.`,
      emulationTier: 'Tier 1 (Real)',
    };
  }

  if (normalizedService === 'iam' && action === 'CreateRole') {
    const roleName = (payload.RoleName as string) || '';
    return {
      success: true,
      statusCode: 200,
      arn: `arn:aws:iam::123456789012:role/${roleName || 'twinfra-app-role'}`,
      message: `Role mapped to Keycloak service account and Kubernetes RoleBinding in namespace workload-apps.`,
      emulationTier: 'Tier 1 (Keycloak Federation)',
    };
  }

  if (normalizedService === 'ec2' && action === 'RunInstances') {
    return {
      success: true,
      statusCode: 200,
      instanceId: 'i-0twinfra7849c9a01',
      state: 'running (mapped to Kubernetes Pod on node twinfra-dev-cairo-1)',
      message: 'RunInstances intercepted by Ministack -> translated to Pod spec with restricted PSS profile.',
      emulationTier: 'Tier 3 (Emulated / MiniStack)',
    };
  }

  if (normalizedService === 'dynamodb' || normalizedService === 'sqs') {
    return {
      success: true,
      statusCode: 200,
      message: `Handled by in-cluster MiniStack emulator over local port 4566. State is in-memory/ephemeral.`,
      emulationTier: 'Tier 2/3 (MiniStack in-memory emulator)',
    };
  }

  return {
    success: true,
    statusCode: 200,
    message: `Action ${action} on service ${service} accepted by Twinfra API gateway.`,
    emulationTier: 'Generic AWS Gateway Handler',
  };
}
