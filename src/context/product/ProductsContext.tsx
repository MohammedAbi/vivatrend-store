import { createContext, useContext, useEffect, useState } from "react";
import { API_CONFIG, apiRequest } from "../../services/api";

// Define what a product looks like
export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  discountedPrice: number;
  image: { url: string; alt: string };
  rating: number;
  tags: string[];
  reviews: {
    id: string;
    username: string;
    rating: number;
    description: string;
  }[];
}

// Define what context provides
interface ProductsContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchProducts: () => void;
}

// Create the context
const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined
);

// The provider component
export const ProductsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // State for products, loading, and errors
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to get products from API
  // const fetchProducts = async () => {
  //   setLoading(true);
  //   setError(null);

  //   try {
  //     const response = await apiRequest<{ data: Product[] }>(
  //       API_CONFIG.ENDPOINTS.PRODUCTS.ALL
  //     );
  //     setProducts(response.data);
  //   } catch (err) {
  //     setError("Failed to load products. Please try again later.");
  //     console.error(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    setProducts([]); 

    try {
      const response = await apiRequest<{ data: Product[] }>(
        API_CONFIG.ENDPOINTS.PRODUCTS.ALL
      );
      setProducts(response.data);
    } catch (err) {
      setProducts([]); // ✅ Also clear products on error to ensure clean state
      setError("Failed to load products. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Load products when component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  // Provide the values to our app
  return (
    <ProductsContext.Provider
      value={{ products, loading, error, fetchProducts }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

// Custom hook to use the products context
export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }
  return context;
};
