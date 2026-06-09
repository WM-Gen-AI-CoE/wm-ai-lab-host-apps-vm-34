import { KPI, Account, Signal, RiskDriver, ExpansionPlay, PlaybookItem, EvidenceConfig, StepId } from './types';

// KPI movement framed as a West Monroe benchmark, not a guarantee. WM has driven a
// 400 bps NRR improvement on a cloud-journey / customer-engagement program and +9% NRR
// by assigning CSMs to previously uncovered accounts, on a ~$1B ARR SaaS CS transformation.
export const kpis: KPI[] = [
  { label: 'Net revenue retention', baseline: '102%', improved: '106%' },
  { label: 'Gross renewal rate', baseline: '89%', improved: '94%' },
  { label: 'At-risk ARR (active book)', baseline: '$14.2M', improved: '$5.8M' },
  { label: 'Expansion pipeline identified', baseline: '$1.2M', improved: '$4.8M' },
];

export const accounts: Account[] = [
  { id: 'a1', name: 'Northwind Logistics', segment: 'Enterprise', arr: '$840K', renewalDate: 'Aug 31, 2026', nrr: '94%', riskScore: 82, riskTier: 'High', csm: 'Priya Raman', trend: 'down' },
  { id: 'a2', name: 'Cobalt Retail Group', segment: 'Enterprise', arr: '$1.2M', renewalDate: 'Sep 30, 2026', nrr: '111%', riskScore: 24, riskTier: 'Low', csm: 'Marcus Hale', trend: 'up' },
  { id: 'a3', name: 'Drift Analytics', segment: 'Mid-Market', arr: '$220K', renewalDate: 'Jul 15, 2026', nrr: '88%', riskScore: 67, riskTier: 'High', csm: 'Priya Raman', trend: 'down' },
  { id: 'a4', name: 'Helios Manufacturing', segment: 'Enterprise', arr: '$960K', renewalDate: 'Oct 31, 2026', nrr: '103%', riskScore: 41, riskTier: 'Medium', csm: 'Dana Osei', trend: 'flat' },
  { id: 'a5', name: 'Brightpath Health', segment: 'Mid-Market', arr: '$310K', renewalDate: 'Aug 15, 2026', nrr: '99%', riskScore: 38, riskTier: 'Medium', csm: 'Dana Osei', trend: 'flat' },
  { id: 'a6', name: 'Verda Foods', segment: 'Commercial', arr: '$74K', renewalDate: 'Jul 1, 2026', nrr: '120%', riskScore: 19, riskTier: 'Low', csm: 'Marcus Hale', trend: 'up' },
];

// The walked-through account: Northwind Logistics (highest at-risk ARR).
export const signals: Signal[] = [
  { id: 's1', category: 'Product Usage', polarity: 'risk', source: 'Usage warehouse - weekly active seats',
    headline: 'Active seats down 28% over the last quarter',
    detail: 'Weekly active users fell from 412 to 296 of 500 licensed seats. Two of three core modules show declining adoption since the March reorg on the customer side.' },
  { id: 's2', category: 'Support History', polarity: 'risk', source: 'Support tickets TKT-88142, TKT-88761, TKT-89003',
    headline: '3 severity-1 tickets in 60 days, 2 reopened',
    detail: 'A recurring data-sync defect (TKT-88142) was reopened twice. Mean time to resolution on sev-1 issues for this account is 19 days versus a 6-day book average.' },
  { id: 's3', category: 'CSM Notes', polarity: 'risk', source: 'CSM call log, Apr 22, 2026 (Priya Raman)',
    headline: 'New VP of Operations is evaluating alternatives',
    detail: 'On the QBR, the incoming VP noted the renewal is "under review" and asked for an ROI summary. The original executive sponsor left the company in February.' },
  { id: 's4', category: 'Contract Terms', polarity: 'neutral', source: 'Contract MSA-2024-0417',
    headline: 'Co-term renewal, 14% uplift clause, 90-day notice',
    detail: 'Current term ends Aug 31, 2026 with a contractual 14% list uplift. A 90-day non-renewal notice window opens Jun 2, 2026.' },
  { id: 's5', category: 'Sentiment', polarity: 'risk', source: 'Survey + email tone model',
    headline: 'NPS dropped from 8 to 4; last CSAT was 3/5',
    detail: 'Detractor verbatim cited "slow support" and "hard to show value to our new leadership." Email sentiment on the last 6 threads trended negative.' },
  { id: 's6', category: 'Adoption', polarity: 'positive', source: 'Feature telemetry - Insights module',
    headline: 'Insights module power users remain highly engaged',
    detail: 'A 40-person analytics team uses the Insights module daily and has built 22 custom dashboards. This is a defensible value anchor for a save and expansion motion.' },
];

