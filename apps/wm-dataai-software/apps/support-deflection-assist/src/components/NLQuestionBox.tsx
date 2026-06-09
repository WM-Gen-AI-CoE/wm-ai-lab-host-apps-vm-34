import React, { useState } from 'react';
import { X, Search, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const NLQuestionBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: React.ReactNode }[]>([
    { role: 'ai', text: 'Ask about this ticket - the classification, the evidence behind the draft, what still needs review, or when to escalate.' }
  ]);

  const handleAsk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setMessages(prev => [...prev, { role: 'user', text: query }]);
    const q = query.toLowerCase();
    setQuery('');

    setTimeout(() => {
      let response: React.ReactNode = "I can answer from this ticket's classification, retrieved evidence, and draft reply. Try asking why it was classified S2, what evidence supports the fix, what still needs review, or when this should escalate.";

      if (q.includes('classif') || q.includes('severity') || q.includes('s2') || q.includes('tier')) {
        response = (
          <div className="space-y-2">
            <p><strong>Answer:</strong> TKT-58213 was classified Integrations / Webhooks, severity S2, Enterprise tier. The body explicitly mentions webhook deliveries failing right after an SSO config change, which maps cleanly to a known integration pattern; the S2 reflects broken production traffic on an Enterprise account.</p>
            <p className="text-xs text-wm-gray-dark border-t pt-1 mt-1">Confidence: High. Classification is reviewable - the engineer can override severity or issue type.</p>
          </div>
        );
      } else if (q.includes('evidence') || q.includes('support') || q.includes('source') || q.includes('retriev')) {
        response = "The draft rests on three retrieved sources: a near-identical resolved case (CASE-44190, 94% relevance) where SSO rotated the webhook signing secret, a confirmed defect (DEF-2207) describing exactly this interaction, and the 4.16 release note that introduced secret rotation. KB-1180 supplies the customer-safe remediation steps.";
      } else if (q.includes('missing') || q.includes('review') || q.includes('confirm') || q.includes('version')) {
        response = "One item is open: the ticket does not state the tenant platform version. DEF-2207 only applies to 4.15 - 4.17, so the engineer should confirm the version before attaching the defect or escalating against it.";
      } else if (q.includes('escalat') || q.includes('engineering') || q.includes('route')) {
        response = "Escalate when the fix does not resolve it, when severity is S1 with an active outage, or when a defect has no owning team. For this ticket, if the customer reports the secret regeneration did not restore deliveries, the agent packages the thread, DEF-2207, tenant context, and customer impact and routes it to the Integrations Platform team after the engineer confirms.";
      } else if (q.includes('customer') || q.includes('reply') || q.includes('send') || q.includes('ai')) {
        response = "The customer reply is plain-language and contains no reference to AI or automation - it explains that the SSO change rotated the signing secret and walks the customer through regenerating it. Nothing reaches the customer until the support engineer approves or edits and clicks send.";
      } else if (q.includes('deflect') || q.includes('cost') || q.includes('handle') || q.includes('fcr') || q.includes('csat')) {
        response = "This ticket resolved at first contact in about 7 minutes against an 18-minute baseline, with a self-applied fix. Aggregated, this pattern lifts self-service deflection from 24% to 41% and lowers cost per ticket from $14.20 to $9.10 in the program targets.";
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
                  placeholder="Ask about this ticket..."
                  className="flex-1 px-3 py-2 text-sm border border-wm-gray-med rounded-md focus:outline-none focus:border-wm-blue-highlight focus:ring-1 focus:ring-wm-blue-highlight"
                />
                <button type="submit" className="px-3 bg-[#0B1536] text-white hover:bg-[#152354] rounded-md transition-colors flex items-center justify-center">
                  <Search className="w-4 h-4" />
                </button>
              </div>
              <div className="flex gap-2 mt-2 overflow-x-auto no-scrollbar">
                <button type="button" onClick={() => setQuery("Why was this classified S2?")} className="text-[10px] bg-wm-gray-light hover:bg-wm-gray-med text-wm-gray-dark px-2 py-1 rounded whitespace-nowrap">Why S2?</button>
                <button type="button" onClick={() => setQuery("What evidence supports the fix?")} className="text-[10px] bg-wm-gray-light hover:bg-wm-gray-med text-wm-gray-dark px-2 py-1 rounded whitespace-nowrap">Evidence?</button>
                <button type="button" onClick={() => setQuery("When should this escalate?")} className="text-[10px] bg-wm-gray-light hover:bg-wm-gray-med text-wm-gray-dark px-2 py-1 rounded whitespace-nowrap">When escalate?</button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
