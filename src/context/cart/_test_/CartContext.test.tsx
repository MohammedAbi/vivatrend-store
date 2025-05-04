import React from "react";
import { renderHook, act } from "@testing-library/react";
import CartContext, { CartProvider } from "../CartContext";
import { Product } from "../types";

// Custom wrapper to provide CartContext to the hook during tests
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

// Mock product data representing a realistic item in the cart
const mockProduct: Product = {
  id: "159fdd2f-2b12-46de-9654-d9139525ba87",
  title: "Gold headphones",
  description: "Professional headphones with gold trim.",
  price: 449.99,
  discountedPrice: 382.49,
  image: {
    url: "https://static.cloud.noroff.dev/api/online-shop/3-headphones-beats.jpg",
    alt: "Gold headphones laying on a white background",
  },
  rating: 4,
  tags: ["headphones"],
  reviews: [
    {
      id: "88e11191-d2e5-4bfb-9bcb-d7e158284657",
      username: "Michael J.",
      rating: 4,
      description: "Good sound quality.",
    },
  ],
};

describe("CartProvider", () => {
  // Clear localStorage before each test to ensure isolation
  beforeEach(() => {
    localStorage.clear();
  });

  it("adds product to cart", () => {
    const { result } = renderHook(() => React.useContext(CartContext)!, {
      wrapper,
    });

    act(() => {
      result.current.addToCart(mockProduct);
    });

    expect(result.current.cartItems).toHaveLength(1);
    expect(result.current.cartItems[0].quantity).toBe(1);
  });

  it("increments quantity if product already exists", () => {
    const { result } = renderHook(() => React.useContext(CartContext)!, {
      wrapper,
    });

    act(() => {
      result.current.addToCart(mockProduct);
      result.current.addToCart(mockProduct);
    });

    expect(result.current.cartItems[0].quantity).toBe(2);
  });

  it("removes product from cart", () => {
    const { result } = renderHook(() => React.useContext(CartContext)!, {
      wrapper,
    });

    act(() => {
      result.current.addToCart(mockProduct);
      result.current.removeFromCart(mockProduct.id);
    });

    expect(result.current.cartItems).toHaveLength(0);
  });

  it("updates product quantity in cart", () => {
    const { result } = renderHook(() => React.useContext(CartContext)!, {
      wrapper,
    });

    act(() => {
      result.current.addToCart(mockProduct);
      result.current.updateQuantity(mockProduct.id, 5);
    });

    expect(result.current.cartItems[0].quantity).toBe(5);
  });

  it("clears the entire cart and localStorage", () => {
    const { result } = renderHook(() => React.useContext(CartContext)!, {
      wrapper,
    });

    act(() => {
      result.current.addToCart(mockProduct);
      result.current.clearCart();
    });

    expect(result.current.cartItems).toHaveLength(0);
    expect(localStorage.getItem("cartItems")).toBe(JSON.stringify([]));
  });

  it("calculates total price and item count correctly", () => {
    const { result } = renderHook(() => React.useContext(CartContext)!, {
      wrapper,
    });

    act(() => {
      result.current.addToCart(mockProduct);
      result.current.updateQuantity(mockProduct.id, 3);
    });

    // 3 items of the same product
    expect(result.current.getCartItemCount()).toBe(3);
    expect(result.current.getCartTotal()).toBe(3 * mockProduct.discountedPrice);
  });
});
