import React, { useState } from 'react';
import { X, Search, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const NLQuestionBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: React.ReactNode }[]>([
    { role: 'ai', text: 'Ask about this account - why it is at risk, the signals behind the score, the recommended plays, or what needs manager approval.' }
  ]);

  const handleAsk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setMessages(prev => [...prev, { role: 'user', text: query }]);
    const q = query.toLowerCase();
    setQuery('');

    setTimeout(() => {
      let response: React.ReactNode = "I can answer from this account's usage, support, contract, sentiment, and CSM notes. Try asking why Northwind is at risk, what the top driver is, what the expansion plays are worth, or what needs approval.";

      if (q.includes('why') && (q.includes('risk') || q.includes('northwind'))) {
        response = (
          <div className="space-y-2">
            <p><strong>Answer:</strong> Northwind Logistics scores 82/100 risk, the highest at-risk ARR in the book at $840K. The renewal is under 90 days out and the contractual non-renewal notice window opens Jun 2.</p>
            <p className="text-xs text-wm-gray-dark border-t pt-1 mt-1">Top contributors: sponsor change with no rebuilt champion (34%), declining seat adoption (28%), and an unresolved sev-1 support pattern (22%).</p>
          </div>
        );
      } else if (q.includes('driver') || q.includes('top') || q.includes('biggest')) {
        response = "The largest driver is the sponsor change. The original executive sponsor left in February and the new VP of Operations has no relationship history and is actively evaluating alternatives. That alone is 34% of the risk score, which is why the action plan leads with an executive-sponsor pairing before the Jun 2 notice window.";
      } else if (q.includes('expansion') || q.includes('play') || q.includes('worth') || q.includes('arr')) {
        response = "Three plays are matched: Insights seat expansion (+$180K) against the 40-person analytics team already at capacity, a premium support attach (+$95K) that addresses the top complaint, and a multi-year co-term trade (+$140K). The CSM selects which to pursue; estimates use list pricing pending the account discount schedule.";
      } else if (q.includes('approval') || q.includes('concession') || q.includes('discount') || q.includes('escalat')) {
        response = "Two items need manager approval: the save offer (a 6% uplift cap, down from the contractual 14%, traded for a 2-year term) and the executive-sponsor escalation. Any concession beyond the Renewals Manager threshold routes to the CRO. Nothing reaches the customer until a human approves it.";
      } else if (q.includes('note') || q.includes('customer') || q.includes('message')) {
        response = "The customer-facing renewal note is previewed on the Approval page for human approval. It restates the partnership value, the proposed multi-year terms, and the support commitment in plain business language, with no mention of any model, score, or automation.";
      } else if (q.includes('nrr') || q.includes('retention') || q.includes('impact') || q.includes('bridge')) {
        response = "Across the book, the modeled bridge moves net revenue retention from 102% toward 106% and gross renewal rate from 89% toward 94%, while pulling at-risk ARR down from $14.2M to $5.8M. The Renewals Manager owns the committed number; the model only shows the math.";
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
                  placeholder="Ask about this account..."
                  className="flex-1 px-3 py-2 text-sm border border-wm-gray-med rounded-md focus:outline-none focus:border-wm-blue-highlight focus:ring-1 focus:ring-wm-blue-highlight"
                />
                <button type="submit" className="px-3 bg-[#0B1536] text-white hover:bg-[#152354] rounded-md transition-colors flex items-center justify-center">
                  <Search className="w-4 h-4" />
                </button>
              </div>
              <div className="flex gap-2 mt-2 overflow-x-auto no-scrollbar">
                <button type="button" onClick={() => setQuery("Why is Northwind at risk?")} className="text-[10px] bg-wm-gray-light hover:bg-wm-gray-med text-wm-gray-dark px-2 py-1 rounded whitespace-nowrap">Why at risk?</button>
                <button type="button" onClick={() => setQuery("What are the expansion plays worth?")} className="text-[10px] bg-wm-gray-light hover:bg-wm-gray-med text-wm-gray-dark px-2 py-1 rounded whitespace-nowrap">Expansion value?</button>
                <button type="button" onClick={() => setQuery("What needs manager approval?")} className="text-[10px] bg-wm-gray-light hover:bg-wm-gray-med text-wm-gray-dark px-2 py-1 rounded whitespace-nowrap">Needs approval?</button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
