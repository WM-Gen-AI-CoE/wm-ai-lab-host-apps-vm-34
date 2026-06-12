import React, { useState } from 'react';
import { StepId } from './types';
import { Layout } from './components/Layout';
import { Intro } from './views/Intro';
import { Detect } from './views/Detect';
import { Analyze } from './views/Analyze';
import { Recommend } from './views/Recommend';
import { Approve } from './views/Approve';
import { Impact } from './views/Impact';
import { FutureEnhancements } from './views/FutureEnhancements';

export default function App() {
  const [currentStep, setCurrentStep] = useState<StepId>('intro');
  // Approved recommendation ids, set on Approve and read on Impact so realized
  // savings and the margin bridge reflect what the owner actually approved.
  const [approvedIds, setApprovedIds] = useState<string[]>([]);

  const getNextStep = (current: StepId): StepId => {
    const sequence: StepId[] = ['intro', 'detect', 'analyze', 'recommend', 'approve', 'impact', 'enhancements'];
    const idx = sequence.indexOf(current);
    if (idx >= 0 && idx < sequence.length - 1) return sequence[idx + 1];
    return current;
  };

  const handleNext = () => setCurrentStep(getNextStep(currentStep));

  return (
    <Layout currentStep={currentStep} setCurrentStep={setCurrentStep}>
      {currentStep === 'intro' && <Intro onStart={handleNext} />}
      {currentStep === 'detect' && <Detect onNext={handleNext} />}
      {currentStep === 'analyze' && <Analyze onNext={handleNext} />}
      {currentStep === 'recommend' && <Recommend onNext={handleNext} />}
      {currentStep === 'approve' && <Approve onNext={handleNext} onApproved={setApprovedIds} />}
      {currentStep === 'impact' && <Impact onNext={handleNext} approvedIds={approvedIds} />}
      {currentStep === 'enhancements' && <FutureEnhancements onRestart={() => setCurrentStep('intro')} />}
    </Layout>
  );
}
