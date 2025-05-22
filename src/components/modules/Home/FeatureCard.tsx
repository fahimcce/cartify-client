/* eslint-disable react/jsx-sort-props */
/* eslint-disable import/order */
"use client";

import { useCart } from "@/src/hook/useCart";
import { IProduct } from "@/src/types/ProductTypes";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FeatureCard({ product }: { product: IProduct }) {
  const { addToCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDetailsClick = () => {
    setLoading(true);
    router.push(`/products/details/${product.id}`);
  };

  return (
    <div className="relative p-4 border hover:shadow-lg">
      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10 rounded-lg">
          <svg
            className="animate-spin h-6 w-6 text-gray-800"
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
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
        </div>
      )}

      <div className="overflow-hidden flex justify-center relative">
        <Image
          onClick={handleDetailsClick}
          src={product.images}
          alt={product.name}
          width={340}
          height={150}
          className="rounded-lg h-24 md:h-40 w-full cursor-pointer"
        />
      </div>

      <div>
        <p className="text-md">{product.name}</p>
        <p className="text-sm text-gray-600 mt-1">
          In Stock: {product.inventoryCount}
        </p>
        <strong>৳ {product.price}</strong>
      </div>

      <div className="w-full">
        <button
          className="bg-green-600 text-white w-full text-small px-2 py-2 rounded hover:bg-blue-600 transition"
          onClick={() => addToCart(product)}
        >
          Add Cart
        </button>
      </div>
    </div>
  );
}
