import React, { useState } from 'react';
import { candidates, dossier } from '../data';
import { DossierArtifact } from '../types';
import { GuideCollapsible } from '../components/GuideCollapsible';
import { AITask, HumanTask, Badge, Button } from '../components/Shared';
import { ArrowRight, FileText, GitPullRequest, FlaskConical, Bug, AlertTriangle, Users } from 'lucide-react';

const riskVariant = (s: string): 'green' | 'blue' | 'amber' | 'magenta' | 'gray' =>
  s === 'High' ? 'magenta' : s === 'Medium' ? 'amber' : 'green';

const statusVariant = (s: string): 'green' | 'blue' | 'amber' | 'gray' =>
  s === 'Shipped' ? 'gray' : s === 'In analysis' ? 'blue' : 'amber';

const categoryIcon: Record<DossierArtifact['category'], any> = {
  'Requirement': FileText,
  'Code change': GitPullRequest,
  'Test result': FlaskConical,
  'Open defect': Bug,
  'Incident': AlertTriangle,
  'Customer impact': Users,
};

const signalDot = (s: DossierArtifact['signal']) =>
  s === 'risk' ? 'bg-wm-magenta' : s === 'watch' ? 'bg-amber-400' : 'bg-green-500';

export const Candidate = ({ onNext }: { onNext: () => void }) => {
  const [open, setOpen] = useState<string | null>('PR #4471');

  return (
    <div className="space-y-6">
      <GuideCollapsible
        title="How to use this page"
        talkTrack="This is the release-review queue. Instead of opening six tabs to piece a release together, the lead sees every candidate ranked by risk, then opens one to find the full dossier already assembled - requirements, diffs, tests, defects, incident history, and the accounts in the blast radius."
      >
        <p>This page is for choosing a release candidate and reviewing its assembled dossier.</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li><strong>Review:</strong> Scan the candidate queue and risk levels, then open billing-service 4.18.0.</li>
          <li><strong>Action:</strong> Expand any artifact to see the underlying evidence the agent linked.</li>
          <li><strong>Decision:</strong> The agent only assembles and links evidence. It never approves or ships. You drive the review.</li>
        </ul>
      </GuideCollapsible>

      <AITask>
        The agent pulled every artifact connected to billing-service 4.18.0 across six systems - requirements, pull requests, the CI run, open defects, prior incidents, and the strategic accounts on the affected path - and assembled them into one dossier for review.
      </AITask>

      <div className="bg-white rounded-lg border border-wm-gray-med shadow-sm overflow-hidden">
        <div className="p-4 border-b border-wm-gray-med bg-wm-gray-light flex justify-between items-center">
          <h3 className="font-semibold font-sans text-wm-blue">Release Candidate Queue</h3>
          <span className="text-xs text-wm-gray-dark font-medium">Updated just now &middot; 4 candidates</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-wm-gray-dark uppercase bg-white border-b border-wm-gray-med">
              <tr>
                <th className="px-4 py-3">Candidate</th>
                <th className="px-4 py-3">Target Window</th>
                <th className="px-4 py-3">Risk</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-wm-gray-med">
              {candidates.map((c, idx) => (
                <tr key={c.id} className={`hover:bg-blue-50/50 transition-colors ${idx === 0 ? 'bg-blue-50/20' : ''}`}>
                  <td className="px-4 py-4">
                    <div className="font-semibold text-wm-blue">{c.name}</div>
                    <div className="text-xs text-wm-gray-dark font-mono">{c.service} &middot; v{c.version}</div>
                  </td>
                  <td className="px-4 py-4 text-xs text-wm-gray-dark whitespace-nowrap">{c.targetWindow}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-wm-blue">{c.riskScore}</span>
                      <Badge variant={riskVariant(c.riskLevel)}>{c.riskLevel}</Badge>
                    </div>
                  </td>
                  <td className="px-4 py-4"><Badge variant={statusVariant(c.status)}>{c.status}</Badge></td>
                  <td className="px-4 py-4">
                    <Button
                      onClick={onNext}
                      variant={idx === 0 ? 'primary' : 'outline'}
                      disabled={c.status === 'Shipped'}
                      className="whitespace-nowrap"
                    >
                      {c.status === 'Shipped' ? 'View' : 'Review'}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-wm-gray-med shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-wm-gray-med bg-wm-gray-light flex items-center justify-between">
          <h3 className="font-semibold text-wm-blue text-sm">Candidate Dossier &middot; billing-service 4.18.0</h3>
          <span className="text-[10px] text-wm-gray-dark uppercase tracking-wider">8 linked artifacts</span>
        </div>
        <div className="divide-y divide-wm-gray-med">
          {dossier.map((a) => {
            const Icon = categoryIcon[a.category];
            const isOpen = open === a.ref;
            return (
              <button key={a.ref} onClick={() => setOpen(isOpen ? null : a.ref)} className="w-full text-left p-4 hover:bg-blue-50/40 transition-colors block">
                <div className="flex items-start gap-3">
                  <span className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${signalDot(a.signal)}`} />
                  <Icon className="w-4 h-4 text-wm-blue-highlight mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-semibold text-wm-gray-dark uppercase tracking-wider">{a.category}</span>
                      <span className="text-xs font-mono text-wm-blue">{a.ref}</span>
                    </div>
                    <p className="text-sm text-wm-blue font-medium">{a.summary}</p>
                    {isOpen && <p className="text-xs text-wm-gray-dark mt-1 leading-relaxed">{a.detail}</p>}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <HumanTask>
        Review the assembled dossier. When you are ready, hand it to risk analysis. You can reorder the queue or pull a different candidate first based on release flow.
      </HumanTask>

      <div className="flex justify-end">
        <Button onClick={onNext} variant="primary" Icon={ArrowRight}>Run risk analysis</Button>
      </div>
    </div>
  );
};
