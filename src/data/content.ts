// Every statement here is checked against amazen33/twinfra main on 2026-10-21:
// README.md, docs/capabilities.md, docs/adr/, docs/acceptance/ and compatibility.yaml.
// Keep claims no stronger than the evidence behind them (ADR-0052).
import type { AwsService, Correction, Layer, Milestone, Receipt } from './types.ts';

export const REPO = 'https://github.com/amazen33/twinfra';
const doc = (path: string) => `${REPO}/blob/main/${path}`;

export const STATUS = {
  version: 'v0.1.0',
  stage: 'Acceptance candidate for dev use, not yet released',
  stableTarget: 'around 9 November 2026',
  environment: 'One bare-metal Ubuntu 24.04 node (twinfra-dev-cairo-1)',
  notClaimed: 'High availability, multi-tenancy, compliance and production readiness are not claimed.',
};

export const PRINCIPLES = [
  {
    title: 'Evidence first',
    adr: 'ADR-0052',
    href: doc('docs/adr/0052-evidence-first-foundation-1-0.md'),
    text: 'A capability counts only when it runs on the dev environment and a tester has signed its receipt. The README may never claim more than the evidence.',
  },
  {
    title: 'Permissive licences',
    adr: 'ADR-0054',
    href: doc('docs/adr/0054-licence-ladder-and-enterprise-grade-gate.md'),
    text: 'MIT and BSD first, then Apache-2.0. Copyleft needs an owner decision. AGPL, SSPL, BUSL and Elastic licences never ship. That is why Valkey replaced Redis and Grafana was removed.',
  },
  {
    title: 'Scanned supply chain',
    adr: 'ADR-0049',
    href: doc('docs/adr/0049-supply-chain-vulnerability-scanning.md'),
    text: 'Grype, Syft and OSV-Scanner check every image and dependency. Images are pinned by digest and GitHub Actions by commit SHA.',
  },
  {
    title: 'GitOps and default deny',
    adr: 'ADR-0007',
    href: doc('docs/adr/0007-argocd.md'),
    text: 'Argo CD reconciles the cluster from Git. Cilium runs native routing with default deny for ingress and egress, so every flow needs an explicit policy.',
  },
];

export const LAYERS: Layer[] = [
  {
    id: 'access',
    title: 'Access',
    components: [
      { name: 'Twinfra console', detail: 'Web console for AWS-style services', evidence: 'signed', note: 'Signed token verification (WO-04).' },
      { name: 'AWS CLI and SDKs', detail: 'Standard AWS clients with signed (SigV4) requests', evidence: 'planned', note: 'Today the console makes the signed calls to the emulator.' },
    ],
  },
  {
    id: 'edge',
    title: 'Gateway and identity',
    components: [
      { name: 'Apache APISIX', detail: 'API gateway and HTTPS entry point', evidence: 'signed', note: 'Trusted HTTPS sign-in is part of the signed WO-31 receipt.' },
      { name: 'Keycloak 26.8', detail: 'OpenID Connect sign-in with TOTP', evidence: 'signed', note: 'Sign-in signed in WO-31; console roles and audit follow in WO-11.' },
    ],
  },
  {
    id: 'aws',
    title: 'AWS-compatible API',
    components: [
      { name: 'MiniStack 1.5', detail: 'MIT-licensed emulator for the long tail of AWS APIs', evidence: 'emulated', note: 'S3, EC2 and DynamoDB subsets. State is not persisted across restarts.' },
      { name: 'Real backends', detail: 'S3 on SeaweedFS, real compute', evidence: 'planned', note: 'WO-22, after Foundation 1.0.' },
    ],
  },
  {
    id: 'platform',
    title: 'Platform services',
    components: [
      { name: 'CloudNativePG', detail: 'PostgreSQL 18.6 with pgvector 0.8.2', evidence: 'signed', note: 'Healthy database signed in WO-31. Backups and restore drill: WO-09.' },
      { name: 'Argo CD 3.5', detail: 'GitOps reconciliation from GitHub', evidence: 'signed', note: 'Reconciliation signed in WO-31.' },
      { name: 'Valkey 8.1', detail: 'Cache for Argo CD (replaced Redis)', evidence: 'signed', note: 'Signed in WO-25.' },
      { name: 'OpenBao', detail: 'Secrets engine (open-source Vault fork)', evidence: 'observed', note: 'Running. Initialisation, unseal and leases: WO-08.' },
    ],
  },
  {
    id: 'substrate',
    title: 'Kubernetes and host',
    components: [
      { name: 'Kubernetes 1.36 (kubeadm)', detail: 'Upstream Kubernetes on Ubuntu 24.04', evidence: 'signed', note: 'Ready node and 12-hour soak signed in WO-31.' },
      { name: 'etcd 3.6 and CoreDNS 1.14', detail: 'Control-plane data and cluster DNS', evidence: 'signed', note: 'Maintenance to locked digests signed (WO-34 P2).' },
      { name: 'Cilium 1.20', detail: 'eBPF networking, native routing, default deny', evidence: 'observed', note: 'Policies observed; signed enforcement acceptance pending.' },
      { name: 'Static host network', detail: 'Fixed node address with safe network changes', evidence: 'signed', note: 'Survived a 40-second router outage (WO-36); rollback gap 0.25 s (WO-36a).' },
    ],
  },
  {
    id: 'observability',
    title: 'Observability',
    components: [
      { name: 'Prometheus and OpenTelemetry', detail: 'Metrics, logs and traces with retention', evidence: 'planned', note: 'WO-10 on the current environment.' },
      { name: 'Perses dashboards', detail: 'Apache-2.0 dashboards (Grafana removed)', evidence: 'planned', note: 'WO-10, ADR-0034.' },
    ],
  },
];

