import React from 'react';
import { Target, LayoutDashboard, Database, ArrowRight, Headset, Search, FileText, ShieldCheck } from 'lucide-react';
import { Button } from '../components/Shared';
import { kpis } from '../data';

export const Intro = ({ onStart }: { onStart: () => void }) => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-wm-blue-highlight text-sm font-semibold mb-6">
          <Headset className="w-4 h-4" /> Customer & Technical Support Demo
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-wm-blue mb-4 tracking-tight">Support Deflection & Agent Assist</h1>
        <p className="text-xl text-wm-gray-dark mb-8 max-w-2xl mx-auto">Deflect the repetitive, escalate the risky. A grounded draft for every ticket, with the support engineer in control of what reaches the customer.</p>
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
            Support queues are dominated by repetitive, well-understood issues that still take a full handle to resolve, while the genuinely novel and risky cases wait behind them. Engineers re-derive answers that already exist in resolved cases, known defects, and release notes, driving up cost-to-serve and slowing first-contact resolution.
          </p>
          <div className="mt-4 pt-4 border-t border-wm-gray-light">
            <h4 className="text-xs font-semibold text-wm-blue uppercase tracking-wider mb-2">Target Audience</h4>
            <p className="text-xs text-wm-gray-dark">
              <strong>Users:</strong> Support engineers, technical support managers.<br />
              <strong>Buyers:</strong> VP Customer Support, CCO, COO (cost-to-serve owners).
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-wm-gray-med shadow-sm">
          <h3 className="flex items-center gap-2 font-bold text-wm-blue mb-3 border-b pb-2">
            <Database className="w-5 h-5 text-wm-magenta" /> Data Sources & Foundation
          </h3>
          <p className="text-sm text-wm-gray-dark leading-relaxed mb-4">
            The agent grounds every draft in real support knowledge, and never asserts a fix it cannot trace to a source:
          </p>
          <ul className="text-sm text-wm-gray-dark space-y-1.5 list-disc pl-5">
            <li>Resolved-case archive (last 18 months)</li>
            <li>Engineering defect tracker</li>
            <li>Product release notes</li>
            <li>Knowledge base articles</li>
            <li>Account record & entitlement tier (CRM)</li>
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
        Illustrative targets for a mid-market SaaS support program. West Monroe brings customer-support and engagement-model delivery plus an agentic-governance point of view: human oversight, guardrails, and full audit trails on every assisted resolution.
      </p>

      <div className="bg-wm-gray-light p-8 rounded-xl border border-wm-gray-med">
        <h3 className="font-bold text-wm-blue text-lg mb-6 text-center">Future-State AI Workflow</h3>
        <div className="grid sm:grid-cols-3 gap-6 text-center">
          <div className="bg-white p-5 rounded-lg shadow-sm border border-white">
            <Search className="w-8 h-8 text-wm-blue-highlight mx-auto mb-3" />
            <h4 className="font-semibold text-sm mb-2 text-wm-blue">1. Classify & Retrieve</h4>
            <p className="text-xs text-wm-gray-dark">Each ticket is classified by issue type, severity, and tier, then matched to similar cases, defects, and KB.</p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-sm border border-white">
            <FileText className="w-8 h-8 text-wm-blue-highlight mx-auto mb-3" />
            <h4 className="font-semibold text-sm mb-2 text-wm-blue">2. Draft & Validate</h4>
            <p className="text-xs text-wm-gray-dark">A sourced customer reply and troubleshooting path are drafted; the engineer edits and approves before sending.</p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-sm border border-white">
            <ShieldCheck className="w-8 h-8 text-wm-blue-highlight mx-auto mb-3" />
            <h4 className="font-semibold text-sm mb-2 text-wm-blue">3. Resolve or Escalate</h4>
            <p className="text-xs text-wm-gray-dark">The engineer resolves the ticket or routes the risky ones to engineering with full context, and impact is tracked.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
