import React from 'react';
import { dealContext, selectedQuote } from '../data';
import { GuideCollapsible } from '../components/GuideCollapsible';
import { AITask, HumanTask, Button, Badge } from '../components/Shared';
import { ArrowRight, AlertTriangle } from 'lucide-react';

export const Review = ({ onNext }: { onNext: () => void }) => {
  return (
    <div className="space-y-6">
      <GuideCollapsible
        title="How to use this page"
        talkTrack="Everything the deal desk needs is on one screen, pulled from the systems of record. No more chasing usage data in one tool and contract terms in another. The two flagged items are where the human judgment matters most."
      >
        <p>This page is the assembled context for the selected deal.</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li><strong>Review:</strong> Read the account history, usage, discounting, terms, margin, and bundle.</li>
          <li><strong>Watch for:</strong> Amber items are flagged for your attention before any recommendation.</li>
          <li><strong>Decision:</strong> You confirm the context is accurate. The agent assembles; it does not decide the price here.</li>
        </ul>
      </GuideCollapsible>

      <AITask>
        The agent assembled this deal's full context from four systems of record for {selectedQuote.account} ({selectedQuote.id}). Two findings stand out: usage is running at 118% of entitlement, and one nonstandard contract clause was detected. Both are flagged for your review.
      </AITask>

      <div className="grid md:grid-cols-2 gap-4">
        {dealContext.map((c) => (
          <div key={c.id} className={`bg-white rounded-lg border shadow-sm p-4 ${c.flagged ? 'border-amber-200' : 'border-wm-gray-med'}`}>
            <div className="flex items-center justify-between mb-1">
              <h4 className="text-xs font-semibold text-wm-gray-dark uppercase tracking-wider">{c.label}</h4>
              <Badge variant={c.confidence === 'High' ? 'green' : 'amber'}>{c.confidence}</Badge>
            </div>
            <p className="text-sm font-semibold text-wm-blue mb-1">{c.value}</p>
            <p className="text-xs text-wm-gray-dark leading-relaxed">{c.detail}</p>
            {c.flagged && (
              <div className="mt-3 flex items-start gap-2 text-xs text-amber-800 bg-amber-50 border border-amber-100 rounded p-2">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-500" />
                <span>{c.flagged}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <HumanTask>
        Confirm the assembled context is accurate before moving to leakage flags. If usage or terms look wrong, the deal desk corrects the source before any pricing is recommended.
      </HumanTask>

      <div className="flex justify-end">
        <Button onClick={onNext} variant="primary" Icon={ArrowRight}>Review leakage flags</Button>
      </div>
    </div>
  );
};
