/* eslint-disable react/jsx-sort-props */
/* eslint-disable @next/next/no-img-element */
"use server";
import { fetchCategories } from "@/src/services/Category Services/CategoryServices";

export default async function Page() {
  const categories = await fetchCategories();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Shop by Categories</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category: { name: string; categoryImage: string }) => (
          <div
            key={category.name}
            className="relative rounded-lg shadow-md hover:shadow-lg bg-white overflow-hidden group"
          >
            <img
              src={category.categoryImage}
              alt={category.name}
              className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-25 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h2 className="text-white text-lg font-semibold">
                {category.name}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
