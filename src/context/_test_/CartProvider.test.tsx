import React from "react";
import { renderHook, act } from "@testing-library/react";

import CartContext, { CartProvider } from "../cart/CartContext";
import { Product } from "../cart/types";

// Custom wrapper to provide CartContext to the hook
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

// Mock product data to simulate real-world product structure
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
  // Reset localStorage before each test to avoid state bleed
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

  it("increments quantity if product exists", () => {
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

  it("updates quantity", () => {
    const { result } = renderHook(() => React.useContext(CartContext)!, {
      wrapper,
    });

    act(() => {
      result.current.addToCart(mockProduct);
      result.current.updateQuantity(mockProduct.id, 5);
    });

    expect(result.current.cartItems[0].quantity).toBe(5);
  });

  it("clears cart", () => {
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

  it("calculates total and count", () => {
    const { result } = renderHook(() => React.useContext(CartContext)!, {
      wrapper,
    });

    act(() => {
      result.current.addToCart(mockProduct);
      result.current.updateQuantity(mockProduct.id, 3);
    });

    expect(result.current.getCartItemCount()).toBe(3);
    expect(result.current.getCartTotal()).toBe(3 * mockProduct.discountedPrice);
  });
});
