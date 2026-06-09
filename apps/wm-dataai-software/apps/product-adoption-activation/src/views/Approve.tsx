import React, { useState } from 'react';
import { plays } from '../data';
import { GuideCollapsible } from '../components/GuideCollapsible';
import { AITask, HumanTask, Badge, Button } from '../components/Shared';
import { ArrowRight, Check, ShieldCheck, FlaskConical } from 'lucide-react';

const successCriteria = [
  'Primary metric: lift the cohort activation rate from 41% toward the 64% target',
  'Secondary: raise data-source connect rate above 70%',
  'Guardrail: in-app nudge fires at most once per session, capped at 3 per account',
  'Holdout: 15% of the cohort excluded from all plays as a control group',
];

export const Approve = ({ onNext }: { onNext: () => void }) => {
  const [scopeConfirmed, setScopeConfirmed] = useState(false);
  const [approved, setApproved] = useState(false);

  return (
    <div className="space-y-6">
      <GuideCollapsible
        title="How to use this page"
        talkTrack="This is the human approval gate, and it is the whole point. The plays only become a live experiment when a PM signs off on the audience, the holdout, the success metric, and the guardrails. Nothing reaches a single user before this signature, and the approved scope is logged."
      >
        <p>This page turns the reviewed plays into a scoped experiment a PM must approve.</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li><strong>Confirm scope:</strong> Review the audience, holdout, success criteria, and guardrails.</li>
          <li><strong>Approve:</strong> Sign off to launch. Nothing ships to users until you approve.</li>
          <li><strong>Decision:</strong> This is the human-in-the-loop gate. The experiment cannot launch itself.</li>
        </ul>
      </GuideCollapsible>

      <AITask>
        The three reviewed plays were assembled into a single scoped experiment with a control-vs-treatment design, a primary success metric, and guardrails. The scope is presented for PM approval - it has not been launched and will not launch without your signature.
      </AITask>

      <div className="bg-white rounded-lg border border-wm-gray-med shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-wm-gray-med bg-wm-gray-light flex items-center gap-2">
          <FlaskConical className="w-4 h-4 text-wm-blue-highlight" />
          <h3 className="font-semibold text-wm-blue text-sm">Scoped Experiment: Self-serve Growth Activation</h3>
        </div>
        <div className="p-4 space-y-4">
          <div>
            <h4 className="text-[11px] font-semibold text-wm-blue uppercase tracking-wider mb-2">Plays in scope</h4>
            <div className="flex flex-wrap gap-2">
              {plays.map(p => (
                <Badge key={p.id} variant="blue">{p.channel}: {p.title}</Badge>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-[11px] font-semibold text-wm-blue uppercase tracking-wider mb-2">Success criteria &amp; guardrails</h4>
            <ul className="space-y-1.5">
              {successCriteria.map((c, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-wm-gray-dark">
                  <span className="text-wm-blue-highlight mt-1">&bull;</span>{c}
                </li>
              ))}
            </ul>
          </div>

          <label className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${scopeConfirmed ? 'bg-green-50/50 border-green-200' : 'bg-white border-wm-gray-med'}`}>
            <input type="checkbox" checked={scopeConfirmed} onChange={(e) => setScopeConfirmed(e.target.checked)} className="mt-1 w-4 h-4 accent-wm-blue-highlight" />
            <span className="text-sm text-wm-gray-dark">
              <strong className="text-wm-blue">Scope confirmed.</strong> I have reviewed the audience, holdout, success metric, and guardrails for this experiment.
            </span>
          </label>
        </div>
      </div>

      <div className={`rounded-lg border shadow-sm overflow-hidden ${approved ? 'border-green-300' : 'border-wm-gray-med'}`}>
        <div className={`px-4 py-3 flex items-center gap-2 ${approved ? 'bg-green-50' : 'bg-wm-gray-light'}`}>
          <ShieldCheck className={`w-4 h-4 ${approved ? 'text-green-600' : 'text-wm-blue-highlight'}`} />
          <h3 className={`font-semibold text-sm ${approved ? 'text-green-800' : 'text-wm-blue'}`}>
            {approved ? 'Experiment approved by PM' : 'PM approval required to launch'}
          </h3>
        </div>
        <div className="p-4">
          {!approved ? (
            <>
              <p className="text-sm text-wm-gray-dark mb-3">Approving logs the scope to the audit trail and launches the experiment to the treatment group, holding back the 15% control.</p>
              <Button onClick={() => setApproved(true)} variant="primary" disabled={!scopeConfirmed} Icon={Check}>
                Approve &amp; launch experiment
              </Button>
              {!scopeConfirmed && <p className="text-xs text-amber-700 mt-2">Confirm the scope above to enable approval.</p>}
            </>
          ) : (
            <p className="text-xs text-green-700">Approved by PM (you) at launch. Scope logged. Treatment group live; 15% holdout reserved as control.</p>
          )}
        </div>
      </div>

      <HumanTask done={approved}>
        {approved ? 'Experiment approved and launched. Advancing to the monitor.' : 'Confirm scope, then approve. This is the consequential action - the experiment will not reach any user without your explicit approval.'}
      </HumanTask>

      <div className="flex justify-end">
        <Button onClick={onNext} variant="primary" disabled={!approved} Icon={ArrowRight}>Monitor the experiment</Button>
      </div>
    </div>
  );
};
