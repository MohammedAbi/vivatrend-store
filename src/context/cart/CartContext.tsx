import React, { createContext, useEffect, useState } from "react";
import { CartContextType, CartItem, Product } from "./types";

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCart = localStorage.getItem("cartItems");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      const updatedItems = existingItem
        ? prevItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...prevItems, { ...product, quantity: 1 }];

      localStorage.setItem("cartItems", JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== productId);
      localStorage.setItem("cartItems", JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCartItems((prevItems) => {
        const updatedItems = prevItems.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        );
        localStorage.setItem("cartItems", JSON.stringify(updatedItems));
        return updatedItems;
      });
    }
  };

  const getCartItemCount = () =>
    cartItems.reduce((count, item) => count + item.quantity, 0);

  const getCartTotal = () =>
    cartItems.reduce(
      (total, item) => total + item.discountedPrice * item.quantity,
      0
    );

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
  };

  // Sync localStorage when cartItems changes (in case other functions update it)
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        toggleCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        getCartItemCount,
        getCartTotal,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
