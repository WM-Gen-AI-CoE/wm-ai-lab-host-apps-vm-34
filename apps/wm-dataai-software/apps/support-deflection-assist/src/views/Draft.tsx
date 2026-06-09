import React from 'react';
import { draftReply, troubleshootPath } from '../data';
import { GuideCollapsible } from '../components/GuideCollapsible';
import { AITask, HumanTask, Button } from '../components/Shared';
import { ArrowRight, ShieldCheck, ListOrdered } from 'lucide-react';

export const Draft = ({ onNext }: { onNext: () => void }) => {
  return (
    <div className="space-y-6">
      <GuideCollapsible
        title="How to use this page"
        talkTrack="Here is the drafted customer reply and the internal troubleshooting path. Notice the customer-facing message never mentions AI - it just sounds like a sharp support engineer. The internal path is linked back to the evidence so the engineer can verify each step before anything is sent."
      >
        <p>This page shows the drafted reply and troubleshooting path for TKT-58213.</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li><strong>Customer reply:</strong> Plain-language, ready to edit. It contains no reference to AI or automation.</li>
          <li><strong>Troubleshooting path:</strong> The internal step-by-step the engineer follows or sends.</li>
          <li><strong>Next:</strong> Nothing is sent here. You approve, edit, and send on the Validate step.</li>
        </ul>
      </GuideCollapsible>

      <AITask>
        The agent drafted a customer reply and a 5-step troubleshooting path using only the retrieved evidence. The customer reply is written for the customer in plain language with no mention of AI. The draft is a starting point - the engineer owns the final wording.
      </AITask>

      <div className="bg-white rounded-lg border border-wm-gray-med shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-wm-gray-med bg-wm-gray-light flex items-center justify-between">
          <h3 className="font-semibold text-wm-blue text-sm">Drafted Customer Reply</h3>
          <span className="text-[10px] uppercase tracking-wider text-wm-gray-dark">Preview · not yet sent</span>
        </div>
        <div className="p-4">
          <pre className="whitespace-pre-wrap text-sm text-wm-blue leading-relaxed font-sans">{draftReply}</pre>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-wm-gray-med shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-wm-gray-med bg-wm-gray-light flex items-center gap-2">
          <ListOrdered className="w-4 h-4 text-wm-blue-highlight" />
          <h3 className="font-semibold text-wm-blue text-sm">Internal Troubleshooting Path</h3>
        </div>
        <div className="p-4 space-y-2">
          {troubleshootPath.map((s) => (
            <div key={s.step} className="flex items-start gap-3">
              <span className="shrink-0 w-6 h-6 rounded-full bg-blue-50 text-wm-blue-highlight text-xs font-bold flex items-center justify-center">{s.step}</span>
              <p className="text-sm text-wm-gray-dark leading-relaxed pt-0.5">{s.text}</p>
            </div>
          ))}
          <div className="flex items-start gap-2 text-xs text-wm-blue bg-blue-50/50 rounded p-3 mt-2">
            <ShieldCheck className="w-4 h-4 mt-0.5 shrink-0 text-wm-blue-highlight" />
            <span>These steps are non-destructive and reversible. A destructive action would be flagged for engineer review before it could be sent.</span>
          </div>
        </div>
      </div>

      <HumanTask>
        Read the draft and the troubleshooting path. You will edit and approve before anything reaches the customer - continue to the Validate step.
      </HumanTask>

      <div className="flex justify-end">
        <Button onClick={onNext} variant="primary" Icon={ArrowRight}>Validate &amp; send</Button>
      </div>
    </div>
  );
};
