/* eslint-disable import/order */
"use client";

import { useEffect, useState } from "react";

import { fetchCategories } from "@/src/services/Category Services/CategoryServices";
import { Tcategory } from "@/src/types";
import CategoryCard from "@/src/components/UI/CategoryCard";
import { toast } from "sonner";
import { Spinner } from "@nextui-org/spinner";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Tcategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: Tcategory[] = await fetchCategories();

        setCategories(data);
      } catch {
        toast.error("Error fetching categories");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = (id: string) => {
    setCategories((prev) => prev.filter((category) => category.id !== id));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner color="warning" label="Please wait, loading your content.." />
      </div>
    );
  }

  return (
    <div className="p-6 flex justify-center items-center">
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