const t1 = (service: string, group: string, status: AwsService['status'], note: string): AwsService => ({ service, group, tier: 1, status, note });
const t2 = (service: string, group: string, status: AwsService['status'], note: string): AwsService => ({ service, group, tier: 2, status, note });

export const AWS_SERVICES: AwsService[] = [
  t1('S3', 'Storage', 'emulated', 'Bucket and object listing through MiniStack. Real backend: SeaweedFS (WO-22).'),
  t1('EC2', 'Compute', 'emulated', 'DescribeInstances through MiniStack. No VM provisioning yet (WO-22).'),
  t2('DynamoDB', 'Database', 'emulated', 'Table listing through MiniStack. No production database claim.'),
  t1('IAM, STS and accounts', 'Security', 'planned', 'Accounts map to tenants (ADR-0053, proposed).'),
  t1('KMS, Secrets Manager, SSM', 'Security', 'planned', 'OpenBao is the engine underneath, not this API.'),
  t1('CloudTrail', 'Security', 'planned', 'In the ADR-0029 catalogue.'),
  t1('CloudWatch metrics, alarms, logs', 'Observability', 'planned', 'Prometheus runs underneath, but is not the CloudWatch API.'),
  t1('EBS, AMIs, key pairs, user data, IMDSv2', 'Compute', 'planned', 'Part of the EC2 catalogue (WO-22).'),
  t1('VPC and security groups', 'Network', 'planned', 'In the network catalogue.'),
  t1('Elastic Load Balancing, Auto Scaling', 'Compute', 'planned', 'In the ADR-0029 catalogue.'),
  t1('Lambda', 'Compute', 'planned', 'Go runtime first.'),
  t1('RDS for PostgreSQL', 'Database', 'planned', 'Per-account CloudNativePG clusters.'),
  t1('ECR', 'Containers', 'planned', 'OCI registry underneath, not the ECR API.'),
  t1('EKS', 'Containers', 'planned', 'kubeadm underneath, not the EKS API.'),
  t1('CloudFormation and CDK output', 'Management', 'planned', 'In the ADR-0029 catalogue.'),
  t2('SQS, SNS, EventBridge', 'Integration', 'planned', 'Tier 2 catalogue.'),
  t2('ElastiCache', 'Database', 'planned', "Argo CD's Valkey cache is not this API."),
  t2('Route 53', 'Network', 'planned', 'Tier 2 catalogue.'),
  t2('Service Quotas', 'Management', 'planned', 'Tier 2 catalogue.'),
  t2('Organizations, billing simulation', 'Management', 'out-of-scope', 'Outside the current tenancy scope.'),
];