export const riskDrivers: RiskDriver[] = [
  { id: 'd1', driver: 'Sponsor change with no rebuilt champion', weight: 34, detail: 'Executive sponsor departed in February; the new VP of Operations has no relationship history and is actively evaluating.' },
  { id: 'd2', driver: 'Declining seat adoption', weight: 28, detail: 'Active seats down 28% quarter over quarter; two of three modules trending down since the customer reorg.' },
  { id: 'd3', driver: 'Unresolved sev-1 support pattern', weight: 22, detail: 'Recurring data-sync defect reopened twice; sev-1 resolution time 3x the book average is eroding trust.' },
  { id: 'd4', driver: 'Sentiment and value-perception decline', weight: 16, detail: 'NPS fell from 8 to 4; detractor feedback centers on proving value to new leadership.' },
];

export const expansionPlays: ExpansionPlay[] = [
  { id: 'p1', play: 'Insights module seat expansion', arrImpact: '+$180K', rationale: 'The 40-person analytics team is at capacity on Insights; a usage-based seat tier matches demonstrated demand and anchors renewal value.' },
  { id: 'p2', play: 'Premium support tier attach', arrImpact: '+$95K', rationale: 'Faster sev-1 SLAs directly address the top support complaint and create a defensible reason to stay.' },
  { id: 'p3', play: 'Multi-year co-term with uplift trade', arrImpact: '+$140K', rationale: 'Trade a softened year-one uplift for a 2-year commitment, locking in retention while protecting total contract value.' },
];

export const playbookItems: PlaybookItem[] = [
  { id: 'pb1', type: 'Exec sponsor', owner: 'Chief Customer Officer', needsApproval: true,
    draft: 'Pair our CCO with the new VP of Operations for a value-realization session before the notice window opens on Jun 2. Goal: rebuild executive trust and present the ROI summary they requested.' },
  { id: 'pb2', type: 'Save offer', owner: 'Renewals Manager', needsApproval: true,
    draft: 'Offer a one-time 6% uplift cap (down from the contractual 14%) in exchange for a 2-year co-term commitment. Concession value requires manager approval before it is put in front of the customer.' },
  { id: 'pb3', type: 'Training', owner: 'CSM - Priya Raman', needsApproval: false,
    draft: 'Run two enablement workshops for the modules with declining adoption, targeted at the teams affected by the customer reorg. Re-onboard new admins added since March.' },
  { id: 'pb4', type: 'Expansion proposal', owner: 'CSM - Priya Raman', needsApproval: false,
    draft: 'Build an Insights seat-expansion proposal for the analytics team, framed around the 22 dashboards already in production. Position as added value, not a hard upsell, given current sentiment.' },
];

