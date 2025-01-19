/* eslint-disable react/jsx-sort-props */
/* eslint-disable import/order */
"use client";

import { useCart } from "@/src/hook/useCart";
import { IProduct } from "@/src/types/ProductTypes";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function FeatureCard({ product }: { product: IProduct }) {
  const { addToCart } = useCart();
  const router = useRouter();

  const handleDetailsClick = () => {
    router.push(`/products/details/${product.id}`);
  };

  return (
    <div className="p-4 border hover:shadow-lg">
      <div className="">
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
            className="bg-green-600 text-white w-full text-small px-2 py-2  rounded hover:bg-blue-600 transition"
            onClick={() => addToCart(product)}
          >
            Add Cart
          </button>
        </div>
      </div>
    </div>
  );
}
