import React, { useState } from 'react';
import { GuideCollapsible } from '../components/GuideCollapsible';
import { AITask, HumanTask, Badge, Button } from '../components/Shared';
import { ArrowRight, FileText, Check } from 'lucide-react';

const defaultBrief = `PROBLEM
Enterprise admins cannot automatically deprovision users via SCIM, and Okta group changes do not map to roles. Offboarding is manual and security reviews stall before signature.

EVIDENCE
- 1,840 mentions this quarter, +34% QoQ, concentrated in accounts above $80K ARR.
- Northwind Logistics (churn-reason): downgraded after manual offboarding of 400 seats.
- Cobalt Health (sales call): security review blocked pending automated deprovisioning.
- Support ticket #44192 (Vertex Robotics): weekly manual role reassignment.

ARR IMPACT
$3.9M ARR-at-risk across 7 accounts (PM-validated). 2 accounts in active renewal.

PROPOSED SCOPE (starting point, not an estimate)
- SCIM 2.0 auto-deprovisioning with audit log.
- Okta group-to-role mapping with admin preview.
- Tie-in to existing defects SEC-2204 and SEC-2261.`;

export const Brief = ({ onNext }: { onNext: () => void }) => {
  const [text, setText] = useState(defaultBrief);
  const [approved, setApproved] = useState(false);

  return (
    <div className="space-y-6">
      <GuideCollapsible
        title="How to use this page"
        talkTrack="The agent drafts the brief the PM would otherwise spend a day writing, and every claim cites a source record. But the PM is the author of record. They edit freely, then approve. The product does not publish a brief on its own."
      >
        <p>This page holds the drafted product opportunity brief for the highest-impact theme.</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li><strong>Review:</strong> Read the problem, evidence, ARR impact, and proposed scope.</li>
          <li><strong>Edit:</strong> The brief is fully editable. Change anything before you approve it.</li>
          <li><strong>Approve:</strong> The brief cannot advance until you, the PM, approve it as author.</li>
        </ul>
      </GuideCollapsible>

      <AITask>
        The agent drafted an opportunity brief for the SSO / SCIM theme, citing 9 source records inline. Proposed scope is a starting point for engineering, not an effort estimate. The PM edits and approves below.
      </AITask>

      <div className="bg-white rounded-lg border border-wm-gray-med shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-wm-gray-med bg-wm-gray-light flex items-center justify-between">
          <h3 className="flex items-center gap-2 font-semibold text-wm-blue text-sm">
            <FileText className="w-4 h-4 text-wm-blue-highlight" /> Opportunity Brief: SSO / SCIM Provisioning
          </h3>
          <Badge variant="blue">9 sources cited</Badge>
        </div>
        <div className="p-4">
          <textarea
            className="w-full h-80 text-sm text-wm-blue border border-wm-gray-med rounded-md p-3 focus:outline-none focus:border-wm-blue-highlight focus:ring-1 focus:ring-wm-blue-highlight font-mono leading-relaxed"
            value={text}
            onChange={(e) => { setText(e.target.value); setApproved(false); }}
          />
          <p className="text-[11px] text-wm-gray-dark mt-2">Your edits are tracked against the AI draft and recorded in the audit trail. You are the author of record.</p>
        </div>
      </div>

      <label className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${approved ? 'bg-green-50/50 border-green-200' : 'bg-white border-wm-gray-med'}`}>
        <input type="checkbox" checked={approved} onChange={(e) => setApproved(e.target.checked)} className="mt-1 w-4 h-4 accent-wm-blue-highlight" />
        <span className="text-sm text-wm-gray-dark">
          <strong className="text-wm-blue">PM approval.</strong> I have reviewed and, where needed, edited this brief. It accurately frames the opportunity and I approve it as the author for the priority gate.
        </span>
      </label>

      <HumanTask done={approved}>
        {approved ? 'Brief approved by PM. Ready for the priority gate.' : 'Edit the brief as needed and approve it. The workflow will not advance without your approval.'}
      </HumanTask>

      <div className="flex justify-end">
        <Button onClick={onNext} variant="primary" disabled={!approved} Icon={ArrowRight}>Continue to priority gate</Button>
      </div>
    </div>
  );
};
