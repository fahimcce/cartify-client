/* eslint-disable react/jsx-sort-props */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable import/order */
"use client";

import { useCart } from "@/src/hook/useCart";
import { useRouter } from "next/navigation";

export default function CartIcon() {
  const { cart } = useCart();
  const router = useRouter();

  const totalItems = cart.length;

  return (
    <div
      className="fixed  top-1/2 right-4 z-50 cursor-pointer animate-shake"
      onClick={() => router.push("/cart")}
    >
      <div className="relative">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3225/3225209.png"
          alt="Cart"
          className="w-12 h-12"
        />
        {totalItems > 0 && (
          <span className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </div>
    </div>
  );
}
