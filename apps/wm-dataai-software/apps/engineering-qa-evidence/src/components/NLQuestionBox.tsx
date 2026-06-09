import React, { useState } from 'react';
import { X, Search, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const NLQuestionBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: React.ReactNode }[]>([
    { role: 'ai', text: 'Ask about this release candidate - the risk score, the ranked test gaps, the evidence behind them, or what still blocks sign-off.' }
  ]);

  const handleAsk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setMessages(prev => [...prev, { role: 'user', text: query }]);
    const q = query.toLowerCase();
    setQuery('');

    setTimeout(() => {
      let response: React.ReactNode = "I can answer from this candidate's dossier, risk analysis, and the QA and release decisions. Try asking why the risk score is 72, what the top test gap is, or what blocks sign-off.";

      if (q.includes('risk') || q.includes('score') || q.includes('72')) {
        response = (
          <div className="space-y-2">
            <p><strong>Answer:</strong> billing-service 4.18.0 scores 72 (High). The biggest drivers are PR #4471 refactoring the proration calculator, a requirement (BILL-2291) with an uncovered acceptance criterion, and the prior Sev-1 incident INC-884 in the same code path.</p>
            <p className="text-xs text-wm-gray-dark border-t pt-1 mt-1">Confidence: Medium - customer-impact weighting assumes current ARR tiers; confirm the account list is fresh.</p>
          </div>
        );
      } else if (q.includes('gap') || q.includes('test') || q.includes('coverage')) {
        response = "The top gap is High severity: no automated test covers a mid-cycle plan upgrade with an active coupon - the exact branch behind incident INC-884. The agent recommends adding that integration test before ship. The QA lead decides whether to add tests, block, or accept the risk.";
      } else if (q.includes('incident') || q.includes('inc-884') || q.includes('history')) {
        response = "INC-884 was a Sev-1 double-charge on plan upgrade three months ago, root-caused to an untested mid-cycle upgrade branch. PR #4471 in this candidate modifies that same branch, which is why the proration gap is ranked first.";
      } else if (q.includes('signoff') || q.includes('sign-off') || q.includes('ship') || q.includes('block')) {
        response = "Sign-off is the release manager's explicit decision, not the agent's. It is gated on the QA-approved remediation plan: both High-severity gaps must be closed or have an approved decision, and a tested rollback plan must be attached. The agent assembles the evidence pack but cannot ship.";
      } else if (q.includes('customer') || q.includes('account') || q.includes('impact')) {
        response = "Three strategic accounts (Northwind, Contoso, Vertex Labs, $412K combined ARR) are on mid-cycle upgrade plans and would exercise the changed proration path in the first billing run. That weighting raises the customer-impact component of the risk score.";
      } else if (q.includes('human') || q.includes('autonom') || q.includes('who decides')) {
        response = "Two human gates: the QA lead approves, returns, or accepts the risk on each test gap, and the release manager signs off with the full evidence pack attached. The agent assembles evidence and proposes gaps; it never approves remediation or ships a release on its own.";
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
                  placeholder="Ask about this release candidate..."
                  className="flex-1 px-3 py-2 text-sm border border-wm-gray-med rounded-md focus:outline-none focus:border-wm-blue-highlight focus:ring-1 focus:ring-wm-blue-highlight"
                />
                <button type="submit" className="px-3 bg-[#0B1536] text-white hover:bg-[#152354] rounded-md transition-colors flex items-center justify-center">
                  <Search className="w-4 h-4" />
                </button>
              </div>
              <div className="flex gap-2 mt-2 overflow-x-auto no-scrollbar">
                <button type="button" onClick={() => setQuery("Why is the risk score 72?")} className="text-[10px] bg-wm-gray-light hover:bg-wm-gray-med text-wm-gray-dark px-2 py-1 rounded whitespace-nowrap">Why score 72?</button>
                <button type="button" onClick={() => setQuery("What is the top test gap?")} className="text-[10px] bg-wm-gray-light hover:bg-wm-gray-med text-wm-gray-dark px-2 py-1 rounded whitespace-nowrap">Top test gap?</button>
                <button type="button" onClick={() => setQuery("What blocks sign-off?")} className="text-[10px] bg-wm-gray-light hover:bg-wm-gray-med text-wm-gray-dark px-2 py-1 rounded whitespace-nowrap">Blocks sign-off?</button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
