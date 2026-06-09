import { KPI, QuoteRequest, ContextItem, LeakageFlag, BridgeRow, EvidenceConfig, StepId } from './types';

// KPIs grounded in the West Monroe lead-to-cash transformation: pricing and
// packaging governance reducing discounting and nonstandard contracts, with
// every recommendation tied back to an approved finance definition.
export const kpis: KPI[] = [
  { label: 'Avoidable discount leakage', baseline: '8.5%', improved: '3.2%' },
  { label: 'Net price realization', baseline: '91%', improved: '96%' },
  { label: 'Renewal uplift capture', baseline: '2.1%', improved: '5.4%' },
  { label: 'Deal-desk cycle time', baseline: '6.2 days', improved: '2.1 days' },
];

export const quoteQueue: QuoteRequest[] = [
  { id: 'Q-48217', account: 'Northwind Logistics', segment: 'Enterprise', type: 'Renewal', arr: '$420,000', requestedDiscount: '22%', status: 'Needs review', priority: 'High', triage: 'High ARR renewal with discount above the 15% standard floor and an uncapped uplift clause.' },
  { id: 'Q-48230', account: 'Cedar Health Systems', segment: 'Enterprise', type: 'Expansion', arr: '$185,000', requestedDiscount: '12%', status: 'In deal desk', priority: 'Medium', triage: 'Expansion within standard discount band; multi-year commit reduces risk.' },
  { id: 'Q-48244', account: 'Brightline Retail', segment: 'Mid-Market', type: 'Renewal', arr: '$96,000', requestedDiscount: '18%', status: 'Needs review', priority: 'Medium', triage: 'Flat renewal with no uplift requested despite two years of usage growth.' },
  { id: 'Q-48251', account: 'Atlas Manufacturing', segment: 'Mid-Market', type: 'New Business', arr: '$64,000', requestedDiscount: '9%', status: 'Awaiting approval', priority: 'Low', triage: 'Standard new logo within discount band; awaiting finance margin check.' },
  { id: 'Q-48260', account: 'Vertex Software', segment: 'Commercial', type: 'Renewal', arr: '$38,000', requestedDiscount: '6%', status: 'Synced', priority: 'Low', triage: 'Clean auto-renewal at list; already synced to CRM and CPQ.' },
];

// The selected deal the demo walks through: Northwind Logistics (Q-48217).
export const selectedQuote = quoteQueue[0];

export const dealContext: ContextItem[] = [
  { id: 'history', label: 'Account history', value: '3-year customer, $420K current ARR', detail: 'Initial 2-year deal at 10% discount; renewed once at 16% during a competitive cycle. No churn risk flags in the success record.', confidence: 'High' },
  { id: 'usage', label: 'Usage vs. entitlement', value: '118% of licensed seats', detail: 'Entitled to 800 seats; 944 active in the trailing 90 days. Two add-on modules adopted org-wide since last renewal.', confidence: 'High', flagged: 'Account is consuming above entitlement, which supports an uplift and a true-up rather than a flat renewal.' },
  { id: 'discount', label: 'Prior discounting', value: 'Trending up: 10% to 16% to 22% requested', detail: 'Each renewal has pushed discount higher. The 22% request would set a new floor for this account and segment peers.', confidence: 'High' },
  { id: 'terms', label: 'Contract terms', value: '1 nonstandard clause detected', detail: 'Requested uplift cap of 0% for the next term, plus a most-favored-pricing clause that is outside the standard playbook.', confidence: 'Medium', flagged: 'Most-favored-pricing clause requires finance and legal sign-off before it can be offered.' },
  { id: 'margin', label: 'Deal margin', value: '74% gross at requested terms', detail: 'At 22% discount and the 0% uplift cap, modeled gross margin falls below the 78% segment target.', confidence: 'High' },
  { id: 'bundle', label: 'Bundle & packaging', value: 'Core platform + Analytics + Connect', detail: 'Eligible for the Growth bundle, which lists 8% above the current a-la-carte total and unlocks a standard 3% multi-year uplift.', confidence: 'Medium' },
];

export const leakageFlags: LeakageFlag[] = [
  { id: 'lf1', title: 'Discount 7 points above standard floor', category: 'Discount leakage', impact: '$29,400 ARR', basis: 'Requested 22% exceeds the 15% segment floor. Closing to 15% recovers 7 points on $420K.', severity: 'High' },
  { id: 'lf2', title: 'No renewal uplift on 18% usage growth', category: 'Uplift gap', impact: '$12,600 ARR', basis: 'Account is at 118% of entitlement with zero uplift requested. A standard 3% uplift plus seat true-up is supported.', severity: 'High' },
  { id: 'lf3', title: 'Most-favored-pricing clause', category: 'Nonstandard term', impact: 'Margin risk', basis: 'Outside the standard playbook; would constrain future pricing across the segment. Requires finance and legal approval.', severity: 'Medium' },
  { id: 'lf4', title: '0% uplift cap for full next term', category: 'Nonstandard term', impact: '$8,400 ARR', basis: 'A hard uplift cap removes inflation pass-through. Standard terms allow CPI-linked uplift with a 7% ceiling.', severity: 'Medium' },
];

export const marginBridge: BridgeRow[] = [
  { label: 'Current ARR', value: '$420,000', kind: 'base' },
  { label: 'Seat true-up to entitlement', value: '+$18,000', kind: 'add' },
  { label: 'Standard 3% renewal uplift', value: '+$12,600', kind: 'add' },
  { label: 'Recovered discount (22% to 15%)', value: '+$29,400', kind: 'add' },
  { label: 'Approved competitive concession', value: '-$8,400', kind: 'subtract' },
  { label: 'Recommended renewal ARR', value: '$471,600', kind: 'total' },
];

