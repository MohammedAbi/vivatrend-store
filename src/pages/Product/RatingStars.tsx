import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

interface RatingStarsProps {
  rating: number;
  reviewsCount: number;
}

const RatingStars: React.FC<RatingStarsProps> = ({ rating, reviewsCount }) => {
  // Create an array of 5 elements and map through them
  const stars = Array(5)
    .fill(0)
    .map((_, index) =>
      index < Math.round(rating) ? (
        <FaStar key={`star-${index}`} className="text-yellow-400" />
      ) : (
        <FaRegStar key={`star-${index}`} className="text-white" />
      )
    );

  return (
    <div className="flex items-center mb-4">
      {stars}
      <span className="ml-2 text-sm text-white">({reviewsCount} reviews)</span>
    </div>
  );
};

export default RatingStars;
