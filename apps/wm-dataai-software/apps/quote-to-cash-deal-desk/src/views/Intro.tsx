import React from 'react';
import { Target, LayoutDashboard, Database, ArrowRight, Briefcase, Search, FileCheck2 } from 'lucide-react';
import { Button } from '../components/Shared';
import { kpis } from '../data';

export const Intro = ({ onStart }: { onStart: () => void }) => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-wm-blue-highlight text-sm font-semibold mb-6">
          <Briefcase className="w-4 h-4" /> RevOps & Pricing Demo
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-wm-blue mb-4 tracking-tight">Quote-to-Cash Deal Desk Copilot</h1>
        <p className="text-xl text-wm-gray-dark mb-8 max-w-2xl mx-auto">From a renewal in the queue to an approved, synced quote, with deal desk and finance in control of every concession.</p>
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
            Renewals and quotes pile up in the deal desk, and discounting creeps higher with every cycle. Reps leave uplift on the table, nonstandard terms slip through, and finance struggles to tie any of it back to an approved margin definition. The result is avoidable leakage, slow cycle times, and price realization below target.
          </p>
          <div className="mt-4 pt-4 border-t border-wm-gray-light">
            <h4 className="text-xs font-semibold text-wm-blue uppercase tracking-wider mb-2">Target Audience</h4>
            <p className="text-xs text-wm-gray-dark">
              <strong>Users:</strong> Deal desk, RevOps, pricing analysts.<br />
              <strong>Buyers:</strong> CFO, CRO, VP RevOps, VP Finance.
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-wm-gray-med shadow-sm">
          <h3 className="flex items-center gap-2 font-bold text-wm-blue mb-3 border-b pb-2">
            <Database className="w-5 h-5 text-wm-magenta" /> Data Sources & Foundation
          </h3>
          <p className="text-sm text-wm-gray-dark leading-relaxed mb-4">
            The agent grounds every recommendation in system-of-record data and an approved finance definition. It never invents a number it cannot trace:
          </p>
          <ul className="text-sm text-wm-gray-dark space-y-1.5 list-disc pl-5">
            <li>CPQ quote queue and CRM opportunities</li>
            <li>Contract history and prior discounting</li>
            <li>Usage and entitlement telemetry</li>
            <li>Approved margin model and pricing playbook</li>
            <li>Standard contract clause library and bundle catalog</li>
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
        Benchmarks grounded in a West Monroe lead-to-cash transformation that delivered $200M+ in net-new bookings and $230M+ in renewal ACV, with pricing and packaging governance that reduced discounting and nonstandard contracts. Every recommendation ties back to an approved finance definition.
      </p>

      <div className="bg-wm-gray-light p-8 rounded-xl border border-wm-gray-med">
        <h3 className="font-bold text-wm-blue text-lg mb-6 text-center">Future-State AI Workflow</h3>
        <div className="grid sm:grid-cols-3 gap-6 text-center">
          <div className="bg-white p-5 rounded-lg shadow-sm border border-white">
            <Search className="w-8 h-8 text-wm-blue-highlight mx-auto mb-3" />
            <h4 className="font-semibold text-sm mb-2 text-wm-blue">1. Triage & Assemble</h4>
            <p className="text-xs text-wm-gray-dark">The agent triages the queue and assembles each deal's history, usage, terms, and margin from systems of record.</p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-sm border border-white">
            <LayoutDashboard className="w-8 h-8 text-wm-blue-highlight mx-auto mb-3" />
            <h4 className="font-semibold text-sm mb-2 text-wm-blue">2. Flag & Recommend</h4>
            <p className="text-xs text-wm-gray-dark">It flags leakage and nonstandard terms, then drafts a price, uplift, and approval path against approved definitions.</p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-sm border border-white">
            <FileCheck2 className="w-8 h-8 text-wm-blue-highlight mx-auto mb-3" />
            <h4 className="font-semibold text-sm mb-2 text-wm-blue">3. Approve & Sync</h4>
            <p className="text-xs text-wm-gray-dark">Deal desk and finance approve or return, then the approved quote syncs to CRM and CPQ with a margin bridge.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
