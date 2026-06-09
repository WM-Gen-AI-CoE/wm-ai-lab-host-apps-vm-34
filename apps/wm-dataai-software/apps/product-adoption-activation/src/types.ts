export type StepId =
  | 'intro'
  | 'cohorts'
  | 'diagnose'
  | 'plays'
  | 'approve'
  | 'monitor'
  | 'enhancements';

export interface KPI {
  label: string;
  baseline: string;
  improved: string;
}

export interface Cohort {
  id: string;
  name: string;
  segment: string;
  plan: string;
  signupSource: string;
  accounts: number;
  activationRate: number; // % through the key activation journey
  trend: 'Stalled' | 'Healthy' | 'Recovering';
  blocker: string; // short label of the suspected blocker
}

export interface FunnelStage {
  stage: string;
  stalledPct: number; // % of stalled cohort that reached this stage
  healthyPct: number; // % of the comparison healthy cohort that reached this stage
  isBlocker?: boolean; // the stage where the two cohorts diverge most
}

export interface Play {
  id: string;
  channel: 'In-app nudge' | 'Enablement path' | 'CSM outreach';
  title: string;
  audience: string;
  draft: string; // drafted copy or outline - customer-facing copy must not mention AI
  rationale: string; // internal note on why this play
  customerFacing: boolean;
}

export interface ExperimentMetric {
  label: string;
  current: string;
  target: string;
  status: 'On track' | 'Watch' | 'Ahead';
}

export interface EvidenceConfig {
  title: string;
  sourceRecords: string[];
  rationale: string;
  confidence: 'High' | 'Medium' | 'Low';
  missingInfo: string[];
  escalationTriggers: string[];
  auditTrail: string[];
}