export const RECEIPTS: Receipt[] = [
  { workOrder: 'WO-31', title: 'Dev environment on bare metal', proves: 'Ready node, healthy PostgreSQL, Argo CD reconciliation, trusted HTTPS sign-in, 12-hour soak.', href: doc('docs/acceptance/dev-environment-2026-10-13.md') },
  { workOrder: 'WO-36', title: 'Static address through a router outage', proves: 'The node kept its address through a 40-second router outage, with no lease loss or restarts.', href: doc('docs/acceptance/host-network-2026-10-15.md') },
  { workOrder: 'WO-36a', title: 'Safe network changes', proves: 'Network changes apply, refuse or roll back safely; the longest gap was 0.25 seconds.', href: doc('docs/acceptance/host-network-fix-2026-10-15.md') },
  { workOrder: 'WO-34 P2', title: 'Control-plane maintenance', proves: 'etcd 3.6.15 and CoreDNS 1.14.7 run from locked image digests after a planned maintenance.', href: doc('docs/acceptance/wo34-p2-2026-10-15.json') },
  { workOrder: 'WO-04', title: 'Console token verification', proves: 'The console verifies signed sign-in tokens before it trusts them.', href: doc('docs/acceptance/console-token-verification-2026-10-10.md') },
  { workOrder: 'WO-25', title: 'Redis replaced by Valkey', proves: 'Argo CD runs on a Valkey cache, removing a non-permissive licence.', href: doc('docs/acceptance/valkey-2026-10-09.md') },
  { workOrder: 'WO-06', title: 'LocalStack removed', proves: 'LocalStack releases since March 2026 need an account and token, so it was removed. MiniStack (MIT) serves the emulated APIs.', href: doc('docs/acceptance/localstack-removal-2026-10-10.md') },
];

export const FOUNDATION_GATE = [
  { area: 'Host and network', work: 'WO-36, WO-36a', done: true },
  { area: 'Data: backups and a point-in-time restore drill', work: 'WO-09', done: false },
  { area: 'Availability: multi-node readiness, performance baseline, load soak', work: 'WO-33', done: false },
  { area: 'Secrets: OpenBao initialised and unsealed, External Secrets, cert-manager', work: 'WO-08', done: false },
  { area: 'Identity: console roles, forgery protection, audit', work: 'WO-11', done: false },
  { area: 'Observability: durable metrics, logs and traces; one alert delivered; dashboards', work: 'WO-10', done: false },
  { area: 'Policy: admission policies in audit, then enforcement', work: 'WO-05', done: false },
  { area: 'Supply chain: vulnerability gate (done); signed provenance verified at deploy', work: 'ADR-0049, new WO', done: false },
];

export const RELEASE_PLAN: Milestone[] = [
  { when: '17 Oct 2026', title: 'Release acceptance passed', detail: 'The 17-check acceptance suite passed in full on the dev environment, twice.', done: true },
  { when: 'From 26 Oct', title: 'Argo CD 3.5.5', detail: 'Patch update, then the acceptance suite again, including a restart test.' },
  { when: 'By 29 Oct', title: 'Security exception review', detail: 'Every time-boxed scanner exception is renewed with evidence or removed.' },
  { when: '31 Oct', title: 'Code freeze', detail: 'The last v0.1.0 changes merge; main is frozen.' },
  { when: 'About 2 Nov', title: 'Release candidate rc.1', detail: 'A 48-hour window to find problems before stable.' },
  { when: 'About 9 Nov', title: 'Stable v0.1.0', detail: 'Released on the Stable stream.' },
];

