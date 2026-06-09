import React from 'react';
import { RotateCcw, Database, Workflow, ShieldCheck, BarChart3, Sparkles, Rocket } from 'lucide-react';
import { Button } from '../components/Shared';

const groups = [
  {
    icon: Database, title: 'Data Integrations',
    items: ['Two-way sync with the ticketing platform (Zendesk, Jira Service Management)', 'Live defect-tracker and release-pipeline feeds for fresher evidence', 'CRM entitlement and SLA data to tune severity and priority'],
  },
  {
    icon: Workflow, title: 'Workflow Expansion',
    items: ['Customer-facing self-service answers from the same evidence model', 'Proactive outreach when a known defect matches an open ticket', 'Auto-drafted KB articles from newly resolved, novel cases for human approval'],
  },
  {
    icon: ShieldCheck, title: 'Governance & Risk Controls',
    items: ['Confidence thresholds that force engineer review before any send', 'Destructive-action guardrails that block risky steps from a customer reply', 'Full edit-vs-draft diff and routing audit retained for compliance'],
  },
  {
    icon: BarChart3, title: 'Analytics & Reporting',
    items: ['Deflection, AHT, FCR, and cost-per-ticket dashboards by team and product area', 'Escalation-rate and defect-cluster trends fed back to engineering', 'CSAT and reopen-rate tracking tied to a cost-to-serve P&L line'],
  },
  {
    icon: Sparkles, title: 'User Experience',
    items: ['In-console assist panel beside the live ticket', 'One-click insert of an approved troubleshooting path', 'Engineer feedback loop that improves retrieval ranking over time'],
  },
  {
    icon: Rocket, title: 'Production Readiness',
    items: ['Enterprise SSO, role-based access, and customer-data handling controls', 'Human approval enforced and monitored on every customer message', 'Phased rollout by issue category with adoption and change management'],
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
        <p className="text-lg text-wm-gray-dark max-w-2xl mx-auto">Where this goes in production - grounded in real support operations, sequenced to deflection value and engineer trust.</p>
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
