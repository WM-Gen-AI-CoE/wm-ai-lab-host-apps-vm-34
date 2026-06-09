import React, { useState } from 'react';
import { X, Search, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const NLQuestionBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: React.ReactNode }[]>([
    { role: 'ai', text: 'Ask about this planning cycle - the VOC sources, a theme, the ARR-at-risk behind it, or what still needs your decision.' }
  ]);

  const handleAsk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setMessages(prev => [...prev, { role: 'user', text: query }]);
    const q = query.toLowerCase();
    setQuery('');

    setTimeout(() => {
      let response: React.ReactNode = "I can answer from this cycle's VOC sources, clustered themes, and the ARR linkage. Try asking which theme carries the most ARR, what supports a theme, or what still needs your decision.";

      if (q.includes('arr') || q.includes('revenue') || q.includes('risk') || q.includes('dollar')) {
        response = (
          <div className="space-y-2">
            <p><strong>Answer:</strong> $6.4M ARR-at-risk is linked across 4 themes this cycle. The largest is SSO / SCIM provisioning gaps at $3.9M across 7 at-risk accounts (incl. Northwind Logistics and Cobalt Health), followed by bulk export/reporting at $1.8M.</p>
            <p className="text-xs text-wm-gray-dark border-t pt-1 mt-1">Confidence: Medium on the SSO figure - 2 accounts are in active renewal, so RevOps validation is requested before it drives ranking.</p>
          </div>
        );
      } else if (q.includes('support') || q.includes('evidence') || q.includes('source') || q.includes('cite')) {
        response = "Every theme cites real VOC records. The SSO theme draws from a Northwind churn-reason code, a Cobalt Health sales call, support ticket #44192, and an NPS verbatim. You can drill into each from the Cluster step.";
      } else if (q.includes('cluster') || q.includes('duplicate') || q.includes('theme')) {
        response = "The agent clustered 17,160 raw records into 4 primary themes by semantic similarity and auto-grouped 4,200 low-value or duplicate tickets. You can merge or split any cluster before it is linked to revenue.";
      } else if (q.includes('decision') || q.includes('approve') || q.includes('prioritize') || q.includes('accept') || q.includes('defer')) {
        response = "The Priority Gate is yours. The agent recommends an order by ARR-at-risk, but each theme needs an explicit accept or defer with a written rationale. Deferring a theme above $2M ARR-at-risk is logged for CPO review.";
      } else if (q.includes('handoff') || q.includes('backlog') || q.includes('engineering') || q.includes('jira') || q.includes('ticket')) {
        response = "Accepted items are formatted as evidence-backed backlog tickets: problem, customer evidence, ARR-at-risk, linked defects (SEC-2204, SEC-2261), and acceptance criteria. Nothing is pushed to JIRA until you confirm.";
      } else if (q.includes('excluded') || q.includes('missing') || q.includes('slack')) {
        response = "Slack Connect shared channels are held out this cycle because PII scrubbing is not yet validated. Win/loss interview notes are also not connected yet. Both are flagged in the source inventory.";
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
                  placeholder="Ask about this cycle..."
                  className="flex-1 px-3 py-2 text-sm border border-wm-gray-med rounded-md focus:outline-none focus:border-wm-blue-highlight focus:ring-1 focus:ring-wm-blue-highlight"
                />
                <button type="submit" className="px-3 bg-[#0B1536] text-white hover:bg-[#152354] rounded-md transition-colors flex items-center justify-center">
                  <Search className="w-4 h-4" />
                </button>
              </div>
              <div className="flex gap-2 mt-2 overflow-x-auto no-scrollbar">
                <button type="button" onClick={() => setQuery("Which theme carries the most ARR?")} className="text-[10px] bg-wm-gray-light hover:bg-wm-gray-med text-wm-gray-dark px-2 py-1 rounded whitespace-nowrap">Most ARR-at-risk?</button>
                <button type="button" onClick={() => setQuery("What supports the SSO theme?")} className="text-[10px] bg-wm-gray-light hover:bg-wm-gray-med text-wm-gray-dark px-2 py-1 rounded whitespace-nowrap">What supports SSO?</button>
                <button type="button" onClick={() => setQuery("What still needs my decision?")} className="text-[10px] bg-wm-gray-light hover:bg-wm-gray-med text-wm-gray-dark px-2 py-1 rounded whitespace-nowrap">Needs my decision?</button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