export const AFTER_RELEASE: Milestone[] = [
  { when: 'Next', title: 'Backups and restore drill', detail: 'Off-cluster WAL archiving and a timed point-in-time restore (WO-09).' },
  { when: 'Next', title: 'Secrets lifecycle', detail: 'OpenBao initialised and unsealed in an owner ceremony, plus External Secrets and cert-manager (WO-08).' },
  { when: 'Next', title: 'Observability v1', detail: 'Durable metrics, logs and traces, one alert delivered to a person, Perses dashboards (WO-10).' },
  { when: 'Later', title: 'Multi-node readiness', detail: 'Join more nodes; high availability is claimed only with three (ADR-0050, WO-33).' },
  { when: 'Later', title: 'Real S3 and compute', detail: 'SeaweedFS behind the S3 API and real compute behind EC2 (WO-22).' },
  { when: 'Later', title: 'Accounts and IAM', detail: 'AWS-style accounts mapped to tenants, proven by a cross-account denial matrix (ADR-0053).' },
];

export const CRITIQUE = {
  date: '20 October 2026',
  intro:
    'We gave the public repository to an AI model (Gemini, in Google AI Studio) and asked for an architecture critique. It produced a confident, polished "principal architect audit". We then checked every claim against the repository. Some points were sharp, and many facts were wrong.',
  right: [
    { point: 'MiniStack keeps its state in memory.', response: 'True: emulated S3, EC2 and DynamoDB data is lost on restart. The console labels these services Emulated, and WO-22 brings real backends.' },
    { point: 'Backups have not been proven by a restore.', response: 'True. Off-cluster WAL archiving and a timed restore drill (WO-09) are the first item after v0.1.0, and part of the Foundation 1.0 gate.' },
    { point: 'OpenBao initialisation and unseal are not proven.', response: 'True. An owner-run ceremony, External Secrets and cert-manager make up WO-08.' },
    { point: 'Test real Terraform and CDK output against the API.', response: 'Agreed. It goes into the AWS parity scorecard (ADR-0033).' },
    { point: 'Rate-limit the gateway per tenant.', response: 'Agreed. It goes into the tenancy design (ADR-0053) before accounts ship.' },
    { point: 'One node is one failure domain.', response: 'Known and stated in the README. High availability is not claimed until three nodes run (ADR-0050).' },
  ],
  wrong: [
    { claim: 'Lambda, Secrets Manager, KMS, CloudWatch, RDS and IAM are "Real (Dev-verified)".', fact: 'All are Planned. Knative, External Secrets, Perses and Crossplane are not deployed on the dev environment.' },
    { claim: 'S3 is real, backed by "CloudNativePG Blob / OCI".', fact: 'S3 is emulated by MiniStack. The real backend (SeaweedFS) is planned in WO-22.' },
    { claim: 'APISIX validates SigV4 signatures, including chunked uploads.', fact: 'The console signs its requests to MiniStack. The gateway does not validate SigV4.' },
    { claim: 'Twinfra has 54 ADRs.', fact: 'It has 50.' },
    { claim: 'ADR-0005 is Cilium, ADR-0025 is Valkey, ADR-0036 is the host network.', fact: 'They are pgvector, the retired LocalStack lab and the product name.' },
    { claim: 'Valkey 7.2 and Keycloak 24.', fact: 'Valkey 8.1 and Keycloak 26.8.' },
    { claim: 'A "PGP unseal ceremony" protects OpenBao.', fact: 'Initialisation and unseal are not proven yet (WO-08).' },
    { claim: 'Readiness score 72.1/100, grade C+.', fact: 'The scores came from invented weights. Twinfra reports evidence levels, not scores.' },
  ] as Correction[],
  declined: [
    { advice: 'Use MinIO for S3 storage.', reason: 'Its AGPL licence is on the never-ship list (ADR-0054).' },
    { advice: 'Use Ceph or Rook-Ceph for replicated storage.', reason: 'Ceph is LGPL-licensed, which needs a separate licence review. TopoLVM (Apache-2.0) is the chosen first step (ADR-0050).' },
    { advice: 'Archive WAL to Wasabi.', reason: 'A proprietary service. Backups target an S3-compatible store chosen in WO-09.' },
    { advice: 'Drop AWS emulation and offer only open protocols.', reason: 'An AWS-compatible API is the product decision (ADR-0029). Twinfra labels every service Real or Emulated instead.' },
  ],
  lesson:
    'An AI review is a hypothesis, not evidence. It mixed real insight with confident errors, some of them copied from documentation that lagged behind signed receipts. Evidence first applies to reviews too: check each claim against the receipts before acting on it.',
};
