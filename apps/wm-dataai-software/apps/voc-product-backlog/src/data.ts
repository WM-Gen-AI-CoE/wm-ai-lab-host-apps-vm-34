import { KPI, VOCSource, Theme, ThemeLink, EvidenceConfig, StepId } from './types';

// KPI baselines reflect a typical B2B SaaS quarterly planning cycle where evidence
// synthesis is manual and roadmap bets are argued from anecdote rather than ARR.
// WM agentic POV cites up to 75% process-time reduction.
export const kpis: KPI[] = [
  { label: 'Evidence-synthesis time / cycle', baseline: '3.5 weeks', improved: '0.9 weeks' },
  { label: 'ARR-at-risk linked to themes', baseline: '$0', improved: '$6.4M' },
  { label: 'Roadmap items w/ revenue evidence', baseline: '18%', improved: '82%' },
  { label: 'Duplicate tickets auto-clustered', baseline: '0', improved: '4,200' },
];

export const vocSources: VOCSource[] = [
  { id: 's1', name: 'Support tickets (Zendesk)', channel: 'Support', volume: '8,940 tickets', window: 'Last 90 days', status: 'In scope', note: 'Full export incl. tags, CSAT, and account ID.' },
  { id: 's2', name: 'Sales-call notes (Gong)', channel: 'Sales', volume: '1,210 calls', window: 'Last 90 days', status: 'In scope', note: 'Transcribed objections and feature asks from deals.' },
  { id: 's3', name: 'App-store reviews', channel: 'Public', volume: '2,360 reviews', window: 'Last 90 days', status: 'In scope', note: 'iOS + Android, 1 to 3 star prioritized.' },
  { id: 's4', name: 'Community forum posts', channel: 'Community', volume: '1,470 posts', window: 'Last 90 days', status: 'Sampling', note: 'Sampled; high-vote threads weighted up.' },
  { id: 's5', name: 'Churn-reason codes (CRM)', channel: 'Retention', volume: '312 churned accts', window: 'Last 4 quarters', status: 'In scope', note: 'Closed-lost and downgrade reasons with ARR.' },
  { id: 's6', name: 'NPS verbatims', channel: 'Survey', volume: '3,180 responses', window: 'Last 2 quarters', status: 'In scope', note: 'Detractor and passive comments only.' },
  { id: 's7', name: 'Slack Connect shared channels', channel: 'Customer', volume: '640 messages', window: 'Last 30 days', status: 'Excluded', note: 'Excluded this cycle: PII scrubbing not yet validated.' },
];

export const themes: Theme[] = [
  {
    id: 't1', name: 'SSO / SCIM provisioning gaps', mentions: 1840, trend: '+34% QoQ',
    summary: 'Enterprise buyers and admins cite missing SCIM auto-deprovisioning and Okta group mapping as a blocker. Concentrated in accounts above $80K ARR.',
    records: [
      { id: 'r1', source: 'Churn-reason (CRM)', account: 'Northwind Logistics', excerpt: 'Downgraded to Team plan, no SCIM meant manual offboarding for 400 seats.', sentiment: 'Negative' },
      { id: 'r2', source: 'Sales call (Gong)', account: 'Cobalt Health', excerpt: 'Security review stalled, they require automated deprovisioning before signature.', sentiment: 'Negative' },
      { id: 'r3', source: 'Support ticket #44192', account: 'Vertex Robotics', excerpt: 'Okta group changes do not sync to roles, we reassign by hand every week.', sentiment: 'Negative' },
      { id: 'r4', source: 'NPS verbatim', account: 'Solaris Media', excerpt: 'Score 4. Love the product, but provisioning is a part-time job for IT.', sentiment: 'Negative' },
    ],
  },
  {
    id: 't2', name: 'Bulk export / reporting limits', mentions: 1290, trend: '+19% QoQ',
    summary: 'Mid-market users hit the 10K-row export cap and lack scheduled reports. Frequently paired with renewal-risk language.',
    records: [
      { id: 'r5', source: 'Support ticket #43880', account: 'Pinnacle Retail', excerpt: 'Export caps at 10K rows, we have 60K records to reconcile monthly.', sentiment: 'Negative' },
      { id: 'r6', source: 'App-store review', account: 'Anonymous (iOS)', excerpt: '2 stars. No scheduled reports means I rebuild the same export every Monday.', sentiment: 'Negative' },
      { id: 'r7', source: 'Community post', account: 'user_dmarsh', excerpt: 'Plus-one for a CSV export API, the UI cap is a dealbreaker for finance.', sentiment: 'Neutral' },
    ],
  },
  {
    id: 't3', name: 'Mobile offline sync failures', mentions: 760, trend: '+8% QoQ',
    summary: 'Field users report edits lost when reconnecting. Lower ARR concentration but high support cost and review damage.',
    records: [
      { id: 'r8', source: 'App-store review', account: 'Anonymous (Android)', excerpt: '1 star. Logged 20 site visits offline, half vanished on sync. Unusable in the field.', sentiment: 'Negative' },
      { id: 'r9', source: 'Support ticket #44510', account: 'Granite Field Services', excerpt: 'Conflict resolution overwrites the newer edit, techs are losing notes.', sentiment: 'Negative' },
    ],
  },
  {
    id: 't4', name: 'Onboarding / time-to-value', mentions: 540, trend: '-3% QoQ',
    summary: 'New admins struggle to configure their first workspace. Trending flat; mitigated by recent guide updates.',
    records: [
      { id: 'r10', source: 'NPS verbatim', account: 'Lumen Studios', excerpt: 'Score 6. Took us three weeks to get our first workspace useful.', sentiment: 'Neutral' },
      { id: 'r11', source: 'Sales call (Gong)', account: 'Atlas Freight', excerpt: 'Prospect worried about ramp time after seeing a competitor templated setup.', sentiment: 'Neutral' },
    ],
  },
];

