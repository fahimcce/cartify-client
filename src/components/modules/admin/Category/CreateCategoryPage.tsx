/* eslint-disable padding-line-between-statements */
/* eslint-disable import/order */
/* eslint-disable react/jsx-sort-props */
"use client";

import { createCategory } from "@/src/services/Category Services/CategoryServices";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function CreateCategoryPage() {
  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !imageFile) {
      toast.error("Please provide all required fields.");
      return;
    }

    setLoading(true);
    try {
      await createCategory({ name, imageFile });
      toast.success("Category created successfully!");
      router.push("/admin/category"); // Redirect to Categories page
    } catch (error: any) {
      toast.error(error.message || "Failed to create category.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">Create New Category</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4 bg-white p-6 shadow rounded-md"
      >
        <div>
          <label htmlFor="name" className="block mb-2 font-medium">
            Category Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter category name"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="image" className="block mb-2 font-medium">
            Category Image
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            className="w-full p-2 border rounded-md"
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
