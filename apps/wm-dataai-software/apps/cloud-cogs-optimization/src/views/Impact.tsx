import React from 'react';
import { kpis, recommendations } from '../data';
import { GuideCollapsible } from '../components/GuideCollapsible';
import { Button } from '../components/Shared';
import { ArrowRight, CheckCircle2, TrendingDown, Users, Cpu, BarChart3 } from 'lucide-react';

const usd = (n: number) => '$' + n.toLocaleString('en-US');

// Each approvable recommendation's margin-bridge contribution (illustrative points).
const bridgeContribution: Record<string, { label: string; pts: number }> = {
  'rec-rightsize': { label: 'Rightsize to job cluster', pts: 1.6 },
  'rec-schedule': { label: 'Replica copy to on-demand', pts: 1.0 },
  'rec-storage': { label: 'Storage tiering', pts: 0.2 },
};

const START_MARGIN = 74;
const OTHER_WORKLOADS_PTS = 1.2; // in-flight changes on other workloads, always present

export const Impact = ({ onNext, approvedIds = [] }: { onNext: () => void, approvedIds?: string[] }) => {
  // Realized savings and the bridge reflect exactly what the owner approved on step 4.
  const approvedRecs = recommendations.filter(r => approvedIds.includes(r.id));
  const realizedSavings = approvedRecs.reduce((s, r) => s + r.projectedSavings, 0);
  const rightsizeApproved = approvedIds.includes('rec-rightsize');

  const approvedBridgeRows = approvedRecs
    .filter(r => bridgeContribution[r.id])
    .map(r => ({ label: bridgeContribution[r.id].label, value: `+${bridgeContribution[r.id].pts.toFixed(1)} pts`, kind: 'up' as const }));
  const approvedPts = approvedRecs.reduce((s, r) => s + (bridgeContribution[r.id]?.pts ?? 0), 0);
  const endingMargin = Math.round((START_MARGIN + approvedPts + OTHER_WORKLOADS_PTS) * 10) / 10;

  const bridge = [
    { label: 'Starting gross margin', value: `${START_MARGIN}%`, kind: 'base' as const },
    ...approvedBridgeRows,
    { label: 'Other workloads (in flight)', value: `+${OTHER_WORKLOADS_PTS.toFixed(1)} pts`, kind: 'up' as const },
    { label: 'Ending gross margin', value: `${endingMargin}%`, kind: 'base' as const },
  ];

  return (
    <div className="space-y-6">
      <GuideCollapsible
        title="How to use this page"
        talkTrack="This is the CFO view. The savings aren't a projection anymore - they're realized against the next billing cycle and rolled into a gross-margin bridge finance owns. The line that lands: cost per active customer fell by removing waste, not by adding customers."
      >
        <p>This page tracks realized savings and ties them to gross margin.</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li><strong>Review:</strong> Confirm the realized compute reduction and the margin bridge from the approved changes.</li>
          <li><strong>Interpret:</strong> The KPIs connect this workload to addressable waste, gross margin, and cost per active customer.</li>
          <li><strong>Next:</strong> See how this scales across the cloud estate in Future Enhancements.</li>
        </ul>
      </GuideCollapsible>

      <div className="bg-wm-blue text-white rounded-xl p-6 shadow-md">
        <div className="flex items-center gap-3 mb-2">
          <CheckCircle2 className="w-7 h-7 text-green-400" />
          <h2 className="text-xl font-bold">Change set live - analytics-elt-nightly</h2>
        </div>
        <p className="text-white/70 text-sm">
          {rightsizeApproved
            ? 'Rightsized run completed at 02:40 AM, under the 06:00 SLA. Realized compute cost down 19% on the first cycle; savings tracked against billing, not projection.'
            : 'Approved changes are live on the next billing cycle, tracked against realized billing rather than projection. The rightsize action was not approved, so compute is unchanged this cycle.'}
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-wm-gray-med shadow-sm p-4">
          <h3 className="flex items-center gap-2 font-semibold text-wm-blue text-sm mb-2"><Cpu className="w-4 h-4 text-wm-blue-highlight" /> Top-workload compute</h3>
          <p className="text-2xl font-bold text-green-600">{rightsizeApproved ? '-19%' : 'No change'}</p>
          <p className="text-xs text-wm-gray-dark mt-1">{rightsizeApproved ? 'Realized on the first run after rightsizing, in line with the projection.' : 'Rightsize was not approved, so compute on this workload is unchanged.'}</p>
        </div>
        <div className="bg-white rounded-lg border border-wm-gray-med shadow-sm p-4">
          <h3 className="flex items-center gap-2 font-semibold text-wm-blue text-sm mb-2"><TrendingDown className="w-4 h-4 text-wm-blue-highlight" /> Realized savings</h3>
          <p className="text-2xl font-bold text-green-600">{usd(realizedSavings)}<span className="text-sm font-normal text-wm-gray-dark">/mo</span></p>
          <p className="text-xs text-wm-gray-dark mt-1">Reflects the {approvedRecs.length} change{approvedRecs.length === 1 ? '' : 's'} approved in step 4, tracked against billing.</p>
        </div>
        <div className="bg-white rounded-lg border border-wm-gray-med shadow-sm p-4">
          <h3 className="flex items-center gap-2 font-semibold text-wm-blue text-sm mb-2"><Users className="w-4 h-4 text-wm-blue-highlight" /> Cost / active customer</h3>
          <p className="text-2xl font-bold text-green-600">$2.45<span className="text-sm font-normal text-wm-gray-dark line-through ml-1">$3.10</span></p>
          <p className="text-xs text-wm-gray-dark mt-1">Lower because waste was removed, not because customers were added.</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-wm-gray-med shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-wm-gray-med bg-wm-gray-light flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-wm-blue-highlight" />
          <h3 className="font-semibold text-wm-blue text-sm">Gross-Margin Bridge</h3>
        </div>
        <div className="p-4 space-y-2">
          {bridge.map((b, i) => (
            <div key={i} className={`flex items-center justify-between gap-4 px-3 py-2 rounded ${b.kind === 'base' ? 'bg-wm-blue/5 font-semibold text-wm-blue' : 'text-wm-gray-dark'}`}>
              <span className="text-sm">{b.label}</span>
              <span className={`text-sm font-semibold ${b.kind === 'up' ? 'text-green-600' : 'text-wm-blue'}`}>{b.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg border border-wm-gray-med shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-wm-gray-med bg-wm-gray-light">
          <h3 className="font-semibold text-wm-blue text-sm">Program KPIs at Scale</h3>
        </div>
        <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {kpis.map((k, i) => (
            <div key={i} className="text-center">
              <p className="text-[10px] text-wm-gray-dark uppercase tracking-wider mb-1 min-h-[2rem]">{k.label}</p>
              <p className="text-lg font-bold text-green-600">{k.improved}</p>
              <p className="text-xs text-wm-gray-dark line-through">was {k.baseline}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-wm-gray-light rounded-lg border border-wm-gray-med p-4">
        <h3 className="font-semibold text-wm-blue text-sm mb-2">Leadership Summary</h3>
        <p className="text-sm text-wm-gray-dark leading-relaxed">
          Across the cloud estate, the agent makes gross margin observable at the workload and customer level: it ranks waste, diagnoses root cause, and proposes SLA-safe changes that the owning engineer approves. Savings are tracked against realized billing and flow straight into the margin bridge - capacity and margin, not a one-time cut.
        </p>
      </div>

      <div className="flex justify-end">
        <Button onClick={onNext} variant="primary" Icon={ArrowRight}>View future enhancements</Button>
      </div>
    </div>
  );
};
