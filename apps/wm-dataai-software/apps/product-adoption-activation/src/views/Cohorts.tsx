import React, { useState } from 'react';
import { cohorts } from '../data';
import { GuideCollapsible } from '../components/GuideCollapsible';
import { AITask, HumanTask, Badge, Button } from '../components/Shared';
import { ArrowRight, TrendingDown, Users } from 'lucide-react';

const trendVariant = (t: string): 'green' | 'blue' | 'amber' | 'magenta' =>
  t === 'Healthy' ? 'green' : t === 'Recovering' ? 'blue' : 'magenta';

export const Cohorts = ({ onNext }: { onNext: () => void }) => {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelected(id);
    if (id === '1') onNext();
  };

  return (
    <div className="space-y-6">
      <GuideCollapsible
        title="How to use this page"
        talkTrack="This is the product team's cohort dashboard. Instead of one blended activation number, the team sees activation by segment, plan, and signup source, with the stalled journeys flagged. The model segments and ranks - the PM decides which cohort is worth acting on."
      >
        <p>This page is for picking which stalled cohort to investigate first.</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li><strong>Review:</strong> Scan activation by cohort. Magenta means a stalled journey worth attention.</li>
          <li><strong>Action:</strong> Open the Self-serve Growth cohort - the largest stalled population.</li>
          <li><strong>Decision:</strong> You choose the cohort. The model only segments and ranks, it never launches anything on its own.</li>
        </ul>
      </GuideCollapsible>

      <AITask>
        Cohorts were rebuilt from the latest 7-day telemetry snapshot and scored against the key activation journey. The Self-serve Growth cohort is surfaced first: activation has fallen to 41% against a comparable healthy cohort at 73%, and it carries the largest absolute count of stalled accounts (412).
      </AITask>

      <HumanTask done={!!selected}>
        {selected ? 'Cohort selected. Advancing to the blocker diagnosis.' : 'Review the cohorts and open one to investigate. You can act on any cohort and override the ranking based on your roadmap.'}
      </HumanTask>

      <div className="bg-white rounded-lg border border-wm-gray-med shadow-sm overflow-hidden">
        <div className="p-4 border-b border-wm-gray-med bg-wm-gray-light flex justify-between items-center">
          <h3 className="font-semibold font-sans text-wm-blue">Activation by Cohort</h3>
          <span className="text-xs text-wm-gray-dark font-medium">Updated just now &middot; 5 cohorts</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-wm-gray-dark uppercase bg-white border-b border-wm-gray-med">
              <tr>
                <th className="px-4 py-3">Cohort</th>
                <th className="px-4 py-3">Segment / Plan</th>
                <th className="px-4 py-3">Source</th>
                <th className="px-4 py-3">Accounts</th>
                <th className="px-4 py-3">Activation</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-wm-gray-med">
              {cohorts.map((c, idx) => (
                <tr key={c.id} className={`hover:bg-blue-50/50 transition-colors ${idx === 0 ? 'bg-blue-50/20' : ''}`}>
                  <td className="px-4 py-4">
                    <div className="font-semibold text-wm-blue">{c.name}</div>
                    <div className="text-xs text-wm-gray-dark flex items-center gap-1 mt-0.5">
                      {c.trend === 'Stalled' && <TrendingDown className="w-3 h-3 text-wm-magenta" />}
                      {c.blocker}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-xs text-wm-gray-dark">{c.segment} &middot; {c.plan}</td>
                  <td className="px-4 py-4 text-xs text-wm-gray-dark">{c.signupSource}</td>
                  <td className="px-4 py-4 text-wm-gray-dark whitespace-nowrap">
                    <span className="inline-flex items-center gap-1"><Users className="w-3 h-3 text-wm-gray-dark" />{c.accounts}</span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-wm-gray-light rounded-full overflow-hidden">
                        <div className={`h-full ${c.trend === 'Stalled' ? 'bg-wm-magenta' : 'bg-green-500'}`} style={{ width: `${c.activationRate}%` }} />
                      </div>
                      <span className="text-xs font-semibold text-wm-blue">{c.activationRate}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-4"><Badge variant={trendVariant(c.trend)}>{c.trend}</Badge></td>
                  <td className="px-4 py-4">
                    <Button
                      onClick={() => handleSelect(c.id)}
                      variant={idx === 0 ? 'primary' : 'outline'}
                      className="whitespace-nowrap"
                    >
                      {idx === 0 ? 'Investigate' : 'Open'} {idx === 0 && <ArrowRight className="w-4 h-4 ml-1" />}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
