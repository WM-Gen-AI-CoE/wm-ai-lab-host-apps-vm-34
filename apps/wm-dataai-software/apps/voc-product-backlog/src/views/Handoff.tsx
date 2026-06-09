import React, { useState } from 'react';
import { kpis } from '../data';
import { GuideCollapsible } from '../components/GuideCollapsible';
import { Button, Badge } from '../components/Shared';
import { ArrowRight, CheckCircle2, Bug, DollarSign, ListChecks, Send } from 'lucide-react';

const acceptanceCriteria = [
  'SCIM 2.0 deprovisioning removes seat access within 5 minutes of source change.',
  'Okta group-to-role mapping is configurable with an admin preview before apply.',
  'All provisioning actions write to an exportable audit log.',
  'Linked defects SEC-2204 and SEC-2261 close as part of acceptance.',
];

export const Handoff = ({ onNext }: { onNext: () => void }) => {
  const [confirmed, setConfirmed] = useState(false);

  return (
    <div className="space-y-6">
      <GuideCollapsible
        title="How to use this page"
        talkTrack="The accepted item lands in engineering's tracker with everything they need: the problem, the customer evidence, the ARR at stake, the linked defects, and acceptance criteria. The agent formats it, but the PM confirms before it is pushed. The headline for a CPO: a backlog item carrying $3.9M of validated revenue evidence, assembled in minutes."
      >
        <p>This page formats the accepted item as an evidence-backed backlog ticket for engineering.</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li><strong>Review:</strong> Confirm the problem, evidence, ARR, linked defects, and acceptance criteria.</li>
          <li><strong>Confirm:</strong> The ticket is only pushed to the tracker after you confirm.</li>
          <li><strong>Close:</strong> See the cycle impact, then explore future enhancements.</li>
        </ul>
      </GuideCollapsible>

      <div className="bg-white rounded-lg border border-wm-gray-med shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-wm-gray-med bg-wm-gray-light flex items-center justify-between">
          <h3 className="font-semibold text-wm-blue text-sm">PROD-1042 · Enterprise SCIM auto-deprovisioning</h3>
          <Badge variant="blue">Ready to push to JIRA</Badge>
        </div>
        <div className="p-4 space-y-4">
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="bg-blue-50/50 rounded-lg p-3 flex items-start gap-2">
              <DollarSign className="w-4 h-4 text-wm-blue-highlight mt-0.5" />
              <div>
                <div className="text-[10px] text-wm-gray-dark uppercase tracking-wider">ARR-at-risk</div>
                <div className="text-lg font-bold text-wm-blue">$3.9M</div>
              </div>
            </div>
            <div className="bg-blue-50/50 rounded-lg p-3 flex items-start gap-2">
              <Bug className="w-4 h-4 text-wm-blue-highlight mt-0.5" />
              <div>
                <div className="text-[10px] text-wm-gray-dark uppercase tracking-wider">Linked defects</div>
                <div className="text-xs text-wm-gray-dark">SEC-2204</div>
                <div className="text-xs text-wm-gray-dark">SEC-2261</div>
              </div>
            </div>
            <div className="bg-blue-50/50 rounded-lg p-3 flex items-start gap-2">
              <ListChecks className="w-4 h-4 text-wm-blue-highlight mt-0.5" />
              <div>
                <div className="text-[10px] text-wm-gray-dark uppercase tracking-wider">Evidence links</div>
                <div className="text-lg font-bold text-wm-blue">9</div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-wm-gray-dark uppercase tracking-wider mb-2">Problem</h4>
            <p className="text-sm text-wm-gray-dark">Enterprise admins cannot auto-deprovision via SCIM and Okta group changes do not map to roles, stalling security reviews and creating manual offboarding. 1,840 mentions, +34% QoQ, concentrated above $80K ARR.</p>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-wm-gray-dark uppercase tracking-wider mb-2">Acceptance Criteria</h4>
            <ul className="space-y-1.5">
              {acceptanceCriteria.map((c, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-wm-gray-dark">
                  <span className="text-wm-blue-highlight mt-1">•</span>{c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className={`rounded-lg border shadow-sm overflow-hidden ${confirmed ? 'border-green-300' : 'border-wm-gray-med'}`}>
        <div className="p-4">
          {confirmed ? (
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
              <div>
                <p className="text-sm font-semibold text-green-800">Pushed to engineering backlog as PROD-1042.</p>
                <p className="text-xs text-wm-gray-dark">Confirmed by PM. Evidence links and ARR context travel with the ticket.</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm text-wm-gray-dark">Review the ticket above. It is pushed to the tracker only when you confirm. The agent formats it; you own the handoff.</p>
              <Button onClick={() => setConfirmed(true)} variant="primary" Icon={Send} className="whitespace-nowrap">Confirm &amp; push to JIRA</Button>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg border border-wm-gray-med shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-wm-gray-med bg-wm-gray-light">
          <h3 className="font-semibold text-wm-blue text-sm">Planning Cycle Impact</h3>
        </div>
        <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {kpis.map((k, i) => (
            <div key={i} className="text-center">
              <p className="text-[10px] text-wm-gray-dark uppercase tracking-wider mb-1 min-h-[2rem]">{k.label}</p>
              <p className="text-lg font-bold text-green-600">{k.improved}</p>
              <p className="text-xs text-wm-gray-dark line-through">was {k.baseline}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-wm-gray-light rounded-lg border border-wm-gray-med p-4">
        <h3 className="font-semibold text-wm-blue text-sm mb-2">Leadership Summary</h3>
        <p className="text-sm text-wm-gray-dark leading-relaxed">
          This cycle, scattered feedback became four ARR-linked themes and one engineering-ready backlog item carrying $3.9M of validated revenue evidence, assembled in days instead of weeks. The unlock is roadmap decisions made on revenue, not anecdote volume, with the PM in control of every accept and every push.
        </p>
      </div>

      <div className="flex justify-end">
        <Button onClick={onNext} variant="primary" Icon={ArrowRight}>View future enhancements</Button>
      </div>
    </div>
  );
};
