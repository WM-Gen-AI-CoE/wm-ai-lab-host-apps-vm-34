import React, { useState } from 'react';
import { testGaps } from '../data';
import { TestGap } from '../types';
import { GuideCollapsible } from '../components/GuideCollapsible';
import { AITask, HumanTask, Badge, Button } from '../components/Shared';
import { ArrowRight, Check, Ban, ShieldAlert, RotateCcw } from 'lucide-react';

type Decision = 'pending' | 'add-tests' | 'block' | 'accept';

const sevVariant = (s: TestGap['severity']): 'magenta' | 'amber' | 'green' =>
  s === 'High' ? 'magenta' : s === 'Medium' ? 'amber' : 'green';

const decisionLabel: Record<Exclude<Decision, 'pending'>, string> = {
  'add-tests': 'Add tests',
  'block': 'Block release',
  'accept': 'Accept risk',
};

const decisionVariant: Record<Exclude<Decision, 'pending'>, 'green' | 'magenta' | 'amber'> = {
  'add-tests': 'green',
  'block': 'magenta',
  'accept': 'amber',
};

export const Remediate = ({ onNext }: { onNext: () => void }) => {
  const [decisions, setDecisions] = useState<Record<string, Decision>>(
    Object.fromEntries(testGaps.map(g => [g.id, 'pending']))
  );

  const set = (id: string, d: Decision) => setDecisions(prev => ({ ...prev, [id]: d }));

  const allDecided = Object.values(decisions).every(d => d !== 'pending');
  // An accepted High-severity gap with no follow-up is the escalation case; here
  // we just require every High gap to be add-tests or block before sign-off.
  const highResolved = testGaps
    .filter(g => g.severity === 'High')
    .every(g => decisions[g.id] === 'add-tests' || decisions[g.id] === 'block');

  return (
    <div className="space-y-6">
      <GuideCollapsible
        title="How to use this page"
        talkTrack="This is the QA lead's gate. The agent cannot close a gap or move the release forward. For each gap the lead chooses to add tests, block the release, or accept the risk with a follow-up. Every decision and its owner is recorded for the sign-off pack."
      >
        <p>This page is the QA-lead remediation gate. You decide each gap.</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li><strong>Action:</strong> For each gap, choose Add tests, Block release, or Accept risk.</li>
          <li><strong>Guardrail:</strong> Every High-severity gap must be resolved (add tests or block) before sign-off opens.</li>
          <li><strong>Decision:</strong> This gate is yours. The agent records your choices but never decides for you.</li>
        </ul>
      </GuideCollapsible>

      <AITask>
        The agent presents each ranked gap with its recommendation and waits. It will compile your decisions into the evidence pack for the release manager, but it cannot approve remediation or advance the release on its own.
      </AITask>

      <div className="space-y-4">
        {testGaps.map((g) => {
          const d = decisions[g.id];
          return (
            <div key={g.id} className="bg-white rounded-lg border border-wm-gray-med shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-wm-gray-med bg-wm-gray-light flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-wm-blue text-sm">{g.area}</span>
                  <Badge variant={sevVariant(g.severity)}>{g.severity}</Badge>
                </div>
                {d !== 'pending'
                  ? <Badge variant={decisionVariant[d]}>{decisionLabel[d]}</Badge>
                  : <span className="text-xs text-wm-gray-dark">Awaiting decision</span>}
              </div>
              <div className="p-4 space-y-3">
                <p className="text-sm text-wm-gray-dark leading-relaxed">{g.description}</p>
                <p className="text-xs text-wm-gray-dark"><strong>Recommended:</strong> {g.recommendation}</p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <button onClick={() => set(g.id, 'add-tests')} className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md border transition-colors ${d === 'add-tests' ? 'bg-green-600 text-white border-green-600' : 'border-wm-gray-med text-wm-blue hover:bg-green-50'}`}>
                    <Check className="w-3.5 h-3.5" /> Add tests
                  </button>
                  <button onClick={() => set(g.id, 'block')} className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md border transition-colors ${d === 'block' ? 'bg-wm-magenta text-white border-wm-magenta' : 'border-wm-gray-med text-wm-blue hover:bg-pink-50'}`}>
                    <Ban className="w-3.5 h-3.5" /> Block release
                  </button>
                  <button onClick={() => set(g.id, 'accept')} className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md border transition-colors ${d === 'accept' ? 'bg-amber-500 text-white border-amber-500' : 'border-wm-gray-med text-wm-blue hover:bg-amber-50'}`}>
                    <ShieldAlert className="w-3.5 h-3.5" /> Accept risk
                  </button>
                  {d !== 'pending' && (
                    <button onClick={() => set(g.id, 'pending')} className="inline-flex items-center gap-1.5 px-2 py-1.5 text-xs text-wm-gray-dark hover:text-wm-blue">
                      <RotateCcw className="w-3.5 h-3.5" /> Reset
                    </button>
                  )}
                </div>
                {d === 'accept' && g.severity === 'High' && (
                  <p className="text-xs text-wm-magenta bg-pink-50 border border-pink-100 rounded p-2">
                    Accepting a High-severity gap is blocked at sign-off without a resolution. Resolve this gap (add tests or block) to proceed.
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <HumanTask done={allDecided && highResolved}>
        {allDecided && highResolved
          ? 'Remediation plan approved. All High-severity gaps are resolved and decisions are recorded for the sign-off pack.'
          : 'Decide every gap. All High-severity gaps must be resolved (add tests or block) before the release manager can sign off.'}
      </HumanTask>

      <div className="flex justify-end">
        <Button onClick={onNext} variant="primary" disabled={!allDecided || !highResolved} Icon={ArrowRight}>Send to release sign-off</Button>
      </div>
    </div>
  );
};
