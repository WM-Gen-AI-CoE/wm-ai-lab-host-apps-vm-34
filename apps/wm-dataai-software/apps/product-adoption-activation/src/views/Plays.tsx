import React, { useState } from 'react';
import { plays } from '../data';
import { GuideCollapsible } from '../components/GuideCollapsible';
import { AITask, HumanTask, Badge, Button } from '../components/Shared';
import { ArrowRight, Bell, Map, Headset, Check, Pencil, EyeOff } from 'lucide-react';

const channelIcon: Record<string, any> = {
  'In-app nudge': Bell,
  'Enablement path': Map,
  'CSM outreach': Headset,
};

export const Plays = ({ onNext }: { onNext: () => void }) => {
  const [edited, setEdited] = useState<Record<string, boolean>>({});
  const allTouched = plays.every(p => edited[p.id]);

  return (
    <div className="space-y-6">
      <GuideCollapsible
        title="How to use this page"
        talkTrack="These are the drafted interventions, all aimed at the one blocker we validated. The PM reviews and edits each one. Notice the customer-facing nudge and path copy speaks only to the user and their next action - it never mentions how it was produced. The internal CSM brief is clearly marked internal."
      >
        <p>This page is for reviewing and editing the drafted plays before they go to approval.</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li><strong>Review:</strong> Three plays target the data-source blocker: a nudge, an enablement path, and a CSM outreach.</li>
          <li><strong>Edit:</strong> Each draft is editable. Mark a play reviewed once you are happy with the copy.</li>
          <li><strong>Guardrail:</strong> Customer-facing copy speaks only to the user. The internal CSM brief is tagged Internal.</li>
        </ul>
      </GuideCollapsible>

      <AITask>
        Three plays were drafted against the validated data-source blocker, reusing patterns from the winning-play library. Customer-facing nudge and enablement-path copy is written for end users and makes no reference to how it was produced. Every draft stays editable until you approve it.
      </AITask>

      <div className="space-y-4">
        {plays.map((p) => {
          const Icon = channelIcon[p.channel];
          const isEdited = edited[p.id];
          return (
            <div key={p.id} className="bg-white rounded-lg border border-wm-gray-med shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-wm-gray-med bg-wm-gray-light flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-wm-blue-highlight" />
                  <h3 className="font-semibold text-wm-blue text-sm">{p.title}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="blue">{p.channel}</Badge>
                  {p.customerFacing
                    ? <Badge variant="green">Customer-facing</Badge>
                    : <Badge variant="gray"><EyeOff className="w-3 h-3 mr-1 inline" />Internal</Badge>}
                </div>
              </div>
              <div className="p-4 space-y-3">
                <p className="text-[11px] text-wm-gray-dark uppercase tracking-wider">Audience: {p.audience}</p>
                <div>
                  <label className="text-[11px] font-semibold text-wm-blue uppercase tracking-wider">
                    {p.customerFacing ? 'Customer-facing copy (editable)' : 'Internal CSM brief (editable)'}
                  </label>
                  <textarea
                    className="mt-1 w-full h-24 text-sm text-wm-blue border border-wm-gray-med rounded-md p-3 focus:outline-none focus:border-wm-blue-highlight focus:ring-1 focus:ring-wm-blue-highlight leading-relaxed"
                    defaultValue={p.draft}
                    onChange={() => setEdited(prev => ({ ...prev, [p.id]: prev[p.id] }))}
                  />
                </div>
                <div className="text-xs text-wm-gray-dark bg-blue-50/50 p-3 rounded border border-blue-100">
                  <strong className="text-wm-blue">Why this play:</strong> {p.rationale}
                </div>
                <div className="flex justify-end">
                  <Button
                    onClick={() => setEdited(prev => ({ ...prev, [p.id]: true }))}
                    variant={isEdited ? 'secondary' : 'outline'}
                    Icon={isEdited ? Check : Pencil}
                  >
                    {isEdited ? 'Reviewed' : 'Mark reviewed'}
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <HumanTask done={allTouched}>
        {allTouched ? 'All three plays reviewed and ready to scope into an experiment.' : 'Edit and mark each play reviewed. The PM owns the copy - nothing advances to approval until every play has been reviewed.'}
      </HumanTask>

      <div className="flex justify-end">
        <Button onClick={onNext} variant="primary" disabled={!allTouched} Icon={ArrowRight}>Scope into experiment</Button>
      </div>
    </div>
  );
};
