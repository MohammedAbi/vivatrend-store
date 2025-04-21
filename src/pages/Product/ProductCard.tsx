import React from "react";
import { Product } from "../../context/product/ProductsContext";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();

  const handleShopNow = (id: string) => {
    navigate(`/products/${id}`);
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img
        src={product.image.url}
        alt={product.image.alt}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold">{product.title}</h3>
        <p className="text-gray-600 text-sm">{product.description}</p>
        <div className="mt-2 flex items-center space-x-2">
          <span className="text-lg font-bold text-primary">
            ${product.discountedPrice.toFixed(2)}
          </span>
          {product.price > product.discountedPrice && (
            <span className="text-sm line-through text-gray-500">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>
        <div className="mt-2 flex items-center">
          <span className="text-accent">
            {"★".repeat(product.rating)}
            {"☆".repeat(5 - product.rating)}
          </span>
          <span className="ml-2 text-sm text-gray-500">
            {product.reviews.length} reviews
          </span>
        </div>
        <div className="mt-2 text-xs text-gray-500">
          Tags: {product.tags.join(", ")}
        </div>
        <div className="mt-4">
          <button
            className="btn btn-primary w-full py-2 text-sm"
            onClick={() => handleShopNow(product.id)}
          >
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
