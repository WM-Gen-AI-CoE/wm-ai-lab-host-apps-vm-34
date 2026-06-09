export type StepId =
  | 'intro'
  | 'candidate'
  | 'analyze'
  | 'remediate'
  | 'signoff'
  | 'impact'
  | 'enhancements';

export interface KPI {
  label: string;
  baseline: string;
  improved: string;
}

export interface ReleaseCandidate {
  id: string;
  name: string;
  service: string;
  version: string;
  targetWindow: string;
  riskScore: number;
  riskLevel: 'High' | 'Medium' | 'Low';
  status: 'Awaiting review' | 'In analysis' | 'Remediation' | 'Sign-off' | 'Shipped';
}

export interface DossierArtifact {
  category: 'Requirement' | 'Code change' | 'Test result' | 'Open defect' | 'Incident' | 'Customer impact';
  ref: string;
  summary: string;
  detail: string;
  signal: 'clean' | 'watch' | 'risk';
}

export interface TestGap {
  id: string;
  area: string;
  description: string;
  evidence: string;
  severity: 'High' | 'Medium' | 'Low';
  recommendation: string;
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
