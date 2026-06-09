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
  { id: 'candidate', label: '1. Candidate Dossier' },
  { id: 'analyze', label: '2. Risk Analysis' },
  { id: 'remediate', label: '3. QA Remediation' },
  { id: 'signoff', label: '4. Release Sign-Off' },
  { id: 'impact', label: '5. Release Impact' }
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
          <div className="bg-white border-b border-wm-gray-med sticky top-0 z-20">
            <nav className="flex gap-1 overflow-x-auto no-scrollbar max-w-[1600px] mx-auto px-4 md:px-8 min-w-max">
              {stepsInOrder.map((step, idx) => {
                const isActive = step.id === currentStep;
                const isPast = activeIdx > idx;
                return (
                  <button
                    key={step.id}
                    onClick={() => setCurrentStep(step.id)}
                    className={`relative px-4 py-3.5 text-sm font-semibold whitespace-nowrap transition-colors border-b-2
                      ${isActive ? 'border-wm-blue-highlight text-wm-blue-highlight'
                      : isPast ? 'border-transparent text-wm-blue hover:text-wm-blue-highlight'
                      : 'border-transparent text-wm-gray-dark hover:text-wm-blue'}`}
                  >
                    <span className="text-wm-gray-med mr-1.5">{String(idx + 1).padStart(2, '0')}</span>
                    {stepLabel(step.label)}
                  </button>
                );
              })}
            </nav>
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
