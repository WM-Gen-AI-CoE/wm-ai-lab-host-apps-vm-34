import React, { useState } from 'react';
import { StepId } from './types';
import { Layout } from './components/Layout';
import { Intro } from './views/Intro';
import { Cohorts } from './views/Cohorts';
import { Diagnose } from './views/Diagnose';
import { Plays } from './views/Plays';
import { Approve } from './views/Approve';
import { Monitor } from './views/Monitor';
import { FutureEnhancements } from './views/FutureEnhancements';

export default function App() {
  const [currentStep, setCurrentStep] = useState<StepId>('intro');

  const getNextStep = (current: StepId): StepId => {
    const sequence: StepId[] = ['intro', 'cohorts', 'diagnose', 'plays', 'approve', 'monitor', 'enhancements'];
    const idx = sequence.indexOf(current);
    if (idx >= 0 && idx < sequence.length - 1) return sequence[idx + 1];
    return current;
  };

  const handleNext = () => setCurrentStep(getNextStep(currentStep));

  return (
    <Layout currentStep={currentStep} setCurrentStep={setCurrentStep}>
      {currentStep === 'intro' && <Intro onStart={handleNext} />}
      {currentStep === 'cohorts' && <Cohorts onNext={handleNext} />}
      {currentStep === 'diagnose' && <Diagnose onNext={handleNext} />}
      {currentStep === 'plays' && <Plays onNext={handleNext} />}
      {currentStep === 'approve' && <Approve onNext={handleNext} />}
      {currentStep === 'monitor' && <Monitor onNext={handleNext} />}
      {currentStep === 'enhancements' && <FutureEnhancements onRestart={() => setCurrentStep('intro')} />}
    </Layout>
  );
}