// Customer-facing renewal cover note. Must NOT reference AI, models, or automation.
export const coverNoteDraft =
  'Thank you for three years of partnership. Your team has grown its use of the platform to 944 active users, and this renewal aligns your agreement to that adoption. We have applied a partner discount and structured a multi-year option that protects your pricing while keeping your most-used modules in a single bundle. We would welcome a short call to walk through the details and answer any questions before you sign.';

export const stepEvidence: Record<StepId, EvidenceConfig> = {
  intro: { title: '', sourceRecords: [], rationale: '', confidence: 'High', missingInfo: [], escalationTriggers: [], auditTrail: [] },
  enhancements: { title: '', sourceRecords: [], rationale: '', confidence: 'High', missingInfo: [], escalationTriggers: [], auditTrail: [] },
  intake: {
    title: 'Queue Triage',
    sourceRecords: ['CPQ quote queue', 'CRM opportunity records', 'Pricing playbook (approved discount floors)'],
    rationale: 'Northwind Logistics (Q-48217) is surfaced first: it is the highest-ARR renewal in the queue, the requested 22% discount sits above the 15% segment floor, and the contract carries an uncapped uplift clause that needs deal-desk judgment.',
    confidence: 'High',
    missingInfo: ['Two deals are mid-cycle in deal desk and not yet ready for a pricing recommendation'],
    escalationTriggers: ['Requested discount exceeds the CRO delegation threshold', 'Deal includes a nonstandard clause outside the approved playbook'],
    auditTrail: ['08:12 AM: Queue assembled from CPQ and CRM.', '08:12 AM: Q-48217 ranked first by ARR and discount variance.'],
  },
  review: {
    title: 'Deal Context Assembly',
    sourceRecords: ['Account contract history', 'Usage and entitlement telemetry', 'Prior discount records', 'Margin model (finance definition)'],
    rationale: 'The agent assembled history, usage versus entitlement, prior discounting, contract terms, margin, and bundle eligibility from system-of-record data. Usage at 118% of entitlement and a rising discount trend are the two findings that most shape the recommendation.',
    confidence: 'High',
    missingInfo: ['Most-favored-pricing clause language needs legal confirmation', 'Bundle list price pending finance refresh for the new term'],
    escalationTriggers: ['Margin falls below the segment target at requested terms', 'A nonstandard clause is detected in the contract'],
    auditTrail: ['08:13 AM: Context assembled from 4 systems of record.', '08:13 AM: Usage flagged at 118% of entitlement.'],
  },
  leakage: {
    title: 'Revenue Leakage Flags',
    sourceRecords: ['Pricing playbook floors', 'Usage true-up rules', 'Standard contract clause library'],
    rationale: 'Four flags were raised, each with a dollar or margin impact tied to an approved finance definition: discount above floor, missing uplift on usage growth, a most-favored-pricing clause, and a hard uplift cap. The deal desk judges each before any recommendation is drafted.',
    confidence: 'High',
    missingInfo: ['Whether the competitive situation justifies any concession beyond the standard floor'],
    escalationTriggers: ['A flag is dismissed without a documented rationale', 'Combined leakage exceeds the deal-desk delegation limit'],
    auditTrail: ['08:14 AM: 4 leakage flags raised against the playbook.', '08:14 AM: $50,400 in recoverable ARR identified.'],
  },
  recommend: {
    title: 'Recommendation Draft',
    sourceRecords: ['Approved margin model', 'Pricing playbook', 'Bundle and packaging catalog'],
    rationale: 'The draft recommends closing discount to 15%, applying a standard 3% uplift with a seat true-up, declining the most-favored-pricing clause, and allowing a small competitive concession. The customer-facing cover note restates the value in plain business language and contains no reference to AI.',
    confidence: 'Medium',
    missingInfo: ['Final concession amount is the deal-desk owner to set', 'Cover note tone to be confirmed by the account team'],
    escalationTriggers: ['Recommended terms still fall below the margin floor', 'Customer rejects the standard uplift in negotiation'],
    auditTrail: ['08:15 AM: Recommendation drafted from approved definitions.', '08:15 AM: Cover note preview generated for human edit.'],
  },
  approval: {
    title: 'Approval Routing',
    sourceRecords: ['Recommended quote', 'Margin floor check (finance)', 'Delegation of authority matrix'],
    rationale: 'The recommended renewal clears the segment margin floor, so it routes to deal desk and finance for parallel approval. Both approvals are required before the quote can sync. A human approver can return the deal with notes at any point.',
    confidence: 'High',
    missingInfo: [],
    escalationTriggers: ['Margin floor check fails - routed to CFO for exception', 'Approver returns the deal with required changes'],
    auditTrail: ['08:16 AM: Margin floor check passed at 81%.', '08:16 AM: Routed to deal desk and finance.'],
  },
  impact: {
    title: 'Margin & Revenue Bridge',
    sourceRecords: ['Approved quote', 'Finance margin model', 'Rep / segment / product rollups'],
    rationale: 'The approved renewal lifts ARR from $420K to $471.6K, with the bridge attributing each component to an approved finance definition. Roll-ups by rep, segment, and product show where realization improved and where leakage was recovered.',
    confidence: 'High',
    missingInfo: [],
    escalationTriggers: [],
    auditTrail: ['08:18 AM: Approved quote synced to CRM and CPQ.', '08:18 AM: Margin bridge posted to the RevOps dashboard.'],
  },
};
