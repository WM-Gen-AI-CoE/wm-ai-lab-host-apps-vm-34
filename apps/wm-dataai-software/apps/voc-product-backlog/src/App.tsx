import React, { useState } from 'react';
import { StepId } from './types';
import { Layout } from './components/Layout';
import { Intro } from './views/Intro';
import { Ingest } from './views/Ingest';
import { Cluster } from './views/Cluster';
import { Link } from './views/Link';
import { Brief } from './views/Brief';
import { Prioritize } from './views/Prioritize';
import { Handoff } from './views/Handoff';
import { FutureEnhancements } from './views/FutureEnhancements';

export default function App() {
  const [currentStep, setCurrentStep] = useState<StepId>('intro');

  const getNextStep = (current: StepId): StepId => {
    const sequence: StepId[] = ['intro', 'ingest', 'cluster', 'link', 'brief', 'prioritize', 'handoff', 'enhancements'];
    const idx = sequence.indexOf(current);
    if (idx >= 0 && idx < sequence.length - 1) return sequence[idx + 1];
    return current;
  };

  const handleNext = () => setCurrentStep(getNextStep(currentStep));

  return (
    <Layout currentStep={currentStep} setCurrentStep={setCurrentStep}>
      {currentStep === 'intro' && <Intro onStart={handleNext} />}
      {currentStep === 'ingest' && <Ingest onNext={handleNext} />}
      {currentStep === 'cluster' && <Cluster onNext={handleNext} />}
      {currentStep === 'link' && <Link onNext={handleNext} />}
      {currentStep === 'brief' && <Brief onNext={handleNext} />}
      {currentStep === 'prioritize' && <Prioritize onNext={handleNext} />}
      {currentStep === 'handoff' && <Handoff onNext={handleNext} />}
      {currentStep === 'enhancements' && <FutureEnhancements onRestart={() => setCurrentStep('intro')} />}
    </Layout>
  );
}
