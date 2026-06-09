import React from 'react';
import { testGaps } from '../data';
import { TestGap } from '../types';
import { GuideCollapsible } from '../components/GuideCollapsible';
import { AITask, HumanTask, Badge, Button } from '../components/Shared';
import { ArrowRight, Gauge, AlertTriangle } from 'lucide-react';

const sevVariant = (s: TestGap['severity']): 'magenta' | 'amber' | 'green' =>
  s === 'High' ? 'magenta' : s === 'Medium' ? 'amber' : 'green';

export const Analyze = ({ onNext }: { onNext: () => void }) => {
  return (
    <div className="space-y-6">
      <GuideCollapsible
        title="How to use this page"
        talkTrack="The agent turns the dossier into a release-risk summary: one score and a ranked list of test gaps, each tied back to specific evidence. The score is a starting point for the conversation, not a verdict. The QA lead judges every gap on the next page."
      >
        <p>This page is the release-risk summary with ranked test gaps.</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li><strong>Review:</strong> Read the risk score and the drivers behind it.</li>
          <li><strong>Action:</strong> Work down the ranked gaps. Each shows the evidence and a recommended action.</li>
          <li><strong>Decision:</strong> The agent proposes. The QA lead decides what to remediate, block, or accept on the next step.</li>
        </ul>
      </GuideCollapsible>

      <AITask>
        The agent scored billing-service 4.18.0 at 72 of 100 (High) and ranked three test gaps. The top two are High severity because they trace to the INC-884 incident path and to an open defect in the module PR #4471 refactors.
      </AITask>

      <div className="bg-white rounded-lg border border-wm-gray-med shadow-sm p-5">
        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center">
              <span className="text-2xl font-bold text-wm-magenta">72</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <Gauge className="w-4 h-4 text-wm-magenta" />
                <span className="font-semibold text-wm-blue">Release Risk Score</span>
                <Badge variant="magenta">High</Badge>
              </div>
              <p className="text-xs text-wm-gray-dark mt-1 max-w-md">Driven by a proration calculator refactor (PR #4471), an uncovered acceptance criterion in BILL-2291, and the prior Sev-1 incident INC-884 in the same code path.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {testGaps.map((g, idx) => (
          <div key={g.id} className="bg-white rounded-lg border border-wm-gray-med shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-wm-gray-med bg-wm-gray-light flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-wm-blue text-white text-xs font-bold flex items-center justify-center">{idx + 1}</span>
                <span className="font-semibold text-wm-blue text-sm">{g.area}</span>
              </div>
              <Badge variant={sevVariant(g.severity)}>{g.severity} severity</Badge>
            </div>
            <div className="p-4 space-y-3">
              <p className="text-sm text-wm-gray-dark leading-relaxed">{g.description}</p>
              <div className="bg-blue-50/50 rounded p-3 border border-blue-100">
                <p className="text-[10px] font-semibold text-wm-blue-highlight uppercase tracking-wider mb-1">Evidence</p>
                <p className="text-xs text-wm-blue leading-relaxed">{g.evidence}</p>
              </div>
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                <p className="text-xs text-wm-gray-dark"><strong>Recommended:</strong> {g.recommendation}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <HumanTask>
        Review the score and the ranked gaps. The agent has tied each to evidence, but you decide whether the analysis is sound before taking it to the remediation gate.
      </HumanTask>

      <div className="flex justify-end">
        <Button onClick={onNext} variant="primary" Icon={ArrowRight}>Open remediation gate</Button>
      </div>
    </div>
  );
};
