import React from 'react';
import { RotateCcw, Database, Workflow, ShieldCheck, BarChart3, Sparkles, Rocket } from 'lucide-react';
import { Button } from '../components/Shared';

const groups = [
  {
    icon: Database, title: 'Data Integrations',
    items: ['Multi-cloud billing exports (AWS, Azure, GCP) plus Databricks and Snowflake usage', 'Kubernetes cost allocation by namespace, pod, and label', 'Commitment and savings-plan coverage feeds for rate optimization'],
  },
  {
    icon: Workflow, title: 'Workflow Expansion',
    items: ['Pull-request style change sets that apply only after owner approval and CI checks', 'Continuous rightsizing recommendations on a rolling schedule, not one-off reviews', 'Budget-guardrail alerts routed to the owning team before spend breaches a threshold'],
  },
  {
    icon: ShieldCheck, title: 'Governance & Risk Controls',
    items: ['SLA-aware guardrails that block any change projected to miss a completion window', 'Full approve-vs-return audit trail retained for finance and compliance', 'Blast-radius limits and staged rollout for changes above a savings threshold'],
  },
  {
    icon: BarChart3, title: 'Analytics & Reporting',
    items: ['Gross-margin bridge by product line, region, and customer cohort', 'Cost-per-active-customer and unit-economics dashboards tied to the P&L', 'Realized-vs-projected savings tracking with variance explained'],
  },
  {
    icon: Sparkles, title: 'User Experience',
    items: ['Workload owner inbox with one-tap approve, return, or hold for validation', 'Natural-language drill-down from a margin number to the driving workload', 'Slack and ticketing integration for approvals where the team already works'],
  },
  {
    icon: Rocket, title: 'Production Readiness',
    items: ['Enterprise SSO, role-based access, and least-privilege change execution', 'Human-in-the-loop approval enforced and monitored at estate scale', 'Phased rollout playbook with FinOps operating-model and change management'],
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
        <p className="text-lg text-wm-gray-dark max-w-2xl mx-auto">Where this goes in production - grounded in real cloud operations, sequenced to value and to a FinOps operating model.</p>
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
