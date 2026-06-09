import React, { useState } from 'react';
import { GuideCollapsible } from '../components/GuideCollapsible';
import { AITask, HumanTask, Button, Badge } from '../components/Shared';
import { ArrowRight, PenLine, Check, FileText, Gauge, ListChecks, ShieldCheck, RotateCcw } from 'lucide-react';

export const SignOff = ({ onNext }: { onNext: () => void }) => {
  const [signed, setSigned] = useState(false);

  const packItems = [
    { icon: FileText, label: 'Candidate dossier', detail: '8 linked artifacts across 6 systems' },
    { icon: Gauge, label: 'Risk analysis', detail: 'Score 72 (High), 3 ranked test gaps' },
    { icon: ListChecks, label: 'QA remediation decisions', detail: 'Both High gaps resolved; 1 Low accepted with follow-up FUP-2310' },
    { icon: RotateCcw, label: 'Deployment & rollback plan', detail: 'Blue/green deploy, rollback tested in staging' },
  ];

  const gates = [
    'Both High-severity test gaps closed with merged tests (CI run 20431, green)',
    'Accepted Low gap has a linked follow-up ticket (FUP-2310)',
    'Rollback plan attached and validated in staging',
  ];

  return (
    <div className="space-y-6">
      <GuideCollapsible
        title="How to use this page"
        talkTrack="This is the release manager's sign-off, and it is deliberately a human decision. The agent has assembled the full evidence pack and pre-checked the gates, but it cannot ship. The release proceeds only when the release manager signs. That is the line we never cross."
      >
        <p>This page is the release-manager sign-off gate.</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li><strong>Review:</strong> Confirm the evidence pack and the pre-checked gates.</li>
          <li><strong>Action:</strong> Sign off to authorize the release window. This is your decision.</li>
          <li><strong>Boundary:</strong> The agent assembles and pre-checks. It does not ship. Only your signature authorizes the release.</li>
        </ul>
      </GuideCollapsible>

      <AITask>
        The agent compiled the full evidence pack - dossier, risk analysis, QA remediation decisions, and the rollback plan - and confirmed the release gates are met. It is ready for your decision and will not proceed without your signature.
      </AITask>

      <div className="bg-white rounded-lg border border-wm-gray-med shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-wm-gray-med bg-wm-gray-light">
          <h3 className="font-semibold text-wm-blue text-sm">Evidence Pack &middot; billing-service 4.18.0</h3>
        </div>
        <div className="divide-y divide-wm-gray-med">
          {packItems.map((p, i) => (
            <div key={i} className="p-4 flex items-center gap-3">
              <p.icon className="w-5 h-5 text-wm-blue-highlight shrink-0" />
              <div className="flex-1">
                <p className="text-sm text-wm-blue font-medium">{p.label}</p>
                <p className="text-xs text-wm-gray-dark">{p.detail}</p>
              </div>
              <Check className="w-4 h-4 text-green-600" />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-green-50/50 rounded-lg border border-green-200 overflow-hidden">
        <div className="px-4 py-3 border-b border-green-200 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-green-600" />
          <h3 className="font-semibold text-wm-blue text-sm">Release Gates (pre-checked)</h3>
        </div>
        <ul className="p-4 space-y-2">
          {gates.map((g, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-wm-gray-dark">
              <Check className="w-4 h-4 text-green-600 mt-0.5 shrink-0" /> {g}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-lg border-2 border-wm-blue shadow-sm p-5">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h3 className="font-semibold text-wm-blue">Release-manager sign-off</h3>
            <p className="text-xs text-wm-gray-dark">Target window Thu 18:00 UTC &middot; signed off by: M. Reyes, Release Manager</p>
          </div>
          {!signed ? (
            <Button onClick={() => setSigned(true)} variant="primary" Icon={PenLine}>Sign off on release</Button>
          ) : (
            <Badge variant="green">Signed off &middot; 08:31 UTC</Badge>
          )}
        </div>
      </div>

      <HumanTask done={signed}>
        {signed
          ? 'Release authorized by the release manager. The deployment window is cleared to proceed under the approved plan.'
          : 'Sign off to authorize the release. Your signature is required - the agent cannot ship on your behalf, and it never deploys autonomously.'}
      </HumanTask>

      <div className="flex justify-end">
        <Button onClick={onNext} variant="primary" disabled={!signed} Icon={ArrowRight}>View release impact</Button>
      </div>
    </div>
  );
};
