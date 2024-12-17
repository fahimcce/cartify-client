/* eslint-disable padding-line-between-statements */
/* eslint-disable import/order */
/* eslint-disable react/jsx-sort-props */
"use client";

import CategoryCard from "@/src/components/UI/CategoryCard";
import {
  fetchCategories,
  TCategory,
} from "@/src/services/Category Services/CategoryServices";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<TCategory[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err: any) {
        setError(err.message);
      }
    };
    loadCategories();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>
        {/* Create Category Button */}
        <button
          onClick={() => router.push("/admin/create-category")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Category
        </button>
      </div>

      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      )}
    </div>
  );
}
