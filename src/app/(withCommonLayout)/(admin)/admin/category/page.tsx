"use client";
import { useRouter } from "next/navigation";

import CategoriesPage from "@/src/components/modules/admin/Category/Categories";
export default function Category() {
  const router = useRouter();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>
        <button
          // eslint-disable-next-line react/jsx-sort-props
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
