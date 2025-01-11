/* eslint-disable padding-line-between-statements */
/* eslint-disable react/jsx-sort-props */
"use client";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";

import { createCategory } from "@/src/services/Category Services/CategoryServices";
import { uploadImageToCloudinary } from "@/src/utils/uploadToCloudinary";

export default function CreateCategoryPage() {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const imageFile = formData.get("image") as File;
    const Photo = await uploadImageToCloudinary(imageFile);
    const payload = {
      name: formData.get("name") as string,
      categoryImage: Photo,
    };

    try {
      await createCategory(payload);
      toast.success("Category created successfully!");
      router.push("/admin/category");
      setLoading(false);
    } catch {
      toast.error("Failed to create category.Please try again");
    }
  };

  return (
    <div className="p-6 flex flex-col items-center h-screen">
      <h1 className="text-2xl font-bold mb-6">Create New Category</h1>
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
            className="w-full input input-bordered"
            placeholder="Enter Category name"
            required
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
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Category"}
        </button>
      </form>
    </div>
  );
}
