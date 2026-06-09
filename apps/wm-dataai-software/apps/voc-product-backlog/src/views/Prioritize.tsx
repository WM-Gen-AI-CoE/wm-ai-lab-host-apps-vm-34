import React, { useState } from 'react';
import { themeLinks } from '../data';
import { GuideCollapsible } from '../components/GuideCollapsible';
import { AITask, HumanTask, Badge, Button } from '../components/Shared';
import { ArrowRight, Check, Clock, AlertTriangle } from 'lucide-react';

type Decision = 'pending' | 'accept' | 'defer';

export const Prioritize = ({ onNext }: { onNext: () => void }) => {
  const ranked = [...themeLinks].sort((a, b) =>
    parseFloat(b.arrAtRisk.replace(/[^0-9.]/g, '')) - parseFloat(a.arrAtRisk.replace(/[^0-9.]/g, ''))
  );

  const [decisions, setDecisions] = useState<Record<string, Decision>>(
    Object.fromEntries(ranked.map(t => [t.themeId, 'pending' as Decision]))
  );
  const [rationale, setRationale] = useState<Record<string, string>>({});

  const decide = (id: string, d: Decision) => setDecisions(prev => ({ ...prev, [id]: d }));

  const anyAccepted = Object.values(decisions).includes('accept');
  const allDecided = Object.values(decisions).every(d => d !== 'pending');
  const ready = anyAccepted && allDecided;

  return (
    <div className="space-y-6">
      <GuideCollapsible
        title="How to use this page"
        talkTrack="This is the human decision point, full stop. The agent recommends an order by ARR-at-risk, but the PM accepts or defers each theme and writes why. Deferring something above $2M is logged for the CPO. The product never decides the roadmap, the PM does."
      >
        <p>This page is the PM priority gate: rank, accept, or defer each theme with a rationale.</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li><strong>Review:</strong> Themes are pre-ranked by validated ARR-at-risk.</li>
          <li><strong>Decide:</strong> Accept or defer each one. Add a short rationale.</li>
          <li><strong>Gate:</strong> At least one theme must be accepted to hand engineering a backlog item.</li>
        </ul>
      </GuideCollapsible>

      <AITask>
        The agent ranked the themes by PM-validated ARR-at-risk and presents them for decision. It recommends accepting the top two ($3.9M and $1.8M). The decision, and the rationale, are yours.
      </AITask>

      <div className="space-y-3">
        {ranked.map((t, idx) => {
          const d = decisions[t.themeId];
          const highValue = parseFloat(t.arrAtRisk.replace(/[^0-9.]/g, '')) >= 2.0;
          return (
            <div key={t.themeId} className={`bg-white rounded-lg border shadow-sm overflow-hidden ${d === 'accept' ? 'border-green-300' : d === 'defer' ? 'border-amber-300' : 'border-wm-gray-med'}`}>
              <div className="p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-wm-blue text-white text-xs font-bold shrink-0">{idx + 1}</span>
                  <div>
                    <div className="font-semibold text-wm-blue">{t.themeName}</div>
                    <div className="text-xs text-wm-gray-dark">{t.arrAtRisk} ARR-at-risk · {t.churnAccounts} at-risk accounts</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Button onClick={() => decide(t.themeId, 'accept')} variant={d === 'accept' ? 'primary' : 'outline'} className="text-xs" Icon={Check}>Accept</Button>
                  <Button onClick={() => decide(t.themeId, 'defer')} variant={d === 'defer' ? 'secondary' : 'outline'} className="text-xs" Icon={Clock}>Defer</Button>
                </div>
              </div>
              {d !== 'pending' && (
                <div className="px-4 pb-4">
                  {d === 'defer' && highValue && (
                    <div className="flex items-center gap-2 text-xs text-amber-700 mb-2">
                      <AlertTriangle className="w-4 h-4" /> Deferring a theme above $2M ARR-at-risk is logged for CPO review.
                    </div>
                  )}
                  <input
                    type="text"
                    value={rationale[t.themeId] || ''}
                    onChange={(e) => setRationale(prev => ({ ...prev, [t.themeId]: e.target.value }))}
                    placeholder={d === 'accept' ? 'Rationale for accepting (e.g. unblocks 2 renewals this quarter)' : 'Rationale for deferring (e.g. needs deeper effort sizing first)'}
                    className="w-full px-3 py-2 text-sm border border-wm-gray-med rounded-md focus:outline-none focus:border-wm-blue-highlight focus:ring-1 focus:ring-wm-blue-highlight"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <HumanTask done={ready}>
        {ready
          ? 'Decisions recorded. The accepted item can be handed to engineering.'
          : 'Accept or defer every theme, and accept at least one, to continue. Your rationale is logged with each decision.'}
      </HumanTask>

      <div className="flex justify-end">
        <Button onClick={onNext} variant="primary" disabled={!ready} Icon={ArrowRight}>Format accepted item for engineering</Button>
      </div>
    </div>
  );
};
