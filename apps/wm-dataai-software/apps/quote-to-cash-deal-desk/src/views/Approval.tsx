import React, { useState } from 'react';
import { GuideCollapsible } from '../components/GuideCollapsible';
import { AITask, HumanTask, Button, Badge } from '../components/Shared';
import { ArrowRight, Check, RotateCcw, ShieldCheck, Users, DollarSign } from 'lucide-react';

type Gate = 'pending' | 'approved' | 'returned';

const approvers = [
  { id: 'dealdesk', role: 'Deal Desk', name: 'Priya Anand', Icon: Users, scope: 'Confirms terms match the playbook and the accepted leakage flags.' },
  { id: 'finance', role: 'Finance', name: 'Marcus Boone', Icon: DollarSign, scope: 'Confirms the deal clears the segment margin floor at the recommended terms.' },
];

export const Approval = ({ onNext }: { onNext: () => void }) => {
  const [gates, setGates] = useState<Record<string, Gate>>({ dealdesk: 'pending', finance: 'pending' });

  const set = (id: string, g: Gate) => setGates((prev) => ({ ...prev, [id]: g }));
  const allApproved = approvers.every((a) => gates[a.id] === 'approved');
  const anyReturned = approvers.some((a) => gates[a.id] === 'returned');

  return (
    <div className="space-y-6">
      <GuideCollapsible
        title="How to use this page"
        talkTrack="This is the control gate. Deal desk and finance approve in parallel, and both are required before the quote can sync. The margin floor check is automated, but a human signs off. Any approver can return the deal with notes. The agent never approves on anyone's behalf."
      >
        <p>This page is the deal-desk and finance approval gate.</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li><strong>Review:</strong> Confirm the automated margin floor check, then approve in each lane.</li>
          <li><strong>Decision:</strong> Approve or return with notes. Both lanes must approve to sync.</li>
          <li><strong>Escalation:</strong> If the floor check failed, the deal would route to the CFO as an exception.</li>
        </ul>
      </GuideCollapsible>

      <AITask>
        The agent ran the margin floor check against the finance definition. The recommended renewal clears the segment floor at an 81% modeled gross margin, so it is eligible for standard deal-desk and finance approval rather than a CFO exception. Both human approvals are required to sync.
      </AITask>

      <div className="bg-green-50/50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
        <ShieldCheck className="w-6 h-6 text-green-600 shrink-0" />
        <div>
          <p className="text-sm font-semibold text-green-800">Margin floor check passed</p>
          <p className="text-xs text-green-700">Modeled gross margin 81% vs. 78% segment floor. No CFO exception required.</p>
        </div>
        <Badge variant="green">Pass</Badge>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {approvers.map((a) => {
          const g = gates[a.id];
          return (
            <div key={a.id} className={`bg-white rounded-lg border shadow-sm p-4 ${g === 'approved' ? 'border-green-300' : g === 'returned' ? 'border-amber-300' : 'border-wm-gray-med'}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <a.Icon className="w-5 h-5 text-wm-blue-highlight" />
                  <div>
                    <p className="text-sm font-semibold text-wm-blue">{a.role}</p>
                    <p className="text-xs text-wm-gray-dark">{a.name}</p>
                  </div>
                </div>
                {g === 'approved' && <Badge variant="green">Approved</Badge>}
                {g === 'returned' && <Badge variant="amber">Returned</Badge>}
                {g === 'pending' && <Badge variant="gray">Pending</Badge>}
              </div>
              <p className="text-xs text-wm-gray-dark mb-3">{a.scope}</p>
              <div className="flex gap-2">
                <Button onClick={() => set(a.id, 'approved')} variant={g === 'approved' ? 'primary' : 'outline'} Icon={Check}>Approve</Button>
                <Button onClick={() => set(a.id, 'returned')} variant={g === 'returned' ? 'secondary' : 'outline'} Icon={RotateCcw}>Return with notes</Button>
              </div>
            </div>
          );
        })}
      </div>

      <HumanTask done={allApproved}>
        {allApproved
          ? 'Both lanes approved. The quote is cleared to sync to CRM and CPQ.'
          : anyReturned
          ? 'A lane returned the deal. Resolve the notes and re-approve both lanes before syncing.'
          : 'Both deal desk and finance must approve before the quote can sync. The agent cannot approve on your behalf.'}
      </HumanTask>

      <div className="flex justify-end">
        <Button onClick={onNext} variant="primary" disabled={!allApproved} Icon={ArrowRight}>Sync quote &amp; view impact</Button>
      </div>
    </div>
  );
};
