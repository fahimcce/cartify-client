/* eslint-disable padding-line-between-statements */
/* eslint-disable react/jsx-sort-props */
"use client";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { createCategory } from "@/src/services/Category Services/CategoryServices";
import { uploadImageToCloudinary } from "@/src/utils/uploadToCloudinary";
import { TcategoryReq } from "@/src/types";

export default function CreateCategoryPage() {
  const {
    mutate: CreateCategory,
    // isPending,
    // isSuccess,
    // data,
  } = useMutation({
    mutationKey: ["CREATE_CATEGORY"],
    mutationFn: async (payload: TcategoryReq) => await createCategory(payload),
    onSuccess: () => {
      toast.success("category add successFully");
    },
  });

  const router = useRouter();
  const handleSubmit = async (formData: FormData) => {
    const imageFile = formData.get("image") as File;
    const Photo = await uploadImageToCloudinary(imageFile);
    if (!Photo) throw new Error("photo not uploaded");

    const payload = {
      name: formData.get("name") as string,
      categoryImage: Photo as unknown as string,
    };

    CreateCategory(payload);
    router.push("/admin/category");
  };

  return (
    <div className="p-6 flex flex-col items-center h-screen">
      <h1 className="text-2xl font-bold mb-6">Create New Category</h1>
      <form
        action={handleSubmit}
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
        >
          Create Category
        </button>
      </form>
    </div>
  );
}
