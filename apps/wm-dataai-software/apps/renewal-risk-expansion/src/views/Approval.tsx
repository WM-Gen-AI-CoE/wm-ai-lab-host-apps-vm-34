import React, { useState } from 'react';
import { GuideCollapsible } from '../components/GuideCollapsible';
import { AITask, HumanTask, Badge, Button } from '../components/Shared';
import { ArrowRight, ShieldAlert, ShieldCheck, RotateCcw, Mail } from 'lucide-react';

const approvalItems = [
  { id: 'ap1', label: 'Save offer: 6% uplift cap (down from 14%) for a 2-year co-term', value: 'Concession value approx. $90K vs. contractual uplift', within: true },
  { id: 'ap2', label: 'Executive sponsor: CCO value-realization session with the new VP', value: 'Escalation to Chief Customer Officer', within: true },
];

const renewalNote = `Subject: Renewing our partnership with Northwind Logistics

Hi [VP name],

Thank you for the time on our recent business review. As we approach your Aug 31 renewal, we want to make sure the next term is built around where Northwind is headed.

A few things we would like to put on the table:

  - A multi-year agreement with a reduced first-year increase, so your costs stay predictable as your teams ramp back up.
  - A dedicated value-realization session with our Chief Customer Officer to walk through the ROI summary you asked for and align on goals for the year ahead.
  - A focused enablement plan for the teams affected by your recent reorganization, plus an expanded analytics package for the group already building dashboards every day.

We are committed to making this renewal clearly worth it for your business. I will follow up to find time before the end of the month.

Warm regards,
Priya Raman
Customer Success Manager`;

export const Approval = ({ onNext }: { onNext: () => void }) => {
  const [decision, setDecision] = useState<'pending' | 'approved' | 'returned'>('pending');

  return (
    <div className="space-y-6">
      <GuideCollapsible
        title="How to use this page"
        talkTrack="This is the control point. No discount and no escalation reaches a customer without a manager approving it here. And notice the renewal note: it is written for the customer in plain business language, with no mention of a score, a model, or anything automated."
      >
        <p>This page is the manager approve-or-return gate.</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li><strong>Review:</strong> Check each concession and escalation against your authority and the relationship.</li>
          <li><strong>Action:</strong> Approve to release the plan, or return it to the CSM with changes.</li>
          <li><strong>Decision:</strong> The customer-facing renewal note is previewed for your approval. Nothing sends until you approve.</li>
        </ul>
      </GuideCollapsible>

      <AITask>
        The agent routed 2 items for manager approval and prepared a customer-facing renewal note for review. The manager approves or returns; no concession or message leaves the building without a human decision here.
      </AITask>

      <div className="bg-white rounded-lg border border-wm-gray-med shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-wm-gray-med bg-wm-gray-light flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-wm-magenta" />
          <h3 className="font-semibold text-wm-blue text-sm">Items Awaiting Approval</h3>
          <span className="text-xs text-wm-gray-dark ml-auto">Approver: Renewals Manager</span>
        </div>
        <div className="divide-y divide-wm-gray-med">
          {approvalItems.map((it) => (
            <div key={it.id} className="p-4 flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-wm-blue">{it.label}</p>
                <p className="text-xs text-wm-gray-dark mt-0.5">{it.value}</p>
              </div>
              <Badge variant={it.within ? 'green' : 'magenta'}>{it.within ? 'Within authority' : 'Escalate to CRO'}</Badge>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg border border-wm-gray-med shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-wm-gray-med bg-wm-gray-light flex items-center gap-2">
          <Mail className="w-4 h-4 text-wm-blue-highlight" />
          <h3 className="font-semibold text-wm-blue text-sm">Customer-Facing Renewal Note (preview)</h3>
          <Badge variant="gray">Plain business language</Badge>
        </div>
        <pre className="p-4 text-sm text-wm-gray-dark whitespace-pre-wrap font-sans leading-relaxed">{renewalNote}</pre>
      </div>

      <HumanTask done={decision === 'approved'}>
        {decision === 'approved'
          ? 'Approved. The concessions and renewal note are released to the CSM to deliver to the customer.'
          : decision === 'returned'
          ? 'Returned to the CSM with notes. The plan does not advance until it is revised and re-approved.'
          : 'Approve to release the plan, or return it to the CSM. The customer hears nothing until you decide.'}
      </HumanTask>

      <div className="flex flex-wrap justify-end gap-3">
        <Button onClick={() => setDecision('returned')} variant="outline" Icon={RotateCcw}>Return with changes</Button>
        <Button onClick={() => setDecision('approved')} variant="secondary" Icon={ShieldCheck}>Approve plan</Button>
        <Button onClick={onNext} variant="primary" disabled={decision !== 'approved'} Icon={ArrowRight}>View NRR impact</Button>
      </div>
    </div>
  );
};
