import React from 'react';
import { Target, LayoutDashboard, Database, ArrowRight, TrendingUp, Users, FileCheck2 } from 'lucide-react';
import { Button } from '../components/Shared';
import { kpis } from '../data';

export const Intro = ({ onStart }: { onStart: () => void }) => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-wm-blue-highlight text-sm font-semibold mb-6">
          <TrendingUp className="w-4 h-4" /> Customer Success & Renewals Demo
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-wm-blue mb-4 tracking-tight">Renewal Risk & Expansion Copilot</h1>
        <p className="text-xl text-wm-gray-dark mb-8 max-w-2xl mx-auto">Surface at-risk accounts, assemble the evidence behind each risk, and turn it into a CSM-owned save and expansion plan, with every concession approved by a human.</p>
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
            Renewal risk hides across six systems: usage, support, contracts, surveys, and CSM notes. By the time a churn signal is obvious, the notice window has often already opened. CSMs spend their week stitching that picture together by hand, which leaves both save plays and expansion late or missed entirely.
          </p>
          <div className="mt-4 pt-4 border-t border-wm-gray-light">
            <h4 className="text-xs font-semibold text-wm-blue uppercase tracking-wider mb-2">Target Audience</h4>
            <p className="text-xs text-wm-gray-dark">
              <strong>Users:</strong> CSMs and Renewals Managers.<br />
              <strong>Buyers:</strong> Chief Customer Officer, CRO, VP Customer Success.
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-wm-gray-med shadow-sm">
          <h3 className="flex items-center gap-2 font-bold text-wm-blue mb-3 border-b pb-2">
            <Database className="w-5 h-5 text-wm-magenta" /> Data Sources & Foundation
          </h3>
          <p className="text-sm text-wm-gray-dark leading-relaxed mb-4">
            Every risk score and recommended play is grounded in the customer's own records, each one traceable back to its source:
          </p>
          <ul className="text-sm text-wm-gray-dark space-y-1.5 list-disc pl-5">
            <li>CRM renewal opportunities & contract terms</li>
            <li>Product usage warehouse (seats, modules, adoption)</li>
            <li>Support ticket history & SLA performance</li>
            <li>NPS / CSAT and email-sentiment feeds</li>
            <li>CSM call logs and stakeholder maps</li>
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
        Benchmarks framed against West Monroe customer-success work: a 400 bps NRR improvement on a cloud-journey and customer-engagement program, and +9% NRR by assigning CSMs to previously uncovered accounts, on a roughly $1B ARR SaaS CS transformation. Shown as a WM benchmark, not a guarantee.
      </p>

      <div className="bg-wm-gray-light p-8 rounded-xl border border-wm-gray-med">
        <h3 className="font-bold text-wm-blue text-lg mb-6 text-center">Future-State AI Workflow</h3>
        <div className="grid sm:grid-cols-3 gap-6 text-center">
          <div className="bg-white p-5 rounded-lg shadow-sm border border-white">
            <LayoutDashboard className="w-8 h-8 text-wm-blue-highlight mx-auto mb-3" />
            <h4 className="font-semibold text-sm mb-2 text-wm-blue">1. Score & Assemble</h4>
            <p className="text-xs text-wm-gray-dark">The book is scored for renewal risk, and each at-risk account's signals are assembled into one readable case.</p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-sm border border-white">
            <Users className="w-8 h-8 text-wm-blue-highlight mx-auto mb-3" />
            <h4 className="font-semibold text-sm mb-2 text-wm-blue">2. Recommend & Edit</h4>
            <p className="text-xs text-wm-gray-dark">Ranked drivers map to save and expansion plays; the CSM edits every line of the action plan.</p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-sm border border-white">
            <FileCheck2 className="w-8 h-8 text-wm-blue-highlight mx-auto mb-3" />
            <h4 className="font-semibold text-sm mb-2 text-wm-blue">3. Approve & Measure</h4>
            <p className="text-xs text-wm-gray-dark">A manager approves any concession or customer note, then the NRR bridge shows the impact.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
