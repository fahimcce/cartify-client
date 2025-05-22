/* eslint-disable import/order */
"use client";

import { IProduct } from "@/src/types/ProductTypes";
import { flashProducts } from "@/src/services/productServices";
import FeatureCard from "../Home/FeatureCard";
import { useQuery } from "@tanstack/react-query";
import FeatureCardSkeleton from "../../Shared/FeatureCardSkeleton";

export default function FlashSalePage() {
  const { data: productsData, isLoading: loadingProducts } = useQuery({
    queryKey: ["flashProducts"],
    queryFn: flashProducts,
  });

  return (
    <div className="mx-auto p-6 min-h-screen">
      {/* Flash Sale Timer */}
      <div className="text-center py-4 bg-red-500 text-white rounded-lg mb-6">
        <h2 className="text-2xl font-semibold">
          30% OFF <br />
          Flash Sale Ending In:
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-1">
        {loadingProducts
          ? Array.from({ length: 6 }).map((_, i) => (
              <FeatureCardSkeleton key={i} />
            ))
          : productsData?.map((product: IProduct) => (
              <FeatureCard key={product.id} product={product} />
            ))}
      </div>
    </div>
  );
}
