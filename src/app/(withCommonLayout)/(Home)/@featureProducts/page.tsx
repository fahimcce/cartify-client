/* eslint-disable react/self-closing-comp */
/* eslint-disable import/order */
"use client";
import Link from "next/link";

import FeatureCard from "@/src/components/modules/Home/FeatureCard";
import { getAllProducts } from "@/src/services/productServices";
import { IProduct } from "@/src/types/ProductTypes";
import { useState, useEffect } from "react";

function SkeletonFeatureCard() {
  return (
    <div className="p-4">
      <div className="rounded-lg shadow-md bg-gray-200 animate-pulse">
        <div className="h-32 bg-gray-300 rounded-t-md"></div>
        <div className="p-2">
          <div className="h-4 bg-gray-300 rounded-md mb-2"></div>
          <div className="h-4 bg-gray-300 rounded-md w-3/4"></div>
        </div>
      </div>
    </div>
  );
}

export default function FeatureProducts() {
  const [products, setProducts] = useState<IProduct[] | null>(null);

  useEffect(() => {
    (async () => {
      const data = await getAllProducts();

      setProducts(data?.data || []);
    })();
  }, []);

  return (
    <div className="mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Featured Products</h1>
        <p className="text-lg text-gray-600">
          Explore the products you’ll love the most
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
        {products === null
          ? // Skeleton loaders while fetching data
            Array.from({ length: 10 }).map((_, index) => (
              <SkeletonFeatureCard key={index} />
            ))
          : // Actual product cards after data is fetched
            products
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
