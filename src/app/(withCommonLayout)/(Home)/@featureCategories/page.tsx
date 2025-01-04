/* eslint-disable react/jsx-sort-props */
/* eslint-disable @next/next/no-img-element */
"use server";
import CategoryCard from "@/src/components/modules/Home/CategoryCard";
import { fetchCategories } from "@/src/services/Category Services/CategoryServices";
import { Tcategory } from "@/src/types";

export default async function Page() {
  const categories = await fetchCategories();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Shop by Categories</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category: Tcategory) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
