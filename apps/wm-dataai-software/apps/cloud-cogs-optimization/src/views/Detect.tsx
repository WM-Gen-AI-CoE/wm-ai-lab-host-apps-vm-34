import React from 'react';
import { workloads } from '../data';
import { GuideCollapsible } from '../components/GuideCollapsible';
import { AITask, HumanTask, Badge, Button } from '../components/Shared';
import { TrendingUp, TrendingDown } from 'lucide-react';

const statusVariant = (s: string): 'green' | 'blue' | 'amber' | 'magenta' | 'gray' =>
  s === 'Anomaly' ? 'magenta' : s === 'Watch' ? 'amber' : s === 'Optimized' ? 'green' : 'gray';

const usd = (n: number) => '$' + n.toLocaleString('en-US');

export const Detect = ({ onNext }: { onNext: () => void }) => {
  return (
    <div className="space-y-6">
      <GuideCollapsible
        title="How to use this page"
        talkTrack="This is the spend-anomaly feed. Instead of a finance team chasing a surprise bill at month-end, FinOps sees the top cost workloads ranked by waste in near real time - and the one that spiked overnight is already at the top."
      >
        <p>This page is for choosing which spend anomaly to investigate first.</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li><strong>Review:</strong> Scan today's top cost workloads, their month-over-month trend, and the estimated waste on each.</li>
          <li><strong>Action:</strong> Open the flagged anomaly - analytics-elt-nightly, up 41% with the largest waste estimate.</li>
          <li><strong>Decision:</strong> You choose what to investigate; the agent only detects and ranks. It never changes a workload on its own.</li>
        </ul>
      </GuideCollapsible>

      <AITask>
        The agent ingested the nightly billing export, mapped spend to owning teams, and ranked the top cost workloads by waste against customer traffic. analytics-elt-nightly is surfaced first - spend rose 41% month over month while traffic stayed flat, with clusters held warm at 28% utilization.
      </AITask>

      <HumanTask>
        Review the ranked anomalies and open one to investigate. You can re-order by your own operational judgment or business context.
      </HumanTask>

      <div className="bg-white rounded-lg border border-wm-gray-med shadow-sm overflow-hidden">
        <div className="p-4 border-b border-wm-gray-med bg-wm-gray-light flex justify-between items-center">
          <h3 className="font-semibold font-sans text-wm-blue">Spend Anomaly Feed · Top Cost Workloads</h3>
          <span className="text-xs text-wm-gray-dark font-medium">Updated 02:14 AM · 5 workloads · ranked by waste</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-wm-gray-dark uppercase bg-white border-b border-wm-gray-med">
              <tr>
                <th className="px-4 py-3">Workload</th>
                <th className="px-4 py-3">Owner / Team</th>
                <th className="px-4 py-3">Monthly Spend</th>
                <th className="px-4 py-3">Trend (MoM)</th>
                <th className="px-4 py-3">Est. Waste/mo</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-wm-gray-med">
              {workloads.map((w, idx) => (
                <tr key={w.id} className={`hover:bg-blue-50/50 transition-colors ${idx === 0 ? 'bg-pink-50/40' : ''}`}>
                  <td className="px-4 py-4">
                    <div className="font-mono font-semibold text-wm-blue text-xs">{w.name}</div>
                    <div className="text-xs text-wm-gray-dark">{w.service}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-wm-blue">{w.owner}</div>
                    <div className="text-xs text-wm-gray-dark">{w.team}</div>
                  </td>
                  <td className="px-4 py-4 text-wm-gray-dark whitespace-nowrap">{usd(w.monthlySpend)}</td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center gap-1 text-xs font-semibold ${w.trendPct > 15 ? 'text-wm-magenta' : w.trendPct < 0 ? 'text-green-600' : 'text-wm-gray-dark'}`}>
                      {w.trendPct < 0 ? <TrendingDown className="w-3.5 h-3.5" /> : <TrendingUp className="w-3.5 h-3.5" />}
                      {w.trendPct > 0 ? '+' : ''}{w.trendPct}%
                    </span>
                  </td>
                  <td className="px-4 py-4 font-semibold text-wm-blue whitespace-nowrap">{usd(w.wasteEstimate)}</td>
                  <td className="px-4 py-4"><Badge variant={statusVariant(w.status)}>{w.status}</Badge></td>
                  <td className="px-4 py-4">
                    <Button
                      onClick={onNext}
                      variant={idx === 0 ? 'primary' : 'outline'}
                      disabled={w.status === 'Optimized'}
                      className="whitespace-nowrap"
                    >
                      {w.status === 'Optimized' ? 'Optimized' : 'Investigate'}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
