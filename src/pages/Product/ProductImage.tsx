import React from "react";

interface ProductImageProps {
  url: string;
  alt: string;
}

const ProductImage: React.FC<ProductImageProps> = ({ url, alt }) => {
  return (
    <div className="flex-1 md:max-w-lg mx-auto mb-8 md:mb-0">
      <img
        src={url}
        alt={alt}
        className="w-full h-auto object-cover rounded-lg shadow-xl"
      />
    </div>
  );
};

export default ProductImage;
