import React, { useState } from 'react';
import { X, Search, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const NLQuestionBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: React.ReactNode }[]>([
    { role: 'ai', text: 'Ask about this deal - the assembled context, the leakage flags, the recommended price, or what still needs approval.' }
  ]);

  const handleAsk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setMessages(prev => [...prev, { role: 'user', text: query }]);
    const q = query.toLowerCase();
    setQuery('');

    setTimeout(() => {
      let response: React.ReactNode = "I can answer from this deal's context, leakage flags, and margin model. Try asking why the discount is flagged, how much leakage was found, or what the margin bridge shows.";

      if (q.includes('leak') || q.includes('discount') || q.includes('flag')) {
        response = (
          <div className="space-y-2">
            <p><strong>Answer:</strong> Four flags were raised totaling about $50,400 in recoverable ARR. The largest is the requested 22% discount, which is 7 points above the 15% segment floor and worth $29,400 on $420K.</p>
            <p className="text-xs text-wm-gray-dark border-t pt-1 mt-1">Each flag ties to an approved finance definition in the pricing playbook. The deal desk judges every flag before a recommendation is drafted.</p>
          </div>
        );
      } else if (q.includes('uplift') || q.includes('usage') || q.includes('entitlement')) {
        response = "Northwind is at 118% of its 800-seat entitlement with no uplift requested. A standard 3% renewal uplift plus a seat true-up is supported, worth roughly $30,600 combined. Genie sourced the usage from entitlement telemetry; the deal desk owns whether to apply it.";
      } else if (q.includes('margin') || q.includes('bridge') || q.includes('realization')) {
        response = "At the requested 22% discount and a 0% uplift cap, modeled gross margin falls below the 78% segment target. The recommended terms close discount to 15% and clear an 81% margin floor, lifting ARR from $420K to $471.6K. The bridge attributes each component to an approved definition.";
      } else if (q.includes('term') || q.includes('clause') || q.includes('nonstandard') || q.includes('legal')) {
        response = "Two nonstandard terms were detected: a most-favored-pricing clause and a hard 0% uplift cap. Both sit outside the standard playbook. The recommendation declines the most-favored-pricing clause and substitutes a CPI-linked uplift with a 7% ceiling, pending finance and legal sign-off.";
      } else if (q.includes('approv') || q.includes('finance') || q.includes('route') || q.includes('cfo')) {
        response = "The recommended renewal clears the segment margin floor, so it routes to deal desk and finance for parallel approval. Both approvals are required before the quote can sync to CRM and CPQ. If the floor check failed, it would escalate to the CFO as an exception.";
      } else if (q.includes('cover') || q.includes('note') || q.includes('customer') || q.includes('email')) {
        response = "The renewal cover note is written for the customer in plain business language and contains no reference to AI or automation. It restates adoption (944 active users), the partner discount, and the multi-year option, and invites a call before signature. The deal desk edits and owns the final wording.";
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
                  placeholder="Ask about this deal..."
                  className="flex-1 px-3 py-2 text-sm border border-wm-gray-med rounded-md focus:outline-none focus:border-wm-blue-highlight focus:ring-1 focus:ring-wm-blue-highlight"
                />
                <button type="submit" className="px-3 bg-[#0B1536] text-white hover:bg-[#152354] rounded-md transition-colors flex items-center justify-center">
                  <Search className="w-4 h-4" />
                </button>
              </div>
              <div className="flex gap-2 mt-2 overflow-x-auto no-scrollbar">
                <button type="button" onClick={() => setQuery("Why is the discount flagged?")} className="text-[10px] bg-wm-gray-light hover:bg-wm-gray-med text-wm-gray-dark px-2 py-1 rounded whitespace-nowrap">Why flagged?</button>
                <button type="button" onClick={() => setQuery("How much leakage was found?")} className="text-[10px] bg-wm-gray-light hover:bg-wm-gray-med text-wm-gray-dark px-2 py-1 rounded whitespace-nowrap">How much leakage?</button>
                <button type="button" onClick={() => setQuery("What does the margin bridge show?")} className="text-[10px] bg-wm-gray-light hover:bg-wm-gray-med text-wm-gray-dark px-2 py-1 rounded whitespace-nowrap">Margin bridge?</button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
