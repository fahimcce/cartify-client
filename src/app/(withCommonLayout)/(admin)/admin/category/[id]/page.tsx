/* eslint-disable padding-line-between-statements */
/* eslint-disable react/jsx-sort-props */
"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { Spinner } from "@nextui-org/spinner";

import {
  fetchCategories,
  updateCategory,
} from "@/src/services/Category Services/CategoryServices";
import { uploadImageToCloudinary } from "@/src/utils/uploadToCloudinary";
import { Tcategory } from "@/src/types";

export default function UpdateCategoryPage() {
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState<Tcategory | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const params = useParams();
  const categoryId = params?.id as string;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categories: Tcategory[] = await fetchCategories();
        const currentCategory = categories.find((cat) => cat.id === categoryId);

        if (currentCategory) {
          setCategory(currentCategory);
        } else {
          toast.error("Category not found");
        }
      } catch {
        toast.error("Failed to fetch category details");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const imageFile = formData.get("image") as File | null; // Explicitly handle null
    const updatedName = formData.get("name") as string | null;

    let updatedImage = category?.categoryImage;
    if (imageFile && imageFile.size > 0) {
      // Only upload the image if it exists
      updatedImage = await uploadImageToCloudinary(imageFile);
    }

    const payload: Partial<Tcategory> = {};
    if (updatedName && updatedName.trim() !== "") payload.name = updatedName;
    if (updatedImage) payload.categoryImage = updatedImage;

    try {
      await updateCategory(categoryId, payload);
      toast.success("Category updated successfully!");
      router.push("/admin/category");
      setLoading(false);
    } catch {
      toast.error("Failed to update category. Please try again.");
    }
  };

  if (loading) {
    return <Spinner size="lg" />;
  }

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">
        Update Category: {category?.name}
      </h1>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="w-full max-w-md space-y-4 bg-white p-6 shadow rounded-md"
      >
        <div>
          <label htmlFor="name" className="block mb-2 font-medium">
            Category Name
          </label>
          <input
            name="name"
            type="text"
            defaultValue={category?.name}
            className="w-full input input-bordered"
            placeholder="Enter Category name"
          />
        </div>
        <div>
          <label htmlFor="image" className="block mb-2 font-medium">
            Category Image
          </label>
          <input
            name="image"
            type="file"
            accept="image/*"
            className="w-full input input-bordered"
          />
          {category?.categoryImage && (
            <div className="mt-2">
              <Image
                src={category?.categoryImage}
                alt={category?.name || "Category Image"}
                height={100}
                width={100}
                className="w-32 h-32 object-cover rounded-md"
              />
            </div>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Category"}
        </button>
      </form>
    </div>
  );
}
