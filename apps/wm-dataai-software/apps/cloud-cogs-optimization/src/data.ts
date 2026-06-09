import { KPI, Workload, CostComponent, Recommendation, EvidenceConfig, StepId } from './types';

// KPI directions grounded in WM HT&S platform-consolidation and cost-optimization
// proof plus Databricks lakehouse delivery; public Databricks job-optimization
// research showed roughly 19% compute cost savings on tuned jobs.
export const kpis: KPI[] = [
  { label: 'Addressable cloud waste', baseline: '12%', improved: '4%' },
  { label: 'Gross margin', baseline: '74%', improved: '78%' },
  { label: 'Cost per active customer', baseline: '$3.10', improved: '$2.45' },
  { label: 'Compute cost of top workloads', baseline: '0%', improved: '-19%' },
];

// Top cost workloads on the spend-anomaly feed.
export const workloads: Workload[] = [
  { id: '1', name: 'analytics-elt-nightly', service: 'Databricks Jobs (us-east-1)', owner: 'Priya Raman', team: 'Data Platform', monthlySpend: 88400, trendPct: 41, wasteEstimate: 26500, status: 'Anomaly', confidence: 'High' },
  { id: '2', name: 'api-gateway-prod', service: 'EKS / EC2 (us-east-1)', owner: 'Marcus Bell', team: 'Platform Eng', monthlySpend: 61200, trendPct: 6, wasteEstimate: 9800, status: 'Watch', confidence: 'High' },
  { id: '3', name: 'event-ingest-stream', service: 'Kinesis + Lambda (us-west-2)', owner: 'Dana Cho', team: 'Ingestion', monthlySpend: 47900, trendPct: 12, wasteEstimate: 7100, status: 'Watch', confidence: 'Medium' },
  { id: '4', name: 'customer-data-lake', service: 'S3 + Athena (us-east-1)', owner: 'Leo Fischer', team: 'Data Platform', monthlySpend: 39600, trendPct: 3, wasteEstimate: 12300, status: 'Watch', confidence: 'Medium' },
  { id: '5', name: 'ml-feature-store', service: 'Databricks Jobs (us-west-2)', owner: 'Priya Raman', team: 'ML Platform', monthlySpend: 34100, trendPct: -8, wasteEstimate: 1200, status: 'Optimized', confidence: 'High' },
];

// The workload the demo walks through: analytics-elt-nightly.
export const costBreakdown: CostComponent[] = [
  { label: 'Compute (all-purpose clusters)', monthly: 61800, utilization: 28, note: 'Two long-running all-purpose clusters left warm overnight; average CPU utilization 28% across the run window.' },
  { label: 'Storage (intermediate + shuffle)', monthly: 14200, utilization: 71, note: 'Shuffle spill and uncompacted intermediate tables; 71% of provisioned volume in active use.' },
  { label: 'Data egress (cross-region copy)', monthly: 12400, utilization: 44, note: 'Nightly cross-region copy to us-west-2 replica that downstream reporting no longer reads.' },
];

// Ranked optimization actions for analytics-elt-nightly.
export const recommendations: Recommendation[] = [
  { id: 'rec-rightsize', action: 'Move the ELT from two all-purpose clusters to a single job cluster sized to the observed workload', category: 'Rightsize', projectedSavings: 14900, effort: 'Low', risk: 'Low - job clusters spin up per run; no shared state to migrate.', slaNote: 'Nightly SLA is 06:00; rightsized run completes by 04:40 with headroom.', rollback: 'Revert the job definition to the prior cluster policy; takes effect on the next run.' },
  { id: 'rec-schedule', action: 'Shift the cross-region replica copy from nightly to on-demand, triggered only when reporting requests it', category: 'Schedule', projectedSavings: 9200, effort: 'Low', risk: 'Low - replica is a convenience copy; source of record is unchanged.', slaNote: 'No customer-facing SLA depends on the replica; reporting tolerates a 30-minute build.', rollback: 'Re-enable the nightly trigger in the scheduler.' },
  { id: 'rec-query', action: 'Tune the three heaviest ELT queries (partition pruning + compact intermediates) and enable autoscaling floor of 2', category: 'Query/Cluster Tuning', projectedSavings: 6400, effort: 'Medium', risk: 'Medium - query rewrites need a validation run against last week of data.', slaNote: 'Validation run scheduled off-peak; production cutover gated on a passing diff.', rollback: 'Feature-flag the tuned queries; flip back to the original plan if the diff fails.' },
  { id: 'rec-storage', action: 'Tier intermediate tables older than 7 days to infrequent-access storage', category: 'Storage Tiering', projectedSavings: 1800, effort: 'Low', risk: 'Low - intermediates are reproducible from source.', slaNote: 'No SLA impact; retrieval latency acceptable for the rare reprocessing case.', rollback: 'Lifecycle policy can be removed; objects restore to standard tier on access.', optional: true },
];

