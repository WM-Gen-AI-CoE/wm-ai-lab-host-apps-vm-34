import React from 'react';
import { signals } from '../data';
import { GuideCollapsible } from '../components/GuideCollapsible';
import { AITask, HumanTask, Badge, Button } from '../components/Shared';
import { ArrowRight, Activity, LifeBuoy, MessageSquare, FileText, Smile, Zap } from 'lucide-react';

const catIcon: Record<string, any> = {
  'Product Usage': Activity,
  'Support History': LifeBuoy,
  'CSM Notes': MessageSquare,
  'Contract Terms': FileText,
  'Sentiment': Smile,
  'Adoption': Zap,
};

const polarityVariant = (p: string): 'magenta' | 'green' | 'gray' =>
  p === 'risk' ? 'magenta' : p === 'positive' ? 'green' : 'gray';

const polarityLabel = (p: string) => (p === 'risk' ? 'Risk' : p === 'positive' ? 'Positive' : 'Context');

export const Signals = ({ onNext }: { onNext: () => void }) => {
  return (
    <div className="space-y-6">
      <GuideCollapsible
        title="How to use this page"
        talkTrack="This is the case file the CSM would normally spend a morning building. Six systems, assembled into one readable story, with every line traceable to its source so the CSM can trust it and act."
      >
        <p>This page is the assembled evidence behind Northwind's risk score.</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li><strong>Review:</strong> Read the signals across usage, support, notes, contract, sentiment, and adoption.</li>
          <li><strong>Validate:</strong> Each card shows its source record. Confirm the picture matches what you know.</li>
          <li><strong>Decision:</strong> The agent assembles; you validate. Note the positive signal too, it is the anchor for the save and expansion.</li>
        </ul>
      </GuideCollapsible>

      <AITask>
        The agent assembled 6 signals for Northwind Logistics from across the customer record. Five point to renewal risk; one identifies a defensible value anchor. Every signal links back to its source for validation.
      </AITask>

      <div className="bg-white rounded-lg border border-wm-gray-med shadow-sm p-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="font-semibold text-wm-blue">Northwind Logistics</div>
          <div className="text-xs text-wm-gray-dark">Enterprise · $840K ARR · Renews Aug 31, 2026 · CSM Priya Raman</div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="magenta">High risk · 82</Badge>
          <Badge variant="amber">NRR 94%</Badge>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {signals.map((s) => {
          const Icon = catIcon[s.category];
          return (
            <div key={s.id} className="bg-white rounded-lg border border-wm-gray-med shadow-sm p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="flex items-center gap-2 text-xs font-semibold text-wm-blue uppercase tracking-wider">
                  <Icon className="w-4 h-4 text-wm-blue-highlight" /> {s.category}
                </span>
                <Badge variant={polarityVariant(s.polarity)}>{polarityLabel(s.polarity)}</Badge>
              </div>
              <p className="text-sm font-semibold text-wm-blue mb-1">{s.headline}</p>
              <p className="text-sm text-wm-gray-dark leading-relaxed mb-2">{s.detail}</p>
              <p className="text-[11px] text-wm-gray-dark border-t border-wm-gray-light pt-2 font-mono">Source: {s.source}</p>
            </div>
          );
        })}
      </div>

      <HumanTask>
        Validate the assembled case against what you know about the relationship. When it holds up, move to the ranked drivers and matched plays.
      </HumanTask>

      <div className="flex justify-end">
        <Button onClick={onNext} variant="primary" Icon={ArrowRight}>Case validated, view drivers</Button>
      </div>
    </div>
  );
};
