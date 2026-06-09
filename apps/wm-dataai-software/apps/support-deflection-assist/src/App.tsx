import React, { useState } from 'react';
import { StepId } from './types';
import { Layout } from './components/Layout';
import { Intro } from './views/Intro';
import { Queue } from './views/Queue';
import { Retrieval } from './views/Retrieval';
import { Draft } from './views/Draft';
import { Validate } from './views/Validate';
import { Escalate } from './views/Escalate';
import { Impact } from './views/Impact';
import { FutureEnhancements } from './views/FutureEnhancements';

export default function App() {
  const [currentStep, setCurrentStep] = useState<StepId>('intro');

  const getNextStep = (current: StepId): StepId => {
    const sequence: StepId[] = ['intro', 'queue', 'retrieval', 'draft', 'validate', 'escalate', 'impact', 'enhancements'];
    const idx = sequence.indexOf(current);
    if (idx >= 0 && idx < sequence.length - 1) return sequence[idx + 1];
    return current;
  };

  const handleNext = () => setCurrentStep(getNextStep(currentStep));

  return (
    <Layout currentStep={currentStep} setCurrentStep={setCurrentStep}>
      {currentStep === 'intro' && <Intro onStart={handleNext} />}
      {currentStep === 'queue' && <Queue onNext={handleNext} />}
      {currentStep === 'retrieval' && <Retrieval onNext={handleNext} />}
      {currentStep === 'draft' && <Draft onNext={handleNext} />}
      {currentStep === 'validate' && <Validate onNext={handleNext} />}
      {currentStep === 'escalate' && <Escalate onNext={handleNext} />}
      {currentStep === 'impact' && <Impact onNext={handleNext} />}
      {currentStep === 'enhancements' && <FutureEnhancements onRestart={() => setCurrentStep('intro')} />}
    </Layout>
  );
}
