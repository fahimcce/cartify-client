/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable import/order */
/* eslint-disable react/jsx-sort-props */
"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

import { fetchCategories } from "@/src/services/Category Services/CategoryServices";
import { Tcategory } from "@/src/types";
import { useRouter } from "next/navigation";

function SkeletonLoader() {
  return (
    <div className="rounded-lg shadow-md p-4 bg-gray-200 animate-pulse">
      <div className="w-full h-32 bg-gray-300 rounded-md" />
      <div className="mt-4 h-4 bg-gray-300 rounded-md" />
    </div>
  );
}

export default function CategoryPage() {
  const [categories, setCategories] = useState<Tcategory[] | null>(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const fetchedCategories = await fetchCategories();

      setCategories(fetchedCategories);
    })();
  }, []);

  return (
    <div className="container mx-auto p-6">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Categories</h1>
        <p className="text-lg text-gray-600">
          Explore a wide range of categories
        </p>
      </div>

      {/* Categories Section */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {categories === null
          ? // Show Skeleton Loaders
            Array.from({ length: 10 }).map((_, index) => (
              <SkeletonLoader key={index} />
            ))
          : // Render Categories
            categories.map((category: Tcategory) => (
              <div
                key={category.id}
                className="rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4 bg-white text-center"
              >
                <div
                  onClick={() =>
                    router.push(`/products/categoryProducts/${category.id}`)
                  }
                  className="w-full h-32 flex items-center justify-center bg-gray-100 rounded-md overflow-hidden cursor-pointer"
                >
                  <Image
                    src={category.categoryImage}
                    alt={category.name}
                    height={100}
                    width={200}
                    className="object-cover h-full w-full"
                  />
                </div>
                <h2 className="mt-4 text-lg font-semibold text-gray-800">
                  {category.name}
                </h2>
              </div>
            ))}
      </div>
    </div>
  );
}
