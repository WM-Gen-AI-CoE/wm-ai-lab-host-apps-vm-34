import { KPI, Cohort, FunnelStage, Play, ExperimentMetric, EvidenceConfig, StepId } from './types';

// KPI targets grounded in West Monroe product-led growth work: a 7% YoY lift in a
// key utilization metric for a $1B ARR SaaS provider, plus an NRR-focused CS model
// redesign. The narrative: turn product telemetry into finance-owned retention and
// expansion by fixing the activation journeys that stall before value is reached.
export const kpis: KPI[] = [
  { label: 'Activation rate (key journey)', baseline: '52%', improved: '64%' },
  { label: 'Feature adoption (target features)', baseline: '38%', improved: '51%' },
  { label: '30-day usage lift', baseline: '0%', improved: '+11%' },
  { label: 'Expansion-qualified accounts', baseline: '120', improved: '280' },
];

export const cohorts: Cohort[] = [
  { id: '1', name: 'Self-serve Growth - PLG signups', segment: 'Mid-market', plan: 'Growth', signupSource: 'Self-serve / website', accounts: 412, activationRate: 41, trend: 'Stalled', blocker: 'Never connected a data source' },
  { id: '2', name: 'Sales-led Enterprise onboards', segment: 'Enterprise', plan: 'Enterprise', signupSource: 'Sales-assisted', accounts: 96, activationRate: 73, trend: 'Healthy', blocker: 'None - reference cohort' },
  { id: '3', name: 'Free-trial - paid-ads source', segment: 'SMB', plan: 'Starter', signupSource: 'Paid search', accounts: 540, activationRate: 38, trend: 'Stalled', blocker: 'Stalled before first workspace invite' },
  { id: '4', name: 'Partner-referred onboards', segment: 'Mid-market', plan: 'Growth', signupSource: 'Partner referral', accounts: 188, activationRate: 58, trend: 'Recovering', blocker: 'Slow second-seat invite' },
  { id: '5', name: 'Migrated legacy accounts', segment: 'Enterprise', plan: 'Enterprise', signupSource: 'Migration', accounts: 64, activationRate: 67, trend: 'Healthy', blocker: 'None' },
];

// The selected stalled cohort the demo walks through: cohort #1 (Self-serve Growth).
// Comparison reference: cohort #2 (Sales-led Enterprise, healthy activation).
export const funnel: FunnelStage[] = [
  { stage: 'Signed up', stalledPct: 100, healthyPct: 100 },
  { stage: 'Completed setup wizard', stalledPct: 88, healthyPct: 94 },
  { stage: 'Connected a data source', stalledPct: 34, healthyPct: 89, isBlocker: true },
  { stage: 'Built first dashboard', stalledPct: 27, healthyPct: 81 },
  { stage: 'Invited a teammate', stalledPct: 19, healthyPct: 76 },
  { stage: 'Returned in week 2 (activated)', stalledPct: 41, healthyPct: 73 },
];

export const plays: Play[] = [
  {
    id: 'p1', channel: 'In-app nudge', title: 'Connect your first data source', audience: 'Self-serve Growth accounts stuck after setup',
    draft: 'You are almost set up. Connect a data source to see your first live dashboard in under two minutes. Start with a sample dataset if you are not ready to bring your own.',
    rationale: 'The funnel diverges hardest at "Connected a data source" (34% vs 89%). A contextual nudge with a sample-data shortcut removes the blank-slate blocker.',
    customerFacing: true,
  },
  {
    id: 'p2', channel: 'Enablement path', title: '3-step guided activation path', audience: 'New Growth-plan workspaces, days 1 to 7',
    draft: 'Guided checklist: (1) Connect a source, (2) Build a starter dashboard from a template, (3) Invite one teammate. Each step links to a 60-second walkthrough and unlocks the next.',
    rationale: 'Healthy cohorts reach the dashboard and invite stages far more often. A sequenced checklist mirrors that proven path for self-serve users who lack an onboarding manager.',
    customerFacing: true,
  },
  {
    id: 'p3', channel: 'CSM outreach', title: 'Targeted CSM check-in for high-ARR stalls', audience: 'Stalled accounts above $25K ARR potential',
    draft: 'Internal brief for the CSM: account stalled at data-source connection on day 6. Offer a 20-minute setup working session and share the integration that fits their stack. Goal: get to first dashboard this week.',
    rationale: 'A small slice of the stalled cohort carries outsized expansion potential. Human CSM touch is reserved for accounts where the activation lift justifies the cost.',
    customerFacing: false,
  },
];

export const experimentMetrics: ExperimentMetric[] = [
  { label: 'Activation rate (cohort)', current: '57%', target: '64%', status: 'On track' },
  { label: 'Data-source connect rate', current: '61%', target: '70%', status: 'On track' },
  { label: '30-day usage lift', current: '+8%', target: '+11%', status: 'Watch' },
  { label: 'Expansion-qualified accounts', current: '186', target: '280', status: 'Ahead' },
];

