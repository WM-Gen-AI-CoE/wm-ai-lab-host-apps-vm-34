import React, { useState } from 'react';
import { accounts } from '../data';
import { GuideCollapsible } from '../components/GuideCollapsible';
import { AITask, HumanTask, Badge, Button } from '../components/Shared';
import { TrendingDown, TrendingUp, Minus } from 'lucide-react';

const riskVariant = (t: string): 'magenta' | 'amber' | 'green' =>
  t === 'High' ? 'magenta' : t === 'Medium' ? 'amber' : 'green';

const TrendIcon = ({ trend }: { trend: string }) => {
  if (trend === 'down') return <TrendingDown className="w-4 h-4 text-wm-magenta" />;
  if (trend === 'up') return <TrendingUp className="w-4 h-4 text-green-600" />;
  return <Minus className="w-4 h-4 text-wm-gray-dark" />;
};

const segments = ['All', 'Enterprise', 'Mid-Market', 'Commercial'] as const;
const risks = ['All', 'High', 'Medium', 'Low'] as const;

export const Portfolio = ({ onNext }: { onNext: () => void }) => {
  const [segment, setSegment] = useState<typeof segments[number]>('All');
  const [risk, setRisk] = useState<typeof risks[number]>('All');
  const [sortByRisk, setSortByRisk] = useState(true);

  let rows = accounts.filter(a =>
    (segment === 'All' || a.segment === segment) &&
    (risk === 'All' || a.riskTier === risk)
  );
  rows = [...rows].sort((a, b) => sortByRisk ? b.riskScore - a.riskScore : a.name.localeCompare(b.name));

  return (
    <div className="space-y-6">
      <GuideCollapsible
        title="How to use this page"
        talkTrack="This is the renewals book on one screen. Instead of a CSM exporting six reports, every account is scored for risk and ranked by at-risk ARR. The CSM still chooses what to work; the model just makes the worst-first obvious."
      >
        <p>This page is for choosing which renewal to work first.</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li><strong>Review:</strong> Scan the book by risk tier, NRR, and renewal date. Sort and filter by segment or risk.</li>
          <li><strong>Action:</strong> Open the top at-risk account, Northwind Logistics, with $840K of ARR and a renewal under 90 days out.</li>
          <li><strong>Decision:</strong> You decide which accounts to work. The model scores and ranks; it never contacts a customer on its own.</li>
        </ul>
      </GuideCollapsible>

      <AITask>
        The agent scored all 6 renewal opportunities from CRM, usage, support, and sentiment feeds. Northwind Logistics is surfaced first: it carries the largest at-risk ARR ($840K), a renewal in under 90 days, declining adoption, and a recent sponsor change.
      </AITask>

      <HumanTask>
        Review the book and open an account to work. Use the filters and sort to triage; you can override the ranking based on your own knowledge of the relationship.
      </HumanTask>

      <div className="bg-white rounded-lg border border-wm-gray-med shadow-sm overflow-hidden">
        <div className="p-4 border-b border-wm-gray-med bg-wm-gray-light flex flex-wrap gap-3 justify-between items-center">
          <h3 className="font-semibold font-sans text-wm-blue">Renewal Book</h3>
          <div className="flex flex-wrap gap-3 items-center">
            <div className="flex items-center gap-1">
              <span className="text-[10px] uppercase tracking-wider text-wm-gray-dark mr-1">Segment</span>
              {segments.map(s => (
                <button key={s} onClick={() => setSegment(s)}
                  className={`text-xs px-2 py-1 rounded-full transition-colors ${segment === s ? 'bg-wm-blue-highlight text-white' : 'bg-white border border-wm-gray-med text-wm-gray-dark hover:bg-wm-gray-light'}`}>
                  {s}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[10px] uppercase tracking-wider text-wm-gray-dark mr-1">Risk</span>
              {risks.map(r => (
                <button key={r} onClick={() => setRisk(r)}
                  className={`text-xs px-2 py-1 rounded-full transition-colors ${risk === r ? 'bg-wm-blue-highlight text-white' : 'bg-white border border-wm-gray-med text-wm-gray-dark hover:bg-wm-gray-light'}`}>
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-wm-gray-dark uppercase bg-white border-b border-wm-gray-med">
              <tr>
                <th className="px-4 py-3">Account</th>
                <th className="px-4 py-3">Segment</th>
                <th className="px-4 py-3">ARR</th>
                <th className="px-4 py-3">Renewal</th>
                <th className="px-4 py-3">NRR</th>
                <th className="px-4 py-3">
                  <button onClick={() => setSortByRisk(!sortByRisk)} className="uppercase hover:text-wm-blue-highlight transition-colors">
                    Risk {sortByRisk ? '↓' : '↕'}
                  </button>
                </th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-wm-gray-med">
              {rows.map((a) => {
                const isTop = a.id === 'a1';
                return (
                  <tr key={a.id} className={`hover:bg-blue-50/50 transition-colors ${isTop ? 'bg-blue-50/20' : ''}`}>
                    <td className="px-4 py-4">
                      <div className="font-semibold text-wm-blue">{a.name}</div>
                      <div className="text-xs text-wm-gray-dark">CSM: {a.csm}</div>
                    </td>
                    <td className="px-4 py-4 text-xs text-wm-gray-dark">{a.segment}</td>
                    <td className="px-4 py-4 font-mono text-wm-blue">{a.arr}</td>
                    <td className="px-4 py-4 text-xs text-wm-gray-dark whitespace-nowrap">{a.renewalDate}</td>
                    <td className="px-4 py-4">
                      <span className="flex items-center gap-1 text-wm-gray-dark"><TrendIcon trend={a.trend} />{a.nrr}</span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <Badge variant={riskVariant(a.riskTier)}>{a.riskTier}</Badge>
                        <span className="text-xs font-mono text-wm-gray-dark">{a.riskScore}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <Button onClick={onNext} variant={isTop ? 'primary' : 'outline'} className="whitespace-nowrap">
                        {isTop ? 'Work account' : 'Open'}
                      </Button>
                    </td>
                  </tr>
                );
              })}
              {rows.length === 0 && (
                <tr><td colSpan={7} className="px-4 py-8 text-center text-sm text-wm-gray-dark">No accounts match these filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
