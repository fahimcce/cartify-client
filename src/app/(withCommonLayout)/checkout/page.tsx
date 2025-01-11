/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-sort-props */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { toast } from "sonner";

import { useCart } from "@/src/hook/useCart";
import { createOrder } from "@/src/services/orderServices/orderServices";
import { StripePaymentForm } from "@/src/components/UI/Stripeform";

const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_PUBLISHABLE_KEY}`);

const CheckoutPage = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [coupon, setCoupon] = useState("");
  const [loading, setLoading] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [finalTotal, setFinalTotal] = useState(totalPrice);
  const [paymentStatus, setPaymentStatus] = useState("PENDING");
  const router = useRouter();

  useEffect(() => {
    toast.dismiss();
  }, []);

  const handleCouponApply = () => {
    if (coupon === "DISCOUNT10") {
      setDiscount(0.1 * totalPrice);
      setFinalTotal(totalPrice - 0.1 * totalPrice);
    } else {
      toast.error("Invalid coupon code");
      setDiscount(0);
      setFinalTotal(totalPrice);
    }
  };

  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method);
  };

  const handleOrderPlacement = async () => {
    setLoading(true);

    try {
      const orderData = {
        cartItems: cart.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
        PaymentStatus: paymentStatus,
      };

      await createOrder(orderData);

      toast.success("Order placed successfully!");
      setTimeout(() => {
        clearCart();
        router.push("/");
      }, 2000);
    } catch (error) {
      toast.error("Error placing order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-4 border rounded-md">
      <h1 className="text-3xl font-bold text-center mb-6">Checkout</h1>

      <div className="flex justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Your Orders</h2>
          <ul>
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between">
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>
                  ${(item.price * (item.quantity as number)).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4">Subtotal: ${totalPrice.toFixed(2)}</p>
          <p>Discount: -${discount.toFixed(2)}</p>
          <p>Shipping: $5.00</p>
          <p className="font-bold">Total: ${(finalTotal + 5).toFixed(2)}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Apply Coupon</h2>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Enter coupon code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className="border px-2 py-1 rounded"
            />
            <button
              onClick={handleCouponApply}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              Apply
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Payment Method</h2>
        <div className="space-x-4 mb-4">
          <label>
            <input
              type="radio"
              name="payment"
              value="COD"
              checked={paymentMethod === "COD"}
              onChange={() => handlePaymentMethodChange("COD")}
            />{" "}
            Cash on Delivery (COD)
          </label>
          <label>
            <input
              type="radio"
              name="payment"
              value="Stripe"
              checked={paymentMethod === "Stripe"}
              onChange={() => handlePaymentMethodChange("Stripe")}
            />{" "}
            Stripe
          </label>
        </div>

        {paymentMethod === "Stripe" && (
          <Elements stripe={stripePromise}>
            <StripePaymentForm
              onPaymentStatusChange={(status) => setPaymentStatus(status)} // Handle status
            />
          </Elements>
        )}

        <div className="text-center mt-6">
          <button
            onClick={handleOrderPlacement}
            disabled={loading} // Disable button while loading
            className="w-full bg-green-500 text-white py-2 px-4 rounded-md font-medium text-center hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition disabled:bg-green-400"
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 mx-auto"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
            ) : (
              "Place Order"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
