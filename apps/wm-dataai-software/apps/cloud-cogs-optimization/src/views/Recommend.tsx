import React, { useState } from 'react';
import { recommendations } from '../data';
import { GuideCollapsible } from '../components/GuideCollapsible';
import { AITask, HumanTask, Badge, Button } from '../components/Shared';
import { ArrowRight, Check, TrendingUp, ShieldAlert, RotateCcw } from 'lucide-react';

const usd = (n: number) => '$' + n.toLocaleString('en-US');

const categoryVariant = (c: string): 'blue' | 'magenta' | 'amber' | 'green' =>
  c === 'Rightsize' ? 'blue' : c === 'Schedule' ? 'green' : c === 'Query/Cluster Tuning' ? 'amber' : 'magenta';

export const Recommend = ({ onNext }: { onNext: () => void }) => {
  const required = recommendations.filter(r => !r.optional);
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const toggle = (id: string) => setSelected(prev => ({ ...prev, [id]: !prev[id] }));
  const anyRequiredSelected = required.some(r => selected[r.id]);
  const selectedSavings = recommendations.filter(r => selected[r.id]).reduce((s, r) => s + r.projectedSavings, 0);
  const totalSavings = recommendations.reduce((s, r) => s + r.projectedSavings, 0);

  return (
    <div className="space-y-6">
      <GuideCollapsible
        title="How to use this page"
        talkTrack="This is the heart of the agent. It doesn't just say spend less - it proposes specific, ranked actions, each with a dollar figure, a risk note, and an SLA guardrail. The engineer judges the tradeoff, not just the savings."
      >
        <p>This page shows the ranked optimization actions for the workload.</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li><strong>Review:</strong> Read each action's projected savings, risk, SLA note, and rollback path.</li>
          <li><strong>Action:</strong> Select the actions you want to carry forward into the approval gate.</li>
          <li><strong>Decision:</strong> Selecting an action does not apply it - the owner still has to approve each one on the next page.</li>
        </ul>
      </GuideCollapsible>

      <AITask>
        The agent generated four actions ranked by savings and risk: rightsize to a single job cluster, move the replica copy to on-demand, tune the three heaviest queries, and tier old intermediates. Together they project roughly {usd(totalSavings)}/mo. Each action carries an SLA guardrail and a rollback note.
      </AITask>

      <div className="bg-gradient-to-r from-blue-50 to-wm-gray-light/40 border border-blue-100 rounded-lg p-4 flex items-center gap-3">
        <TrendingUp className="w-6 h-6 text-wm-blue-highlight shrink-0" />
        <p className="text-sm text-wm-blue">
          <strong>Why it matters:</strong> Rightsizing alone returns <strong>{usd(14900)}/mo</strong> at low risk while still clearing the 06:00 SLA. The agent ranks by value <em>and</em> safety, so the engineer starts with the highest-confidence move.
        </p>
      </div>

      <div className="space-y-3">
        {recommendations.map((r) => (
          <div key={r.id} className={`bg-white rounded-lg border shadow-sm p-4 transition-colors ${selected[r.id] ? 'border-blue-300 bg-blue-50/30' : 'border-wm-gray-med'}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <Badge variant={categoryVariant(r.category)}>{r.category}</Badge>
                  <Badge variant="gray">{r.effort} effort</Badge>
                  {r.optional && <Badge variant="gray">Optional</Badge>}
                  <span className="text-sm font-semibold text-green-700 ml-auto whitespace-nowrap">{usd(r.projectedSavings)}/mo projected</span>
                </div>
                <p className="text-sm text-wm-blue font-medium leading-relaxed mb-2">{r.action}</p>
                <div className="grid sm:grid-cols-3 gap-2 text-xs">
                  <div className="flex items-start gap-1.5 text-wm-gray-dark"><ShieldAlert className="w-3.5 h-3.5 text-wm-magenta mt-0.5 shrink-0" /><span><strong>Risk:</strong> {r.risk}</span></div>
                  <div className="flex items-start gap-1.5 text-wm-gray-dark"><Check className="w-3.5 h-3.5 text-wm-blue-highlight mt-0.5 shrink-0" /><span><strong>SLA:</strong> {r.slaNote}</span></div>
                  <div className="flex items-start gap-1.5 text-wm-gray-dark"><RotateCcw className="w-3.5 h-3.5 text-wm-gray-dark mt-0.5 shrink-0" /><span><strong>Rollback:</strong> {r.rollback}</span></div>
                </div>
              </div>
              <Button onClick={() => toggle(r.id)} variant={selected[r.id] ? 'secondary' : 'outline'} className="whitespace-nowrap shrink-0" Icon={selected[r.id] ? Check : undefined}>
                {selected[r.id] ? 'Selected' : 'Select'}
              </Button>
            </div>
          </div>
        ))}
      </div>

      <HumanTask done={anyRequiredSelected}>
        {anyRequiredSelected
          ? `Selected actions project ${usd(selectedSavings)}/mo. These carry forward to the approval gate - nothing applies until the owner approves each one.`
          : 'Select the actions you want to carry into the approval gate. Selecting does not apply a change; the owner approves each one next.'}
      </HumanTask>

      <div className="flex justify-end">
        <Button onClick={onNext} variant="primary" disabled={!anyRequiredSelected} Icon={ArrowRight}>Send to owner approval</Button>
      </div>
    </div>
  );
};
