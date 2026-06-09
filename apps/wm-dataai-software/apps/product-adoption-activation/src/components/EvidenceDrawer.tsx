import React from 'react';
import { Database, ShieldAlert, FileSearch, ShieldCheck, ListChecks, HelpCircle } from 'lucide-react';
import { EvidenceConfig } from '../types';
import { Badge } from './Shared';

export const EvidenceDrawer = ({ config }: { config: EvidenceConfig }) => {
  // If no title, it means we don't have evidence for this step (e.g. intro)
  if (!config.title) return null;

  return (
    <div className="bg-white rounded-lg border border-wm-gray-med shadow-sm overflow-hidden h-fit sticky top-6">
      <div className="bg-wm-gray-light border-b border-wm-gray-med p-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-wm-blue">
          <Database className="w-5 h-5 text-wm-blue-highlight" />
          <h3 className="font-semibold font-sans">Evidence & Rationale</h3>
        </div>
        <Badge variant={config.confidence === 'High' ? 'green' : 'amber'}>
          {config.confidence} Confidence
        </Badge>
      </div>
      
      <div className="p-4 space-y-6">
        <div>
          <h4 className="flex items-center gap-2 text-xs font-semibold text-wm-gray-dark uppercase tracking-wider mb-2">
            <FileSearch className="w-4 h-4" /> AI Rationale
          </h4>
          <p className="text-sm text-wm-blue bg-blue-50/50 p-3 rounded">{config.rationale}</p>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-wm-gray-dark uppercase tracking-wider mb-2">Source Records Used</h4>
          <ul className="text-sm text-wm-gray-dark space-y-1">
            {config.sourceRecords.map((rec, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-wm-blue-highlight mt-1">•</span>
                {rec}
              </li>
            ))}
          </ul>
        </div>

        {config.missingInfo.length > 0 && (
          <div>
            <h4 className="flex items-center gap-2 text-xs font-semibold text-amber-700 uppercase tracking-wider mb-2">
              <HelpCircle className="w-4 h-4" /> Missing Information
            </h4>
            <ul className="text-sm text-amber-800 bg-amber-50 p-3 rounded space-y-1 border border-amber-100">
              {config.missingInfo.map((info, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">•</span>
                  {info}
                </li>
              ))}
            </ul>
          </div>
        )}

        {config.escalationTriggers.length > 0 && (
          <div>
            <h4 className="flex items-center gap-2 text-xs font-semibold text-wm-magenta uppercase tracking-wider mb-2">
              <ShieldAlert className="w-4 h-4" /> Escalation Triggers
            </h4>
            <div className="text-sm text-wm-gray-dark space-y-1">
              {config.escalationTriggers.map((trig, i) => (
                <div key={i} className="px-3 py-1.5 bg-wm-gray-light rounded text-xs">
                  {trig}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-wm-gray-med">
          <h4 className="flex items-center gap-2 text-xs font-semibold text-wm-gray-dark uppercase tracking-wider mb-2">
            <ListChecks className="w-4 h-4" /> Audit Trail Record
          </h4>
          <div className="text-xs font-mono text-wm-gray-dark space-y-1.5">
            {config.auditTrail.map((log, i) => (
              <div key={i}>{log}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
