import React, { useState } from 'react';
import { Info, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const GuideCollapsible = ({ title, children, talkTrack }: { title: string, children: React.ReactNode, talkTrack: string }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="mb-6 rounded-lg border border-wm-blue/10 bg-gradient-to-r from-blue-50/50 to-wm-gray-light/30 overflow-hidden shadow-sm">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left focus:outline-none hover:bg-wm-gray-light/50 transition-colors"
      >
        <div className="flex items-center gap-2 text-wm-blue">
          <Info className="w-5 h-5 text-wm-blue-highlight" />
          <h3 className="font-semibold text-xs uppercase tracking-wider">{title}</h3>
        </div>
        {isOpen ? <ChevronUp className="w-4 h-4 text-wm-gray-dark" /> : <ChevronDown className="w-4 h-4 text-wm-gray-dark" />}
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-1">
              <div className="text-sm text-wm-gray-dark space-y-2 mb-4 font-medium">
                {children}
              </div>
              <div className="p-3 bg-white/80 rounded border border-white text-xs border-l-2 border-l-wm-magenta shadow-sm">
                <p className="font-bold text-wm-blue mb-1">Talk Track:</p>
                <p className="text-wm-gray-dark italic leading-relaxed">"{talkTrack}"</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
