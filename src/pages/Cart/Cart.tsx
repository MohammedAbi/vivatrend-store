import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import CartItem from "./CartItem";
import CouponInput from "./CouponInput";

import CartSummary from "./CartSummary";
import { toast } from "react-toastify";
import { useAuth } from "../../context";

const Cart: React.FC = () => {
  const { user } = useAuth();
  const {
    cartItems,
    isCartOpen,
    toggleCart,
    removeFromCart,
    updateQuantity,
    getCartTotal,
  } = useCart();

  const [couponCode, setCouponCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [invalidCoupon, setInvalidCoupon] = useState(false);
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const handleRemoveItem = (id: string, title: string) => {
    removeFromCart(id);
    toast.error(`${title} removed from cart`);
  };

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === "DISCOUNT10") {
      setDiscountApplied(true);
      setInvalidCoupon(false);
      toast.success("10% discount applied!");
    } else {
      setDiscountApplied(false);
      setInvalidCoupon(true);
      toast.error("Invalid coupon code");
    }
  };

  const removeCoupon = () => {
    setCouponCode("");
    setDiscountApplied(false);
    setInvalidCoupon(false);
    toast.info("Coupon removed");
  };

  const calculateTotal = () => {
    const subtotal = getCartTotal();
    return discountApplied ? subtotal * 0.9 : subtotal;
  };

  const total = calculateTotal();
  const discountAmount = discountApplied ? getCartTotal() * 0.1 : 0;

  const handleProceedToCheckout = () => {
    if (!user) {
      toast.error("Please login to proceed to checkout");
      toggleCart();
      navigate("/login");
      return;
    }
    navigate("/checkout");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={toggleCart}
      />

      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="h3">Your Cart</h2>
            <button
              onClick={toggleCart}
              className="text-gray-500 hover:text-black"
            >
              <FaTimes size={20} />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {cartItems.length === 0 ? (
              <p className="text-center text-gray-500 py-8">
                Your cart is empty
              </p>
            ) : (
              <ul className="space-y-4">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onRemove={() => handleRemoveItem(item.id, item.title)}
                    onUpdateQuantity={updateQuantity}
                  />
                ))}
              </ul>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t p-4">
              <CouponInput
                couponCode={couponCode}
                discountApplied={discountApplied}
                invalidCoupon={invalidCoupon}
                onApply={applyCoupon}
                onRemove={removeCoupon}
                onCodeChange={setCouponCode}
              />

              <CartSummary
                subtotal={getCartTotal()}
                discountAmount={discountAmount}
                discountApplied={discountApplied}
                total={total}
              />

              <button
                className="btn btn-primary btn-lg w-full"
                onClick={handleProceedToCheckout}
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
