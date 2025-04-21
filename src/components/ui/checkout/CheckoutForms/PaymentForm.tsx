import React from "react";
import { FiCreditCard, FiLock } from "react-icons/fi";
import { CheckoutFormData } from "../utils/types";


interface PaymentFormProps {
  formData: CheckoutFormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBack: () => void;
  onContinue: () => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  formData,
  onInputChange,
  onBack,
  onContinue,
}) => (
  <div className="bg-white rounded-lg p-6 mb-6 border">
    <h2 className="text-xl font-bold text-primary mb-6">Payment Details</h2>
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onContinue();
      }}
    >
      <div className="mb-4">
        <label className="block text-sm font-medium text-primary/70 mb-1">
          Card Number
        </label>
        <div className="relative">
          <FiCreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary/40" />
          <input
            type="text"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={onInputChange}
            placeholder="1234 5678 9012 3456"
            className="w-full pl-10 pr-3 py-3 border-b border-accent bg-transparent focus:outline-none focus:ring-0 text-primary"
            required
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-primary/70 mb-1">
          Name on Card
        </label>
        <input
          type="text"
          name="cardName"
          value={formData.cardName}
          onChange={onInputChange}
          className="w-full px-3 py-3 border-b border-accent bg-transparent focus:outline-none focus:ring-0 text-primary"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-primary/70 mb-1">
            Expiry Date
          </label>
          <input
            type="text"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={onInputChange}
            placeholder="MM/YY"
            className="w-full px-3 py-3 border-b border-accent bg-transparent focus:outline-none focus:ring-0 text-primary"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-primary/70 mb-1">
            CVV
          </label>
          <div className="relative">
            <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary/40" />
            <input
              type="text"
              name="cvv"
              value={formData.cvv}
              onChange={onInputChange}
              className="w-full pl-10 pr-3 py-3 border-b border-accent bg-transparent focus:outline-none focus:ring-0 text-primary"
              required
            />
          </div>
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
          type="submit"
          className="btn btn-primary btn-lg bg-accent text-white hover:bg-accent/90"
        >
          Continue
        </button>
      </div>
    </form>
  </div>
);

export default PaymentForm;
