import React, { useState } from 'react';
import { tickets } from '../data';
import { Ticket } from '../types';
import { GuideCollapsible } from '../components/GuideCollapsible';
import { AITask, HumanTask, Badge, Button } from '../components/Shared';

const statusVariant = (s: Ticket['status']): 'green' | 'blue' | 'amber' | 'gray' | 'magenta' =>
  s === 'Classified' ? 'green' : s === 'In progress' ? 'blue' : s === 'Escalated' ? 'magenta' : s === 'Resolved' ? 'gray' : 'amber';

const sevVariant = (s: Ticket['severity']): 'magenta' | 'amber' | 'blue' | 'gray' =>
  s === 'S1' ? 'magenta' : s === 'S2' ? 'amber' : s === 'S3' ? 'blue' : 'gray';

const filters = ['All', 'Integrations / Webhooks', 'API / Availability', 'Billing', 'Reporting / Export'] as const;

export const Queue = ({ onNext }: { onNext: () => void }) => {
  const [filter, setFilter] = useState<typeof filters[number]>('All');
  const shown = filter === 'All' ? tickets : tickets.filter(t => t.issueType === filter);

  return (
    <div className="space-y-6">
      <GuideCollapsible
        title="How to use this page"
        talkTrack="This is the support queue, but it arrives pre-read. The agent has already classified each incoming ticket by issue type, severity, and customer tier, so the engineer works the right ticket next instead of triaging from scratch. The agent classifies; the human still picks the ticket."
      >
        <p>This page is for choosing which ticket to work next.</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li><strong>Review:</strong> Scan the queue. Each row shows the AI-assigned issue type, severity, tier, and classification confidence.</li>
          <li><strong>Filter:</strong> Narrow by issue type to focus a shift on one category.</li>
          <li><strong>Action:</strong> Open the top Enterprise S2 ticket (TKT-58213, Northwind Retail).</li>
          <li><strong>Decision:</strong> You choose what to work; the agent classifies and ranks, it never replies on its own.</li>
        </ul>
      </GuideCollapsible>

      <AITask>
        The agent classified each inbound ticket by issue type, severity, and customer tier, then ranked the queue by tier and severity. TKT-58213 is surfaced first - an Enterprise account with broken production webhook traffic, classified S2 with high confidence.
      </AITask>

      <HumanTask>
        Review the classified queue and open a ticket to work. You can re-order or re-classify based on your own judgment of customer impact.
      </HumanTask>

      <div className="flex flex-wrap gap-2">
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-full border transition-colors ${filter === f ? 'bg-wm-blue-highlight text-white border-wm-blue-highlight' : 'bg-white text-wm-gray-dark border-wm-gray-med hover:bg-wm-gray-light'}`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-lg border border-wm-gray-med shadow-sm overflow-hidden">
        <div className="p-4 border-b border-wm-gray-med bg-wm-gray-light flex justify-between items-center">
          <h3 className="font-semibold font-sans text-wm-blue">Support Queue</h3>
          <span className="text-xs text-wm-gray-dark font-medium">{shown.length} of {tickets.length} tickets · ranked by tier &amp; severity</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-wm-gray-dark uppercase bg-white border-b border-wm-gray-med">
              <tr>
                <th className="px-4 py-3">Ticket</th>
                <th className="px-4 py-3">Account</th>
                <th className="px-4 py-3">Subject</th>
                <th className="px-4 py-3">Issue Type</th>
                <th className="px-4 py-3">Sev</th>
                <th className="px-4 py-3">Confidence</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-wm-gray-med">
              {shown.map((t, idx) => (
                <tr key={t.id} className={`hover:bg-blue-50/50 transition-colors ${idx === 0 && filter === 'All' ? 'bg-blue-50/30' : ''}`}>
                  <td className="px-4 py-4 font-mono text-xs text-wm-blue whitespace-nowrap">{t.id}</td>
                  <td className="px-4 py-4">
                    <div className="font-semibold text-wm-blue">{t.account}</div>
                    <div className="text-xs text-wm-gray-dark">{t.tier} · {t.age}</div>
                  </td>
                  <td className="px-4 py-4 text-xs text-wm-gray-dark max-w-[220px]">{t.subject}</td>
                  <td className="px-4 py-4 text-xs text-wm-gray-dark">{t.issueType}</td>
                  <td className="px-4 py-4"><Badge variant={sevVariant(t.severity)}>{t.severity}</Badge></td>
                  <td className="px-4 py-4 text-xs">
                    <span className={t.classifyConfidence === 'High' ? 'text-green-700' : t.classifyConfidence === 'Medium' ? 'text-amber-700' : 'text-wm-magenta'}>{t.classifyConfidence}</span>
                  </td>
                  <td className="px-4 py-4"><Badge variant={statusVariant(t.status)}>{t.status}</Badge></td>
                  <td className="px-4 py-4">
                    <Button
                      onClick={onNext}
                      variant={t.id === 'TKT-58213' ? 'primary' : 'outline'}
                      disabled={t.status === 'Resolved'}
                      className="whitespace-nowrap"
                    >
                      {t.status === 'Resolved' ? 'Closed' : 'Open'}
                    </Button>
                  </td>
                </tr>
              ))}
              {shown.length === 0 && (
                <tr><td colSpan={8} className="px-4 py-6 text-center text-xs text-wm-gray-dark">No tickets match this filter.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
