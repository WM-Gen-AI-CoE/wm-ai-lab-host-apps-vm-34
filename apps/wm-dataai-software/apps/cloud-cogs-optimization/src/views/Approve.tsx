import React, { useState } from 'react';
import { recommendations } from '../data';
import { GuideCollapsible } from '../components/GuideCollapsible';
import { AITask, HumanTask, Badge, Button } from '../components/Shared';
import { ArrowRight, Check, X, RotateCcw, ShieldCheck, Clock } from 'lucide-react';

const usd = (n: number) => '$' + n.toLocaleString('en-US');

type Decision = 'pending' | 'approved' | 'returned';

export const Approve = ({ onNext }: { onNext: () => void }) => {
  // The query-tuning action is held for a validation run before it can be approved.
  const gated = recommendations.filter(r => r.category === 'Query/Cluster Tuning').map(r => r.id);
  const [decisions, setDecisions] = useState<Record<string, Decision>>({});

  const set = (id: string, d: Decision) => setDecisions(prev => ({ ...prev, [id]: d }));

  const decidable = recommendations.filter(r => !gated.includes(r.id));
  const allDecided = decidable.every(r => decisions[r.id] && decisions[r.id] !== 'pending');
  const approvedSavings = recommendations
    .filter(r => decisions[r.id] === 'approved')
    .reduce((s, r) => s + r.projectedSavings, 0);
  const approvedCount = recommendations.filter(r => decisions[r.id] === 'approved').length;

  return (
    <div className="space-y-6">
      <GuideCollapsible
        title="How to use this page"
        talkTrack="This is the guardrail that lets a CFO sleep at night. The agent never touches the environment. The workload owner approves or returns each change, and every decision records who approved it, the rollback path, and the SLA it has to clear."
      >
        <p>This page is the owner's approval gate. Each change needs an explicit decision.</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li><strong>Action:</strong> Approve the changes you accept; return any you don't, with a reason.</li>
          <li><strong>Guardrail:</strong> The query-tuning change is held for a validation run and cannot be approved for production yet.</li>
          <li><strong>Decision:</strong> Nothing applies until you approve it. The agent cannot change a workload on its own.</li>
        </ul>
      </GuideCollapsible>

      <AITask>
        The agent assembled the selected actions into a change set with each one's rollback note and SLA guardrail attached. It holds the query-tuning change behind a validation run. It applies nothing - every item waits on the owner's decision.
      </AITask>

      <div className="space-y-3">
        {recommendations.map((r) => {
          const isGated = gated.includes(r.id);
          const d = decisions[r.id] || 'pending';
          return (
            <div key={r.id} className={`bg-white rounded-lg border shadow-sm p-4 transition-colors ${d === 'approved' ? 'border-green-300 bg-green-50/30' : d === 'returned' ? 'border-wm-magenta/40 bg-pink-50/20' : 'border-wm-gray-med'}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <Badge variant="blue">{r.category}</Badge>
                    <span className="text-sm font-semibold text-green-700">{usd(r.projectedSavings)}/mo</span>
                    {isGated && <Badge variant="amber">Held for validation run</Badge>}
                    {d === 'approved' && <Badge variant="green">Approved</Badge>}
                    {d === 'returned' && <Badge variant="magenta">Returned</Badge>}
                  </div>
                  <p className="text-sm text-wm-blue font-medium leading-relaxed mb-2">{r.action}</p>
                  <div className="flex flex-col sm:flex-row gap-2 text-xs text-wm-gray-dark">
                    <span className="inline-flex items-start gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-wm-blue-highlight mt-0.5 shrink-0" /> {r.slaNote}</span>
                    <span className="inline-flex items-start gap-1.5"><RotateCcw className="w-3.5 h-3.5 text-wm-gray-dark mt-0.5 shrink-0" /> {r.rollback}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 shrink-0 w-32">
                  {isGated ? (
                    <span className="text-xs text-amber-700 bg-amber-50 border border-amber-100 rounded px-2 py-1.5 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Validation pending</span>
                  ) : (
                    <>
                      <Button onClick={() => set(r.id, 'approved')} variant={d === 'approved' ? 'secondary' : 'primary'} className="whitespace-nowrap" Icon={Check}>
                        {d === 'approved' ? 'Approved' : 'Approve'}
                      </Button>
                      <Button onClick={() => set(r.id, 'returned')} variant="outline" className="whitespace-nowrap" Icon={X}>
                        {d === 'returned' ? 'Returned' : 'Return'}
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-lg border border-wm-gray-med shadow-sm p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm text-wm-gray-dark">
          <strong className="text-wm-blue">{approvedCount}</strong> change(s) approved · projected <strong className="text-green-700">{usd(approvedSavings)}/mo</strong>
        </div>
        <div className="text-xs text-wm-gray-dark">Each approval is logged with the owner, timestamp, rollback note, and SLA guardrail.</div>
      </div>

      <HumanTask done={allDecided && approvedCount > 0}>
        {allDecided && approvedCount > 0
          ? 'Decisions recorded. Approved changes move to the scheduled off-peak cutover window; the held query-tuning change stays in validation.'
          : 'Approve or return each change. Nothing applies to the environment until you approve it.'}
      </HumanTask>

      <div className="flex justify-end">
        <Button onClick={onNext} variant="primary" disabled={!(allDecided && approvedCount > 0)} Icon={ArrowRight}>View realized impact</Button>
      </div>
    </div>
  );
};
