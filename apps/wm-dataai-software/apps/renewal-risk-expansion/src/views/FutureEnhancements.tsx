import React from 'react';
import { RotateCcw, Database, Workflow, ShieldCheck, BarChart3, Sparkles, Rocket } from 'lucide-react';
import { Button } from '../components/Shared';

const groups = [
  {
    icon: Database, title: 'Data Integrations',
    items: ['Bidirectional CRM write-back for renewal stage, notes, and tasks', 'Billing and CPQ feeds to ground concession math in real pricing', 'Product-telemetry connectors for seat, module, and feature adoption'],
  },
  {
    icon: Workflow, title: 'Workflow Expansion',
    items: ['Whole-book batch review for quarterly renewal forecasting', 'Auto-drafted QBR decks from the same evidence model', 'Expansion-opportunity routing into the AE pipeline at the right moment'],
  },
  {
    icon: ShieldCheck, title: 'Governance & Risk Controls',
    items: ['Concession approval matrix by role, segment, and dollar threshold', 'Full edit-vs-draft diff retained on every action plan for audit', 'Customer-facing messages held until an explicit human approval'],
  },
  {
    icon: BarChart3, title: 'Analytics & Reporting',
    items: ['Live NRR and gross-renewal-rate bridges by segment and CSM', 'Save-play win rates and expansion-attach benchmarking', 'At-risk ARR burndown tied to a board-level retention line'],
  },
  {
    icon: Sparkles, title: 'User Experience',
    items: ['One-click acceptance of a recommended play into the action plan', 'Inline editing of save-offer language with version history', 'Renewals Manager queue for fast approve or return decisions'],
  },
  {
    icon: Rocket, title: 'Production Readiness',
    items: ['Enterprise SSO, role-based access, and customer-data controls', 'Human-in-the-loop approval enforced on every concession and note', 'Phased rollout playbook with CSM enablement and change management'],
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
        <p className="text-lg text-wm-gray-dark max-w-2xl mx-auto">Where this goes in production, grounded in real customer-success operations and sequenced to retention value and adoption.</p>
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
