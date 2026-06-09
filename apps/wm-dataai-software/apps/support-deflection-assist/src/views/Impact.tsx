import React from 'react';
import { kpis } from '../data';
import { GuideCollapsible } from '../components/GuideCollapsible';
import { Button, Badge } from '../components/Shared';
import { ArrowRight, CheckCircle2, Gauge, DollarSign, Smile, Clock } from 'lucide-react';

export const Impact = ({ onNext }: { onNext: () => void }) => {
  return (
    <div className="space-y-6">
      <GuideCollapsible
        title="How to use this page"
        talkTrack="This is the dashboard the CCO and COO care about. Deflection, average handle time, cost per ticket, first-contact resolution, and CSAT - before and after. The story for leadership: the same support team deflects more of the repetitive work and resolves faster, while the risky cases still get a human and a clean escalation. The AI computes the numbers; the support leader owns them."
      >
        <p>This page summarizes the resolved ticket and the program-level impact.</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li><strong>Review:</strong> Confirm the ticket outcome and the before/after metrics.</li>
          <li><strong>Interpret:</strong> The KPI panel ties this workflow to deflection and cost-to-serve.</li>
          <li><strong>Next:</strong> Explore how this scales across the support org in Future Enhancements.</li>
        </ul>
      </GuideCollapsible>

      <div className="bg-wm-blue text-white rounded-xl p-6 shadow-md">
        <div className="flex items-center gap-3 mb-2">
          <CheckCircle2 className="w-7 h-7 text-green-400" />
          <h2 className="text-xl font-bold">Ticket resolved - TKT-58213, Northwind Retail</h2>
        </div>
        <p className="text-white/70 text-sm">First-contact resolution at 10:08 AM · ~7 minutes handle time · customer-applied fix from a tested resolution path.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-wm-gray-med shadow-sm p-4">
          <h3 className="flex items-center gap-2 font-semibold text-wm-blue text-sm mb-3"><Gauge className="w-4 h-4 text-wm-blue-highlight" /> Outcome</h3>
          <Badge variant="green">First-contact resolution</Badge>
          <p className="text-xs text-wm-gray-dark mt-2">Resolved without escalation. The defect path stayed available if the fix had not held.</p>
        </div>
        <div className="bg-white rounded-lg border border-wm-gray-med shadow-sm p-4">
          <h3 className="flex items-center gap-2 font-semibold text-wm-blue text-sm mb-3"><DollarSign className="w-4 h-4 text-wm-blue-highlight" /> Cost to Serve</h3>
          <p className="text-2xl font-bold text-green-600">$9.10</p>
          <p className="text-xs text-wm-gray-dark">vs. $14.20 baseline on a comparable ticket.</p>
        </div>
        <div className="bg-white rounded-lg border border-wm-gray-med shadow-sm p-4">
          <h3 className="flex items-center gap-2 font-semibold text-wm-blue text-sm mb-3"><Smile className="w-4 h-4 text-wm-blue-highlight" /> CSAT</h3>
          <p className="text-2xl font-bold text-green-600">4.8 / 5</p>
          <p className="text-xs text-wm-gray-dark">Customer confirmed deliveries resumed after the test event.</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-wm-gray-med shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-wm-gray-med bg-wm-gray-light flex items-center gap-2">
          <Clock className="w-4 h-4 text-wm-blue-highlight" />
          <h3 className="font-semibold text-wm-blue text-sm">Program Impact: Before vs. After</h3>
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
          Across the queue, classification and grounded drafts move the repetitive, well-documented tickets to faster first-contact resolution and self-service, while the novel and risky cases route to engineering with a complete package. The unlock is lower cost-to-serve and higher deflection without sacrificing the human review on anything that reaches a customer. Deflect the repetitive, escalate the risky.
        </p>
      </div>

      <div className="flex justify-end">
        <Button onClick={onNext} variant="primary" Icon={ArrowRight}>View future enhancements</Button>
      </div>
    </div>
  );
};
