import StepIndicator from '../StepIndicator';

export default function StepIndicatorExample() {
  return (
    <div className="p-8 bg-background">
      <StepIndicator currentStep={2} totalSteps={4} />
    </div>
  );
}
