/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable import/order */
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { IProduct } from "@/src/types/ProductTypes";
import { useParams, useRouter } from "next/navigation";
import { useCart } from "@/src/hook/useCart";
import { Spinner } from "@nextui-org/spinner";

export default function ProductDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const { addToCart } = useCart();

  const [product, setProduct] = useState<IProduct | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API}/products/${id}`
        );

        if (!response.ok) {
          toast.error("Failed to fetch product details.");

          return;
        }

        const productData = await response.json();

        setProduct(productData?.data || productData);
      } catch (error) {
        toast.error("Failed to fetch product details.");
      }
    };

    fetchProduct();
  }, [id]);

  if (!product)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner color="warning" label="Please wait, loading your content.." />
      </div>
    );

  const shopId = product?.shop?.id;
  const handleGoToShop = () => {
    router.push(`/shops/details/${shopId}`);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <button
        onClick={() => router.back()}
        className="mb-4 bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition"
      >
        Back
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column - Product Image */}
        <div className="flex justify-center items-center">
          {product.images ? (
            <Image
              src={product.images}
              alt={product.name}
              width={500}
              height={500}
              className="rounded-lg object-cover"
            />
          ) : (
            <div className="w-[500px] h-[500px] bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
              No Image
            </div>
          )}
        </div>

        {/* Right Column - Product Details */}
        <div className="flex flex-col justify-center space-y-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-lg text-gray-600">
            <span className="font-semibold">Inventory:</span>{" "}
            {product.inventoryCount}
          </p>
          <p className="text-lg">
            <span className="font-semibold text-green-600">Price:</span> $
            {product.price}
          </p>

          <p className="text-lg text-red-500">
            <span className="font-semibold">Discount: </span> {product.discount}{" "}
            %
          </p>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-lg">
                <span className="font-semibold text-green-600">
                  Shop Name:{" "}
                </span>
                {product?.shop?.shopName}
              </p>
            </div>

            <div>
              <button
                onClick={handleGoToShop}
                className="w-[200px] bg-green-500 text-white py-2 px-4 rounded hover:bg-purple-700 transition"
              >
                {product?.shop?.shopName}
              </button>
            </div>
          </div>

          <p className="text-gray-700">Details : {product.description}</p>

          <button
            onClick={() => addToCart(product)}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
