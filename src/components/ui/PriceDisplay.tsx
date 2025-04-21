import React from "react";

interface PriceDisplayProps {
  price: number;
  discountedPrice: number;
}

const PriceDisplay: React.FC<PriceDisplayProps> = ({
  price,
  discountedPrice,
}) => {
  return (
    <div className="flex items-center gap-4 mb-6">
      <span className="text-2xl font-bold text-white">
        ${discountedPrice.toFixed(2)}
      </span>
      {discountedPrice < price && (
        <span className="text-lg text-white line-through">
          ${price.toFixed(2)}
        </span>
      )}
    </div>
  );
};

export default PriceDisplay;
