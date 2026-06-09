import React from 'react';
import { Target, LayoutDashboard, Database, ArrowRight, MessageSquare, Layers, ClipboardList } from 'lucide-react';
import { Button } from '../components/Shared';
import { kpis } from '../data';

export const Intro = ({ onStart }: { onStart: () => void }) => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-wm-blue-highlight text-sm font-semibold mb-6">
          <MessageSquare className="w-4 h-4" /> Product Management Demo
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-wm-blue mb-4 tracking-tight">Voice-of-Customer to Product Backlog</h1>
        <p className="text-xl text-wm-gray-dark mb-8 max-w-2xl mx-auto">Prioritize product work by ARR-at-risk, not anecdote volume. From scattered feedback to an evidence-backed backlog item, with the PM in control of every decision.</p>
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
            Customer feedback lands in a dozen tools and never adds up. Product teams spend weeks hand-synthesizing tickets, calls, reviews, and surveys, then argue the roadmap from whoever shouted loudest. Revenue impact is rarely attached, so the loudest theme wins over the most valuable one, and churn drivers slip through.
          </p>
          <div className="mt-4 pt-4 border-t border-wm-gray-light">
            <h4 className="text-xs font-semibold text-wm-blue uppercase tracking-wider mb-2">Target Audience</h4>
            <p className="text-xs text-wm-gray-dark">
              <strong>Users:</strong> Product managers and product ops.<br />
              <strong>Buyers:</strong> CPO, CCO, VP Product, Head of Product Ops.
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-wm-gray-med shadow-sm">
          <h3 className="flex items-center gap-2 font-bold text-wm-blue mb-3 border-b pb-2">
            <Database className="w-5 h-5 text-wm-magenta" /> Data Sources & Foundation
          </h3>
          <p className="text-sm text-wm-gray-dark leading-relaxed mb-4">
            The agent grounds every theme in real customer records and joins them to revenue, so each roadmap bet carries evidence you can trace:
          </p>
          <ul className="text-sm text-wm-gray-dark space-y-1.5 list-disc pl-5">
            <li>Support tickets, sales-call notes, app-store reviews</li>
            <li>Community posts and NPS verbatims</li>
            <li>CRM churn-reason codes and ARR/contract values</li>
            <li>JIRA defect backlog and existing roadmap register</li>
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
        Benchmarks reflect West Monroe's agentic AI point of view (up to 75% process-time reduction) and HT&S product-strategy, NPD, and support credentials. Figures are illustrative for this demo.
      </p>

      <div className="bg-wm-gray-light p-8 rounded-xl border border-wm-gray-med">
        <h3 className="font-bold text-wm-blue text-lg mb-6 text-center">Future-State AI Workflow</h3>
        <div className="grid sm:grid-cols-3 gap-6 text-center">
          <div className="bg-white p-5 rounded-lg shadow-sm border border-white">
            <Layers className="w-8 h-8 text-wm-blue-highlight mx-auto mb-3" />
            <h4 className="font-semibold text-sm mb-2 text-wm-blue">1. Ingest & Cluster</h4>
            <p className="text-xs text-wm-gray-dark">VOC from every channel is ingested and clustered into themes, each backed by example records.</p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-sm border border-white">
            <LayoutDashboard className="w-8 h-8 text-wm-blue-highlight mx-auto mb-3" />
            <h4 className="font-semibold text-sm mb-2 text-wm-blue">2. Link & Draft</h4>
            <p className="text-xs text-wm-gray-dark">Each theme is linked to ARR-at-risk and defects, then drafted into an opportunity brief.</p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-sm border border-white">
            <ClipboardList className="w-8 h-8 text-wm-blue-highlight mx-auto mb-3" />
            <h4 className="font-semibold text-sm mb-2 text-wm-blue">3. PM Decision & Handoff</h4>
            <p className="text-xs text-wm-gray-dark">The PM ranks, accepts, and hands engineering an evidence-backed backlog ticket.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
