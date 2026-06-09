import React from 'react';
import { Target, LayoutDashboard, Database, ArrowRight, Rocket, Search, FlaskConical } from 'lucide-react';
import { Button } from '../components/Shared';
import { kpis } from '../data';

export const Intro = ({ onStart }: { onStart: () => void }) => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-wm-blue-highlight text-sm font-semibold mb-6">
          <Rocket className="w-4 h-4" /> Product-Led Growth Demo
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-wm-blue mb-4 tracking-tight">Product Adoption &amp; Activation Orchestrator</h1>
        <p className="text-xl text-wm-gray-dark mb-8 max-w-2xl mx-auto">Find the activation journeys that stall, fix the blocker, and turn product telemetry into finance-owned retention and expansion - with a PM approving every experiment.</p>
        <Button onClick={onStart} variant="primary" className="text-lg px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all" Icon={ArrowRight}>
          Start Interactive Demo
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-6 rounded-xl border border-wm-gray-med shadow-sm">
          <h3 className="flex items-center gap-2 font-bold text-wm-blue mb-3 border-b pb-2">
            <Target className="w-5 h-5 text-wm-magenta" /> Business Problem
          </h3>
          <p className="text-sm text-wm-gray-dark leading-relaxed mb-4">
            Most self-serve signups never reach the moment a product becomes valuable. Activation stalls quietly inside the funnel, feature adoption stays flat, and accounts that never activate never expand. Product and growth teams can see the aggregate drop-off but struggle to isolate the specific blocker for a specific cohort and act on it before churn sets in.
          </p>
          <div className="mt-4 pt-4 border-t border-wm-gray-light">
            <h4 className="text-xs font-semibold text-wm-blue uppercase tracking-wider mb-2">Target Audience</h4>
            <p className="text-xs text-wm-gray-dark">
              <strong>Users:</strong> Product managers, growth and product-ops teams.<br />
              <strong>Buyers:</strong> CPO, CCO, CRO, VP Product, VP Customer Success.
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-wm-gray-med shadow-sm">
          <h3 className="flex items-center gap-2 font-bold text-wm-blue mb-3 border-b pb-2">
            <Database className="w-5 h-5 text-wm-magenta" /> Data Sources &amp; Foundation
          </h3>
          <p className="text-sm text-wm-gray-dark leading-relaxed mb-4">
            Every cohort, blocker, and experiment is grounded in product telemetry tied to plan and account context. Nothing ships without a human read:
          </p>
          <ul className="text-sm text-wm-gray-dark space-y-1.5 list-disc pl-5">
            <li>Product telemetry from the events warehouse</li>
            <li>Billing and plan registry</li>
            <li>Signup-source attribution from the CRM</li>
            <li>Prior winning nudge and checklist library</li>
            <li>Expansion and NRR linkage model</li>
          </ul>
        </div>
      </div>

      <div className="bg-wm-blue p-8 rounded-xl shadow-md mb-4 text-white">
        <h3 className="font-bold text-lg mb-6 text-center">Expected Business Impact</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {kpis.map((kpi, idx) => (
            <div key={idx} className="bg-white/10 p-4 rounded-lg">
              <p className="text-[10px] text-white/70 uppercase tracking-wider mb-1 line-clamp-2 min-h-[1.5rem]">{kpi.label}</p>
              <div className="flex flex-col items-center gap-1">
                <span className="text-xl font-bold text-green-400">{kpi.improved}</span>
                <span className="text-xs text-white/50 line-through">was {kpi.baseline}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="text-center text-xs text-wm-gray-dark mb-12">
        Benchmarks reflect West Monroe product-led growth work: a 7% year-over-year increase in a key utilization metric for a $1B ARR SaaS provider, paired with an NRR-focused customer success model redesign. Pitch line: turn product telemetry into finance-owned retention and expansion.
      </p>

      <div className="bg-wm-gray-light p-8 rounded-xl border border-wm-gray-med">
        <h3 className="font-bold text-wm-blue text-lg mb-6 text-center">Future-State Workflow</h3>
        <div className="grid sm:grid-cols-3 gap-6 text-center">
          <div className="bg-white p-5 rounded-lg shadow-sm border border-white">
            <Search className="w-8 h-8 text-wm-blue-highlight mx-auto mb-3" />
            <h4 className="font-semibold text-sm mb-2 text-wm-blue">1. Segment &amp; Diagnose</h4>
            <p className="text-xs text-wm-gray-dark">Cohorts are scored against the activation journey, and the specific blocker is isolated by comparison to a healthy cohort.</p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-sm border border-white">
            <LayoutDashboard className="w-8 h-8 text-wm-blue-highlight mx-auto mb-3" />
            <h4 className="font-semibold text-sm mb-2 text-wm-blue">2. Draft &amp; Approve</h4>
            <p className="text-xs text-wm-gray-dark">Nudges, an enablement path, and CSM outreach are drafted, then a PM edits and approves a scoped experiment.</p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-sm border border-white">
            <FlaskConical className="w-8 h-8 text-wm-blue-highlight mx-auto mb-3" />
            <h4 className="font-semibold text-sm mb-2 text-wm-blue">3. Monitor Lift</h4>
            <p className="text-xs text-wm-gray-dark">Activation, 30-day usage lift, and expansion-qualified accounts are tracked against a holdout and a P&amp;L line.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
