/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable import/order */
/* eslint-disable react/jsx-sort-props */
"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "@/src/services/Category Services/CategoryServices";
import CategoryCard from "@/src/components/Shared/CategoryCard";
import { Tcategory } from "@/src/types";

function SkeletonLoader() {
  return (
    <div className="rounded-lg shadow-md p-4 bg-gray-200 animate-pulse">
      <div className="w-full h-32 bg-gray-300 rounded-md" />
      <div className="mt-4 h-4 bg-gray-300 rounded-md" />
    </div>
  );
}

export default function CategoryPage() {
  const {
    data: categoriesData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 10,
  });

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Categories</h1>
        <p className="text-lg text-gray-600">
          Explore a wide range of categories
        </p>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {isLoading ? (
          Array.from({ length: 10 }).map((_, i) => <SkeletonLoader key={i} />)
        ) : isError ? (
          <p className="text-red-500 col-span-full text-center">
            Failed to load categories
          </p>
        ) : (
          categoriesData?.data.map((category: Tcategory) => (
            <CategoryCard key={category.id} props={category} />
          ))
        )}
      </div>

      {/* Explore Button */}
      <div className="flex justify-center mt-4">
        <Link href="/categories">
          <button className="px-4 py-2 border hover:bg-green-600 hover:text-white shadow-lg">
            Explore more categories...
          </button>
        </Link>
      </div>
    </div>
  );
}
