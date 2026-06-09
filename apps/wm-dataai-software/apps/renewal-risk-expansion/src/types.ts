export type StepId =
  | 'intro'
  | 'portfolio'
  | 'signals'
  | 'drivers'
  | 'playbook'
  | 'approval'
  | 'impact'
  | 'enhancements';

export interface KPI {
  label: string;
  baseline: string;
  improved: string;
}

export interface Account {
  id: string;
  name: string;
  segment: 'Enterprise' | 'Mid-Market' | 'Commercial';
  arr: string;
  renewalDate: string;
  nrr: string;
  riskScore: number; // 0-100, higher = more at risk
  riskTier: 'High' | 'Medium' | 'Low';
  csm: string;
  trend: 'up' | 'down' | 'flat';
}

export interface Signal {
  id: string;
  category: 'Product Usage' | 'Support History' | 'CSM Notes' | 'Contract Terms' | 'Sentiment' | 'Adoption';
  headline: string;
  detail: string;
  polarity: 'risk' | 'positive' | 'neutral';
  source: string;
}

export interface RiskDriver {
  id: string;
  driver: string;
  weight: number; // contribution to risk score, percent
  detail: string;
}

export interface ExpansionPlay {
  id: string;
  play: string;
  arrImpact: string;
  rationale: string;
}

export interface PlaybookItem {
  id: string;
  type: 'Save offer' | 'Exec sponsor' | 'Training' | 'Expansion proposal';
  owner: string;
  draft: string;
  needsApproval: boolean;
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
