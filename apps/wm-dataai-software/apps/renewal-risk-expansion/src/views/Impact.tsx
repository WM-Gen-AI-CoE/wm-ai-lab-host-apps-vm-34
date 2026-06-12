import React, { useState } from 'react';
import { motion } from 'motion/react';
import { kpis } from '../data';
import { GuideCollapsible } from '../components/GuideCollapsible';
import { AITask, HumanTask, Badge, Button } from '../components/Shared';
import { Check, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';

// NRR waterfall: each step is a floating bar segment that stacks on the running total,
// so the committed 106% visibly climbs out of the starting 102%.
const bridge = [
  { label: 'Starting NRR (book)', value: '102%', delta: 0, kind: 'start' as const },
  { label: 'Northwind save (2-yr co-term)', value: '+1.4 pts', delta: 1.4, kind: 'up' as const },
  { label: 'Insights + support expansion', value: '+2.1 pts', delta: 2.1, kind: 'up' as const },
  { label: 'Residual churn (unsaved accounts)', value: '-0.5 pts', delta: -0.5, kind: 'down' as const },
  { label: 'Committed NRR', value: '106%', delta: 0, kind: 'end' as const },
];

// Geometry for the waterfall: map the 101.5 - 106.5 band onto 0 - 100% width.
const AXIS_MIN = 101.5;
const AXIS_MAX = 106.5;
const START_NRR = 102;
const toPct = (v: number) => ((v - AXIS_MIN) / (AXIS_MAX - AXIS_MIN)) * 100;
const bridgeBars = (() => {
  let running = START_NRR;
  return bridge.map((b) => {
    if (b.kind === 'start') return { ...b, left: 0, width: toPct(START_NRR), runEnd: START_NRR };
    if (b.kind === 'end') return { ...b, left: 0, width: toPct(106), runEnd: 106 };
    const from = running;
    const to = running + b.delta;
    running = to;
    const lo = Math.min(from, to);
    const hi = Math.max(from, to);
    return { ...b, left: toPct(lo), width: toPct(hi) - toPct(lo), runEnd: to };
  });
})();

const pipeline = [
  { account: 'Northwind Logistics', play: 'Insights + premium support', arr: '+$275K', stage: 'Proposed' },
  { account: 'Drift Analytics', play: 'Tier upgrade', arr: '+$60K', stage: 'Qualifying' },
  { account: 'Helios Manufacturing', play: 'Module attach', arr: '+$210K', stage: 'Proposed' },
  { account: 'Cobalt Retail Group', play: 'Seat expansion', arr: '+$430K', stage: 'Committed' },
];

export const Impact = ({ onNext }: { onNext: () => void }) => {
  const [committed, setCommitted] = useState(false);

  return (
    <div className="space-y-6">
      <GuideCollapsible
        title="How to use this page"
        talkTrack="This is the number the executive cares about. The bridge shows exactly how the approved actions move NRR, and the pipeline shows the expansion these motions surfaced. The model shows the math, but the Renewals Manager owns and commits the forecast."
      >
        <p>This page is the executive NRR bridge and pipeline view.</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li><strong>Review:</strong> Trace how the approved save and expansion actions move book NRR from 102% to 106%.</li>
          <li><strong>Action:</strong> Commit the forecast once you agree with the math.</li>
          <li><strong>Decision:</strong> The model assembles the bridge; you own the committed number that goes to the executive team.</li>
        </ul>
      </GuideCollapsible>

      <AITask>
        The agent assembled the NRR bridge and the expansion pipeline movement from the actions approved across the book. The Renewals Manager reviews the math and commits the number.
      </AITask>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => (
          <div key={idx} className="bg-white rounded-lg border border-wm-gray-med shadow-sm p-4 text-center">
            <p className="text-[10px] text-wm-gray-dark uppercase tracking-wider mb-1 min-h-[1.5rem]">{kpi.label}</p>
            <p className="text-xl font-bold text-green-600">{kpi.improved}</p>
            <p className="text-xs text-wm-gray-dark line-through">was {kpi.baseline}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg border border-wm-gray-med shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-wm-gray-med bg-wm-gray-light flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <h3 className="font-semibold text-wm-blue text-sm">Net Revenue Retention Bridge</h3>
          </div>
          <span className="text-xs text-wm-gray-dark">Approved actions move book NRR from 102% to a committed 106%.</span>
        </div>
        <div className="p-4 space-y-2">
          {bridgeBars.map((b, i) => {
            const isAnchor = b.kind === 'start' || b.kind === 'end';
            const barColor = b.kind === 'up' ? '#16A34A' : b.kind === 'down' ? '#F900D3' : b.kind === 'end' ? '#070154' : '#CED7E6';
            return (
              <div key={i} className="grid grid-cols-[minmax(0,15rem)_1fr_3.5rem] items-center gap-3">
                <span className={`text-sm flex items-center gap-2 ${isAnchor ? 'font-semibold text-wm-blue' : 'text-wm-gray-dark'}`}>
                  {b.kind === 'up' && <TrendingUp className="w-4 h-4 text-green-600 shrink-0" />}
                  {b.kind === 'down' && <TrendingDown className="w-4 h-4 text-wm-magenta shrink-0" />}
                  {b.label}
                </span>
                <div className="relative h-6 bg-wm-gray-light/60 rounded">
                  <motion.div
                    className="absolute top-0 h-6 rounded"
                    style={{ backgroundColor: barColor, left: `${b.left}%` }}
                    initial={{ width: 0, opacity: 0.4 }}
                    animate={{ width: `${Math.max(b.width, 1.5)}%`, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.15 + i * 0.25, ease: 'easeOut' }}
                  />
                </div>
                <span className={`text-sm font-mono text-right ${b.kind === 'up' ? 'text-green-700' : b.kind === 'down' ? 'text-wm-magenta' : b.kind === 'end' ? 'text-wm-blue font-bold' : 'text-wm-blue'}`}>{b.value}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-lg border border-wm-gray-med shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-wm-gray-med bg-wm-gray-light flex items-center justify-between">
          <h3 className="font-semibold text-wm-blue text-sm">Expansion Pipeline Surfaced</h3>
          <Badge variant="green">+$975K identified</Badge>
        </div>
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-wm-gray-dark uppercase border-b border-wm-gray-med">
            <tr><th className="px-4 py-2">Account</th><th className="px-4 py-2">Play</th><th className="px-4 py-2">ARR</th><th className="px-4 py-2">Stage</th></tr>
          </thead>
          <tbody className="divide-y divide-wm-gray-med">
            {pipeline.map((p, i) => (
              <tr key={i}>
                <td className="px-4 py-2 font-semibold text-wm-blue">{p.account}</td>
                <td className="px-4 py-2 text-xs text-wm-gray-dark">{p.play}</td>
                <td className="px-4 py-2 font-mono text-green-700">{p.arr}</td>
                <td className="px-4 py-2"><Badge variant={p.stage === 'Committed' ? 'green' : p.stage === 'Proposed' ? 'blue' : 'amber'}>{p.stage}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <label className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${committed ? 'bg-green-50/50 border-green-200' : 'bg-white border-wm-gray-med'}`}>
        <input type="checkbox" checked={committed} onChange={(e) => setCommitted(e.target.checked)} className="mt-1 w-4 h-4 accent-wm-blue-highlight" />
        <span className="text-sm text-wm-gray-dark">
          <strong className="text-wm-blue">Forecast commitment.</strong> I have reviewed the bridge and pipeline, agree the approved actions support the move from 102% to 106% NRR, and commit this number to the executive review. The model showed the math; I own the forecast.
        </span>
      </label>

      <HumanTask done={committed}>
        {committed ? 'Forecast committed and ready for the executive review.' : 'Commit the forecast to close the loop. The model cannot commit the number on your behalf.'}
      </HumanTask>

      <div className="flex justify-end">
        <Button onClick={onNext} variant="primary" disabled={!committed} Icon={ArrowRight}>See the roadmap</Button>
      </div>
    </div>
  );
};
