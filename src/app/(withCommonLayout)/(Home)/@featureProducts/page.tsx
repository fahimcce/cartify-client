/* eslint-disable react/self-closing-comp */
/* eslint-disable import/order */
"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import FeatureCard from "@/src/components/modules/Home/FeatureCard";
import SkeletonFeatureCard from "@/src/components/Shared/SkeletonFeatureCard";
import { getAllProducts } from "@/src/services/productServices";
import { IProduct } from "@/src/types/ProductTypes";

export default function FeatureProducts() {
  const { data: productsData, isLoading } = useQuery({
    queryKey: ["allProducts"],
    queryFn: getAllProducts,
  });

  return (
    <div className="mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Featured Products</h1>
        <p className="text-lg text-gray-600">
          Explore the products you’ll love the most
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
        {isLoading
          ? Array.from({ length: 10 }).map((_, index) => (
              <SkeletonFeatureCard key={index} />
            ))
          : productsData.data
              .slice(0, 10)
              .map((product: IProduct) => (
                <FeatureCard key={product.id} product={product} />
              ))}
      </div>

      <div className="flex justify-center mt-4">
        <Link href="/products">
          <button className="px-4 py-2 border hover:bg-green-600 hover:text-white shadow-lg">
            Explore more products...
          </button>
        </Link>
      </div>
    </div>
  );
}
