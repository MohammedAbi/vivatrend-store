import React, { useEffect } from "react";
import { FiCheckCircle } from "react-icons/fi";
import { Link } from "react-router-dom";
import { OrderCompleteData } from "../CheckoutForms/types";
import { toast } from "react-toastify";

export interface OrderCompleteProps {
  data: OrderCompleteData;
}

const OrderComplete: React.FC<OrderCompleteProps> = ({ data }) => {
  useEffect(() => {
    // Show success toast when component mounts
    toast.success(
      <div>
        <p className="font-bold">Order #{data.orderNumber} confirmed!</p>
        <p className="text-sm">Thank you for your purchase</p>
      </div>,
      {
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      }
    );

    return () => {
      toast.dismiss();
    };
  }, [data.orderNumber]);

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-primary/10 px-6 py-12 text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-accent/20">
          <FiCheckCircle className="h-6 w-6 text-accent" />
        </div>
        <h1 className="text-2xl font-bold text-primary mt-4">
          Order Confirmed!
        </h1>
        <p className="text-lg text-primary/80 mt-2">
          Thank you for shopping with VivaTrend
        </p>
        <p className="text-sm text-primary/60 mt-2">
          Your order {data.orderNumber} has been placed successfully.
        </p>
      </div>

      <div className="px-6 py-8 border-b border-gray-200">
        <h2 className="text-lg font-medium text-primary mb-4">Order Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {Object.entries(data).map(([key, value]) => (
            <div key={key}>
              <h3 className="text-sm font-medium text-primary/60">
                {key.split(/(?=[A-Z])/).join(" ")}
              </h3>
              <p className="mt-1 text-sm text-primary">
                {typeof value === "number" ? `$${value.toFixed(2)}` : value}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 py-8">
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link
            to="/products"
            className="btn btn-lg btn-white py-2 border border-accent flex-1 text-center text-accent hover:bg-accent/10"
          >
            Continue Shopping
          </Link>
          <Link
            to="/"
            className="btn btn-lg btn-primary py-2 flex-1 text-center bg-accent text-white hover:bg-accent/90"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderComplete;
