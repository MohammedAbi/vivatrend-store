import React from "react";
import { CouponInputProps } from "./types";

const CouponInput: React.FC<CouponInputProps> = ({
  couponCode,
  discountApplied,
  invalidCoupon,
  onApply,
  onRemove,
  onCodeChange,
}) => (
  <div className="mb-4">
    <div className="flex items-center mb-2">
      <input
        type="text"
        placeholder="Enter coupon code"
        value={couponCode}
        onChange={(e) => onCodeChange(e.target.value)}
        className="flex-1 border p-3 rounded-l focus:outline-none"
        disabled={discountApplied}
      />
      {discountApplied ? (
        <button
          onClick={onRemove}
          className="btn btn-secondary btn-sm rounded-l-none rounded-r"
        >
          Remove
        </button>
      ) : (
        <button
          onClick={onApply}
          className="btn btn-primary btn-sm rounded-l-none rounded-r"
        >
          Apply
        </button>
      )}
    </div>
    {invalidCoupon && (
      <p className="text-red-500 text-sm">
        Invalid coupon code. Try "DISCOUNT10" for 10% off.
      </p>
    )}
    {discountApplied && (
      <p className="text-green-600 text-sm">10% discount applied!</p>
    )}
  </div>
);

export default CouponInput;
