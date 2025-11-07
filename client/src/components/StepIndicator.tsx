import { Check } from "lucide-react";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export default function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isCurrent = stepNumber === currentStep;

        return (
          <div key={stepNumber} className="flex items-center">
            <div
              className={`
                w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all
                ${isCompleted ? 'bg-primary text-primary-foreground' : ''}
                ${isCurrent ? 'bg-primary text-primary-foreground ring-4 ring-primary/20' : ''}
                ${!isCompleted && !isCurrent ? 'bg-muted text-muted-foreground' : ''}
              `}
              data-testid={`step-indicator-${stepNumber}`}
            >
              {isCompleted ? <Check className="w-5 h-5" /> : stepNumber}
            </div>
            {stepNumber < totalSteps && (
              <div
                className={`w-12 h-0.5 mx-1 ${
                  isCompleted ? 'bg-primary' : 'bg-muted'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
