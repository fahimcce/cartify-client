/* eslint-disable react/jsx-sort-props */
/* eslint-disable import/order */
"use client";

import { useCart } from "@/src/hook/useCart";
import { IProduct } from "@/src/types/ProductTypes";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function FeatureCard({ product }: { product: IProduct }) {
  const { addToCart } = useCart();
  const router = useRouter();

  const handleBuyNow = () => {
    addToCart(product);
    router.push("/cart");
  };

  const handleDetailsClick = () => {
    router.push(`/products/details/${product.id}`);
  };

  return (
    <div className="p-4">
      <Card className="w-[350px] h-[400px] hover:shadow-lg transition-shadow border rounded-lg flex flex-col justify-between relative">
        {/* Card Header */}
        <CardHeader className="pb-0 pt-4 px-4">
          <p className="text-lg font-bold truncate">{product.name}</p>
        </CardHeader>
        <div className="absolute top-2 right-2 bg-black text-white text-xs font-semibold py-1 px-3 rounded-full">
          ${product.price}
        </div>

        {/* Card Body */}
        <CardBody className="overflow-hidden flex justify-center relative">
          {product.images ? (
            <Image
              src={product.images}
              alt={product.name}
              width={340} // Matches card width
              height={150}
              className="rounded-lg object-cover"
            />
          ) : (
            <div className="w-[340px] h-[150px] bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
              No Image
            </div>
          )}
          <p className="text-sm text-gray-600 mt-1">
            In Stock: {product.inventoryCount}
          </p>
        </CardBody>

        {/* Button Row */}
        <div className="flex justify-between px-4 pb-4">
          <button
            className="bg-green-500 text-white py-2 px-3 rounded hover:bg-green-600 transition"
            onClick={handleBuyNow}
          >
            Buy Now
          </button>
          <button
            className="bg-blue-500 text-white py-2 px-3 rounded hover:bg-blue-600 transition"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
          <button
            className="bg-gray-500 text-white py-2 px-3 rounded hover:bg-gray-600 transition"
            onClick={handleDetailsClick}
          >
            Details
          </button>
        </div>
      </Card>
    </div>
  );
}
