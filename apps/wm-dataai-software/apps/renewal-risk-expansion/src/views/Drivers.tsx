import React, { useState } from 'react';
import { riskDrivers, expansionPlays } from '../data';
import { GuideCollapsible } from '../components/GuideCollapsible';
import { AITask, HumanTask, Badge, Button } from '../components/Shared';
import { ArrowRight, Check, AlertTriangle, TrendingUp } from 'lucide-react';

export const Drivers = ({ onNext }: { onNext: () => void }) => {
  const [selected, setSelected] = useState<string[]>(['p1', 'p2']);

  const toggle = (id: string) =>
    setSelected(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);

  const selectedTotal = expansionPlays
    .filter(p => selected.includes(p.id))
    .reduce((sum, p) => sum + Number(p.arrImpact.replace(/[^0-9]/g, '')), 0);

  return (
    <div className="space-y-6">
      <GuideCollapsible
        title="How to use this page"
        talkTrack="The left side explains why the account is at risk, ranked by contribution. The right side turns that into money: matched save and expansion plays with an ARR number. The CSM picks the plays; the model just does the matching."
      >
        <p>This page ranks the risk drivers and matches each to a play.</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li><strong>Review:</strong> See which factors drive the 82 risk score, weighted by contribution.</li>
          <li><strong>Action:</strong> Select the expansion plays you want to pursue. The selected ARR total updates live.</li>
          <li><strong>Decision:</strong> The model ranks and matches; you choose what to pursue. Estimates use list pricing pending the account discount schedule.</li>
        </ul>
      </GuideCollapsible>

      <AITask>
        The agent ranked 4 risk drivers by their contribution to the score and matched 3 expansion plays worth up to $415K in ARR. The CSM selects which plays to carry into the action plan.
      </AITask>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-wm-gray-med shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-wm-gray-med bg-wm-gray-light flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-wm-magenta" />
            <h3 className="font-semibold text-wm-blue text-sm">Ranked Risk Drivers</h3>
          </div>
          <div className="p-4 space-y-4">
            {riskDrivers.map((d) => (
              <div key={d.id}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-wm-blue">{d.driver}</span>
                  <span className="text-xs font-mono text-wm-gray-dark">{d.weight}%</span>
                </div>
                <div className="h-2 bg-wm-gray-light rounded-full overflow-hidden mb-1">
                  <div className="h-full bg-wm-magenta rounded-full" style={{ width: `${d.weight}%` }} />
                </div>
                <p className="text-xs text-wm-gray-dark leading-relaxed">{d.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-wm-gray-med shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-wm-gray-med bg-wm-gray-light flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <h3 className="font-semibold text-wm-blue text-sm">Matched Expansion Plays</h3>
            </div>
            <Badge variant="green">Selected: +${selectedTotal}K</Badge>
          </div>
          <div className="p-4 space-y-3">
            {expansionPlays.map((p) => {
              const isSel = selected.includes(p.id);
              return (
                <button key={p.id} onClick={() => toggle(p.id)}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${isSel ? 'bg-green-50/50 border-green-300' : 'bg-white border-wm-gray-med hover:bg-wm-gray-light'}`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-wm-blue flex items-center gap-2">
                      <span className={`w-4 h-4 rounded border flex items-center justify-center ${isSel ? 'bg-green-600 border-green-600' : 'border-wm-gray-med'}`}>
                        {isSel && <Check className="w-3 h-3 text-white" />}
                      </span>
                      {p.play}
                    </span>
                    <span className="text-sm font-bold text-green-700">{p.arrImpact}</span>
                  </div>
                  <p className="text-xs text-wm-gray-dark leading-relaxed pl-6">{p.rationale}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <HumanTask done={selected.length > 0}>
        {selected.length > 0
          ? `${selected.length} play(s) selected, +$${selectedTotal}K in expansion ARR carried into the action plan.`
          : 'Select at least one expansion play to carry into the action plan.'}
      </HumanTask>

      <div className="flex justify-end">
        <Button onClick={onNext} variant="primary" disabled={selected.length === 0} Icon={ArrowRight}>Build action plan</Button>
      </div>
    </div>
  );
};