export const stepEvidence: Record<StepId, EvidenceConfig> = {
  intro: { title: '', sourceRecords: [], rationale: '', confidence: 'High', missingInfo: [], escalationTriggers: [], auditTrail: [] },
  enhancements: { title: '', sourceRecords: [], rationale: '', confidence: 'High', missingInfo: [], escalationTriggers: [], auditTrail: [] },
  cohorts: {
    title: 'Cohort Segmentation',
    sourceRecords: ['Product telemetry (events warehouse)', 'Billing & plan registry', 'Signup-source attribution (CRM)'],
    rationale: 'Cohorts are segmented by plan, segment, and signup source, then scored against the key activation journey. The Self-serve Growth cohort (412 accounts) is surfaced first: activation has fallen to 41% while a comparable healthy cohort sits at 73%, and it carries the largest absolute count of stalled accounts.',
    confidence: 'High',
    missingInfo: ['Two cohorts have fewer than 100 accounts, so their rates carry wider confidence intervals'],
    escalationTriggers: ['A cohort activation rate drops more than 10 points week over week', 'Telemetry feed delayed beyond 24 hours'],
    auditTrail: ['08:10 AM: Cohorts rebuilt from 7-day telemetry snapshot.', '08:11 AM: PM opened the Self-serve Growth cohort.'],
  },
  diagnose: {
    title: 'Activation Blocker Diagnosis',
    sourceRecords: ['Stalled-cohort funnel (412 accounts)', 'Healthy comparison cohort (96 accounts)', 'Per-stage event timestamps'],
    rationale: 'The two funnels track closely through setup, then diverge sharply at "Connected a data source": 34% of the stalled cohort versus 89% of the healthy cohort. Downstream stages collapse from there, identifying data-source connection as the primary activation blocker rather than signup quality.',
    confidence: 'High',
    missingInfo: ['Whether the connection failure is UX friction or a missing integration is not yet separable from events alone'],
    escalationTriggers: ['The largest divergence shifts to a different stage on refresh', 'A blocker correlates with a single integration outage'],
    auditTrail: ['08:14 AM: Stalled vs healthy funnels compared across 6 stages.', '08:15 AM: PM validated the data-source stage as the blocker.'],
  },
  plays: {
    title: 'Intervention Drafting',
    sourceRecords: ['Diagnosed blocker (data-source connection)', 'Prior winning nudge & checklist library', 'CSM capacity & account-value model'],
    rationale: 'Three plays are drafted against the blocker: an in-app nudge with a sample-data shortcut, a 3-step guided enablement path, and a targeted CSM outreach reserved for high-ARR stalls. Customer-facing nudge and path copy is written for end users and makes no reference to how it was produced.',
    confidence: 'Medium',
    missingInfo: ['Final nudge wording and frequency caps are subject to PM edit before launch'],
    escalationTriggers: ['A draft nudge could fire more than once per session', 'CSM outreach volume exceeds available capacity'],
    auditTrail: ['08:18 AM: 3 plays drafted from the diagnosed blocker.', '- Awaiting PM edit and approval.'],
  },
  approve: {
    title: 'Experiment Approval Gate',
    sourceRecords: ['Edited play set', 'Experiment design template (control vs treatment)', 'Success-criteria & guardrail registry'],
    rationale: 'The plays become a scoped experiment only after a PM approves them. The PM sets the audience, the holdout, the primary success metric, and guardrails. Nothing ships to users until this human gate is cleared, and the approved scope is logged.',
    confidence: 'High',
    missingInfo: ['Approver sign-off pending'],
    escalationTriggers: ['Requested audience exceeds the approved blast radius', 'No holdout group defined for the experiment'],
    auditTrail: ['08:22 AM: Experiment scoped from approved plays.', '08:23 AM: Awaiting PM approval signature.'],
  },
  monitor: {
    title: 'Experiment Monitoring',
    sourceRecords: ['Live experiment telemetry (treatment vs holdout)', '30-day usage rollups', 'Expansion / NRR linkage model'],
    rationale: 'The monitor tracks activation, 30-day usage lift, and expansion-qualified accounts against targets, treatment versus holdout. Early reads show activation recovering toward target and expansion-qualified accounts climbing, linking the product fix to a finance-owned retention and expansion outcome.',
    confidence: 'Medium',
    missingInfo: ['30-day usage lift is still inside the measurement window and may move'],
    escalationTriggers: ['A guardrail metric (unsubscribe or churn) regresses', 'Treatment and holdout diverge beyond the planned blast radius'],
    auditTrail: ['Day 14: Experiment monitor live; activation +5 pts vs holdout.', 'Day 14: Expansion-qualified accounts up 66 in treatment.'],
  },
};
