import React from 'react';
import { Target, LayoutDashboard, Database, ArrowRight, GitBranch, ShieldCheck, FileSearch } from 'lucide-react';
import { Button } from '../components/Shared';
import { kpis } from '../data';

export const Intro = ({ onStart }: { onStart: () => void }) => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-wm-blue-highlight text-sm font-semibold mb-6">
          <GitBranch className="w-4 h-4" /> Product Engineering & QA Demo
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-wm-blue mb-4 tracking-tight">Engineering Delivery & QA Evidence Agent</h1>
        <p className="text-xl text-wm-gray-dark mb-8 max-w-2xl mx-auto">From a release candidate to a signed-off ship decision, with assembled evidence and ranked test gaps, and human engineering judgment on every gate.</p>
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
            Release reviews mean stitching together requirements, code diffs, test runs, open defects, and incident history across a half-dozen tools, usually under deadline pressure. Gaps slip through, defects escape to customers, and the team cannot consistently tell a low-risk release from a high-risk one before it ships.
          </p>
          <div className="mt-4 pt-4 border-t border-wm-gray-light">
            <h4 className="text-xs font-semibold text-wm-blue uppercase tracking-wider mb-2">Target Audience</h4>
            <p className="text-xs text-wm-gray-dark">
              <strong>Users:</strong> Engineering leads, QA, release managers.<br />
              <strong>Sponsors:</strong> CTO, CPO, VP Engineering, Head of Quality.
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-wm-gray-med shadow-sm">
          <h3 className="flex items-center gap-2 font-bold text-wm-blue mb-3 border-b pb-2">
            <Database className="w-5 h-5 text-wm-magenta" /> Data Sources & Foundation
          </h3>
          <p className="text-sm text-wm-gray-dark leading-relaxed mb-4">
            The agent grounds every gap and risk score in delivery evidence. It never asserts a finding it cannot trace to a record:
          </p>
          <ul className="text-sm text-wm-gray-dark space-y-1.5 list-disc pl-5">
            <li>Issue tracker requirements & acceptance criteria</li>
            <li>Source control diffs & pull requests</li>
            <li>CI test results & coverage by requirement</li>
            <li>Defect tracker & incident history</li>
            <li>CRM account-to-feature impact map</li>
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
        Illustrative benchmarks modeled on mid-market B2B SaaS delivery operations. The agent assembles evidence and proposes test gaps. A QA lead approves remediation and a release manager signs off. It does not ship releases on its own.
      </p>

      <div className="bg-wm-gray-light p-8 rounded-xl border border-wm-gray-med">
        <h3 className="font-bold text-wm-blue text-lg mb-6 text-center">Future-State AI Workflow</h3>
        <div className="grid sm:grid-cols-3 gap-6 text-center">
          <div className="bg-white p-5 rounded-lg shadow-sm border border-white">
            <FileSearch className="w-8 h-8 text-wm-blue-highlight mx-auto mb-3" />
            <h4 className="font-semibold text-sm mb-2 text-wm-blue">1. Assemble & Analyze</h4>
            <p className="text-xs text-wm-gray-dark">The agent builds a candidate dossier and a risk summary with ranked test gaps, each tied to evidence.</p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-sm border border-white">
            <LayoutDashboard className="w-8 h-8 text-wm-blue-highlight mx-auto mb-3" />
            <h4 className="font-semibold text-sm mb-2 text-wm-blue">2. QA Remediation</h4>
            <p className="text-xs text-wm-gray-dark">The QA lead approves, returns, or accepts the risk on each gap. Nothing advances on its own.</p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-sm border border-white">
            <ShieldCheck className="w-8 h-8 text-wm-blue-highlight mx-auto mb-3" />
            <h4 className="font-semibold text-sm mb-2 text-wm-blue">3. Release Sign-Off</h4>
            <p className="text-xs text-wm-gray-dark">The release manager signs off with the full evidence pack attached. Human judgment owns the ship decision.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
