/* eslint-disable react/jsx-sort-props */
"use server";
import Link from "next/link";

import { fetchCategories } from "@/src/services/Category Services/CategoryServices";
import { Tcategory } from "@/src/types";
import CategoryCard from "@/src/components/Shared/CategoryCard";

export default async function Category() {
  const categories = await fetchCategories();

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">all Categories</h1>
        <Link href="/admin/create-category">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Create
          </button>
        </Link>
      </div>
      {/* <CategoryPage /> */}
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {categories.data.map((category: Tcategory) => (
          <CategoryCard props={category} key={category.id} />
        ))}
      </div>
    </div>
  );
}
