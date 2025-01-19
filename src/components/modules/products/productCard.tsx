/* eslint-disable react/jsx-sort-props */
/* eslint-disable import/order */
"use client";

import { useCart } from "@/src/hook/useCart";
import { IProduct } from "@/src/types/ProductTypes";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ProductCard({ product }: { product: IProduct }) {
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
      <Card className="hover:shadow-lg transition-shadow  flex flex-col rounded-md justify-between relative">
        {/* Card Body */}
        <CardBody className="overflow-hidden flex justify-center relative">
          <Image
            src={product.images}
            alt={product.name}
            width={340}
            height={150}
            onClick={handleDetailsClick}
            className="cursor-pointer w-full h-[120px]"
          />
          <p className="text-sm text-gray-600 mt-1">
            In Stock: {product.inventoryCount}
          </p>
        </CardBody>
        {/* Card Header */}
        <CardHeader className="pb-0 px-4">
          <p className="text-md font-semibold truncate">{product.name}</p>
        </CardHeader>
        <div className="absolute top-2 right-2 bg-black text-white text-xs font-semibold py-1 px-3 rounded-full">
          ${product.price}
        </div>

        {/* Button Row */}
        <div className="grid grid-cols-1 pb-1 mx-1 mb-1">
          <button
            className="bg-green-500 mb-1 rounded-sm text-white text-sm hover:bg-green-600 transition"
            onClick={handleBuyNow}
          >
            Buy Now
          </button>
          <button
            className="bg-blue-500 text-white rounded-sm text-sm hover:bg-blue-600 transition"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </Card>
    </div>
  );
}
