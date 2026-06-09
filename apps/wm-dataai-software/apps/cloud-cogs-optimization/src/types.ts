export type StepId =
  | 'intro'
  | 'detect'
  | 'analyze'
  | 'recommend'
  | 'approve'
  | 'impact'
  | 'enhancements';

export interface KPI {
  label: string;
  baseline: string;
  improved: string;
}

export interface Workload {
  id: string;
  name: string;
  service: string;
  owner: string;
  team: string;
  monthlySpend: number;
  trendPct: number; // month-over-month change in spend
  wasteEstimate: number; // estimated monthly waste in dollars
  status: 'Anomaly' | 'Watch' | 'Optimized' | 'Steady';
  confidence: 'High' | 'Medium' | 'Low';
}

export interface CostComponent {
  label: string;
  monthly: number;
  utilization: number; // 0-100 percent
  note: string;
}

export interface Recommendation {
  id: string;
  action: string;
  category: 'Rightsize' | 'Schedule' | 'Query/Cluster Tuning' | 'Storage Tiering';
  projectedSavings: number; // monthly dollars
  effort: 'Low' | 'Medium' | 'High';
  risk: string;
  slaNote: string;
  rollback: string;
  optional?: boolean;
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
