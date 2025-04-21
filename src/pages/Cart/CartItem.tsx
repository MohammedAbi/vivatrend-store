import React from "react";
import { FaTimes, FaPlus, FaMinus } from "react-icons/fa";
import { CartItemProps } from "./types";

const CartItem: React.FC<CartItemProps> = ({
  item,
  onRemove,
  onUpdateQuantity,
}) => (
  <li className="flex gap-4 border-b pb-4">
    <img
      src={item.image.url}
      alt={item.image.alt}
      className="w-20 h-20 object-cover rounded"
    />
    <div className="flex-1">
      <h3 className="font-medium">{item.title}</h3>
      <p className="text-gray-600">${item.discountedPrice.toFixed(2)}</p>
      <div className="flex items-center mt-2">
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          className="p-1 text-gray-500 hover:text-black transition-colors"
        >
          <FaMinus size={12} />
        </button>
        <span className="mx-2">{item.quantity}</span>
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          className="p-1 text-gray-500 hover:text-black transition-colors"
        >
          <FaPlus size={12} />
        </button>
      </div>
    </div>
    <button
      onClick={() => onRemove(item.id)}
      className="text-red-500 hover:text-red-700 transition-colors"
    >
      <FaTimes />
    </button>
  </li>
);

export default CartItem;
