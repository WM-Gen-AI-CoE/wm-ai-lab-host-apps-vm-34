import React, { useState } from 'react';
import { leakageFlags } from '../data';
import { GuideCollapsible } from '../components/GuideCollapsible';
import { AITask, HumanTask, Button, Badge } from '../components/Shared';
import { ArrowRight, Check, X, AlertTriangle } from 'lucide-react';

type Decision = 'pending' | 'accepted' | 'dismissed';

const categoryVariant = (c: string): 'magenta' | 'amber' | 'blue' =>
  c === 'Discount leakage' ? 'magenta' : c === 'Nonstandard term' ? 'amber' : 'blue';

export const Leakage = ({ onNext }: { onNext: () => void }) => {
  const [decisions, setDecisions] = useState<Record<string, Decision>>(
    Object.fromEntries(leakageFlags.map((f) => [f.id, 'pending']))
  );

  const set = (id: string, d: Decision) => setDecisions((prev) => ({ ...prev, [id]: d }));
  const judged = leakageFlags.every((f) => decisions[f.id] !== 'pending');
  const acceptedCount = leakageFlags.filter((f) => decisions[f.id] === 'accepted').length;

  return (
    <div className="space-y-6">
      <GuideCollapsible
        title="How to use this page"
        talkTrack="Each flag carries a dollar impact tied to an approved finance definition, not a gut feel. The deal desk judges every one. Accepting a flag carries it into the recommendation; dismissing it captures a rationale for audit. Nothing moves forward until each is judged."
      >
        <p>This page is where the deal desk judges each leakage flag.</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li><strong>Review:</strong> Read each flag, its category, and its dollar or margin impact.</li>
          <li><strong>Decision:</strong> Accept a flag to carry it into the recommendation, or dismiss it.</li>
          <li><strong>Gate:</strong> Every flag must be judged before you can draft the recommendation.</li>
        </ul>
      </GuideCollapsible>

      <AITask>
        The agent raised {leakageFlags.length} flags against the pricing playbook, totaling roughly $50,400 in recoverable ARR plus margin risk on two nonstandard terms. Each flag ties to an approved finance definition. The deal desk accepts or dismisses every one.
      </AITask>

      <div className="space-y-3">
        {leakageFlags.map((f) => {
          const d = decisions[f.id];
          return (
            <div
              key={f.id}
              className={`bg-white rounded-lg border shadow-sm p-4 transition-colors ${
                d === 'accepted' ? 'border-green-300 bg-green-50/40' : d === 'dismissed' ? 'border-wm-gray-med opacity-70' : 'border-wm-gray-med'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className={`w-5 h-5 mt-0.5 shrink-0 ${f.severity === 'High' ? 'text-wm-magenta' : 'text-amber-500'}`} />
                  <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h4 className="text-sm font-semibold text-wm-blue">{f.title}</h4>
                      <Badge variant={categoryVariant(f.category)}>{f.category}</Badge>
                      <Badge variant={f.severity === 'High' ? 'magenta' : 'amber'}>{f.severity}</Badge>
                    </div>
                    <p className="text-xs text-wm-gray-dark leading-relaxed">{f.basis}</p>
                    <p className="text-xs font-semibold text-wm-blue mt-1">Impact: {f.impact}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  <Button onClick={() => set(f.id, 'accepted')} variant={d === 'accepted' ? 'primary' : 'outline'} Icon={Check} className="whitespace-nowrap">Accept</Button>
                  <Button onClick={() => set(f.id, 'dismissed')} variant={d === 'dismissed' ? 'secondary' : 'outline'} Icon={X} className="whitespace-nowrap">Dismiss</Button>
                </div>
              </div>
              {d === 'dismissed' && (
                <p className="text-[11px] text-wm-gray-dark italic mt-2 pl-8">Dismissal recorded with rationale for audit.</p>
              )}
            </div>
          );
        })}
      </div>

      <HumanTask done={judged}>
        {judged
          ? `All flags judged. ${acceptedCount} accepted and carried into the recommendation.`
          : 'Accept or dismiss every flag to continue. The agent cannot decide which leakage to pursue on your behalf.'}
      </HumanTask>

      <div className="flex justify-end">
        <Button onClick={onNext} variant="primary" disabled={!judged} Icon={ArrowRight}>Draft recommendation</Button>
      </div>
    </div>
  );
};
