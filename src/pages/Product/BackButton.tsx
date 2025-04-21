import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const BackButton: React.FC = () => {
  return (
    <div className="mb-8">
      <Link
        to="/products"
        className="inline-flex items-centertransition-colors btn btn-sm hover:btn-primary"
      >
        <FaArrowLeft className="mr-2" />
        Continue Shopping
      </Link>
    </div>
  );
};

export default BackButton;
