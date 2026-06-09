import React from 'react';
import { retrieved } from '../data';
import { RetrievedItem } from '../types';
import { GuideCollapsible } from '../components/GuideCollapsible';
import { AITask, HumanTask, Badge, Button } from '../components/Shared';
import { ArrowRight, CheckCircle2, Bug, FileText, BookOpen } from 'lucide-react';

const kindIcon = (k: RetrievedItem['kind']) =>
  k === 'Resolved case' ? CheckCircle2 : k === 'Known defect' ? Bug : k === 'Release note' ? FileText : BookOpen;

const kindVariant = (k: RetrievedItem['kind']): 'green' | 'magenta' | 'blue' | 'gray' =>
  k === 'Resolved case' ? 'green' : k === 'Known defect' ? 'magenta' : k === 'Release note' ? 'blue' : 'gray';

export const Retrieval = ({ onNext }: { onNext: () => void }) => {
  return (
    <div className="space-y-6">
      <GuideCollapsible
        title="How to use this page"
        talkTrack="Before drafting a single word, the agent retrieves the evidence: similar resolved cases, known defects, release notes, and KB. Each is scored for relevance and labeled with its source, so the engineer can see exactly why the agent thinks it knows the answer. The agent retrieves; the human reviews the evidence."
      >
        <p>This page shows the evidence retrieved for TKT-58213, ranked by relevance.</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li><strong>Review:</strong> Read each retrieved item. The top resolved case is a near-identical match.</li>
          <li><strong>Check the source:</strong> Every item names where it came from - resolved cases, the defect tracker, release notes, or the KB.</li>
          <li><strong>Watch the defect:</strong> DEF-2207 only applies to certain platform versions; that is the one open question to confirm.</li>
          <li><strong>Next:</strong> Move to the drafted reply, which is built only from these sources.</li>
        </ul>
      </GuideCollapsible>

      <AITask>
        The agent searched four knowledge sources and ranked the matches for this ticket. The top result, CASE-44190 at 94% relevance, is a near-identical resolved case where enabling SSO rotated the webhook signing secret. A confirmed defect and the relevant release note corroborate the cause.
      </AITask>

      <div className="space-y-3">
        {retrieved.map((r) => {
          const Icon = kindIcon(r.kind);
          return (
            <div key={r.id} className="bg-white rounded-lg border border-wm-gray-med shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-wm-gray-med bg-wm-gray-light flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <Icon className="w-4 h-4 text-wm-blue-highlight shrink-0" />
                  <h3 className="font-semibold text-wm-blue text-sm truncate">{r.title}</h3>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Badge variant={kindVariant(r.kind)}>{r.kind}</Badge>
                  <span className="text-xs font-bold text-wm-blue">{r.relevance}%</span>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-wm-gray-dark leading-relaxed mb-2">{r.detail}</p>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-wider text-wm-gray-dark">Source:</span>
                  <span className="text-[10px] bg-blue-50 text-wm-blue-highlight px-2 py-0.5 rounded">{r.source}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <HumanTask>
        Review the retrieved evidence. The top resolved case and the confirmed defect explain the cause; confirm the tenant platform version so DEF-2207 applies before relying on it.
      </HumanTask>

      <div className="flex justify-end">
        <Button onClick={onNext} variant="primary" Icon={ArrowRight}>See the drafted reply</Button>
      </div>
    </div>
  );
};
