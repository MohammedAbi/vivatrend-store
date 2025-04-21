import React from "react";
import { CheckoutFormData } from "./types";

interface ReviewFormProps {
  formData: CheckoutFormData;
  onBack: () => void;
  onSubmitOrder: () => void;
  isProcessing: boolean;
}

const ReviewForm: React.FC<ReviewFormProps> = ({
  formData,
  onBack,
  onSubmitOrder,
}) => (
  <div className="bg-white rounded-lg p-6 mb-6 border">
    <h2 className="text-xl font-bold text-primary mb-6">Review Your Order</h2>
    <div className="space-y-4">
      <div>
        <h3 className="font-medium text-primary/70 mb-2">
          Contact Information
        </h3>
        <p className="text-primary">
          {formData.firstName} {formData.lastName}
        </p>
        <p className="text-primary">{formData.email}</p>
      </div>
      <div>
        <h3 className="font-medium text-primary/70 mb-2">Shipping Address</h3>
        <p className="text-primary">{formData.address}</p>
        <p className="text-primary">
          {formData.city}, {formData.zipCode}
        </p>
      </div>
      <div>
        <h3 className="font-medium text-primary/70 mb-2">Payment Method</h3>
        <p className="text-primary">
          •••• •••• •••• {formData.cardNumber.slice(-4)}
        </p>
      </div>
    </div>
    <div className="mt-6 flex justify-between">
      <button
        type="button"
        onClick={onBack}
        className="btn btn-white btn-lg border border-accent text-accent hover:bg-accent/10"
      >
        Back
      </button>
      <button
        type="button"
        onClick={onSubmitOrder}
        className="btn btn-primary btn-lg bg-accent text-white hover:bg-accent/90"
      >
        Place Order
      </button>
    </div>
  </div>
);

export default ReviewForm;
