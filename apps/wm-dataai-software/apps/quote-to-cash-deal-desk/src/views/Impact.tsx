import React from 'react';
import { marginBridge, kpis, selectedQuote } from '../data';
import { GuideCollapsible } from '../components/GuideCollapsible';
import { AITask, HumanTask, Button, Badge } from '../components/Shared';
import { ArrowRight, TrendingUp } from 'lucide-react';

const repRollup = [
  { rep: 'D. Marsh (Enterprise)', realization: '96%', recovered: '$29,400' },
  { rep: 'S. Patel (Enterprise)', realization: '94%', recovered: '$11,200' },
  { rep: 'Mid-Market team', realization: '95%', recovered: '$18,600' },
];

const productRollup = [
  { product: 'Core platform', uplift: '+3.0%', note: 'Standard renewal uplift applied' },
  { product: 'Analytics module', uplift: '+4.1%', note: 'Seat true-up to actual usage' },
  { product: 'Connect module', uplift: '+2.4%', note: 'Bundled at Growth tier' },
];

export const Impact = ({ onNext }: { onNext: () => void }) => {
  return (
    <div className="space-y-6">
      <GuideCollapsible
        title="How to use this page"
        talkTrack="This is the CFO-friendly view. The margin bridge shows exactly how we got from $420K to $471.6K, and every line ties back to an approved finance definition. Roll-ups by rep, segment, and product show where realization improved. The deal desk owns these numbers, not a black box."
      >
        <p>This page is the margin and revenue bridge for the approved deal.</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li><strong>Review:</strong> Walk the bridge from current ARR to recommended ARR.</li>
          <li><strong>Roll-ups:</strong> See realization by rep and uplift by product.</li>
          <li><strong>Ownership:</strong> The agent computes the bridge; the deal desk and finance own the result.</li>
        </ul>
      </GuideCollapsible>

      <AITask>
        The approved quote for {selectedQuote.account} ({selectedQuote.id}) synced to CRM and CPQ. The agent computed the margin bridge and roll-ups from the approved finance model. Every component below traces to an approved definition, not an estimate.
      </AITask>

      <div className="bg-white rounded-lg border border-wm-gray-med shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-wm-gray-med bg-wm-gray-light flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-wm-blue-highlight" />
          <h3 className="font-semibold text-wm-blue text-sm">Margin & Revenue Bridge</h3>
        </div>
        <ul className="divide-y divide-wm-gray-med">
          {marginBridge.map((b, i) => (
            <li key={i} className={`px-4 py-3 flex items-center justify-between ${b.kind === 'total' ? 'bg-blue-50/40' : ''}`}>
              <span className={`text-sm ${b.kind === 'total' ? 'font-bold text-wm-blue' : 'text-wm-gray-dark'}`}>{b.label}</span>
              <span className={`text-sm font-semibold ${
                b.kind === 'add' ? 'text-green-700' : b.kind === 'subtract' ? 'text-wm-magenta' : b.kind === 'total' ? 'text-wm-blue' : 'text-wm-gray-dark'
              }`}>{b.value}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg border border-wm-gray-med shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-wm-gray-med bg-wm-gray-light">
            <h3 className="font-semibold text-wm-blue text-sm">Net Price Realization by Rep</h3>
          </div>
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-wm-gray-dark uppercase border-b border-wm-gray-med">
              <tr><th className="px-4 py-2">Rep / Segment</th><th className="px-4 py-2">Realization</th><th className="px-4 py-2">Recovered</th></tr>
            </thead>
            <tbody className="divide-y divide-wm-gray-med">
              {repRollup.map((r, i) => (
                <tr key={i}>
                  <td className="px-4 py-2 text-wm-blue text-xs font-medium">{r.rep}</td>
                  <td className="px-4 py-2"><Badge variant="green">{r.realization}</Badge></td>
                  <td className="px-4 py-2 text-xs font-semibold text-green-700">{r.recovered}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-lg border border-wm-gray-med shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-wm-gray-med bg-wm-gray-light">
            <h3 className="font-semibold text-wm-blue text-sm">Uplift Capture by Product</h3>
          </div>
          <ul className="divide-y divide-wm-gray-med">
            {productRollup.map((p, i) => (
              <li key={i} className="px-4 py-3 flex items-center justify-between gap-2">
                <div>
                  <p className="text-sm font-medium text-wm-blue">{p.product}</p>
                  <p className="text-xs text-wm-gray-dark">{p.note}</p>
                </div>
                <span className="text-sm font-semibold text-green-700 whitespace-nowrap">{p.uplift}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-wm-blue p-6 rounded-xl shadow-md text-white">
        <h3 className="font-bold text-sm mb-4 text-center">Program Impact vs. Baseline</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {kpis.map((kpi, idx) => (
            <div key={idx} className="bg-white/10 p-3 rounded-lg">
              <p className="text-[10px] text-white/70 uppercase tracking-wider mb-1 line-clamp-2 min-h-[1.5rem]">{kpi.label}</p>
              <div className="flex flex-col items-center gap-0.5">
                <span className="text-lg font-bold text-green-400">{kpi.improved}</span>
                <span className="text-[10px] text-white/50 line-through">was {kpi.baseline}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <HumanTask done>
        Approved quote synced to CRM and CPQ. The margin bridge is posted to the RevOps dashboard with every line tied to an approved finance definition.
      </HumanTask>

      <div className="flex justify-end">
        <Button onClick={onNext} variant="primary" Icon={ArrowRight}>See future enhancements</Button>
      </div>
    </div>
  );
};
