/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/self-closing-comp */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-sort-props */
"use client"; // Important for client-side React Query usage

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import { flashProducts } from "@/src/services/productServices";
import { IProduct } from "@/src/types/ProductTypes";
import FeatureCard from "@/src/components/modules/Home/FeatureCard";
import FeatureCardSkeleton from "@/src/components/Shared/FeatureCardSkeleton";

export default function FlashSale() {
  const { data: flashSaleProducts, isLoading } = useQuery({
    queryKey: ["flashProducts"],
    queryFn: flashProducts,
  });

  return (
    <section className="py-10  via-white to-yellow-50 min-h-screen">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl text-center mb-6 text-gray-800">
          Flash Sale - Dont Miss Out!
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {isLoading
            ? Array.from({ length: 10 }).map((_, i) => (
                <FeatureCardSkeleton key={i} />
              ))
            : flashSaleProducts
                ?.slice(0, 10)
                .map((product: IProduct) => (
                  <FeatureCard key={product.id} product={product} />
                ))}
        </div>

        <div className="flex justify-center mt-4">
          <Link href="/flashsales">
            <button className="px-4 py-2 border hover:bg-green-600 hover:text-white shadow-lg">
              Explore more products...
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
