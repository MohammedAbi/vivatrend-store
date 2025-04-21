import React from "react";

// First define the interface
export interface CheckoutStepsProps {
  activeStep: number;
}

// Then the component
const CheckoutSteps: React.FC<CheckoutStepsProps> = ({ activeStep }) => (
  <div className="flex justify-between mb-12 relative">
    {[1, 2, 3].map((step) => (
      <div key={step} className="flex flex-col items-center z-10">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center 
          ${activeStep >= step ? "bg-accent text-white" : "bg-gray-200 text-primary/60"}`}
        >
          {step}
        </div>
        <span
          className={`text-sm mt-2 ${activeStep >= step ? "text-accent font-medium" : "text-primary/60"}`}
        >
          {step === 1 ? "Information" : step === 2 ? "Payment" : "Review"}
        </span>
      </div>
    ))}
    <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 -z-1">
      <div
        className="h-full bg-accent transition-all duration-300"
        style={{
          width: activeStep === 1 ? "0%" : activeStep === 2 ? "50%" : "100%",
        }}
      ></div>
    </div>
  </div>
);

export default CheckoutSteps;
