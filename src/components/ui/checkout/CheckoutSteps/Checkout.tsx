import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import CheckoutSteps from "./CheckoutSteps";
import OrderComplete from "../OrderComplete/OrderComplete";
import ContactForm from "../CheckoutForms/ContactForm";
import PaymentForm from "../CheckoutForms/PaymentForm";
import ReviewForm from "../CheckoutForms/ReviewForm";
import OrderSummary from "../OrderSummary/OrderSummary";
import {
  generateOrderNumber,
  formatDate,
  getEstimatedDelivery,
} from "../CheckoutForms/CheckOutUtils";
import { CheckoutFormData } from "../CheckoutForms/types";
import { useCart } from "../../../../hooks/useCart";

const Checkout = () => {
  const { cartItems, getCartTotal, toggleCart, clearCart } = useCart();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(1);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [orderTotal, setOrderTotal] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState<CheckoutFormData>({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  useEffect(() => {
    if (cartItems.length === 0 && !orderCompleted) {
      navigate("/");
    }
    return () => toggleCart();
  }, [cartItems, navigate, orderCompleted, toggleCart]);

  const handleSubmitOrder = () => {
    setIsProcessing(true);
    const total = getCartTotal();
    setOrderTotal(total);

    setTimeout(() => {
      setOrderCompleted(true);
      clearCart();
      setIsProcessing(false);
    }, 1500);
  };

  if (orderCompleted) {
    return (
      <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 mt-[90px]">
        <OrderComplete
          data={{
            orderNumber: generateOrderNumber(),
            orderDate: formatDate(new Date()),
            total: orderTotal,
            estimatedDelivery: getEstimatedDelivery(),
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 mt-[90px]">
      <div className="max-w-4xl mx-auto">
        <CheckoutSteps activeStep={activeStep} />

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            {activeStep === 1 && (
              <ContactForm
                formData={formData}
                onInputChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                onContinue={() => setActiveStep(2)}
              />
            )}

            {activeStep === 2 && (
              <PaymentForm
                formData={formData}
                onInputChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                onBack={() => setActiveStep(1)}
                onContinue={() => setActiveStep(3)}
              />
            )}

            {activeStep === 3 && (
              <ReviewForm
                formData={formData}
                onBack={() => setActiveStep(2)}
                onSubmitOrder={handleSubmitOrder}
                isProcessing={isProcessing}
              />
            )}
          </div>

          <div className="lg:w-1/3">
            <OrderSummary cartItems={cartItems} total={getCartTotal()} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
