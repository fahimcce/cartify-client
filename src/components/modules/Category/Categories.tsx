/* eslint-disable react/jsx-sort-props */
/* eslint-disable import/order */
/* eslint-disable react/self-closing-comp */
"use client";

import { useQuery } from "@tanstack/react-query";
import CategoryCard from "../../Shared/CategoryCard";

import { fetchCategories } from "@/src/services/Category Services/CategoryServices";
import { Tcategory } from "@/src/types";

export default function CategoryPage() {
  const {
    data: categoriesData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  if (isError)
    return (
      <div className="text-center text-red-500">Failed to load categories.</div>
    );

  return (
    <div className="container mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Categories</h1>
        <p className="text-lg text-gray-600">
          Explore a wide range of categories
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {isLoading
          ? Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className="h-40 bg-gray-200 animate-pulse rounded-md"
              />
            ))
          : categoriesData?.data.map((category: Tcategory) => (
              <CategoryCard props={category} key={category.id} />
            ))}
      </div>
    </div>
  );
}
