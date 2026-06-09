import React from 'react';
import { experimentMetrics } from '../data';
import { GuideCollapsible } from '../components/GuideCollapsible';
import { AITask, HumanTask, Badge, Button } from '../components/Shared';
import { RotateCcw, TrendingUp, DollarSign } from 'lucide-react';

const statusVariant = (s: string): 'green' | 'amber' | 'blue' =>
  s === 'Ahead' ? 'green' : s === 'Watch' ? 'amber' : 'blue';

export const Monitor = ({ onNext }: { onNext: () => void }) => {
  return (
    <div className="space-y-6">
      <GuideCollapsible
        title="How to use this page"
        talkTrack="This is where the loop closes back to finance. We track activation, 30-day usage lift, and expansion-qualified accounts against the holdout. The product fix is not the goal in itself - the goal is the line that links activation to retention and expansion, which is what the CRO and CFO actually own."
      >
        <p>This page is the live experiment monitor, read by the PM and shared with leadership.</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li><strong>Read:</strong> Each metric shows current versus target, treatment against the holdout.</li>
          <li><strong>Watch:</strong> Amber means a metric is still inside its measurement window.</li>
          <li><strong>Link:</strong> Expansion-qualified accounts tie the product fix to NRR and a P&amp;L line.</li>
        </ul>
      </GuideCollapsible>

      <AITask>
        The experiment is tracked live, treatment versus the 15% holdout. Activation is recovering toward target, the data-source connect rate is up, and expansion-qualified accounts are climbing. The 30-day usage lift is still inside its measurement window and is flagged to watch.
      </AITask>

      <div className="grid sm:grid-cols-2 gap-4">
        {experimentMetrics.map((m, i) => (
          <div key={i} className="bg-white rounded-lg border border-wm-gray-med shadow-sm p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[11px] text-wm-gray-dark uppercase tracking-wider">{m.label}</p>
              <Badge variant={statusVariant(m.status)}>{m.status}</Badge>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-wm-blue">{m.current}</span>
              <span className="text-xs text-wm-gray-dark">target {m.target}</span>
            </div>
            <div className="mt-2 flex items-center gap-1 text-xs text-green-700">
              <TrendingUp className="w-3 h-3" /> vs holdout control
            </div>
          </div>
        ))}
      </div>

      <div className="bg-wm-blue text-white rounded-lg shadow-sm p-5">
        <div className="flex items-center gap-2 mb-2">
          <DollarSign className="w-5 h-5 text-wm-magenta" />
          <h3 className="font-semibold text-sm">Finance-owned linkage</h3>
        </div>
        <p className="text-sm text-white/90 leading-relaxed">
          Accounts that activate connect a data source, build a dashboard, and invite a teammate, and they expand at a materially higher rate. The experiment has moved 186 accounts into the expansion-qualified pool against a 280 target, tying this activation fix directly to net revenue retention rather than a product vanity metric.
        </p>
      </div>

      <HumanTask>
        Read the live results and decide whether to scale the experiment to the full cohort, extend the window, or roll back. The model tracks and surfaces - the decision to scale or stop stays with the PM.
      </HumanTask>

      <div className="flex justify-end">
        <Button onClick={onNext} variant="primary" Icon={RotateCcw}>See future enhancements</Button>
      </div>
    </div>
  );
};
