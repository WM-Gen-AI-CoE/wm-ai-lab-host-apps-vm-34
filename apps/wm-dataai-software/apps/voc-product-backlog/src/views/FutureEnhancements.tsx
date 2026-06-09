import React from 'react';
import { RotateCcw, Database, Workflow, ShieldCheck, BarChart3, Sparkles, Rocket } from 'lucide-react';
import { Button } from '../components/Shared';

const groups = [
  {
    icon: Database, title: 'Data Integrations',
    items: ['Bidirectional sync to JIRA, Linear, and Productboard', 'Win/loss interview and Slack Connect ingestion once PII scrubbing is validated', 'Usage and telemetry joins to weight themes by active accounts'],
  },
  {
    icon: Workflow, title: 'Workflow Expansion',
    items: ['Continuous theme monitoring with renewal-risk alerts', 'Auto-drafted release notes traced back to the originating VOC', 'Quarterly planning pack assembled from accepted briefs'],
  },
  {
    icon: ShieldCheck, title: 'Governance & Risk Controls',
    items: ['RevOps validation gate on ARR-at-risk above a threshold', 'Full evidence-to-claim provenance retained for audit', 'PM accept/defer rationale required and logged on every theme'],
  },
  {
    icon: BarChart3, title: 'Analytics & Reporting',
    items: ['ARR-at-risk dashboards by theme, segment, and product area', 'Roadmap coverage: share of items with revenue evidence', 'Closed-loop tracking from shipped fix to retained ARR'],
  },
  {
    icon: Sparkles, title: 'User Experience',
    items: ['One-click merge/split of clusters with undo', 'Inline citation hover that opens the source record', 'Saved priority frameworks (RICE, WSJF) applied to ARR signal'],
  },
  {
    icon: Rocket, title: 'Production Readiness',
    items: ['Enterprise SSO, role-based access, and PII handling controls', 'Human-in-the-loop accept and confirm enforced at every gate', 'Phased rollout playbook with product-ops change management'],
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
