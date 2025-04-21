import React from "react";
import { OrderSummaryProps } from "./types";
import OrderSummaryItem from "./OrderSummaryItem";

const OrderSummary: React.FC<OrderSummaryProps> = ({ cartItems, total }) => (
  <div className="bg-white rounded-lg p-6 sticky top-6 border">
    <h2 className="text-xl font-bold text-primary mb-4">Order Summary</h2>
    <div className="divide-y divide-gray-200">
      {cartItems.map((item) => (
        <OrderSummaryItem key={item.id} item={item} />
      ))}
    </div>
    <div className="border-t border-gray-200 pt-4 mt-4">
      <div className="flex justify-between py-2">
        <span className="text-primary/70">Subtotal</span>
        <span className="text-primary">${total.toFixed(2)}</span>
      </div>
      <div className="flex justify-between py-2">
        <span className="text-primary/70">Shipping</span>
        <span className="text-primary">Free</span>
      </div>
      <div className="flex justify-between py-2 font-bold text-lg">
        <span className="text-primary">Total</span>
        <span className="text-primary">${total.toFixed(2)}</span>
      </div>
    </div>
  </div>
);

export default OrderSummary;
