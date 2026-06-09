import React, { useState } from 'react';
import { StepId } from './types';
import { Layout } from './components/Layout';
import { Intro } from './views/Intro';
import { Portfolio } from './views/Portfolio';
import { Signals } from './views/Signals';
import { Drivers } from './views/Drivers';
import { Playbook } from './views/Playbook';
import { Approval } from './views/Approval';
import { Impact } from './views/Impact';
import { FutureEnhancements } from './views/FutureEnhancements';

export default function App() {
  const [currentStep, setCurrentStep] = useState<StepId>('intro');

  const getNextStep = (current: StepId): StepId => {
    const sequence: StepId[] = ['intro', 'portfolio', 'signals', 'drivers', 'playbook', 'approval', 'impact', 'enhancements'];
    const idx = sequence.indexOf(current);
    if (idx >= 0 && idx < sequence.length - 1) return sequence[idx + 1];
    return current;
  };

  const handleNext = () => setCurrentStep(getNextStep(currentStep));

  return (
    <Layout currentStep={currentStep} setCurrentStep={setCurrentStep}>
      {currentStep === 'intro' && <Intro onStart={handleNext} />}
      {currentStep === 'portfolio' && <Portfolio onNext={handleNext} />}
      {currentStep === 'signals' && <Signals onNext={handleNext} />}
      {currentStep === 'drivers' && <Drivers onNext={handleNext} />}
      {currentStep === 'playbook' && <Playbook onNext={handleNext} />}
      {currentStep === 'approval' && <Approval onNext={handleNext} />}
      {currentStep === 'impact' && <Impact onNext={handleNext} />}
      {currentStep === 'enhancements' && <FutureEnhancements onRestart={() => setCurrentStep('intro')} />}
    </Layout>
  );
}
