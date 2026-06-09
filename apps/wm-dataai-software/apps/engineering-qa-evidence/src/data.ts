import { KPI, ReleaseCandidate, DossierArtifact, TestGap, EvidenceConfig, StepId } from './types';

// KPI baselines reflect mid-market B2B SaaS engineering operations: a roughly
// two-week release cycle, escaped-defect counts in the high single digits per
// release, and a majority but inconsistent rate of catching high-risk releases
// before they ship. Improved figures model an evidence-assembly workflow that
// keeps QA and release-manager judgment in the loop.
export const kpis: KPI[] = [
  { label: 'Release cycle time', baseline: '14 days', improved: '11 days' },
  { label: 'Escaped defects / release', baseline: '9', improved: '4' },
  { label: 'Defect-triage productivity', baseline: '0%', improved: '+22%' },
  { label: 'High-risk releases caught pre-ship', baseline: '60%', improved: '88%' },
];

export const candidates: ReleaseCandidate[] = [
  { id: 'rc-1', name: 'Billing Service 4.18.0', service: 'billing-service', version: '4.18.0', targetWindow: 'Thu 18:00 UTC', riskScore: 72, riskLevel: 'High', status: 'Awaiting review' },
  { id: 'rc-2', name: 'Notifications 2.31.4', service: 'notifications', version: '2.31.4', targetWindow: 'Wed 02:00 UTC', riskScore: 28, riskLevel: 'Low', status: 'Awaiting review' },
  { id: 'rc-3', name: 'Web App 9.7.1', service: 'web-app', version: '9.7.1', targetWindow: 'Fri 16:00 UTC', riskScore: 49, riskLevel: 'Medium', status: 'In analysis' },
  { id: 'rc-4', name: 'Identity 3.12.0', service: 'identity', version: '3.12.0', targetWindow: 'Mon 14:00 UTC', riskScore: 35, riskLevel: 'Low', status: 'Shipped' },
];

// The selected release candidate the demo walks through: Billing Service 4.18.0.
export const dossier: DossierArtifact[] = [
  { category: 'Requirement', ref: 'JIRA BILL-2291', summary: 'Proration on mid-cycle plan upgrades', detail: 'Acceptance criteria: upgrades mid-cycle charge a prorated delta; downgrades credit on next invoice. 6 of 7 criteria have linked tests.', signal: 'watch' },
  { category: 'Requirement', ref: 'JIRA BILL-2305', summary: 'Multi-currency invoice rounding', detail: 'Rounding to currency minor units for EUR, GBP, JPY. All acceptance criteria linked to automated tests.', signal: 'clean' },
  { category: 'Code change', ref: 'PR #4471', summary: 'Refactor invoice line-item calculator', detail: '+612 / -340 lines across billing/calc and billing/invoice. Touches the proration path flagged in BILL-2291.', signal: 'risk' },
  { category: 'Code change', ref: 'PR #4488', summary: 'Add JPY zero-decimal handling', detail: '+88 / -12 lines, fully covered by new unit tests in calc/currency.test.ts.', signal: 'clean' },
  { category: 'Test result', ref: 'CI run 20418', summary: '2,184 tests, 2,179 pass, 5 skipped', detail: 'Unit and integration suites green. Proration integration suite reports 0 cases for mid-cycle upgrade with an active coupon.', signal: 'watch' },
  { category: 'Open defect', ref: 'BUG-1190', summary: 'Coupon stacks incorrectly on annual plans', detail: 'Severity 2, open. Not in this candidate scope but lives in the same calculator module PR #4471 refactors.', signal: 'risk' },
  { category: 'Incident', ref: 'INC-884 (2026-03)', summary: 'Double-charge on plan upgrade', detail: 'Prior Sev-1 incident in the proration path. Root cause was an untested mid-cycle upgrade branch. Same branch is modified by PR #4471.', signal: 'risk' },
  { category: 'Customer impact', ref: 'Accounts: Northwind, Contoso, Vertex Labs', detail: 'Top 3 accounts by ARR ($412K combined) are on mid-cycle upgrade plans and would exercise the changed proration path within the first billing run.', summary: '3 strategic accounts on the affected path', signal: 'watch' },
];

export const testGaps: TestGap[] = [
  { id: 'gap-1', area: 'Proration', severity: 'High',
    description: 'No automated test covers a mid-cycle plan upgrade combined with an active coupon, the exact branch behind incident INC-884.',
    evidence: 'BILL-2291 criterion 4 has no linked test; proration integration suite reports 0 cases for this combination; INC-884 root cause maps to this branch.',
    recommendation: 'Add an integration test for mid-cycle upgrade with an active coupon before ship.' },
  { id: 'gap-2', area: 'Regression risk', severity: 'High',
    description: 'PR #4471 refactors the same calculator module that holds open defect BUG-1190, with no regression test pinning current coupon-stacking behavior.',
    evidence: 'PR #4471 diff overlaps calc/coupon.ts; BUG-1190 is open Sev-2 in that file; no characterization test exists.',
    recommendation: 'Add a regression test pinning coupon behavior, or block until BUG-1190 is triaged against this change.' },
  { id: 'gap-3', area: 'Currency', severity: 'Low',
    description: 'JPY zero-decimal rounding is covered, but no end-to-end invoice test asserts the rendered total for a JPY multi-line invoice.',
    evidence: 'Unit coverage present in calc/currency.test.ts; no e2e assertion on invoice render.',
    recommendation: 'Optional: add one e2e invoice-render assertion for JPY. Low severity, can be accepted with a follow-up ticket.' },
];

