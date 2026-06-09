import React, { useState } from 'react';
import { themeLinks } from '../data';
import { GuideCollapsible } from '../components/GuideCollapsible';
import { AITask, HumanTask, Badge, Button } from '../components/Shared';
import { ArrowRight, DollarSign, Users, Bug, Map, Check } from 'lucide-react';

export const Link = ({ onNext }: { onNext: () => void }) => {
  const [validated, setValidated] = useState<Record<string, boolean>>({});
  const allValidated = themeLinks.every(l => validated[l.themeId]);

  const validate = (id: string) => setValidated(prev => ({ ...prev, [id]: true }));

  return (
    <div className="space-y-6">
      <GuideCollapsible
        title="How to use this page"
        talkTrack="This is the step that changes the conversation. Every theme now carries a dollar figure, a churn count, the defects behind it, and any roadmap item already in flight. The PM validates the dollars, because an over-stated ARR figure would mis-rank the whole backlog. That validation is the human control."
      >
        <p>This page links each theme to ARR-at-risk, churn, related defects, and existing roadmap items.</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li><strong>Review:</strong> See the revenue and defect evidence the agent joined to each theme.</li>
          <li><strong>Validate:</strong> Confirm the ARR-at-risk figure for each theme. Figures come from CRM contract values.</li>
          <li><strong>Decision:</strong> Ranking will use these dollars, so you validate them before the brief is drafted.</li>
        </ul>
      </GuideCollapsible>

      <AITask>
        The agent joined each theme to ARR-at-risk, churned-account count, related JIRA defects, and any existing roadmap item. Total ARR-at-risk linked this cycle is $6.4M. The SSO figure is flagged Medium confidence: 2 accounts are in active renewal, so it is routed for RevOps validation.
      </AITask>

      <div className="space-y-3">
        {themeLinks.map((l) => (
          <div key={l.themeId} className="bg-white rounded-lg border border-wm-gray-med shadow-sm overflow-hidden">
            <div className="p-4 border-b border-wm-gray-med flex items-center justify-between bg-wm-gray-light/50">
              <h3 className="font-semibold text-wm-blue">{l.themeName}</h3>
              <Badge variant={l.confidence === 'High' ? 'green' : l.confidence === 'Medium' ? 'amber' : 'gray'}>{l.confidence} confidence</Badge>
            </div>
            <div className="p-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-start gap-2">
                <DollarSign className="w-4 h-4 text-wm-blue-highlight mt-0.5 shrink-0" />
                <div>
                  <div className="text-[10px] text-wm-gray-dark uppercase tracking-wider">ARR-at-risk</div>
                  <div className="text-lg font-bold text-wm-blue">{l.arrAtRisk}</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Users className="w-4 h-4 text-wm-blue-highlight mt-0.5 shrink-0" />
                <div>
                  <div className="text-[10px] text-wm-gray-dark uppercase tracking-wider">At-risk accounts</div>
                  <div className="text-lg font-bold text-wm-blue">{l.churnAccounts}</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Bug className="w-4 h-4 text-wm-blue-highlight mt-0.5 shrink-0" />
                <div>
                  <div className="text-[10px] text-wm-gray-dark uppercase tracking-wider">Related defects</div>
                  {l.relatedDefects.length ? l.relatedDefects.map((d, i) => (
                    <div key={i} className="text-xs text-wm-gray-dark">{d}</div>
                  )) : <div className="text-xs text-wm-gray-dark italic">None linked</div>}
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Map className="w-4 h-4 text-wm-blue-highlight mt-0.5 shrink-0" />
                <div>
                  <div className="text-[10px] text-wm-gray-dark uppercase tracking-wider">Roadmap items</div>
                  {l.roadmapItems.length ? l.roadmapItems.map((r, i) => (
                    <div key={i} className="text-xs text-wm-gray-dark">{r}</div>
                  )) : <div className="text-xs text-wm-gray-dark italic">None yet</div>}
                </div>
              </div>
            </div>
            <div className="px-4 pb-4">
              {validated[l.themeId] ? (
                <div className="flex items-center gap-2 text-xs text-green-700 font-medium">
                  <Check className="w-4 h-4" /> ARR-at-risk validated by PM
                </div>
              ) : (
                <Button onClick={() => validate(l.themeId)} variant="outline" className="text-xs" Icon={Check}>Validate {l.arrAtRisk} ARR-at-risk</Button>
              )}
            </div>
          </div>
        ))}
      </div>

      <HumanTask done={allValidated}>
        {allValidated
          ? 'All ARR-at-risk figures validated. The brief can now be drafted against confirmed dollars.'
          : 'Validate the ARR-at-risk on each theme. The agent links the dollars from CRM; you confirm them so ranking is trustworthy.'}
      </HumanTask>

      <div className="flex justify-end">
        <Button onClick={onNext} variant="primary" disabled={!allValidated} Icon={ArrowRight}>Draft opportunity brief</Button>
      </div>
    </div>
  );
};
