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

  // const handleDetailsClick = () => {
  //   router.push(`/products/details/${product.id}`);
  // };

  return (
    <div className="p-4">
      <Card className="h-[300px] hover:shadow-lg transition-shadow border rounded-lg flex flex-col justify-between relative">
        <CardHeader className="pb-0 pt-4 px-4 mt-2">
          <p className="text-sm font-bold truncate">{product.name}</p>
        </CardHeader>
        <div className="absolute top-2 right-2 bg-black text-white text-xs font-semibold py-1 px-3 rounded-full">
          ${product.price}
        </div>

        <CardBody className="overflow-hidden flex justify-center relative">
          <Image
            src={product.images}
            alt={product.name}
            width={340}
            height={150}
            className="rounded-lg h-52 object-cover"
          />

          <p className="text-sm text-gray-600 mt-1">
            In Stock: {product.inventoryCount}
          </p>
        </CardBody>

        <div className="flex justify-between pb-2 px-2">
          <button
            className="bg-green-500 px-2 text-small text-white rounded hover:bg-green-600 transition"
            onClick={handleBuyNow}
          >
            Buy Now
          </button>
          <button
            className="bg-blue-500 text-white px-2  rounded hover:bg-blue-600 transition"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
          {/* <button
            className="bg-gray-500 text-white  rounded hover:bg-gray-600 transition"
            onClick={handleDetailsClick}
          >
            Details
          </button> */}
        </div>
      </Card>
    </div>
  );
}
