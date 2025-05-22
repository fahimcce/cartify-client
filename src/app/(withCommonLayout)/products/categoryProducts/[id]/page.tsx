/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/self-closing-comp */
/* eslint-disable padding-line-between-statements */
/* eslint-disable no-console */
"use client";

import { AlertTriangle } from "lucide-react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { CategoryBasedProducts } from "@/src/services/Category Services/CategoryServices";
import { IProduct } from "@/src/types/ProductTypes";
import FeatureCard from "@/src/components/modules/Home/FeatureCard";
import CLoader from "@/src/components/Shared/CLoader";

export default function CategoryProducts() {
  const params = useParams();
  const id = params?.id;

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery<IProduct[]>({
    queryKey: ["category-products", id],
    queryFn: async () => {
      if (!id) return [];
      return await CategoryBasedProducts(id as string);
    },
    enabled: !!id,
  });

  if (isLoading) {
    return <CLoader />;
  }

  if (isError || !products || products.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen  px-4">
        <div className="text-center">
          <div className="flex justify-center mb-4 text-yellow-500">
            <AlertTriangle className="w-12 h-12" />
          </div>
          <h1 className="text-3xl font-semibold text-gray-800">
            Products Sold Out
          </h1>
          <p className="mt-2 text-gray-600">
            Were currently out of stock. Please check back later for updates!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 mt-8 mb-4">
        {products
          .filter((product: IProduct) => !product.isDeleted)
          .map((product: IProduct) => (
            <FeatureCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
}
