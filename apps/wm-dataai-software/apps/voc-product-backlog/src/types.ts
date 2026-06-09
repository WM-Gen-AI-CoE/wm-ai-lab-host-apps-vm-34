export type StepId =
  | 'intro'
  | 'ingest'
  | 'cluster'
  | 'link'
  | 'brief'
  | 'prioritize'
  | 'handoff'
  | 'enhancements';

export interface KPI {
  label: string;
  baseline: string;
  improved: string;
}

export interface VOCSource {
  id: string;
  name: string;
  channel: string;
  volume: string;
  window: string;
  status: 'In scope' | 'Sampling' | 'Excluded';
  note: string;
}

export interface ThemeRecord {
  id: string;
  source: string;
  account: string;
  excerpt: string;
  sentiment: 'Negative' | 'Neutral' | 'Positive';
}

export interface Theme {
  id: string;
  name: string;
  mentions: number;
  trend: string;
  summary: string;
  records: ThemeRecord[];
}

export interface ThemeLink {
  themeId: string;
  themeName: string;
  arrAtRisk: string;
  churnAccounts: number;
  relatedDefects: string[];
  roadmapItems: string[];
  confidence: 'High' | 'Medium' | 'Low';
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
