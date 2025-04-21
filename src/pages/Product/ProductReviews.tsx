import React from "react";
import { FaStar } from "react-icons/fa";

interface Review {
  id: string;
  username: string;
  rating: number;
  description: string;
}

interface ProductReviewsProps {
  reviews: Review[];
}

const ProductReviews: React.FC<ProductReviewsProps> = ({ reviews }) => {
  return (
    <div className="mt-16">
      <h3 className="text-2xl font-bold text-white mb-6">Customer Reviews</h3>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id} className="mb-6 border-b border-gray-700 pb-6">
            <p className="font-semibold text-lg text-white">
              {review.username}
            </p>
            <div className="flex items-center text-yellow-400 mb-2">
              {Array.from({ length: review.rating }, (_, i) => (
                <FaStar key={i} />
              ))}
            </div>
            <p className="text-white">{review.description}</p>
          </div>
        ))
      ) : (
        <p className="text-white">No reviews yet.</p>
      )}
    </div>
  );
};

export default ProductReviews;
