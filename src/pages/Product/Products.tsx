import React, { useState, useEffect } from "react";
import SidebarFilter from "../../components/ui/SidebarFilter";

import ProductsGrid from "./ProductsGrid";

// loader
import { SpinnerDotted } from "spinners-react";
import { useProducts } from "../../context/product/ProductsContext";
import SearchBar from "../../components/ui/SearchBar";

const Products = () => {
  const { products, loading, error } = useProducts();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    document.title = "VivaTrend - Our Featured Products";
  }, []);

  // Get unique tags from all products
  const availableTags = React.useMemo(() => {
    if (!products) return [];
    return Array.from(new Set(products.flatMap((product) => product.tags)));
  }, [products]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filteredProducts = React.useMemo(() => {
    if (!products) return [];

    return products.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesTags =
        selectedTags.length === 0 ||
        product.tags.some((tag) => selectedTags.includes(tag));
      return matchesSearch && matchesTags;
    });
  }, [products, searchQuery, selectedTags]);

  if (loading) {
    return (
      <div className="h-screen fixed bottom-0 top-0 bg-black/90 w-full z-50 flex justify-center items-center">
        <SpinnerDotted color="white" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container pt-[180px] mx-auto px-4 py-8 text-center text-red-500">
        Error loading products: {error}
      </div>
    );
  }

  return (
    <section className="container pt-[180px] mx-auto px-4 py-8">
      <h2 className="h2 text-white text-center mb-12">Our Featured Products</h2>

      <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main content area - takes 3/4 width when no products found */}
        <div className="lg:w-3/4 w-full">
          {filteredProducts.length > 0 ? (
            <ProductsGrid products={filteredProducts} />
          ) : (
            <div className="flex items-start justify-center h-full">
              <div className="text-center p-8 bg-white/10 rounded-lg w-full">
                <h3 className="text-2xl font-bold text-white mb-4">
                  No products found
                </h3>
                <p className="text-white">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            </div>
          )}
        </div>
        {/* Sidebar */}
        <div className="lg:w-1/4 w-full">
          <SidebarFilter
            selectedTags={selectedTags}
            onTagToggle={toggleTag}
            availableTags={availableTags}
          />
        </div>
      </div>
    </section>
  );
};

export default Products;
