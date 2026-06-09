import React, { useState } from 'react';
import { themes } from '../data';
import { GuideCollapsible } from '../components/GuideCollapsible';
import { AITask, HumanTask, Badge, Button } from '../components/Shared';
import { ArrowRight, ChevronDown, ChevronUp, Layers } from 'lucide-react';

const sentimentVariant = (s: string): 'magenta' | 'gray' | 'green' =>
  s === 'Negative' ? 'magenta' : s === 'Positive' ? 'green' : 'gray';

export const Cluster = ({ onNext }: { onNext: () => void }) => {
  const [openId, setOpenId] = useState<string | null>(themes[0].id);

  return (
    <div className="space-y-6">
      <GuideCollapsible
        title="How to use this page"
        talkTrack="The agent turned 17,000 records into four themes and auto-grouped 4,200 duplicates that would otherwise drown the signal. The PM is not a label-reader, they are an editor: drill into the example records, then merge or split a cluster if the grouping is off."
      >
        <p>This page shows the themes clustered from raw feedback, each with example records you can drill into.</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li><strong>Review:</strong> Read each theme, its mention count, and trend.</li>
          <li><strong>Drill in:</strong> Expand a theme to see the real records behind it.</li>
          <li><strong>Decision:</strong> Merge or split a cluster if it looks wrong before themes are linked to revenue.</li>
        </ul>
      </GuideCollapsible>

      <AITask>
        The agent clustered 17,160 staged records into 4 primary themes by semantic similarity and auto-grouped 4,200 low-value or duplicate tickets. Each theme below carries example records you can drill into.
      </AITask>

      <div className="space-y-3">
        {themes.map((t) => {
          const isOpen = openId === t.id;
          return (
            <div key={t.id} className="bg-white rounded-lg border border-wm-gray-med shadow-sm overflow-hidden">
              <button
                onClick={() => setOpenId(isOpen ? null : t.id)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-blue-50/40 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <Layers className="w-5 h-5 text-wm-blue-highlight mt-0.5 shrink-0" />
                  <div>
                    <div className="font-semibold text-wm-blue">{t.name}</div>
                    <div className="text-xs text-wm-gray-dark mt-0.5">{t.summary}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0 pl-3">
                  <div className="text-right">
                    <div className="text-sm font-bold text-wm-blue">{t.mentions.toLocaleString()}</div>
                    <div className="text-[10px] text-wm-gray-dark uppercase tracking-wider">mentions</div>
                  </div>
                  <Badge variant={t.trend.startsWith('+') ? 'magenta' : 'gray'}>{t.trend}</Badge>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-wm-gray-dark" /> : <ChevronDown className="w-4 h-4 text-wm-gray-dark" />}
                </div>
              </button>

              {isOpen && (
                <div className="border-t border-wm-gray-med p-4 bg-wm-gray-light/30">
                  <h4 className="text-xs font-semibold text-wm-gray-dark uppercase tracking-wider mb-3">Example records ({t.records.length})</h4>
                  <div className="space-y-2">
                    {t.records.map((r) => (
                      <div key={r.id} className="bg-white rounded border border-wm-gray-med p-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-semibold text-wm-blue">{r.account}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-wm-gray-dark">{r.source}</span>
                            <Badge variant={sentimentVariant(r.sentiment)}>{r.sentiment}</Badge>
                          </div>
                        </div>
                        <p className="text-sm text-wm-gray-dark italic">"{r.excerpt}"</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button onClick={() => setOpenId(null)} variant="outline" className="text-xs">Keep as one theme</Button>
                    <Button onClick={() => setOpenId(null)} variant="secondary" className="text-xs">Flag to split</Button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <HumanTask>
        Merge or split any cluster that looks off, then continue. You own the theme structure; the agent only proposes it. Nothing is linked to revenue until you are satisfied with the grouping.
      </HumanTask>

      <div className="flex justify-end">
        <Button onClick={onNext} variant="primary" Icon={ArrowRight}>Link themes to ARR-at-risk</Button>
      </div>
    </div>
  );
};
