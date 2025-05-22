/* eslint-disable react/jsx-sort-props */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { ShoppingCart, Minus, Plus, Trash2 } from "lucide-react";

import { useCart } from "@/src/hook/useCart";

export default function App() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    totalPrice,
  } = useCart();
  const router = useRouter();

  const handleCheckout = () => {
    toast.loading("Proceeding to checkout...");
    router.push("/checkout");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
          <div className="flex items-center">
            <ShoppingCart className="h-6 w-6 text-gray-600" />
            <span className="ml-2 text-lg font-medium text-gray-600">
              {cart.length} items
            </span>
          </div>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-medium text-gray-900">
              Your cart is empty
            </h2>
            <p className="mt-2 text-gray-500">Add some items to get started!</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="divide-y divide-gray-200">
              {cart.map((product) => (
                <div
                  key={product.id}
                  className="p-6 sm:flex sm:justify-between sm:items-center"
                >
                  <div className="flex items-center">
                    <img
                      src={product.images || "/placeholder.png"}
                      alt={product.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="ml-6">
                      <h3 className="text-lg font-medium text-gray-900">
                        {product.name}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Unit Price: ৳{product.price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 sm:mt-0 sm:ml-6 flex flex-col sm:flex-row sm:items-center sm:space-x-6">
                    <div className="flex items-center justify-center border rounded-lg">
                      <button
                        onClick={() => decreaseQuantity(product.id as string)}
                        className="p-2 hover:bg-gray-100 rounded-l-lg"
                      >
                        <Minus className="h-4 w-4 text-gray-600" />
                      </button>
                      <span className="px-4 py-2 text-gray-900">
                        {product.quantity}
                      </span>
                      <button
                        onClick={() => increaseQuantity(product.id as string)}
                        className="p-2 hover:bg-gray-100 rounded-r-lg"
                      >
                        <Plus className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>

                    <div className="mt-4 sm:mt-0">
                      <p className="text-lg font-medium text-gray-900">
                        ৳
                        {(product.price * (product.quantity as number)).toFixed(
                          2
                        )}
                      </p>
                    </div>

                    <button
                      onClick={() => removeFromCart(product.id as string)}
                      className="mt-4 sm:mt-0 flex items-center justify-center text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-5 w-5" />
                      <span className="ml-2">Remove</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 px-6 py-8">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>৳{totalPrice.toFixed(2)}</p>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Shipping and taxes will be calculated at checkout.
              </p>
              <div className="mt-6">
                <button
                  onClick={handleCheckout}
                  className="w-full bg-indigo-600 border border-transparent rounded-md py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Proceed to Checkout
                </button>
              </div>
              <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p>
                  or
                  <Link href="/products">
                    <button className="font-medium text-indigo-600 hover:text-indigo-500">
                      Continue Shopping
                    </button>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
