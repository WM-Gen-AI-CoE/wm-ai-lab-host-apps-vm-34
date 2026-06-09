import React, { useState } from 'react';
import { GuideCollapsible } from '../components/GuideCollapsible';
import { AITask, HumanTask, Button, Badge } from '../components/Shared';
import { ArrowRight, CheckCircle2, Send, Bug, Building2, AlertTriangle } from 'lucide-react';

const teams = ['Integrations Platform', 'Identity & SSO', 'API Gateway'] as const;

export const Escalate = ({ onNext }: { onNext: () => void }) => {
  const [team, setTeam] = useState<typeof teams[number]>('Integrations Platform');
  const [versionConfirmed, setVersionConfirmed] = useState(false);
  const [routed, setRouted] = useState(false);

  return (
    <div className="space-y-6">
      <GuideCollapsible
        title="How to use this page"
        talkTrack="When a ticket is unresolved or risky, the agent does the packaging work the engineer hates: it assembles the full context, the linked defect, the affected version range, and the customer impact into one escalation. But the engineer confirms the routing and the target team. The agent packages; the human confirms."
      >
        <p>This page shows the escalation package for the risky path of TKT-58213.</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li><strong>Review:</strong> Check the assembled context, severity, linked defect, and customer impact.</li>
          <li><strong>Confirm the open item:</strong> The tenant version must be confirmed so DEF-2207 attaches correctly.</li>
          <li><strong>Route:</strong> Pick the owning team and confirm routing. Nothing leaves the queue until you do.</li>
        </ul>
      </GuideCollapsible>

      <AITask>
        The agent assembled a complete escalation package: symptom, severity S2, the linked defect DEF-2207, the affected version range, reproduction notes, and customer impact. It suggested the Integrations Platform team as the owner. It does not route on its own.
      </AITask>

      <div className="bg-white rounded-lg border border-wm-gray-med shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-wm-gray-med bg-wm-gray-light flex items-center justify-between">
          <h3 className="font-semibold text-wm-blue text-sm">Escalation Package · TKT-58213</h3>
          <Badge variant="amber">Severity S2</Badge>
        </div>
        <div className="p-4 grid sm:grid-cols-2 gap-4">
          <div>
            <h4 className="text-xs font-semibold text-wm-gray-dark uppercase tracking-wider mb-1">Account & Impact</h4>
            <p className="text-sm text-wm-blue">Northwind Retail (Enterprise)</p>
            <p className="text-xs text-wm-gray-dark mt-1">Orders webhook deliveries failing in production since the SSO change ~40 min ago. Order-fulfillment events delayed downstream.</p>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-wm-gray-dark uppercase tracking-wider mb-1">Symptom</h4>
            <p className="text-xs text-wm-gray-dark">Webhook endpoint returning authentication failures immediately after enabling SAML SSO on the tenant.</p>
          </div>
          <div>
            <h4 className="flex items-center gap-1 text-xs font-semibold text-wm-magenta uppercase tracking-wider mb-1"><Bug className="w-3 h-3" /> Linked Defect</h4>
            <p className="text-sm font-mono text-wm-blue">DEF-2207</p>
            <p className="text-xs text-wm-gray-dark mt-1">SSO save path skips webhook secret refresh. Affects 4.15 - 4.17. Fix targeted 4.18.</p>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-wm-gray-dark uppercase tracking-wider mb-1">Reproduction Notes</h4>
            <p className="text-xs text-wm-gray-dark">Enable SSO on a tenant with an existing webhook, then send an event. Endpoint rejects with stale-secret auth error.</p>
          </div>
        </div>
      </div>

      <div className={`rounded-lg border shadow-sm overflow-hidden ${versionConfirmed ? 'border-green-300' : 'border-amber-300'}`}>
        <div className={`px-4 py-3 flex items-center gap-2 ${versionConfirmed ? 'bg-green-50' : 'bg-amber-50'}`}>
          {versionConfirmed ? <CheckCircle2 className="w-4 h-4 text-green-600" /> : <AlertTriangle className="w-4 h-4 text-amber-500" />}
          <h3 className={`font-semibold text-sm ${versionConfirmed ? 'text-green-800' : 'text-amber-800'}`}>
            {versionConfirmed ? 'Open item resolved' : 'Confirm before routing'}
          </h3>
        </div>
        <div className="p-4">
          <p className="text-sm text-wm-gray-dark mb-3">DEF-2207 only applies to platform versions 4.15 - 4.17. Confirm the tenant version before attaching the defect.</p>
          {!versionConfirmed ? (
            <Button onClick={() => setVersionConfirmed(true)} variant="primary" Icon={CheckCircle2}>Confirm tenant is on 4.16</Button>
          ) : (
            <p className="text-xs text-green-700">Confirmed: Northwind Retail tenant is on 4.16. DEF-2207 applies and is attached to the package.</p>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg border border-wm-gray-med shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-wm-gray-med bg-wm-gray-light flex items-center gap-2">
          <Building2 className="w-4 h-4 text-wm-blue-highlight" />
          <h3 className="font-semibold text-wm-blue text-sm">Route to Owning Team</h3>
        </div>
        <div className="p-4">
          <div className="flex flex-wrap gap-2 mb-4">
            {teams.map(t => (
              <button
                key={t}
                onClick={() => setTeam(t)}
                disabled={routed}
                className={`px-3 py-1.5 text-xs font-semibold rounded-full border transition-colors ${team === t ? 'bg-wm-blue-highlight text-white border-wm-blue-highlight' : 'bg-white text-wm-gray-dark border-wm-gray-med hover:bg-wm-gray-light'}`}
              >
                {t}
              </button>
            ))}
          </div>
          {!routed ? (
            <Button onClick={() => setRouted(true)} variant="primary" disabled={!versionConfirmed} Icon={Send}>
              Confirm routing to {team}
            </Button>
          ) : (
            <div className="flex items-start gap-2 text-sm text-green-800 bg-green-50 border border-green-200 rounded p-3">
              <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-green-600" />
              <span>Escalation routed to <strong>{team}</strong> with the full package and DEF-2207 attached. Northwind Retail notified that engineering is engaged.</span>
            </div>
          )}
          {!versionConfirmed && <p className="text-xs text-amber-700 mt-2">Confirm the tenant version above to enable routing.</p>}
        </div>
      </div>

      <HumanTask done={routed}>
        {routed
          ? 'Escalation routed. The engineer owns the routing decision and the customer notification.'
          : 'Confirm the open version item and the owning team, then route. The agent prepares the package but never routes on its own.'}
      </HumanTask>

      <div className="flex justify-end">
        <Button onClick={onNext} variant="primary" Icon={ArrowRight}>View impact</Button>
      </div>
    </div>
  );
};
