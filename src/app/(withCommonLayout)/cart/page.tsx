/* eslint-disable react/jsx-sort-props */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useCart } from "@/src/hook/useCart";

export default function CartPage() {
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
    router.push("/checkout"); // Redirect to checkout page
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty</p>
      ) : (
        <>
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((product) => (
                <tr key={product.id} className="text-center">
                  <td>
                    <img
                      src={product.images || "/placeholder.png"}
                      alt={product.name}
                      className="w-16 h-16 mx-auto"
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>
                    <div className="flex justify-center items-center space-x-2">
                      <button
                        onClick={() => decreaseQuantity(product.id as string)}
                        className="px-2 bg-gray-300 rounded hover:bg-gray-400"
                      >
                        -
                      </button>
                      <span>{product.quantity}</span>
                      <button
                        onClick={() => increaseQuantity(product.id as string)}
                        className="px-2 bg-gray-300 rounded hover:bg-gray-400"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>
                    ${(product.price * (product.quantity as number)).toFixed(2)}
                  </td>
                  <td>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      onClick={() => removeFromCart(product.id as string)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={4} className="text-right font-bold">
                  Grand Total:
                </td>
                <td colSpan={2} className="text-center font-bold">
                  ${totalPrice.toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>
          {/* Checkout Button */}
          <div className="text-center mt-6">
            <button
              onClick={handleCheckout}
              className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
