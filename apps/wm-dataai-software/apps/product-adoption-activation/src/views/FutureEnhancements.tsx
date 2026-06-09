import React from 'react';
import { RotateCcw, Database, Workflow, ShieldCheck, BarChart3, Sparkles, Rocket } from 'lucide-react';
import { Button } from '../components/Shared';

const groups = [
  {
    icon: Database, title: 'Data Integrations',
    items: ['Real-time event streaming for same-session activation nudges', 'Two-way CRM and CS-platform sync for outreach and account context', 'Revenue and billing feeds to tie usage lift directly to NRR'],
  },
  {
    icon: Workflow, title: 'Workflow Expansion',
    items: ['Multi-cohort campaign queue with shared holdout management', 'Auto-drafted plays for newly detected blockers as they emerge', 'Lifecycle expansion from activation into adoption and renewal journeys'],
  },
  {
    icon: ShieldCheck, title: 'Governance & Risk Controls',
    items: ['Blast-radius and frequency caps enforced before any launch', 'PM approval gate required on every consequential experiment', 'Customer-facing copy review that blocks any mention of automation'],
  },
  {
    icon: BarChart3, title: 'Analytics & Reporting',
    items: ['Activation and adoption dashboards by segment, plan, and source', 'Experiment lift attribution with control-vs-treatment confidence', 'Expansion-qualified pipeline tied to a finance-owned P&L line'],
  },
  {
    icon: Sparkles, title: 'User Experience',
    items: ['One-click play editing with side-by-side draft history', 'Reusable nudge and enablement-path template library', 'Inline experiment readouts surfaced in the PM workspace'],
  },
  {
    icon: Rocket, title: 'Production Readiness',
    items: ['Enterprise SSO, role-based access, and data-residency controls', 'Human-in-the-loop approval enforced and monitored at scale', 'Phased rollout playbook with adoption and change management'],
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
        <p className="text-lg text-wm-gray-dark max-w-2xl mx-auto">Where this goes in production - grounded in real product operations, sequenced to value and adoption.</p>
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
