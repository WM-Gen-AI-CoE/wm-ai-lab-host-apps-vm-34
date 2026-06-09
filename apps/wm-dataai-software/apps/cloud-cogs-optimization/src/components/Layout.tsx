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
  { id: 'detect', label: '1. Detect' },
  { id: 'analyze', label: '2. Analyze' },
  { id: 'recommend', label: '3. Recommend' },
  { id: 'approve', label: '4. Approve' },
  { id: 'impact', label: '5. Impact' }
];

export const Layout = ({ currentStep, setCurrentStep, children }: LayoutProps) => {
  const isDemo = currentStep !== 'intro' && currentStep !== 'enhancements';
  const evidence = stepEvidence[currentStep];

  return (
    <div className="min-h-screen bg-wm-gray-light/30 flex flex-col font-sans">
      {isDemo && <KPITopBar />}

      <main className="flex-1 flex flex-col w-full mx-auto pb-24">
        {isDemo && (
          <div className="px-4 py-4 bg-white border-b border-wm-gray-med sticky top-0 z-20 flex overflow-x-auto no-scrollbar shadow-sm">
            <nav className="flex space-x-1 w-full justify-between lg:justify-center lg:gap-4 max-w-[1600px] mx-auto min-w-max px-2">
              {stepsInOrder.map((step, idx) => {
                const isActive = step.id === currentStep;
                const isPast = stepsInOrder.findIndex(s => s.id === currentStep) > idx;
                return (
                  <button
                    key={step.id}
                    onClick={() => setCurrentStep(step.id)}
                    className={`px-4 py-2 text-sm font-semibold rounded-full transition-all whitespace-nowrap
                      ${isActive ? 'bg-wm-blue-highlight text-white shadow-md'
                      : isPast ? 'text-wm-blue hover:bg-blue-50'
                      : 'text-wm-gray-dark hover:bg-wm-gray-light'}`}
                  >
                    {step.label}
                  </button>
                );
              })}
            </nav>
          </div>
        )}

        <div className="p-4 md:p-8 flex-1 grid grid-cols-1 xl:grid-cols-12 gap-8 max-w-[1600px] mx-auto w-full">
          <div className={isDemo && evidence.title ? "xl:col-span-8 flex flex-col gap-6" : "xl:col-span-12"}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="w-full"
              >
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
