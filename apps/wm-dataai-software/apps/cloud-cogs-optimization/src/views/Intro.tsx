import React from 'react';
import { Target, Database, ArrowRight, Cloud, Search, Sliders, BadgeCheck } from 'lucide-react';
import { Button } from '../components/Shared';
import { kpis } from '../data';

export const Intro = ({ onStart }: { onStart: () => void }) => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-wm-blue-highlight text-sm font-semibold mb-6">
          <Cloud className="w-4 h-4" /> Cloud FinOps & Platform Engineering Demo
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-wm-blue mb-4 tracking-tight">Cloud COGS Optimization Agent</h1>
        <p className="text-xl text-wm-gray-dark mb-8 max-w-2xl mx-auto">From a spend anomaly to an approved, SLA-safe change in minutes - making gross margin observable at the workload and customer level, with the owning engineer in control.</p>
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
            Cloud is the second-largest line item for most SaaS businesses, and a meaningful slice of it is waste: idle clusters, oversized instances, untuned data jobs, and egress nobody reads. Spend grows faster than usage, gross margin erodes quietly, and finance cannot see which workloads or customers drive the cost. Engineers fear that cutting spend will break an SLA.
          </p>
          <div className="mt-4 pt-4 border-t border-wm-gray-light">
            <h4 className="text-xs font-semibold text-wm-blue uppercase tracking-wider mb-2">Target Audience</h4>
            <p className="text-xs text-wm-gray-dark">
              <strong>Users:</strong> FinOps, cloud engineering, platform and data-platform engineering.<br />
              <strong>Sponsors:</strong> CFO, CTO, VP Infrastructure.
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-wm-gray-med shadow-sm">
          <h3 className="flex items-center gap-2 font-bold text-wm-blue mb-3 border-b pb-2">
            <Database className="w-5 h-5 text-wm-magenta" /> Data Sources & Foundation
          </h3>
          <p className="text-sm text-wm-gray-dark leading-relaxed mb-4">
            The agent grounds every recommendation in observed billing and usage - it never proposes a change it cannot trace to a number:
          </p>
          <ul className="text-sm text-wm-gray-dark space-y-1.5 list-disc pl-5">
            <li>Cloud billing exports (CUR) and SKU rate cards</li>
            <li>Data-platform job and cluster usage logs</li>
            <li>Compute, storage, and egress utilization metrics</li>
            <li>Customer traffic and active-account telemetry</li>
            <li>Workload-to-team ownership and SLA definitions</li>
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
        Directions grounded in West Monroe HT&S platform-consolidation and cost-optimization work and Databricks lakehouse delivery; public Databricks job-optimization research showed roughly 19% compute cost savings on tuned jobs.
      </p>

      <div className="bg-wm-gray-light p-8 rounded-xl border border-wm-gray-med">
        <h3 className="font-bold text-wm-blue text-lg mb-6 text-center">Future-State AI Workflow</h3>
        <div className="grid sm:grid-cols-3 gap-6 text-center">
          <div className="bg-white p-5 rounded-lg shadow-sm border border-white">
            <Search className="w-8 h-8 text-wm-blue-highlight mx-auto mb-3" />
            <h4 className="font-semibold text-sm mb-2 text-wm-blue">1. Detect & Analyze</h4>
            <p className="text-xs text-wm-gray-dark">The agent ranks spend anomalies and decomposes the top workload into compute, storage, and egress root cause.</p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-sm border border-white">
            <Sliders className="w-8 h-8 text-wm-blue-highlight mx-auto mb-3" />
            <h4 className="font-semibold text-sm mb-2 text-wm-blue">2. Recommend</h4>
            <p className="text-xs text-wm-gray-dark">Ranked actions (rightsize, schedule, query tuning) each carry projected savings, a risk note, and an SLA guardrail.</p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-sm border border-white">
            <BadgeCheck className="w-8 h-8 text-wm-blue-highlight mx-auto mb-3" />
            <h4 className="font-semibold text-sm mb-2 text-wm-blue">3. Approve & Track</h4>
            <p className="text-xs text-wm-gray-dark">The owning engineer approves each change; realized savings flow into a gross-margin bridge finance owns.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