export const stepEvidence: Record<StepId, EvidenceConfig> = {
  intro: { title: '', sourceRecords: [], rationale: '', confidence: 'High', missingInfo: [], escalationTriggers: [], auditTrail: [] },
  enhancements: { title: '', sourceRecords: [], rationale: '', confidence: 'High', missingInfo: [], escalationTriggers: [], auditTrail: [] },
  detect: {
    title: 'Anomaly Detection & Ranking',
    sourceRecords: ['Cloud billing exports (CUR, daily)', 'Databricks job & cluster usage logs', 'Workload-to-team ownership map', 'Customer traffic & active-account telemetry'],
    rationale: 'analytics-elt-nightly is surfaced first: spend rose 41% month over month against flat customer traffic, and the run telemetry shows clusters held warm at 28% average utilization. The waste estimate of $26.5K/mo is the largest on the feed.',
    confidence: 'High',
    missingInfo: ['Two workloads show Medium confidence because their tagging is incomplete and spend cannot be fully attributed'],
    escalationTriggers: ['A spend spike traces to a customer-facing incident rather than waste', 'An anomaly lands on an untagged workload with no clear owner'],
    auditTrail: ['02:14 AM: Billing export ingested; 5 top-cost workloads ranked.', '02:14 AM: analytics-elt-nightly flagged - 41% MoM spike vs flat traffic.'],
  },
  analyze: {
    title: 'Cost Breakdown & Root Cause',
    sourceRecords: ['Per-cluster CPU & memory utilization', 'Storage and shuffle-spill metrics', 'Cross-region egress logs', 'SKU rate card (on-demand vs job-cluster pricing)'],
    rationale: 'Compute is 74% of the workload cost at only 28% utilization - the dominant waste driver. A nightly cross-region replica copy adds $12.4K/mo of egress that downstream reporting no longer reads. Root cause: all-purpose clusters left warm plus an orphaned replica job.',
    confidence: 'High',
    missingInfo: ['Confirm no downstream consumer still reads the us-west-2 replica before changing its schedule'],
    escalationTriggers: ['Utilization data is incomplete for the run window', 'A cost component maps to a workload outside this team'],
    auditTrail: ['02:16 AM: Cost decomposed into compute, storage, egress.', '02:16 AM: Compute flagged at 28% utilization across the run window.'],
  },
  recommend: {
    title: 'Optimization Actions & Tradeoffs',
    sourceRecords: ['Root-cause analysis (compute / storage / egress)', 'Nightly SLA definition (06:00 completion)', 'SKU economics & job-cluster pricing', 'Databricks job-optimization benchmarks'],
    rationale: 'Four ranked actions total roughly $32K/mo in projected savings. Rightsizing to a single job cluster is the highest-value, lowest-risk move. Each action carries an SLA note and a rollback path so the owning engineer can judge the tradeoff, not just the dollar figure.',
    confidence: 'High',
    missingInfo: ['Query-tuning savings are an estimate until the validation run completes'],
    escalationTriggers: ['A recommended change would put the nightly SLA at risk', 'Projected savings depend on a config the team has not approved'],
    auditTrail: ['02:18 AM: 4 actions generated and ranked by savings and risk.', '02:18 AM: Each action paired with SLA guardrail and rollback note.'],
  },
  approve: {
    title: 'Owner Approval Gate',
    sourceRecords: ['Selected recommendations', 'Workload owner & on-call assignment', 'Change-management policy (off-peak cutover)'],
    rationale: 'Nothing changes in the environment until the owning engineer approves it. Each approval records who approved, the rollback note, and the SLA guardrail. Returned items go back with a reason and never apply.',
    confidence: 'High',
    missingInfo: ['Query-tuning action is held for a validation run before it can be approved for production'],
    escalationTriggers: ['An approval would breach the off-peak change window', 'Owner returns an action - it is logged and excluded from the change set'],
    auditTrail: ['02:21 AM: Change set assembled from approved actions.', '- Awaiting owner approval; no change applied yet.'],
  },
  impact: {
    title: 'Savings Realized & Margin Bridge',
    sourceRecords: ['Post-change billing deltas', 'Gross-margin model (revenue vs cloud COGS)', 'Active-customer count', 'Top-workload compute cost trend'],
    rationale: 'Approved changes are tracked against realized billing, not projections. On this workload, compute cost fell 19% and the savings flow into a gross-margin bridge that finance owns. Cost per active customer drops as the waste is removed, not by adding customers.',
    confidence: 'High',
    missingInfo: [],
    escalationTriggers: ['Realized savings diverge materially from the projection', 'A change is later rolled back - the margin bridge is restated'],
    auditTrail: ['Next run, 02:40 AM: Rightsized job completed under SLA.', '03:00 AM: Realized compute cost -19%; margin bridge updated.'],
  },
};
