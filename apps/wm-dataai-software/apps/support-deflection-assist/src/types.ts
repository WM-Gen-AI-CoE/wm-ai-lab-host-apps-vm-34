export type StepId =
  | 'intro'
  | 'queue'
  | 'retrieval'
  | 'draft'
  | 'validate'
  | 'escalate'
  | 'impact'
  | 'enhancements';

export interface KPI {
  label: string;
  baseline: string;
  improved: string;
}

export type Severity = 'S1' | 'S2' | 'S3' | 'S4';
export type Tier = 'Enterprise' | 'Growth' | 'Starter';

export interface Ticket {
  id: string;
  account: string;
  tier: Tier;
  subject: string;
  issueType: string;
  severity: Severity;
  age: string;
  status: 'New' | 'Classified' | 'In progress' | 'Escalated' | 'Resolved';
  classifyConfidence: 'High' | 'Medium' | 'Low';
}

export interface RetrievedItem {
  id: string;
  kind: 'Resolved case' | 'Known defect' | 'Release note' | 'KB article';
  title: string;
  relevance: number; // 0-100 relevance score
  source: string;
  detail: string;
}

export interface TroubleshootStep {
  step: number;
  text: string;
}

export interface EvidenceConfig {
  title: string;
  sourceRecords: string[];
  rationale: string;
  confidence: string;
  missingInfo: string[];
  escalationTriggers: string[];
  auditTrail: string[];
}
