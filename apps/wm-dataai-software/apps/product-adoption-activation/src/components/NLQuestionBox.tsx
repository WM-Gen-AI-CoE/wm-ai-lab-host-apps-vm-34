import React, { useState } from 'react';
import { X, Search, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const NLQuestionBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: React.ReactNode }[]>([
    { role: 'ai', text: 'Ask about this cohort - the activation funnel, the diagnosed blocker, the drafted plays, or the experiment lift.' }
  ]);

  const handleAsk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setMessages(prev => [...prev, { role: 'user', text: query }]);
    const q = query.toLowerCase();
    setQuery('');

    setTimeout(() => {
      let response: React.ReactNode = "I can answer from this cohort's telemetry, the funnel comparison, the drafted plays, and the live experiment. Try asking what the blocker is, why this cohort was surfaced, or how the experiment is tracking.";

      if (q.includes('blocker') || q.includes('stall') || q.includes('diagnos')) {
        response = (
          <div className="space-y-2">
            <p><strong>Answer:</strong> The Self-serve Growth cohort diverges from the healthy reference cohort at "Connected a data source": 34% versus 89%. Every downstream stage collapses from there, so data-source connection is the primary activation blocker.</p>
            <p className="text-xs text-wm-gray-dark border-t pt-1 mt-1">Confidence: High on the blocker location; whether it is UX friction or a missing integration needs a PM read.</p>
          </div>
        );
      } else if (q.includes('why') || q.includes('surfaced') || q.includes('which cohort')) {
        response = "The Self-serve Growth cohort is surfaced first because activation fell to 41% against a comparable healthy cohort at 73%, and it holds the largest absolute count of stalled accounts (412). The PM still selects which cohort to act on.";
      } else if (q.includes('play') || q.includes('nudge') || q.includes('outreach') || q.includes('enablement')) {
        response = "Three plays are drafted against the blocker: an in-app nudge with a sample-data shortcut, a 3-step guided enablement path, and a targeted CSM outreach for high-ARR stalls. Customer-facing nudge and path copy is written for end users and never references how it was produced. The PM edits before anything launches.";
      } else if (q.includes('approve') || q.includes('experiment') || q.includes('holdout') || q.includes('gate')) {
        response = "Nothing ships until a PM approves. At the gate the PM sets the audience, the holdout group, the primary success metric, and guardrails. The approved scope is logged to the audit trail before launch.";
      } else if (q.includes('lift') || q.includes('monitor') || q.includes('nrr') || q.includes('expansion') || q.includes('result')) {
        response = "The monitor tracks activation, 30-day usage lift, and expansion-qualified accounts versus a holdout. Early reads: activation is recovering toward the 64% target, usage lift is at +8% inside the window, and expansion-qualified accounts are climbing - linking the product fix to finance-owned retention and expansion.";
      } else if (q.includes('source') || q.includes('data') || q.includes('telemetry')) {
        response = "Cohorts are built from product telemetry in the events warehouse, the billing and plan registry, and signup-source attribution from the CRM. The funnel diagnosis adds per-stage event timestamps for the stalled and healthy cohorts.";
      }

      setMessages(prev => [...prev, { role: 'ai', text: response }]);
    }, 600);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-4 bg-[#0B1536] text-white rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.15)] border-4 border-white hover:bg-[#152354] transition-colors z-40 group flex items-center gap-2"
      >
        <Sparkles className="w-5 h-5" />
        <span className="hidden group-hover:inline pr-2 text-sm font-medium whitespace-nowrap">Chat with Data</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] bg-white rounded-xl shadow-2xl border border-wm-gray-med overflow-hidden z-50 flex flex-col h-[500px]"
          >
            <div className="p-4 bg-[#0B1536] text-white flex justify-between items-center shrink-0">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-wm-magenta" />
                <h3 className="font-semibold text-sm">Databricks Genie</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto bg-wm-gray-light/30 space-y-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-lg p-3 text-sm ${msg.role === 'user' ? 'bg-[#0B1536] text-white rounded-br-none' : 'bg-white border border-wm-gray-med text-wm-blue shadow-sm rounded-bl-none'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleAsk} className="p-3 border-t border-wm-gray-med bg-white">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ask about this cohort..."
                  className="flex-1 px-3 py-2 text-sm border border-wm-gray-med rounded-md focus:outline-none focus:border-wm-blue-highlight focus:ring-1 focus:ring-wm-blue-highlight"
                />
                <button type="submit" className="px-3 bg-[#0B1536] text-white hover:bg-[#152354] rounded-md transition-colors flex items-center justify-center">
                  <Search className="w-4 h-4" />
                </button>
              </div>
              <div className="flex gap-2 mt-2 overflow-x-auto no-scrollbar">
                <button type="button" onClick={() => setQuery("What is the blocker?")} className="text-[10px] bg-wm-gray-light hover:bg-wm-gray-med text-wm-gray-dark px-2 py-1 rounded whitespace-nowrap">What is the blocker?</button>
                <button type="button" onClick={() => setQuery("Why this cohort?")} className="text-[10px] bg-wm-gray-light hover:bg-wm-gray-med text-wm-gray-dark px-2 py-1 rounded whitespace-nowrap">Why this cohort?</button>
                <button type="button" onClick={() => setQuery("How is the lift tracking?")} className="text-[10px] bg-wm-gray-light hover:bg-wm-gray-med text-wm-gray-dark px-2 py-1 rounded whitespace-nowrap">Lift?</button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
