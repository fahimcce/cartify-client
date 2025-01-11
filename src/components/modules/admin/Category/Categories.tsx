"use client";
import { useEffect, useState } from "react";

import { fetchCategories } from "@/src/services/Category Services/CategoryServices";
import { Tcategory } from "@/src/types";
import CategoryCard from "@/src/components/UI/CategoryCard";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Tcategory[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data: Tcategory[] = await fetchCategories();

      setCategories(data);
    };

    fetchData();
  }, []);

  const handleDelete = (id: string) => {
    setCategories((prev) => prev.filter((category) => category.id !== id));
  };

  return (
    <div className="p-6 flex justify-center items-center h-screen">
      {categories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <h1 className="text-center">No Categories</h1>
      )}
    </div>
  );
}