export const stepEvidence: Record<StepId, EvidenceConfig> = {
  intro: { title: '', sourceRecords: [], rationale: '', confidence: 'High', missingInfo: [], escalationTriggers: [], auditTrail: [] },
  enhancements: { title: '', sourceRecords: [], rationale: '', confidence: 'High', missingInfo: [], escalationTriggers: [], auditTrail: [] },
  portfolio: {
    title: 'Portfolio Risk Scoring',
    sourceRecords: ['CRM renewal opportunities (6 accounts, ~$3.6M ARR)', 'Usage warehouse - weekly active seats', 'Support ticket history', 'Survey & sentiment feeds'],
    rationale: 'Northwind Logistics is surfaced first: it carries the largest at-risk ARR ($840K) with a renewal in under 90 days, declining adoption, and a sponsor change. The model scores risk; the CSM chooses which accounts to work.',
    confidence: 'High',
    missingInfo: ['Two mid-market accounts lack updated stakeholder maps', 'Self-reported budget changes are not in any system feed'],
    escalationTriggers: ['Any high-risk account inside its non-renewal notice window', 'A top-20 ARR account scored High risk'],
    auditTrail: ['08:30 AM: Portfolio scored from CRM, usage, support, and sentiment feeds.', '08:31 AM: Renewals Manager opened the Northwind account.'],
  },
  signals: {
    title: 'Signal Assembly',
    sourceRecords: ['Usage warehouse', 'Support tickets TKT-88142 / 88761 / 89003', 'CSM call log (Apr 22)', 'Contract MSA-2024-0417', 'NPS / CSAT survey feed'],
    rationale: 'The agent assembles usage, support, notes, contract, sentiment, and adoption into one readable case so the CSM does not stitch six tools together by hand. Every line links back to its source record for validation.',
    confidence: 'High',
    missingInfo: ['Reason for the customer-side reorg is noted but not confirmed', 'No verbatim from the departed sponsor on intent'],
    escalationTriggers: ['A signal conflicts with another source and cannot be reconciled', 'A contractual notice deadline falls inside the working window'],
    auditTrail: ['08:32 AM: 6 signals assembled for Northwind Logistics.', '08:33 AM: CSM validated the support-ticket linkage.'],
  },
  drivers: {
    title: 'Driver Ranking & Play Match',
    sourceRecords: ['Assembled signal set', 'Risk-driver weighting model', 'Expansion play library', 'Comparable-account save outcomes'],
    rationale: 'Drivers are ranked by their contribution to the risk score, and each is matched to a save or expansion play with an expected ARR impact. The CSM selects which plays to pursue; nothing is committed automatically.',
    confidence: 'Medium',
    missingInfo: ['Expansion ARR estimates use list pricing, not the account-specific discount schedule', 'Premium support attach assumes current SLA tiers'],
    escalationTriggers: ['A recommended play implies a discount beyond CSM authority', 'Two drivers point to conflicting plays'],
    auditTrail: ['08:34 AM: 4 drivers ranked; 3 plays matched.', '08:35 AM: CSM selected the Insights expansion and premium support plays.'],
  },
  playbook: {
    title: 'Action Plan Drafting',
    sourceRecords: ['Selected drivers and plays', 'Account stakeholder map', 'Prior successful save playbooks'],
    rationale: 'The agent drafts a starting action plan: exec sponsor, save offer, training, and expansion. The CSM edits every line before anything moves. Items with a concession or escalation are flagged to require manager approval.',
    confidence: 'High',
    missingInfo: ['Exec-sponsor availability before the Jun 2 notice window is unconfirmed', 'Final concession amount is the CSM and managers call, not the model'],
    escalationTriggers: ['A drafted item exceeds the CSM discount authority', 'A customer-facing message is queued before approval'],
    auditTrail: ['08:36 AM: Draft action plan generated (4 items).', '08:38 AM: CSM edited the save-offer language and owners.'],
  },
  approval: {
    title: 'Concession & Escalation Approval',
    sourceRecords: ['Edited action plan', 'Concession value vs. approval matrix', 'Customer-facing renewal note draft'],
    rationale: 'Any discount, concession, or escalation routes to a manager to approve or return. The customer-facing renewal note is previewed here for human approval and contains no reference to AI, models, or automation.',
    confidence: 'High',
    missingInfo: [],
    escalationTriggers: ['Concession exceeds the Renewals Manager threshold - routes to CRO', 'Manager returns the plan with required changes'],
    auditTrail: ['08:40 AM: Save offer and exec sponsor routed for approval.', '08:42 AM: Awaiting manager decision.'],
  },
  impact: {
    title: 'NRR Bridge & Pipeline',
    sourceRecords: ['Approved action plan', 'Portfolio NRR / GRR baselines', 'Expansion pipeline tracker'],
    rationale: 'The agent summarizes the NRR bridge and pipeline movement from the actions taken across the book. The Renewals Manager owns the committed number; the model only shows the math behind it.',
    confidence: 'High',
    missingInfo: [],
    escalationTriggers: [],
    auditTrail: ['08:45 AM: NRR bridge assembled from approved plans.', '08:45 AM: Renewals Manager confirmed the committed forecast.'],
  },
};
