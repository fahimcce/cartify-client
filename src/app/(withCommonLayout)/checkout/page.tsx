/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-sort-props */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { toast } from "sonner";
import { CreditCard, Package, Truck, ShieldCheck } from "lucide-react";

import { useCart } from "@/src/hook/useCart";
import { createOrder } from "@/src/services/orderServices/orderServices";
import { StripePaymentForm } from "@/src/components/UI/Stripeform";

const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_PUBLISHABLE_KEY}`);

export default function CheckoutPage() {
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
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center">
              <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Checkout
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                Please review your order and complete payment
              </p>
            </div>
            {/* Shipping Information */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <Truck className="h-5 w-5 mr-2" />
                  Shipping Information
                </h2>
              </div>
              <div className="px-6 py-4">
                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      First name
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Last name
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Address
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      City
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Postal code
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Payment Method
                </h2>
              </div>
              <div className="px-6 py-4">
                <div className="space-y-4">
                  <label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="payment"
                      value="COD"
                      checked={paymentMethod === "COD"}
                      onChange={() => handlePaymentMethodChange("COD")}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Cash on Delivery (COD)
                      </p>
                      <p className="text-sm text-gray-500">
                        Pay when you receive your order
                      </p>
                    </div>
                  </label>

                  <label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="payment"
                      value="Stripe"
                      checked={paymentMethod === "Stripe"}
                      onChange={() => handlePaymentMethodChange("Stripe")}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Pay with Card
                      </p>
                      <p className="text-sm text-gray-500">
                        Secure payment via Stripe
                      </p>
                    </div>
                  </label>
                </div>

                {paymentMethod === "Stripe" && (
                  <div className="mt-6">
                    <Elements stripe={stripePromise}>
                      <StripePaymentForm
                        onPaymentStatusChange={(status) =>
                          setPaymentStatus(status)
                        }
                      />
                    </Elements>
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <Package className="h-5 w-5 mr-2" />
                  Order Summary
                </h2>
              </div>
              <div className="px-6 py-4">
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <img
                          src={item.images || "/placeholder.png"}
                          alt={item.name}
                          className="h-16 w-16 object-cover rounded"
                        />
                        <div className="ml-4">
                          <h3 className="text-sm font-medium text-gray-900">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm font-medium text-gray-900">
                        ৳{(item.price * (item.quantity as number)).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Coupon Section */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      placeholder="Enter coupon code"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <button
                      onClick={handleCouponApply}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Apply
                    </button>
                  </div>
                </div>

                {/* Order Total */}
                <div className="mt-6 space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <p>Subtotal</p>
                    <p>{totalPrice.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <p>Discount</p>
                    <p>{discount.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <p>Shipping</p>
                    <p>5.00</p>
                  </div>
                  <div className="pt-2 border-t border-gray-200">
                    <div className="flex justify-between text-lg font-semibold text-gray-900">
                      <p>Total</p>
                      <p>৳ {totalPrice + 5 - discount}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Place Order Button */}
            <div className="mt-8">
              <button
                onClick={handleOrderPlacement}
                disabled={loading}
                className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
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
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                ) : (
                  <>
                    <ShieldCheck className="w-5 h-5 mr-2" />
                    Place Order
                  </>
                )}
              </button>
              <p className="mt-2 text-center text-sm text-gray-600">
                By placing this order you agree to our{" "}
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Terms and Conditions
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