export const stepEvidence: Record<StepId, EvidenceConfig> = {
  intro: { title: '', sourceRecords: [], rationale: '', confidence: 'High', missingInfo: [], escalationTriggers: [], auditTrail: [] },
  enhancements: { title: '', sourceRecords: [], rationale: '', confidence: 'High', missingInfo: [], escalationTriggers: [], auditTrail: [] },
  candidate: {
    title: 'Release Candidate Dossier',
    sourceRecords: ['Issue tracker (Jira BILL-2291, BILL-2305)', 'Source control (PR #4471, #4488)', 'CI test results (run 20418)', 'Defect tracker (BUG-1190)', 'Incident history (INC-884)', 'CRM account-to-feature map'],
    rationale: 'The agent assembled every artifact linked to billing-service 4.18.0 - requirements, code changes, tests, open defects, the prior proration incident, and the strategic accounts on the affected path - into one dossier so the QA lead reviews a complete picture instead of chasing tabs.',
    confidence: 'High',
    missingInfo: ['PR #4471 has no linked design doc for the calculator refactor'],
    escalationTriggers: ['A linked requirement has zero associated tests', 'A code change overlaps a module with an open Sev-1 or Sev-2 defect'],
    auditTrail: ['08:02 UTC: Dossier assembled from 6 connected systems.', '08:02 UTC: 8 artifacts linked to candidate rc-1.'],
  },
  analyze: {
    title: 'Release-Risk Analysis',
    sourceRecords: ['Dossier artifacts (candidate rc-1)', 'Historical incident-to-code map', 'Test-coverage index by requirement', 'Change-overlap graph'],
    rationale: 'The agent scored the candidate at 72 (High) and ranked three test gaps. The top two tie directly to evidence: the proration gap maps to the INC-884 root-cause branch, and the regression gap overlaps open defect BUG-1190. The agent proposes; the QA lead judges each gap.',
    confidence: 'Medium',
    missingInfo: ['Customer-impact weighting assumes current ARR tiers; confirm account list is fresh'],
    escalationTriggers: ['Risk score above 70 on a candidate touching billing', 'A gap maps to a path with a prior Sev-1 incident'],
    auditTrail: ['08:05 UTC: Risk score computed (72).', '08:05 UTC: 3 test gaps ranked and tied to evidence.'],
  },
  remediate: {
    title: 'Remediation Decision (QA Lead)',
    sourceRecords: ['Ranked test gaps', 'Coverage index', 'QA-lead decision log'],
    rationale: 'The QA lead approves, returns, or accepts the risk on each proposed gap. Nothing advances automatically. The agent records the decision and the rationale so the release manager and auditors see who decided what and why.',
    confidence: 'High',
    missingInfo: ['Accepted-risk items require a linked follow-up ticket before sign-off'],
    escalationTriggers: ['A High-severity gap is accepted without a follow-up ticket', 'Remediation would slip the target window by more than 24 hours'],
    auditTrail: ['08:12 UTC: QA lead opened remediation gate.', '- Awaiting QA-lead decision on 3 gaps.'],
  },
  signoff: {
    title: 'Release-Manager Sign-Off',
    sourceRecords: ['QA-approved remediation plan', 'Full evidence pack (dossier + analysis + decisions)', 'Deployment runbook & rollback plan'],
    rationale: 'Sign-off is an explicit human decision by the release manager, with the full evidence pack attached. The agent assembles the pack and pre-checks the gates, but it cannot ship. The release proceeds only when the release manager signs.',
    confidence: 'High',
    missingInfo: [],
    escalationTriggers: ['An open High-severity gap has no approved remediation', 'Rollback plan is missing or untested'],
    auditTrail: ['08:24 UTC: Evidence pack compiled for sign-off.', '08:24 UTC: Awaiting release-manager signature.'],
  },
  impact: {
    title: 'Release Health & Impact',
    sourceRecords: ['Release outcome telemetry', 'Escaped-defect tracker', 'Triage throughput logs', 'Cycle-time history'],
    rationale: 'The dashboard rolls up release cycle time, escaped defects, triage productivity, and high-risk releases caught before ship. The agent computes the metrics from delivery telemetry; engineering leadership owns the targets and the read.',
    confidence: 'High',
    missingInfo: [],
    escalationTriggers: [],
    auditTrail: ['08:40 UTC: billing-service 4.18.0 shipped with both High gaps closed.', '08:40 UTC: Release metrics posted to the delivery dashboard.'],
  },
};
