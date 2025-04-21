import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PriceDisplay from "../../components/ui/PriceDisplay";
import RatingStars from "./RatingStars";

interface ProductDetailsProps {
  title: string;
  description: string;
  price: number;
  discountedPrice: number;
  rating: number;
  reviewsCount: number;
  tags: string[];
  onAddToCart: () => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  title,
  description,
  price,
  discountedPrice,
  rating,
  reviewsCount,
  tags,
  onAddToCart,
}) => {
  const handleAddToCart = () => {
    onAddToCart();
    toast.success(`${title} added to cart!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return (
    <div className="flex-1 space-y-6">
      <h2 className="text-3xl font-bold text-white">{title}</h2>
      <p className="text-white text-lg">{description}</p>

      <PriceDisplay price={price} discountedPrice={discountedPrice} />

      <RatingStars rating={rating} reviewsCount={reviewsCount} />

      <div className="text-sm text-white mb-6">
        <strong>Tags:</strong> {tags.join(", ")}
      </div>

      <button
        onClick={handleAddToCart}
        className="bg-accent hover:bg-accent-hover text-white font-bold py-3 px-6 rounded w-full transition"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetails;