export const themeLinks: ThemeLink[] = [
  {
    themeId: 't1', themeName: 'SSO / SCIM provisioning gaps',
    arrAtRisk: '$3.9M', churnAccounts: 7,
    relatedDefects: ['JIRA SEC-2204 - SCIM deprovision race condition', 'JIRA SEC-2261 - Okta group-to-role mapping'],
    roadmapItems: ['ENT-Q3: Enterprise identity hardening (unscoped)'],
    confidence: 'High',
  },
  {
    themeId: 't2', themeName: 'Bulk export / reporting limits',
    arrAtRisk: '$1.8M', churnAccounts: 4,
    relatedDefects: ['JIRA RPT-1190 - Export row cap', 'JIRA RPT-1205 - Scheduled report job timeout'],
    roadmapItems: ['ANALYTICS-Q4: Reporting v2 (proposed)'],
    confidence: 'High',
  },
  {
    themeId: 't3', themeName: 'Mobile offline sync failures',
    arrAtRisk: '$0.5M', churnAccounts: 2,
    relatedDefects: ['JIRA MOB-882 - Offline conflict overwrite'],
    roadmapItems: [],
    confidence: 'Medium',
  },
  {
    themeId: 't4', themeName: 'Onboarding / time-to-value',
    arrAtRisk: '$0.2M', churnAccounts: 1,
    relatedDefects: [],
    roadmapItems: ['GROWTH-Q3: Guided setup templates (in flight)'],
    confidence: 'Low',
  },
];

