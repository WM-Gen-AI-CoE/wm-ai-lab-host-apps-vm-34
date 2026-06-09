import React from 'react';
import { StepId } from '../types';
import { KPITopBar } from './KPITopBar';
import { NLQuestionBox } from './NLQuestionBox';
import { stepEvidence } from '../data';
import { EvidenceDrawer } from './EvidenceDrawer';
import { motion, AnimatePresence } from 'motion/react';

interface LayoutProps {
  currentStep: StepId;
  setCurrentStep: (s: StepId) => void;
  children: React.ReactNode;
}

const stepsInOrder: { id: StepId, label: string }[] = [
  { id: 'intake', label: '1. Intake' },
  { id: 'review', label: '2. Deal Context' },
  { id: 'leakage', label: '3. Leakage' },
  { id: 'recommend', label: '4. Recommend' },
  { id: 'approval', label: '5. Approval' },
  { id: 'impact', label: '6. Impact' }
];

const stepLabel = (l: string) => l.replace(/^\s*\d+[\.\)]\s*/, '');

export const Layout = ({ currentStep, setCurrentStep, children }: LayoutProps) => {
  const isDemo = currentStep !== 'intro' && currentStep !== 'enhancements';
  const evidence = stepEvidence[currentStep];
  const activeIdx = stepsInOrder.findIndex(s => s.id === currentStep);

  return (
    <div className="min-h-screen bg-wm-gray-light/30 flex flex-col font-sans">
      {isDemo && <KPITopBar />}

      <main className="flex-1 flex flex-col w-full mx-auto pb-24">
        {isDemo ? (
          <div className="flex flex-col lg:flex-row max-w-[1600px] mx-auto w-full">
            <aside className="lg:w-[238px] shrink-0 lg:border-r border-wm-gray-med bg-white lg:sticky lg:top-0 lg:self-start lg:min-h-screen px-4 py-5">
              <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-wm-gray-dark mb-3 px-2">Workflow</div>
              <nav className="flex lg:flex-col gap-1 overflow-x-auto no-scrollbar">
                {stepsInOrder.map((step, idx) => {
                  const isActive = step.id === currentStep;
                  const isPast = activeIdx > idx;
                  return (
                    <button
                      key={step.id}
                      onClick={() => setCurrentStep(step.id)}
                      className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-all whitespace-nowrap
                        ${isActive ? 'bg-wm-blue-highlight text-white shadow-sm'
                        : isPast ? 'text-wm-blue hover:bg-wm-gray-light'
                        : 'text-wm-gray-dark hover:bg-wm-gray-light'}`}
                    >
                      <span className={`flex items-center justify-center w-6 h-6 rounded-full text-[11px] font-bold shrink-0
                        ${isActive ? 'bg-white/20 text-white'
                        : isPast ? 'bg-wm-blue-highlight/10 text-wm-blue-highlight'
                        : 'bg-wm-gray-light text-wm-gray-dark group-hover:bg-white'}`}>
                        {idx + 1}
                      </span>
                      <span className="text-sm font-semibold">{stepLabel(step.label)}</span>
                    </button>
                  );
                })}
              </nav>
            </aside>

            <div className="flex-1 min-w-0 p-4 md:p-8 grid grid-cols-1 xl:grid-cols-12 gap-8">
              <div className={evidence.title ? "xl:col-span-8 flex flex-col gap-6" : "xl:col-span-12"}>
                <AnimatePresence mode="wait">
                  <motion.div key={currentStep} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }} className="w-full">
                    {children}
                  </motion.div>
                </AnimatePresence>
              </div>
              {evidence.title && (
                <div className="xl:col-span-4 block">
                  <EvidenceDrawer config={evidence} />
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="p-4 md:p-8 flex-1 w-full max-w-[1600px] mx-auto">
            <AnimatePresence mode="wait">
              <motion.div key={currentStep} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }} className="w-full">
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </main>

      <NLQuestionBox />
    </div>
  );
};
