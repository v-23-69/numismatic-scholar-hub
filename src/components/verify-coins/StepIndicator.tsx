
import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  onStepClick: (step: number) => void;
  canNavigateToStep: (step: number) => boolean;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ 
  currentStep, 
  onStepClick, 
  canNavigateToStep 
}) => {
  const steps = [
    { number: 1, label: 'Details' },
    { number: 2, label: 'Upload' },
    { number: 3, label: 'Payment' }
  ];

  return (
    <div className="flex justify-between items-center mb-8">
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          <div className={`flex flex-col items-center ${currentStep >= step.number ? 'text-royal' : 'text-gray-400'}`}>
            <button 
              onClick={() => canNavigateToStep(step.number) && onStepClick(step.number)}
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                currentStep >= step.number ? 'bg-royal text-white' : 'bg-gray-200'
              } transition-colors hover:opacity-80 ${
                canNavigateToStep(step.number) ? 'cursor-pointer' : 'cursor-not-allowed'
              }`}
              disabled={!canNavigateToStep(step.number)}
            >
              {step.number}
            </button>
            <span className="mt-2 text-sm font-medium">{step.label}</span>
          </div>
          {index < steps.length - 1 && (
            <div className="flex-1 mx-4">
              <div className={`h-1 ${currentStep > step.number ? 'bg-royal' : 'bg-gray-200'} rounded-full`}></div>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StepIndicator;
