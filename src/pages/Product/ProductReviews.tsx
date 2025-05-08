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
      <h3
        className="text-2xl font-bold text-white mb-6"
        data-testid="reviews-heading"
      >
        Customer Reviews
      </h3>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div
            key={review.id}
            data-testid={`review-${review.id}`}
            className="mb-6 border-b border-gray-700 pb-6"
          >
            <p
              className="font-semibold text-lg text-white"
              data-testid={`username-${review.id}`}
            >
              {review.username}
            </p>
            <div
              className="flex items-center text-yellow-400 mb-2"
              data-testid={`rating-${review.id}`}
            >
              {Array.from({ length: review.rating }, (_, i) => (
                <FaStar key={i} data-testid={`star-${review.id}-${i}`} />
              ))}
            </div>
            <p className="text-white" data-testid={`description-${review.id}`}>
              {review.description}
            </p>
          </div>
        ))
      ) : (
        <p className="text-white" data-testid="no-reviews">
          No reviews yet.
        </p>
      )}
    </div>
  );
};

export default ProductReviews;
