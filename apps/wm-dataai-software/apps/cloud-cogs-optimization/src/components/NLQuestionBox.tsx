import React, { useState } from 'react';
import { X, Search, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const NLQuestionBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: React.ReactNode }[]>([
    { role: 'ai', text: 'Ask about this workload - why it was flagged, the cost breakdown, the recommended actions, or the margin impact.' }
  ]);

  const handleAsk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setMessages(prev => [...prev, { role: 'user', text: query }]);
    const q = query.toLowerCase();
    setQuery('');

    setTimeout(() => {
      let response: React.ReactNode = "I can answer from this workload's billing exports, utilization logs, and SKU economics. Try asking why analytics-elt-nightly was flagged, where the waste is, what the top recommendation is, or the margin impact.";

      if (q.includes('flag') || q.includes('anomaly') || q.includes('why') || q.includes('detect')) {
        response = (
          <div className="space-y-2">
            <p><strong>Answer:</strong> analytics-elt-nightly was flagged because spend rose 41% month over month while customer traffic stayed flat, and run telemetry shows clusters held warm at 28% average CPU. Estimated waste is $26.5K/mo, the largest on the feed.</p>
            <p className="text-xs text-wm-gray-dark border-t pt-1 mt-1">Confidence: High - spend, utilization, and traffic all corroborate the anomaly.</p>
          </div>
        );
      } else if (q.includes('waste') || q.includes('breakdown') || q.includes('root') || q.includes('cost')) {
        response = "Compute is 74% of the workload cost at only 28% utilization - the dominant waste driver. On top of that, a nightly cross-region replica copy adds $12.4K/mo of egress that downstream reporting no longer reads. Root cause: all-purpose clusters left warm plus an orphaned replica job.";
      } else if (q.includes('recommend') || q.includes('action') || q.includes('save') || q.includes('rightsize') || q.includes('top')) {
        response = "The top action is rightsizing from two all-purpose clusters to a single job cluster sized to the observed workload - about $14.9K/mo at low risk, completing by 04:40 against a 06:00 SLA. Across all four actions, projected savings total roughly $32K/mo, each with an SLA note and a rollback path.";
      } else if (q.includes('sla') || q.includes('rollback') || q.includes('risk') || q.includes('approve')) {
        response = "Every recommended change carries an SLA guardrail and a rollback note, and nothing applies until the workload owner approves it. The query-tuning action is held for a validation run before it can be approved for production. Returned items are logged with a reason and excluded from the change set.";
      } else if (q.includes('margin') || q.includes('impact') || q.includes('customer') || q.includes('realized')) {
        response = "Approved changes are tracked against realized billing, not projections. On this workload compute cost fell 19%, addressable waste moves from 12% toward 4%, and gross margin improves from 74% to 78%. Cost per active customer drops from $3.10 to $2.45 by removing waste, not by adding customers.";
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
                  placeholder="Ask about this workload..."
                  className="flex-1 px-3 py-2 text-sm border border-wm-gray-med rounded-md focus:outline-none focus:border-wm-blue-highlight focus:ring-1 focus:ring-wm-blue-highlight"
                />
                <button type="submit" className="px-3 bg-[#0B1536] text-white hover:bg-[#152354] rounded-md transition-colors flex items-center justify-center">
                  <Search className="w-4 h-4" />
                </button>
              </div>
              <div className="flex gap-2 mt-2 overflow-x-auto no-scrollbar">
                <button type="button" onClick={() => setQuery("Why was this flagged?")} className="text-[10px] bg-wm-gray-light hover:bg-wm-gray-med text-wm-gray-dark px-2 py-1 rounded whitespace-nowrap">Why flagged?</button>
                <button type="button" onClick={() => setQuery("Where is the waste?")} className="text-[10px] bg-wm-gray-light hover:bg-wm-gray-med text-wm-gray-dark px-2 py-1 rounded whitespace-nowrap">Where is the waste?</button>
                <button type="button" onClick={() => setQuery("What is the top recommendation?")} className="text-[10px] bg-wm-gray-light hover:bg-wm-gray-med text-wm-gray-dark px-2 py-1 rounded whitespace-nowrap">Top recommendation?</button>
                <button type="button" onClick={() => setQuery("What is the margin impact?")} className="text-[10px] bg-wm-gray-light hover:bg-wm-gray-med text-wm-gray-dark px-2 py-1 rounded whitespace-nowrap">Margin impact?</button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