export const stepEvidence: Record<StepId, EvidenceConfig> = {
  intro: { title: '', sourceRecords: [], rationale: '', confidence: 'High', missingInfo: [], escalationTriggers: [], auditTrail: [] },
  enhancements: { title: '', sourceRecords: [], rationale: '', confidence: 'High', missingInfo: [], escalationTriggers: [], auditTrail: [] },
  ingest: {
    title: 'VOC Source Inventory',
    sourceRecords: ['Zendesk ticket export (90d)', 'Gong call transcripts (90d)', 'App-store review feed', 'CRM churn-reason codes (4Q)', 'NPS survey verbatims (2Q)'],
    rationale: 'The agent inventories every connected VOC source, de-duplicates, and reports volume and freshness. Slack Connect is held out this cycle because PII scrubbing is not yet validated. The PM confirms scope before clustering runs.',
    confidence: 'High',
    missingInfo: ['Slack Connect shared channels excluded pending PII validation', 'Win/loss interview notes not yet connected'],
    escalationTriggers: ['A source returns stale data older than the planning window', 'A connector fails authentication or returns partial volume'],
    auditTrail: ['08:02: 6 sources connected, 1 held out.', '08:03: 17,160 raw records staged for clustering.'],
  },
  cluster: {
    title: 'Theme Clustering',
    sourceRecords: ['Staged VOC records (17,160)', 'Embedding model over verbatim text', 'Account + ARR join from CRM'],
    rationale: 'The agent clusters raw feedback into themes by semantic similarity, then attaches example records you can drill into. 4,200 low-value or duplicate tickets were auto-grouped. The PM can merge or split any cluster before themes are linked to revenue.',
    confidence: 'High',
    missingInfo: ['Two small clusters (under 30 mentions) held below the display threshold'],
    escalationTriggers: ['A cluster mixes unrelated topics (low cohesion score)', 'A high-volume theme has no example records to cite'],
    auditTrail: ['08:11: 4 primary themes formed.', '08:11: 4,200 duplicate/low-value tickets auto-clustered.'],
  },
  link: {
    title: 'Revenue & Defect Linkage',
    sourceRecords: ['Theme-to-account map', 'CRM ARR and churn-reason codes', 'JIRA defect backlog', 'Existing roadmap register'],
    rationale: 'Each theme is joined to ARR-at-risk, churned-account count, related defects, and any existing roadmap item. Dollar figures come from CRM contract values; the PM validates them before they drive prioritization, since an over-stated figure would mis-rank the backlog.',
    confidence: 'Medium',
    missingInfo: ['SSO theme ARR includes 2 accounts in active renewal - figure may move', 'Mobile theme defect linkage is single-source'],
    escalationTriggers: ['ARR-at-risk exceeds a theme threshold and routes to RevOps for confirmation', 'A theme links to a defect already marked fixed'],
    auditTrail: ['08:19: $6.4M ARR-at-risk linked across 4 themes.', '08:19: SSO theme flagged for RevOps dollar validation.'],
  },
  brief: {
    title: 'Opportunity Brief Draft',
    sourceRecords: ['Linked theme (SSO/SCIM)', 'Cited VOC records', 'ARR-at-risk and churn evidence', 'Related defects SEC-2204, SEC-2261'],
    rationale: 'The agent drafts a product opportunity brief for the highest-impact theme: problem statement, evidence, ARR impact, and a proposed scope. Every claim cites a source record. The PM edits the draft; nothing is finalized without a human author.',
    confidence: 'High',
    missingInfo: ['Proposed scope is a starting point, not an engineering estimate', 'Effort sizing requires eng review'],
    escalationTriggers: ['A brief claim cannot be traced to a cited record', 'Proposed scope conflicts with an in-flight roadmap item'],
    auditTrail: ['08:24: Draft brief generated for SSO/SCIM theme.', '08:24: 9 source records cited inline.'],
  },
  prioritize: {
    title: 'PM Priority Gate',
    sourceRecords: ['All linked themes with ARR-at-risk', 'Drafted opportunity brief', 'Current sprint capacity signal'],
    rationale: 'This is the human decision point. The PM ranks, accepts, or defers each theme with a written rationale. The agent recommends an order by ARR-at-risk, but the PM owns the call. Nothing advances to engineering without an explicit accept.',
    confidence: 'High',
    missingInfo: ['PM rationale required on each accept or defer'],
    escalationTriggers: ['PM defers a theme above a $2M ARR-at-risk threshold (logged for CPO review)', 'Accepted scope exceeds available sprint capacity'],
    auditTrail: ['08:31: Recommended ranking presented to PM.', '- Awaiting PM accept/defer decisions.'],
  },
  handoff: {
    title: 'Engineering Backlog Handoff',
    sourceRecords: ['Accepted opportunity brief', 'Linked defects SEC-2204, SEC-2261', 'Cited VOC records and ARR evidence'],
    rationale: 'The accepted item is formatted as an evidence-backed backlog ticket: problem, customer evidence, ARR-at-risk, linked defects, and acceptance criteria. The PM confirms before it is pushed to the engineering tracker. The agent formats; the human confirms.',
    confidence: 'High',
    missingInfo: [],
    escalationTriggers: ['Target epic is closed or archived in the tracker', 'Acceptance criteria are empty on confirm'],
    auditTrail: ['08:37: Backlog ticket assembled with 9 evidence links.', '08:37: Awaiting PM confirmation to push to JIRA.'],
  },
};
