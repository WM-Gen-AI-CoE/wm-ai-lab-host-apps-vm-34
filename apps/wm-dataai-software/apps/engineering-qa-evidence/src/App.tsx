import React, { useState } from 'react';
import { StepId } from './types';
import { Layout } from './components/Layout';
import { Intro } from './views/Intro';
import { Candidate } from './views/Candidate';
import { Analyze } from './views/Analyze';
import { Remediate } from './views/Remediate';
import { SignOff } from './views/SignOff';
import { Impact } from './views/Impact';
import { FutureEnhancements } from './views/FutureEnhancements';

export default function App() {
  const [currentStep, setCurrentStep] = useState<StepId>('intro');

  const getNextStep = (current: StepId): StepId => {
    const sequence: StepId[] = ['intro', 'candidate', 'analyze', 'remediate', 'signoff', 'impact', 'enhancements'];
    const idx = sequence.indexOf(current);
    if (idx >= 0 && idx < sequence.length - 1) return sequence[idx + 1];
    return current;
  };

  const handleNext = () => setCurrentStep(getNextStep(currentStep));

  return (
    <Layout currentStep={currentStep} setCurrentStep={setCurrentStep}>
      {currentStep === 'intro' && <Intro onStart={handleNext} />}
      {currentStep === 'candidate' && <Candidate onNext={handleNext} />}
      {currentStep === 'analyze' && <Analyze onNext={handleNext} />}
      {currentStep === 'remediate' && <Remediate onNext={handleNext} />}
      {currentStep === 'signoff' && <SignOff onNext={handleNext} />}
      {currentStep === 'impact' && <Impact onNext={handleNext} />}
      {currentStep === 'enhancements' && <FutureEnhancements onRestart={() => setCurrentStep('intro')} />}
    </Layout>
  );
}
