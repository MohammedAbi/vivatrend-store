import React from "react";
import { CartSummaryProps } from "./types";

const CartSummary: React.FC<CartSummaryProps> = ({
  subtotal,
  discountAmount,
  discountApplied,
  total,
}) => (
  <div className="space-y-2 mb-4">
    <div className="flex justify-between">
      <span>Subtotal:</span>
      <span aria-label={`Subtotal: $${subtotal.toFixed(2)}`}>
        ${subtotal.toFixed(2)}
      </span>
    </div>
    {discountApplied && (
      <div className="flex justify-between text-green-600">
        <span>Discount (10%):</span>
        <span aria-label={`Discount: -$${discountAmount.toFixed(2)}`}>
          -${discountAmount.toFixed(2)}
        </span>
      </div>
    )}
    <div className="flex justify-between font-bold border-t pt-2">
      <span>Total:</span>
      <span aria-label={`Total: $${total.toFixed(2)}`}>
        ${total.toFixed(2)}
      </span>
    </div>
  </div>
);

export default CartSummary;
