import React from "react";
import { Product } from "../Product/types";
import ProductCard from "./ProductCard";

interface ProductsGridProps {
  products: Product[];
}

const ProductsGrid: React.FC<ProductsGridProps> = ({ products }) => {
  if (products.length === 0) {
    return (
      <p className="col-span-full text-center text-gray-500">
        No products found.
      </p>
    );
  }

  return (
    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductsGrid;
