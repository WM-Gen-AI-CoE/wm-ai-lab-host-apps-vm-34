import React from 'react';
import { RotateCcw, Database, Workflow, ShieldCheck, BarChart3, Sparkles, Rocket } from 'lucide-react';
import { Button } from '../components/Shared';

const groups = [
  {
    icon: Database, title: 'Data Integrations',
    items: ['Bidirectional CPQ and CRM write-back for approved quotes and terms', 'Billing and ERP sync for true-ups and mid-term adjustments', 'Live usage and entitlement feeds to drive uplift recommendations'],
  },
  {
    icon: Workflow, title: 'Workflow Expansion',
    items: ['New-business and expansion quoting on the same evidence model', 'Multi-quote batch review for end-of-quarter renewal waves', 'Negotiation playbooks that adjust the recommendation as terms change'],
  },
  {
    icon: ShieldCheck, title: 'Governance & Risk Controls',
    items: ['Margin floor and delegation thresholds enforced per segment', 'Nonstandard clause library with finance and legal routing', 'Full recommendation-vs-final diff retained for audit'],
  },
  {
    icon: BarChart3, title: 'Analytics & Reporting',
    items: ['Discount leakage and price realization dashboards by rep and segment', 'Renewal uplift capture trended against an approved finance definition', 'Deal-desk cycle time tied to a revenue and margin P&L line'],
  },
  {
    icon: Sparkles, title: 'User Experience',
    items: ['One-click concession scenarios within approved guardrails', 'Inline cover-note editing with brand and tone templates', 'Approver mobile sign-off with notes and return-to-sender'],
  },
  {
    icon: Rocket, title: 'Production Readiness',
    items: ['Enterprise SSO, role-based access, and segregation of duties', 'Human-in-the-loop approval enforced before any sync to systems of record', 'Phased rollout playbook with adoption and change management'],
  },
];

export const FutureEnhancements = ({ onRestart }: { onRestart: () => void }) => {
  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-50 text-wm-magenta text-sm font-semibold mb-4">
          <Rocket className="w-4 h-4" /> Roadmap
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-wm-blue mb-3">Future Enhancements</h1>
        <p className="text-lg text-wm-gray-dark max-w-2xl mx-auto">Where this goes in production, grounded in real RevOps and pricing operations, sequenced to value and adoption.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {groups.map((g, i) => (
          <div key={i} className="bg-white rounded-xl border border-wm-gray-med shadow-sm p-5">
            <h3 className="flex items-center gap-2 font-bold text-wm-blue mb-3 border-b pb-2 text-sm">
              <g.icon className="w-5 h-5 text-wm-blue-highlight" /> {g.title}
            </h3>
            <ul className="space-y-2">
              {g.items.map((it, j) => (
                <li key={j} className="flex items-start gap-2 text-sm text-wm-gray-dark">
                  <span className="text-wm-magenta mt-1">•</span>{it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Button onClick={onRestart} variant="outline" className="px-6 py-3 rounded-full" Icon={RotateCcw}>
          Restart demo
        </Button>
      </div>
    </div>
  );
};
