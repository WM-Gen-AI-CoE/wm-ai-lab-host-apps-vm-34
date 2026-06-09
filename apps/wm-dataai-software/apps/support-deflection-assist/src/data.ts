import { KPI, Ticket, RetrievedItem, TroubleshootStep, EvidenceConfig, StepId } from './types';

// KPI targets grounded in a fictional SaaS support program: shifting repetitive,
// well-documented issues to self-service and assisted resolution while routing the
// risky and novel to engineering with full context.
export const kpis: KPI[] = [
  { label: 'Self-service deflection', baseline: '24%', improved: '41%' },
  { label: 'Average handle time', baseline: '18 min', improved: '11 min' },
  { label: 'Cost per ticket', baseline: '$14.20', improved: '$9.10' },
  { label: 'First-contact resolution', baseline: '62%', improved: '78%' },
];

export const tickets: Ticket[] = [
  { id: 'TKT-58213', account: 'Northwind Retail', tier: 'Enterprise', subject: 'Webhook deliveries failing after SSO config change', issueType: 'Integrations / Webhooks', severity: 'S2', age: '38 min', status: 'Classified', classifyConfidence: 'High' },
  { id: 'TKT-58227', account: 'Lumen Health', tier: 'Growth', subject: 'CSV export truncates rows above 10k', issueType: 'Reporting / Export', severity: 'S3', age: '1 hr 12 min', status: 'New', classifyConfidence: 'High' },
  { id: 'TKT-58231', account: 'Acme Robotics', tier: 'Enterprise', subject: 'Intermittent 502 on /v2/orders during peak', issueType: 'API / Availability', severity: 'S1', age: '14 min', status: 'New', classifyConfidence: 'Medium' },
  { id: 'TKT-58240', account: 'Brightwave Media', tier: 'Starter', subject: 'How do I reset a teammate password?', issueType: 'Account / How-to', severity: 'S4', age: '22 min', status: 'New', classifyConfidence: 'High' },
  { id: 'TKT-58205', account: 'Cobalt Freight', tier: 'Growth', subject: 'Billing invoice shows duplicate line item', issueType: 'Billing', severity: 'S3', age: '2 hr 40 min', status: 'In progress', classifyConfidence: 'Medium' },
  { id: 'TKT-58198', account: 'Vertex Labs', tier: 'Enterprise', subject: 'Data residency question for EU tenant', issueType: 'Security / Compliance', severity: 'S3', age: '3 hr 05 min', status: 'Escalated', classifyConfidence: 'Low' },
];

// The selected ticket the demo walks through: TKT-58213 (Northwind Retail).
export const retrieved: RetrievedItem[] = [
  { id: 'r1', kind: 'Resolved case', title: 'CASE-44190: Webhooks 401 after SAML SSO enabled on tenant', relevance: 94, source: 'Resolved cases (last 18 mo)',
    detail: 'Same symptom: enabling SSO rotated the signing secret used by outbound webhooks, invalidating the saved endpoint credential. Fixed by regenerating and re-saving the webhook secret. Closed in 9 min, CSAT 5/5.' },
  { id: 'r2', kind: 'Known defect', title: 'DEF-2207: SSO config save does not re-trigger webhook secret refresh', relevance: 88, source: 'Engineering defect tracker',
    detail: 'Confirmed defect where the SSO save path skips the webhook credential refresh hook. Workaround documented; permanent fix targeted for 4.18. Affects tenants on 4.15 - 4.17.' },
  { id: 'r3', kind: 'Release note', title: 'Release 4.16: SSO signing-secret rotation on identity-provider change', relevance: 81, source: 'Product release notes',
    detail: 'Release 4.16 rotates the tenant signing secret whenever the identity provider is changed. Integrations that cache the prior secret must re-save credentials.' },
  { id: 'r4', kind: 'KB article', title: 'KB-1180: Re-validating webhook endpoints after a security config change', relevance: 77, source: 'Knowledge base',
    detail: 'Step-by-step for regenerating a webhook secret, re-saving the endpoint, and sending a test event. Customer-safe language, links to the integrations dashboard.' },
];

export const troubleshootPath: TroubleshootStep[] = [
  { step: 1, text: 'Open the Integrations dashboard and locate the affected webhook endpoint (Orders events).' },
  { step: 2, text: 'Regenerate the webhook signing secret and copy the new value.' },
  { step: 3, text: 'Update the saved credential in your receiving service with the new secret.' },
  { step: 4, text: 'Send a test event from the dashboard and confirm a 200 response.' },
  { step: 5, text: 'Replay the queued failed deliveries from the last 40 minutes.' },
];

// Drafted customer reply. NOTE: customer-facing text must never reference AI/automation.
export const draftReply = `Hi Dana,

Thanks for flagging this, and sorry for the disruption to your Orders webhook.

The recent single sign-on change on your tenant rotated the signing secret that your webhook endpoint uses, which is why deliveries started returning authentication errors. This is expected behavior after an identity-provider change, and it is quick to resolve.

Please try these steps:

1. In the Integrations dashboard, open your Orders webhook endpoint.
2. Regenerate the signing secret and copy the new value.
3. Update the saved secret in your receiving service.
4. Send a test event and confirm you get a 200 response.
5. Replay the failed deliveries from the last 40 minutes.

Once the test event succeeds, deliveries should resume normally. I will keep this ticket open until you confirm everything is flowing again. If anything looks off, reply here and I will jump back in.

Best,
Sam
Technical Support, Acme Platform`;

