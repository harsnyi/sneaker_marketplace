import {useState} from 'react';

export const useMultiStepForm = (steps) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const next = (e) => {
    e.preventDefault();

    const isValid = steps[currentStepIndex].component.ref.current.isValid();
    if (isValid) {
      setCurrentStepIndex((i) => {
        if (i >= steps.length - 1) return i;
        return i + 1;
      });
    }
  };

  const prev = () => {
    setCurrentStepIndex((i) => {
      if (i <= 0) return i;
      return i - 1;
    });
  };

  const goTo = (stepIndex) => {
    setCurrentStepIndex(stepIndex);
  };

  return {
    currentStepIndex,
    step: steps[currentStepIndex],
    steps,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
    next,
    prev,
    goTo,
  };
};
