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
  { id: 'cohorts', label: '1. Cohort Dashboard' },
  { id: 'diagnose', label: '2. Diagnose Blocker' },
  { id: 'plays', label: '3. Draft Plays' },
  { id: 'approve', label: '4. Approve Experiment' },
  { id: 'monitor', label: '5. Monitor Lift' }
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
        {isDemo && (
          <div className="px-4 py-5 bg-white border-b border-wm-gray-med sticky top-0 z-20 shadow-sm">
            <div className="max-w-[1180px] mx-auto flex items-center justify-between gap-1 overflow-x-auto no-scrollbar px-2">
              {stepsInOrder.map((step, idx) => {
                const isActive = step.id === currentStep;
                const isPast = activeIdx > idx;
                return (
                  <React.Fragment key={step.id}>
                    <button onClick={() => setCurrentStep(step.id)} className="flex flex-col items-center gap-1.5 group shrink-0">
                      <span className={`flex items-center justify-center w-9 h-9 rounded-full text-sm font-bold border-2 transition-all
                        ${isActive ? 'bg-wm-blue-highlight border-wm-blue-highlight text-white shadow-md'
                        : isPast ? 'bg-wm-blue-highlight/10 border-wm-blue-highlight text-wm-blue-highlight'
                        : 'bg-white border-wm-gray-med text-wm-gray-dark group-hover:border-wm-blue-highlight'}`}>
                        {idx + 1}
                      </span>
                      <span className={`text-[11px] font-semibold whitespace-nowrap ${isActive ? 'text-wm-blue' : 'text-wm-gray-dark'}`}>{stepLabel(step.label)}</span>
                    </button>
                    {idx < stepsInOrder.length - 1 && (
                      <div className={`h-0.5 flex-1 min-w-[14px] mt-[-18px] ${isPast ? 'bg-wm-blue-highlight' : 'bg-wm-gray-med'}`} />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        )}

        <div className="p-4 md:p-8 flex-1 grid grid-cols-1 xl:grid-cols-12 gap-8 max-w-[1600px] mx-auto w-full">
          <div className={isDemo && evidence.title ? "xl:col-span-8 flex flex-col gap-6" : "xl:col-span-12"}>
            <AnimatePresence mode="wait">
              <motion.div key={currentStep} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }} className="w-full">
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
          {isDemo && evidence.title && (
            <div className="xl:col-span-4 block">
              <EvidenceDrawer config={evidence} />
            </div>
          )}
        </div>
      </main>

      <NLQuestionBox />
    </div>
  );
};