export const stepEvidence: Record<StepId, EvidenceConfig> = {
  intro: { title: '', sourceRecords: [], rationale: '', confidence: 'High', missingInfo: [], escalationTriggers: [], auditTrail: [] },
  enhancements: { title: '', sourceRecords: [], rationale: '', confidence: 'High', missingInfo: [], escalationTriggers: [], auditTrail: [] },
  queue: {
    title: 'Ticket Classification',
    sourceRecords: ['Inbound ticket text & subject (support inbox)', 'Account record & entitlement tier (CRM)', 'Historical issue-type taxonomy'],
    rationale: 'TKT-58213 is classified as Integrations / Webhooks, severity S2, Enterprise tier. The subject and body mention webhook deliveries failing right after an SSO config change, which maps with high confidence to a known integration pattern. Enterprise tier and broken production traffic set the severity.',
    confidence: 'High',
    missingInfo: ['Exact tenant platform version is not in the ticket; needed to confirm defect applicability'],
    escalationTriggers: ['Severity classified S1 with active production outage', 'Classification confidence Low or conflicting issue types'],
    auditTrail: ['10:02 AM: Ticket ingested from support inbox.', '10:02 AM: Classified Integrations / Webhooks, S2, High confidence.'],
  },
  retrieval: {
    title: 'Evidence Retrieval',
    sourceRecords: ['Resolved-case archive (last 18 months)', 'Engineering defect tracker', 'Product release notes', 'Knowledge base'],
    rationale: 'Retrieval ranked one near-identical resolved case (CASE-44190, 94% relevance), a confirmed defect (DEF-2207) describing exactly this SSO-to-webhook interaction, and the 4.16 release note that introduced secret rotation. Together they explain the cause and point to a tested fix.',
    confidence: 'High',
    missingInfo: ['Confirm the tenant is on 4.15 - 4.17 so DEF-2207 applies'],
    escalationTriggers: ['No resolved case or KB above the relevance threshold', 'Retrieved defect has no documented workaround'],
    auditTrail: ['10:03 AM: 4 sources retrieved and relevance-ranked.', '10:03 AM: Top match CASE-44190 surfaced (94%).'],
  },
  draft: {
    title: 'Reply & Troubleshooting Draft',
    sourceRecords: ['Top resolved case (CASE-44190)', 'KB-1180 remediation steps', 'Customer tone & signature template'],
    rationale: 'The draft reply and 5-step troubleshooting path are assembled only from the retrieved evidence. The customer reply is written in plain language and contains no reference to AI or automation. The internal troubleshooting path links each step to its source for the engineer.',
    confidence: 'High',
    missingInfo: ['Customer first name pulled from CRM contact; confirm preferred name before sending'],
    escalationTriggers: ['Draft would instruct a destructive or irreversible action', 'No customer-safe KB language available for a step'],
    auditTrail: ['10:04 AM: Draft reply generated from CASE-44190 + KB-1180.', '10:04 AM: Troubleshooting path linked to sources.'],
  },
  validate: {
    title: 'Engineer Approve / Edit / Send',
    sourceRecords: ['Drafted customer reply', 'Engineer edits captured this session', 'Resolution outcome codes'],
    rationale: 'The support engineer owns the reply. The draft is fully editable, nothing is sent to the customer without an explicit approve action, and the engineer chooses the outcome: mark resolved, or escalate to engineering if the fix does not hold.',
    confidence: 'High',
    missingInfo: ['Engineer approval pending'],
    escalationTriggers: ['Engineer edits indicate the fix did not resolve the issue', 'Customer replies that steps did not work'],
    auditTrail: ['10:06 AM: Engineer opened draft for review.', '- Awaiting approve or escalate decision.'],
  },
  escalate: {
    title: 'Engineering Escalation Package',
    sourceRecords: ['Full ticket thread & classification', 'Retrieved defect DEF-2207', 'Tenant context & customer impact'],
    rationale: 'For the cases that are unresolved or risky, the agent packages a complete escalation: symptom, severity, the linked defect, affected tenant version range, reproduction notes, and customer impact. The engineer confirms routing and target team before it leaves the support queue.',
    confidence: 'Medium',
    missingInfo: ['Tenant version must be confirmed to attach to DEF-2207'],
    escalationTriggers: ['Severity S1 or revenue-impacting outage', 'Defect lacks an owning team in the tracker'],
    auditTrail: ['10:07 AM: Escalation package assembled.', '10:07 AM: Routing suggested to Integrations Platform team.'],
  },
  impact: {
    title: 'Deflection & Cost-to-Serve',
    sourceRecords: ['Ticket-level resolution telemetry', 'Handle-time & FCR tracking', 'CSAT survey responses'],
    rationale: 'This ticket resolved at first contact in about 7 minutes versus an 18-minute baseline, using a tested fix the customer could apply themselves. Aggregated, the same pattern moves repetitive integration tickets to faster assisted resolution and lifts self-service deflection.',
    confidence: 'High',
    missingInfo: [],
    escalationTriggers: [],
    auditTrail: ['10:13 AM: Ticket marked resolved, FCR recorded.', '10:13 AM: Handle time and CSAT posted to dashboard.'],
  },
};
