import React from 'react';
import { costBreakdown } from '../data';
import { GuideCollapsible } from '../components/GuideCollapsible';
import { AITask, HumanTask, Button } from '../components/Shared';
import { ArrowRight, Cpu, AlertTriangle } from 'lucide-react';

const usd = (n: number) => '$' + n.toLocaleString('en-US');

export const Analyze = ({ onNext }: { onNext: () => void }) => {
  const total = costBreakdown.reduce((s, c) => s + c.monthly, 0);

  return (
    <div className="space-y-6">
      <GuideCollapsible
        title="How to use this page"
        talkTrack="This is where the bill becomes a diagnosis. The agent decomposes the workload into compute, storage, and egress and ties each to a utilization number. The punchline writes itself: 74% of the cost is compute running at 28% utilization."
      >
        <p>This page explains why the flagged workload costs what it does.</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li><strong>Review:</strong> Read the cost breakdown and the utilization on each component. Low utilization on a large component is waste.</li>
          <li><strong>Interpret:</strong> The root-cause panel names the specific driver, not just the category.</li>
          <li><strong>Decision:</strong> You confirm the diagnosis before any action is proposed. The agent analyzes; you review.</li>
        </ul>
      </GuideCollapsible>

      <AITask>
        The agent decomposed analytics-elt-nightly into compute, storage, and egress and joined each to its utilization. Compute is the dominant cost at low utilization, and an orphaned cross-region replica copy is driving egress that downstream reporting no longer reads.
      </AITask>

      <div className="bg-white rounded-lg border border-wm-gray-med shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-wm-gray-med bg-wm-gray-light flex items-center justify-between">
          <h3 className="font-semibold text-wm-blue text-sm">Cost Breakdown · analytics-elt-nightly</h3>
          <span className="text-xs text-wm-gray-dark font-medium">{usd(total)}/mo total</span>
        </div>
        <div className="divide-y divide-wm-gray-med">
          {costBreakdown.map((c, i) => {
            const share = Math.round((c.monthly / total) * 100);
            const low = c.utilization < 40;
            return (
              <div key={i} className="p-4">
                <div className="flex items-center justify-between gap-4 mb-2">
                  <div className="font-medium text-wm-blue text-sm">{c.label}</div>
                  <div className="text-sm font-semibold text-wm-blue whitespace-nowrap">{usd(c.monthly)}/mo <span className="text-xs text-wm-gray-dark font-normal">({share}%)</span></div>
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[10px] uppercase tracking-wider text-wm-gray-dark w-20 shrink-0">Utilization</span>
                  <div className="flex-1 h-2 bg-wm-gray-light rounded-full overflow-hidden">
                    <div className={`h-full ${low ? 'bg-wm-magenta' : 'bg-wm-blue-highlight'}`} style={{ width: `${c.utilization}%` }} />
                  </div>
                  <span className={`text-xs font-semibold w-10 text-right ${low ? 'text-wm-magenta' : 'text-wm-gray-dark'}`}>{c.utilization}%</span>
                </div>
                <p className="text-xs text-wm-gray-dark leading-relaxed">{c.note}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-gradient-to-r from-pink-50 to-wm-gray-light/40 border border-pink-100 rounded-lg p-4 flex items-start gap-3">
        <AlertTriangle className="w-6 h-6 text-wm-magenta shrink-0 mt-0.5" />
        <div className="text-sm text-wm-blue">
          <p className="font-semibold mb-1">Root cause</p>
          <p>Compute is <strong>74% of the cost at 28% utilization</strong> - two all-purpose clusters were left warm across the run window instead of using a job cluster sized to the work. A nightly cross-region replica copy adds <strong>{usd(12400)}/mo</strong> of egress that downstream reporting no longer reads.</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-wm-gray-med shadow-sm p-4 flex items-center gap-3">
        <Cpu className="w-5 h-5 text-wm-blue-highlight shrink-0" />
        <p className="text-sm text-wm-gray-dark">SKU economics check: at the observed run profile, a single job cluster prices well below two warm all-purpose clusters, with no shared state to migrate. This sets up the rightsizing recommendation on the next page.</p>
      </div>

      <HumanTask>
        Review the breakdown and confirm the diagnosis. One open item: confirm no downstream consumer still reads the us-west-2 replica before its schedule is changed.
      </HumanTask>

      <div className="flex justify-end">
        <Button onClick={onNext} variant="primary" Icon={ArrowRight}>View recommendations</Button>
      </div>
    </div>
  );
};
