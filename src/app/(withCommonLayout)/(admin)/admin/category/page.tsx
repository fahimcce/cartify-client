/* eslint-disable react/jsx-sort-props */
"use client";
import { useRouter } from "next/navigation";

import CategoriesPage from "@/src/components/modules/admin/Category/Categories";
export default function Category() {
  const router = useRouter();

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">all Categories</h1>
        <button
          onClick={() => router.push("/admin/create-category")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Category
        </button>
      </div>
      <CategoriesPage />
    </div>
  );
}
