import React, { useState } from 'react';
import { StepId } from './types';
import { Layout } from './components/Layout';
import { Intro } from './views/Intro';
import { Intake } from './views/Intake';
import { Review } from './views/Review';
import { Leakage } from './views/Leakage';
import { Recommend } from './views/Recommend';
import { Approval } from './views/Approval';
import { Impact } from './views/Impact';
import { FutureEnhancements } from './views/FutureEnhancements';

export default function App() {
  const [currentStep, setCurrentStep] = useState<StepId>('intro');

  const getNextStep = (current: StepId): StepId => {
    const sequence: StepId[] = ['intro', 'intake', 'review', 'leakage', 'recommend', 'approval', 'impact', 'enhancements'];
    const idx = sequence.indexOf(current);
    if (idx >= 0 && idx < sequence.length - 1) return sequence[idx + 1];
    return current;
  };

  const handleNext = () => setCurrentStep(getNextStep(currentStep));

  return (
    <Layout currentStep={currentStep} setCurrentStep={setCurrentStep}>
      {currentStep === 'intro' && <Intro onStart={handleNext} />}
      {currentStep === 'intake' && <Intake onNext={handleNext} />}
      {currentStep === 'review' && <Review onNext={handleNext} />}
      {currentStep === 'leakage' && <Leakage onNext={handleNext} />}
      {currentStep === 'recommend' && <Recommend onNext={handleNext} />}
      {currentStep === 'approval' && <Approval onNext={handleNext} />}
      {currentStep === 'impact' && <Impact onNext={handleNext} />}
      {currentStep === 'enhancements' && <FutureEnhancements onRestart={() => setCurrentStep('intro')} />}
    </Layout>
  );
}
