import React, { useState } from 'react';
import { draftReply } from '../data';
import { GuideCollapsible } from '../components/GuideCollapsible';
import { AITask, HumanTask, Button, Badge } from '../components/Shared';
import { ArrowRight, Send, CheckCircle2, AlertTriangle } from 'lucide-react';

type Outcome = 'none' | 'sent-resolved' | 'escalate';

export const Validate = ({ onNext }: { onNext: () => void }) => {
  const [reviewed, setReviewed] = useState(false);
  const [outcome, setOutcome] = useState<Outcome>('none');

  return (
    <div className="space-y-6">
      <GuideCollapsible
        title="How to use this page"
        talkTrack="This is the human-in-the-loop gate. The support engineer edits the reply, confirms they have reviewed it, then makes one of two decisions: send and resolve, or escalate to engineering. Nothing reaches the customer without that explicit approve action. The agent drafts; the human decides."
      >
        <p>This page is where you approve, edit, and send - or escalate.</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li><strong>Edit:</strong> The reply is fully editable. Change anything that does not match your judgment or the customer's tone.</li>
          <li><strong>Confirm review:</strong> Check the box to confirm you have read and own this reply.</li>
          <li><strong>Decide:</strong> Send &amp; mark resolved, or escalate to engineering. Sending is disabled until you confirm review.</li>
        </ul>
      </GuideCollapsible>

      <AITask>
        The agent prepared the reply and outcome options, but takes no action on the customer. It surfaced the recommended outcome (send and resolve, given a tested fix) and the escalation path if the fix does not hold.
      </AITask>

      <div className="bg-white rounded-lg border border-wm-gray-med shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-wm-gray-med bg-wm-gray-light flex items-center justify-between">
          <h3 className="font-semibold text-wm-blue text-sm">Editable Customer Reply</h3>
          <Badge variant="blue">To: dana@northwindretail.com</Badge>
        </div>
        <div className="p-4">
          <textarea
            className="w-full h-72 text-sm text-wm-blue border border-wm-gray-med rounded-md p-3 focus:outline-none focus:border-wm-blue-highlight focus:ring-1 focus:ring-wm-blue-highlight leading-relaxed"
            defaultValue={draftReply}
            disabled={outcome === 'sent-resolved'}
          />
          <p className="text-[11px] text-wm-gray-dark mt-2">Edits here are tracked against the original draft and recorded in the audit trail. This text is what the customer receives.</p>
        </div>
      </div>

      <label className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${reviewed ? 'bg-green-50/50 border-green-200' : 'bg-white border-wm-gray-med'}`}>
        <input type="checkbox" checked={reviewed} onChange={(e) => setReviewed(e.target.checked)} disabled={outcome === 'sent-resolved'} className="mt-1 w-4 h-4 accent-wm-blue-highlight" />
        <span className="text-sm text-wm-gray-dark">
          <strong className="text-wm-blue">Engineer review.</strong> I have read and, where needed, edited this reply. It is accurate, customer-safe, and I am responsible for sending it.
          {!reviewed && <span className="block text-xs text-amber-700 mt-1">Confirm review to enable sending.</span>}
        </span>
      </label>

      {outcome === 'none' && (
        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          <Button onClick={() => setOutcome('escalate')} variant="outline" Icon={AlertTriangle} className="border-wm-magenta text-wm-magenta">
            Fix did not work - escalate
          </Button>
          <Button onClick={() => setOutcome('sent-resolved')} variant="primary" disabled={!reviewed} Icon={Send}>
            Send reply &amp; mark resolved
          </Button>
        </div>
      )}

      {outcome === 'sent-resolved' && (
        <div className="rounded-lg border border-green-300 bg-green-50 p-4 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-semibold text-green-800">Reply sent to Northwind Retail and ticket marked resolved.</p>
            <p className="text-xs text-green-700 mt-1">Sent at 10:08 AM by the support engineer. Outcome recorded as first-contact resolution. Continue to see the impact, or revisit escalation if the customer reports the fix did not hold.</p>
          </div>
        </div>
      )}

      {outcome === 'escalate' && (
        <div className="rounded-lg border border-wm-magenta/40 bg-pink-50 p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-wm-magenta mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-semibold text-wm-magenta">Marked for escalation to engineering.</p>
            <p className="text-xs text-wm-gray-dark mt-1">The agent will assemble a full escalation package on the next step. You will confirm routing before it leaves the support queue.</p>
          </div>
        </div>
      )}

      <HumanTask done={outcome !== 'none'}>
        {outcome === 'sent-resolved'
          ? 'Reply sent and ticket resolved. You own the message that reached the customer.'
          : outcome === 'escalate'
          ? 'Escalation selected. Confirm the routing on the next step.'
          : 'Edit the reply, confirm review, then decide: send and resolve, or escalate. The workflow takes no action on the customer until you do.'}
      </HumanTask>

      <div className="flex justify-end">
        <Button onClick={onNext} variant="primary" disabled={outcome === 'none'} Icon={ArrowRight}>
          Continue to escalation
        </Button>
      </div>
    </div>
  );
};
