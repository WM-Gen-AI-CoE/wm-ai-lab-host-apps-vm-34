import React from 'react';
import { kpis } from '../data';
import { GuideCollapsible } from '../components/GuideCollapsible';
import { AITask, HumanTask, Button } from '../components/Shared';
import { ArrowRight, TrendingUp, TrendingDown, ShieldCheck, Activity } from 'lucide-react';

const recentReleases = [
  { name: 'billing-service 4.18.0', risk: 'High', caught: 2, escaped: 0, cycle: '10 days', outcome: 'Both High gaps closed pre-ship' },
  { name: 'web-app 9.7.1', risk: 'Medium', caught: 1, escaped: 1, cycle: '11 days', outcome: '1 gap accepted with follow-up' },
  { name: 'identity 3.12.0', risk: 'Low', caught: 0, escaped: 0, cycle: '9 days', outcome: 'Clean release' },
  { name: 'notifications 2.31.4', risk: 'Low', caught: 0, escaped: 1, cycle: '12 days', outcome: 'Escaped defect in retry path' },
];

export const Impact = ({ onNext }: { onNext: () => void }) => {
  return (
    <div className="space-y-6">
      <GuideCollapsible
        title="How to use this page"
        talkTrack="This is the leadership read. The agent computes the delivery metrics from telemetry, but engineering owns the targets and the story. The headline is that high-risk releases are caught before ship far more consistently, and escaped defects are dropping without slowing the cadence."
      >
        <p>This page is the release-health dashboard for engineering leadership.</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li><strong>Review:</strong> Track cycle time, escaped defects, triage productivity, and high-risk releases caught pre-ship.</li>
          <li><strong>Action:</strong> Use the recent-release table to spot where evidence assembly is paying off.</li>
          <li><strong>Decision:</strong> The agent computes the numbers. Leadership owns the targets and the interpretation.</li>
        </ul>
      </GuideCollapsible>

      <AITask>
        The agent rolled up release outcomes from delivery telemetry: cycle time, escaped defects, triage throughput, and the share of high-risk releases caught before they shipped. Engineering leadership owns the read and the targets.
      </AITask>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => {
          const better = idx === 2 || idx === 3;
          const Icon = better ? TrendingUp : TrendingDown;
          return (
            <div key={idx} className="bg-white rounded-lg border border-wm-gray-med shadow-sm p-4">
              <p className="text-[10px] text-wm-gray-dark uppercase tracking-wider mb-2 min-h-[2rem]">{kpi.label}</p>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-bold text-wm-blue">{kpi.improved}</span>
                <Icon className={`w-4 h-4 mb-1 ${better ? 'text-green-600' : 'text-green-600'}`} />
              </div>
              <p className="text-xs text-wm-gray-dark line-through mt-1">was {kpi.baseline}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-wm-blue rounded-lg shadow-sm p-5 text-white">
        <div className="flex items-center gap-2 mb-2">
          <ShieldCheck className="w-5 h-5 text-green-400" />
          <h3 className="font-semibold">High-risk releases caught pre-ship</h3>
        </div>
        <p className="text-sm text-white/80">
          88% of high-risk releases now have a blocking gap caught and resolved before the window, up from 60%. billing-service 4.18.0 is the latest: two High-severity gaps closed before ship, zero escaped defects in the first billing run.
        </p>
      </div>

      <div className="bg-white rounded-lg border border-wm-gray-med shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-wm-gray-med bg-wm-gray-light flex items-center gap-2">
          <Activity className="w-4 h-4 text-wm-blue-highlight" />
          <h3 className="font-semibold text-wm-blue text-sm">Recent Releases</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-wm-gray-dark uppercase bg-white border-b border-wm-gray-med">
              <tr>
                <th className="px-4 py-3">Release</th>
                <th className="px-4 py-3">Risk</th>
                <th className="px-4 py-3">Gaps caught</th>
                <th className="px-4 py-3">Escaped</th>
                <th className="px-4 py-3">Cycle</th>
                <th className="px-4 py-3">Outcome</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-wm-gray-med">
              {recentReleases.map((r, i) => (
                <tr key={i} className="hover:bg-blue-50/40 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-wm-blue font-medium">{r.name}</td>
                  <td className="px-4 py-3 text-xs text-wm-gray-dark">{r.risk}</td>
                  <td className="px-4 py-3 text-wm-blue font-semibold">{r.caught}</td>
                  <td className={`px-4 py-3 font-semibold ${r.escaped > 0 ? 'text-wm-magenta' : 'text-green-600'}`}>{r.escaped}</td>
                  <td className="px-4 py-3 text-xs text-wm-gray-dark">{r.cycle}</td>
                  <td className="px-4 py-3 text-xs text-wm-gray-dark">{r.outcome}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <HumanTask>
        Own the read. The metrics are computed from telemetry, but leadership sets the targets, decides where to invest test coverage next, and judges whether the cadence and quality trade-off is right.
      </HumanTask>

      <div className="flex justify-end">
        <Button onClick={onNext} variant="primary" Icon={ArrowRight}>See future enhancements</Button>
      </div>
    </div>
  );
};
