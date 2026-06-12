import React, { useState } from 'react';
import { signals } from '../data';
import { GuideCollapsible } from '../components/GuideCollapsible';
import { AITask, HumanTask, Badge, Button, RiskGauge } from '../components/Shared';
import { ArrowRight, Activity, LifeBuoy, MessageSquare, FileText, Smile, Zap, Clock, Check, Flag } from 'lucide-react';

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
  const [reviewed, setReviewed] = useState<Record<string, 'confirm' | 'flag'>>({});
  const setStatus = (id: string, status: 'confirm' | 'flag') =>
    setReviewed(prev => ({ ...prev, [id]: prev[id] === status ? undefined as any : status }));
  const confirmedCount = signals.filter(s => reviewed[s.id] === 'confirm').length;
  const flaggedCount = signals.filter(s => reviewed[s.id] === 'flag').length;
  const allReviewed = confirmedCount + flaggedCount === signals.length;

  return (
    <div className="space-y-6">
      {/* Notice-window urgency ribbon: the time pressure that justifies the whole workflow */}
      <div className="flex items-center gap-2 px-4 py-2 rounded-md bg-pink-100 border border-pink-200 text-wm-magenta text-xs font-semibold">
        <Clock className="w-4 h-4 shrink-0" />
        <span>Non-renewal notice window opens Jun 2, 2026, 23 days out. Act before the customer can give notice.</span>
      </div>
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

      <div className="bg-white rounded-lg border border-wm-gray-med shadow-sm p-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="font-semibold text-wm-blue">Northwind Logistics</div>
          <div className="text-xs text-wm-gray-dark">Enterprise · $840K ARR · Renews Aug 31, 2026 · CSM Priya Raman</div>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="magenta">High risk</Badge>
            <Badge variant="amber">NRR 94%</Badge>
          </div>
        </div>
        <RiskGauge score={82} label="Renewal risk" />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {signals.map((s) => {
          const Icon = catIcon[s.category];
          const status = reviewed[s.id];
          return (
            <div key={s.id} className={`bg-white rounded-lg border shadow-sm p-4 transition-colors ${status === 'confirm' ? 'border-green-300' : status === 'flag' ? 'border-wm-magenta' : 'border-wm-gray-med'}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="flex items-center gap-2 text-xs font-semibold text-wm-blue uppercase tracking-wider">
                  <Icon className="w-4 h-4 text-wm-blue-highlight" /> {s.category}
                </span>
                <Badge variant={polarityVariant(s.polarity)}>{polarityLabel(s.polarity)}</Badge>
              </div>
              <p className="text-sm font-semibold text-wm-blue mb-1">{s.headline}</p>
              <p className="text-sm text-wm-gray-dark leading-relaxed mb-2">{s.detail}</p>
              <p className="text-[11px] text-wm-gray-dark border-t border-wm-gray-light pt-2 font-mono mb-3">Source: {s.source}</p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setStatus(s.id, 'confirm')}
                  className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-md border transition-colors ${status === 'confirm' ? 'bg-green-600 border-green-600 text-white' : 'border-wm-gray-med text-wm-gray-dark hover:bg-green-50'}`}>
                  <Check className="w-3.5 h-3.5" /> Confirm
                </button>
                <button
                  onClick={() => setStatus(s.id, 'flag')}
                  className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-md border transition-colors ${status === 'flag' ? 'bg-wm-magenta border-wm-magenta text-white' : 'border-wm-gray-med text-wm-gray-dark hover:bg-pink-50'}`}>
                  <Flag className="w-3.5 h-3.5" /> Flag
                </button>
                {status && (
                  <span className="text-[11px] font-mono text-wm-gray-dark ml-auto">
                    {status === 'confirm' ? 'Confirmed' : 'Flagged for follow-up'}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <HumanTask done={allReviewed}>
        {allReviewed
          ? `All ${signals.length} signals reviewed: ${confirmedCount} confirmed${flaggedCount > 0 ? `, ${flaggedCount} flagged for follow-up` : ''}. The case holds up, move to the ranked drivers and matched plays.`
          : `Confirm or flag each signal against what you know about the relationship. ${confirmedCount + flaggedCount} of ${signals.length} reviewed.`}
      </HumanTask>

      <div className="flex justify-end">
        <Button onClick={onNext} variant="primary" Icon={ArrowRight}>
          {allReviewed ? `Case validated (${confirmedCount} of ${signals.length} confirmed), view drivers` : 'Case validated, view drivers'}
        </Button>
      </div>
    </div>
  );
};
