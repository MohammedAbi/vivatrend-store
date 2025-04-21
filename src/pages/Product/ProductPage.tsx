import React from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "../../context/product/ProductsContext";
import BackButton from "./BackButton";
import ProductImage from "./ProductImage";
import ProductDetails from "./ProductDetails";
import ProductReviews from "./ProductReviews";
import { useCart } from "../../hooks/useCart";
import { SpinnerDotted } from "spinners-react";

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products, loading, error } = useProducts();
  const { addToCart } = useCart();

  const product = products.find((p) => p.id === id);

  if (loading) {
    return (
      <div className="h-screen fixed bottom-0 top-0 bg-black/90 w-full z-50 flex justify-center items-center">
        <SpinnerDotted color="white" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-[90px] mx-auto px-4 py-16 md:py-24 text-center text-red-500">
        Error loading product: {error}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mt-[90px] mx-auto px-4 py-16 md:py-24 text-center text-red-500">
        Product not found.
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <section className="container mt-[90px] mx-auto px-4 py-16 md:py-24">
      <BackButton />

      <div className="flex flex-col md:flex-row gap-12 lg:gap-24">
        <ProductImage url={product.image.url} alt={product.image.alt} />

        <ProductDetails
          title={product.title}
          description={product.description}
          price={product.price}
          discountedPrice={product.discountedPrice}
          rating={product.rating}
          reviewsCount={product.reviews.length}
          tags={product.tags}
          onAddToCart={handleAddToCart}
        />
      </div>

      <ProductReviews reviews={product.reviews} />
    </section>
  );
};

export default ProductPage;
