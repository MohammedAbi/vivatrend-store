import React from "react";
import { OrderSummaryItemProps } from "./types";

const OrderSummaryItem: React.FC<OrderSummaryItemProps> = ({ item }) => (
  <div className="py-4 flex">
    <div className="flex-shrink-0 h-16 w-16 rounded-md overflow-hidden">
      <img
        src={item.image.url}
        alt={item.image.alt}
        className="h-full w-full object-cover"
      />
    </div>
    <div className="ml-4 flex-1">
      <h3 className="text-sm font-medium text-primary">{item.title}</h3>
      <p className="text-sm text-primary/60">
        ${item.discountedPrice.toFixed(2)} × {item.quantity}
      </p>
    </div>
  </div>
);

export default OrderSummaryItem;
