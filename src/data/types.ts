// Evidence levels follow Twinfra ADR-0052. "Signed" means Dev-verified: live on the dev
// environment with a receipt whose tester sign-off is Accepted.
export type Evidence = 'signed' | 'observed' | 'emulated' | 'planned';

export interface Component {
  name: string;
  detail: string;
  evidence: Evidence;
  note: string;
}

export interface Layer {
  id: string;
  title: string;
  components: Component[];
}

export interface AwsService {
  service: string;
  group: string;
  tier: 1 | 2;
  status: 'emulated' | 'planned' | 'out-of-scope';
  note: string;
}

export interface Receipt {
  workOrder: string;
  title: string;
  proves: string;
  href: string;
}

export interface Adr {
  id: string;
  title: string;
  status: string;
  href: string;
}

export interface Milestone {
  when: string;
  title: string;
  detail: string;
  done?: boolean;
}

export interface Correction {
  claim: string;
  fact: string;
}
