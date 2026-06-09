import React, { useState } from 'react';
import { funnel } from '../data';
import { GuideCollapsible } from '../components/GuideCollapsible';
import { AITask, HumanTask, Button } from '../components/Shared';
import { ArrowRight, AlertTriangle, Check } from 'lucide-react';

export const Diagnose = ({ onNext }: { onNext: () => void }) => {
  const [validated, setValidated] = useState(false);
  const blocker = funnel.find(s => s.isBlocker);

  return (
    <div className="space-y-6">
      <GuideCollapsible
        title="How to use this page"
        talkTrack="This is where a vague drop-off becomes a specific, fixable blocker. We put the stalled cohort's funnel next to a healthy cohort's and look for the stage where they diverge. The model proposes the blocker - the PM confirms it before we spend a dollar fixing it."
      >
        <p>This page diagnoses why the cohort stalled by comparing it to a healthy cohort.</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li><strong>Compare:</strong> Read each stage stalled-cohort versus healthy-cohort.</li>
          <li><strong>Spot:</strong> The highlighted row is where the two funnels diverge most.</li>
          <li><strong>Validate:</strong> Confirm the blocker before drafting interventions. You own this call.</li>
        </ul>
      </GuideCollapsible>

      <AITask>
        The stalled cohort's funnel was placed next to the healthy reference cohort. The two track closely through setup, then split hard at "Connected a data source" (34% versus 89%). Every downstream stage collapses from there, pointing to data-source connection as the primary activation blocker.
      </AITask>

      <div className="bg-white rounded-lg border border-wm-gray-med shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-wm-gray-med bg-wm-gray-light flex items-center justify-between">
          <h3 className="font-semibold text-wm-blue text-sm">Activation Funnel - Stalled vs Healthy</h3>
          <div className="flex items-center gap-3 text-[11px] text-wm-gray-dark">
            <span className="inline-flex items-center gap-1"><span className="w-3 h-2 rounded-sm bg-wm-magenta inline-block" /> Stalled cohort</span>
            <span className="inline-flex items-center gap-1"><span className="w-3 h-2 rounded-sm bg-green-500 inline-block" /> Healthy cohort</span>
          </div>
        </div>
        <div className="p-4 space-y-3">
          {funnel.map((s, i) => {
            const gap = s.healthyPct - s.stalledPct;
            return (
              <div key={i} className={`rounded-lg p-3 ${s.isBlocker ? 'bg-amber-50 border border-amber-200' : ''}`}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-sm font-medium ${s.isBlocker ? 'text-amber-900' : 'text-wm-blue'}`}>
                    {s.isBlocker && <AlertTriangle className="w-4 h-4 inline mr-1 text-amber-500" />}
                    {s.stage}
                  </span>
                  <span className="text-xs text-wm-gray-dark">gap {gap} pts</span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-3 bg-wm-gray-light rounded-full overflow-hidden">
                      <div className="h-full bg-wm-magenta" style={{ width: `${s.stalledPct}%` }} />
                    </div>
                    <span className="text-xs font-mono text-wm-gray-dark w-9 text-right">{s.stalledPct}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-3 bg-wm-gray-light rounded-full overflow-hidden">
                      <div className="h-full bg-green-500" style={{ width: `${s.healthyPct}%` }} />
                    </div>
                    <span className="text-xs font-mono text-wm-gray-dark w-9 text-right">{s.healthyPct}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className={`rounded-lg border shadow-sm overflow-hidden ${validated ? 'border-green-300' : 'border-amber-300'}`}>
        <div className={`px-4 py-3 flex items-center gap-2 ${validated ? 'bg-green-50' : 'bg-amber-50'}`}>
          {validated ? <Check className="w-4 h-4 text-green-600" /> : <AlertTriangle className="w-4 h-4 text-amber-500" />}
          <h3 className={`font-semibold text-sm ${validated ? 'text-green-800' : 'text-amber-800'}`}>
            {validated ? 'Blocker validated' : 'Confirm the diagnosed blocker'}
          </h3>
        </div>
        <div className="p-4">
          <p className="text-sm text-wm-gray-dark mb-3">
            Proposed blocker: <strong>{blocker?.stage}</strong>. Only 34% of the stalled cohort connect a data source versus 89% of the healthy cohort, a {blocker ? blocker.healthyPct - blocker.stalledPct : 0}-point gap that cascades into every later stage.
          </p>
          {!validated ? (
            <Button onClick={() => setValidated(true)} variant="primary" Icon={Check}>Validate this blocker</Button>
          ) : (
            <p className="text-xs text-green-700">Confirmed by PM. Data-source connection is the activation blocker to target with the play set.</p>
          )}
        </div>
      </div>

      <HumanTask done={validated}>
        {validated ? 'Blocker validated and ready to address.' : 'Validate the blocker before drafting interventions. The PM owns the diagnosis - the workflow will not draft plays until you confirm.'}
      </HumanTask>

      <div className="flex justify-end">
        <Button onClick={onNext} variant="primary" disabled={!validated} Icon={ArrowRight}>Draft intervention plays</Button>
      </div>
    </div>
  );
};
