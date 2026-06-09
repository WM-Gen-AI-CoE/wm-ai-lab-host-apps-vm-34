export type StepId =
  | 'intro'
  | 'intake'
  | 'review'
  | 'leakage'
  | 'recommend'
  | 'approval'
  | 'impact'
  | 'enhancements';

export interface KPI {
  label: string;
  baseline: string;
  improved: string;
}

export interface QuoteRequest {
  id: string;
  account: string;
  segment: 'Enterprise' | 'Mid-Market' | 'Commercial';
  type: 'Renewal' | 'New Business' | 'Expansion';
  arr: string;
  requestedDiscount: string;
  status: 'Needs review' | 'In deal desk' | 'Awaiting approval' | 'Synced';
  priority: 'High' | 'Medium' | 'Low';
  triage: string;
}

export interface ContextItem {
  id: string;
  label: string;
  value: string;
  detail: string;
  confidence: 'High' | 'Medium' | 'Low';
  flagged?: string;
}

export interface LeakageFlag {
  id: string;
  title: string;
  category: 'Discount leakage' | 'Nonstandard term' | 'Uplift gap';
  impact: string;
  basis: string;
  severity: 'High' | 'Medium' | 'Low';
}

export interface BridgeRow {
  label: string;
  value: string;
  kind: 'base' | 'add' | 'subtract' | 'total';
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
