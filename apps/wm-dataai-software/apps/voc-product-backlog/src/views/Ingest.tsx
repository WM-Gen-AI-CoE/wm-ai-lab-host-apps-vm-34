import React, { useState } from 'react';
import { vocSources } from '../data';
import { GuideCollapsible } from '../components/GuideCollapsible';
import { AITask, HumanTask, Badge, Button } from '../components/Shared';
import { ArrowRight } from 'lucide-react';

const statusVariant = (s: string): 'green' | 'amber' | 'gray' =>
  s === 'In scope' ? 'green' : s === 'Sampling' ? 'amber' : 'gray';

export const Ingest = ({ onNext }: { onNext: () => void }) => {
  const [scoped, setScoped] = useState<Record<string, boolean>>(
    Object.fromEntries(vocSources.map(s => [s.id, s.status !== 'Excluded']))
  );

  const toggle = (id: string) => setScoped(prev => ({ ...prev, [id]: !prev[id] }));
  const inScopeCount = Object.values(scoped).filter(Boolean).length;

  return (
    <div className="space-y-6">
      <GuideCollapsible
        title="How to use this page"
        talkTrack="This is where a quarter of feedback from a dozen tools becomes one staged dataset. The PM does not read 17,000 records, they confirm which sources are in scope. Note Slack Connect is held out until PII scrubbing is validated, so governance is built in from step one."
      >
        <p>This page is for confirming which VOC sources feed this planning cycle.</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li><strong>Review:</strong> Scan each connected source, its volume, and freshness window.</li>
          <li><strong>Action:</strong> Toggle a source in or out of scope. Excluded sources are held for a reason.</li>
          <li><strong>Decision:</strong> You scope the inputs; the agent ingests and de-duplicates. It never invents a source.</li>
        </ul>
      </GuideCollapsible>

      <AITask>
        The agent connected 6 VOC sources, de-duplicated, and staged 17,160 raw records for clustering. Slack Connect shared channels are held out this cycle because PII scrubbing is not yet validated. Volumes and freshness are reported below.
      </AITask>

      <HumanTask>
        Confirm the source scope for this cycle. Toggle any source in or out. The agent will only cluster what you include.
      </HumanTask>

      <div className="bg-white rounded-lg border border-wm-gray-med shadow-sm overflow-hidden">
        <div className="p-4 border-b border-wm-gray-med bg-wm-gray-light flex justify-between items-center">
          <h3 className="font-semibold font-sans text-wm-blue">VOC Source Inventory</h3>
          <span className="text-xs text-wm-gray-dark font-medium">{inScopeCount} of {vocSources.length} sources in scope</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-wm-gray-dark uppercase bg-white border-b border-wm-gray-med">
              <tr>
                <th className="px-4 py-3">Source</th>
                <th className="px-4 py-3">Channel</th>
                <th className="px-4 py-3">Volume</th>
                <th className="px-4 py-3">Window</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">In scope</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-wm-gray-med">
              {vocSources.map((s) => (
                <tr key={s.id} className="hover:bg-blue-50/50 transition-colors align-top">
                  <td className="px-4 py-4">
                    <div className="font-semibold text-wm-blue">{s.name}</div>
                    <div className="text-xs text-wm-gray-dark mt-0.5">{s.note}</div>
                  </td>
                  <td className="px-4 py-4 text-xs text-wm-gray-dark whitespace-nowrap">{s.channel}</td>
                  <td className="px-4 py-4 text-xs text-wm-gray-dark whitespace-nowrap">{s.volume}</td>
                  <td className="px-4 py-4 text-xs text-wm-gray-dark whitespace-nowrap">{s.window}</td>
                  <td className="px-4 py-4"><Badge variant={statusVariant(s.status)}>{s.status}</Badge></td>
                  <td className="px-4 py-4">
                    <button
                      onClick={() => toggle(s.id)}
                      className={`px-3 py-1 text-xs font-semibold rounded-full transition-colors whitespace-nowrap ${scoped[s.id] ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-wm-gray-light text-wm-gray-dark hover:bg-wm-gray-med'}`}
                    >
                      {scoped[s.id] ? 'Included' : 'Held out'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={onNext} variant="primary" Icon={ArrowRight}>Cluster {inScopeCount} sources into themes</Button>
      </div>
    </div>
  );
};
