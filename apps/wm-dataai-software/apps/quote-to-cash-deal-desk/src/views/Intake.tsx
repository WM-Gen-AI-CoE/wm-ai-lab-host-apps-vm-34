import React from 'react';
import { quoteQueue } from '../data';
import { GuideCollapsible } from '../components/GuideCollapsible';
import { AITask, HumanTask, Badge, Button } from '../components/Shared';

const statusVariant = (s: string): 'green' | 'blue' | 'amber' | 'gray' =>
  s === 'Synced' ? 'gray' : s === 'In deal desk' ? 'blue' : s === 'Awaiting approval' ? 'amber' : 'green';

const priorityVariant = (p: string): 'magenta' | 'amber' | 'gray' =>
  p === 'High' ? 'magenta' : p === 'Medium' ? 'amber' : 'gray';

export const Intake = ({ onNext }: { onNext: () => void }) => {
  return (
    <div className="space-y-6">
      <GuideCollapsible
        title="How to use this page"
        talkTrack="This is the deal desk queue. Instead of working quotes first-in-first-out, the desk sees which deals carry the most pricing risk - high ARR, discount above floor, nonstandard terms - so the highest-leverage work comes first."
      >
        <p>This page is for choosing which quote or renewal to work first.</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li><strong>Review:</strong> Scan pending quotes by ARR, segment, and requested discount.</li>
          <li><strong>Action:</strong> Open the highest-priority deal - the Northwind Logistics renewal.</li>
          <li><strong>Decision:</strong> You set the order of work. The agent only triages and ranks. It never approves or syncs a quote on its own.</li>
        </ul>
      </GuideCollapsible>

      <AITask>
        The agent triaged the CPQ queue against the pricing playbook and ranked deals by ARR and discount variance. Northwind Logistics (Q-48217) is surfaced first: it is the largest renewal, the requested 22% discount sits above the 15% segment floor, and the contract carries an uncapped uplift clause.
      </AITask>

      <HumanTask>
        Review the queue and open a deal to work. You can work in any order and override the triage based on close dates and customer commitments.
      </HumanTask>

      <div className="bg-white rounded-lg border border-wm-gray-med shadow-sm overflow-hidden">
        <div className="p-4 border-b border-wm-gray-med bg-wm-gray-light flex justify-between items-center">
          <h3 className="font-semibold font-sans text-wm-blue">Deal Desk Queue</h3>
          <span className="text-xs text-wm-gray-dark font-medium">Updated just now &middot; 5 quotes</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-wm-gray-dark uppercase bg-white border-b border-wm-gray-med">
              <tr>
                <th className="px-4 py-3">Quote</th>
                <th className="px-4 py-3">Account</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">ARR</th>
                <th className="px-4 py-3">Req. Discount</th>
                <th className="px-4 py-3">Priority</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-wm-gray-med">
              {quoteQueue.map((q, idx) => (
                <tr key={q.id} className={`hover:bg-blue-50/50 transition-colors ${idx === 0 ? 'bg-blue-50/20' : ''}`}>
                  <td className="px-4 py-4 font-mono text-xs text-wm-blue whitespace-nowrap">{q.id}</td>
                  <td className="px-4 py-4">
                    <div className="font-semibold text-wm-blue">{q.account}</div>
                    <div className="text-xs text-wm-gray-dark">{q.segment}</div>
                  </td>
                  <td className="px-4 py-4 text-xs text-wm-gray-dark">{q.type}</td>
                  <td className="px-4 py-4 text-wm-gray-dark whitespace-nowrap font-medium">{q.arr}</td>
                  <td className="px-4 py-4 text-wm-gray-dark">{q.requestedDiscount}</td>
                  <td className="px-4 py-4"><Badge variant={priorityVariant(q.priority)}>{q.priority}</Badge></td>
                  <td className="px-4 py-4"><Badge variant={statusVariant(q.status)}>{q.status}</Badge></td>
                  <td className="px-4 py-4">
                    <Button
                      onClick={onNext}
                      variant={idx === 0 ? 'primary' : 'outline'}
                      disabled={q.status === 'Synced'}
                      className="whitespace-nowrap"
                    >
                      {q.status === 'Synced' ? 'View quote' : 'Open'}
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
