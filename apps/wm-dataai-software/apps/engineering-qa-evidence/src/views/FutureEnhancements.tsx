import React from 'react';
import { RotateCcw, Database, Workflow, ShieldCheck, BarChart3, Sparkles, Rocket } from 'lucide-react';
import { Button } from '../components/Shared';

const groups = [
  {
    icon: Database, title: 'Data Integrations',
    items: ['Native connectors for Jira, GitHub, GitLab, and CI providers', 'Coverage and flaky-test signals from the test-result store', 'CRM and usage telemetry to weight customer blast radius'],
  },
  {
    icon: Workflow, title: 'Workflow Expansion',
    items: ['Auto-drafted test stubs for ranked gaps, opened as PRs for engineers to complete', 'Change-freeze and dependency-risk checks across services', 'Post-release watch that links escaped defects back to skipped gaps'],
  },
  {
    icon: ShieldCheck, title: 'Governance & Risk Controls',
    items: ['Configurable gates that hard-block sign-off on open High-severity gaps', 'Required QA-lead and release-manager approvals with full decision logs', 'Risk-model thresholds tuned per service and per environment'],
  },
  {
    icon: BarChart3, title: 'Analytics & Reporting',
    items: ['Escaped-defect and cycle-time dashboards by team and service', 'Risk-score calibration vs. actual post-release outcomes', 'Coverage-gap trends tied to incident and customer-impact history'],
  },
  {
    icon: Sparkles, title: 'User Experience',
    items: ['One-click evidence pack export for audit and compliance reviews', 'Inline diff and incident links from every ranked gap', 'Release-manager mobile sign-off with the full pack attached'],
  },
  {
    icon: Rocket, title: 'Production Readiness',
    items: ['Enterprise SSO, role-based access, and least-privilege tool scopes', 'Human-in-the-loop QA and release gates enforced and monitored', 'Phased rollout playbook starting with read-only evidence assembly'],
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
        <p className="text-lg text-wm-gray-dark max-w-2xl mx-auto">Where this goes in production, grounded in real delivery operations and sequenced to value, with engineering judgment kept on every gate.</p>
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
                  <span className="text-wm-magenta mt-1">&bull;</span>{it}
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
