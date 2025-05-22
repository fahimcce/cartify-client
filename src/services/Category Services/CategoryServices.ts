"use server";
import axiosInstance from "@/src/lib/AxiosInstance";
import { Tcategory } from "@/src/types";

export const createCategory = async (categoryData: {
  name: string;
  categoryImage: string;
}) => {
  try {
    const response = await axiosInstance.post(
      "/category/create-category",
      categoryData
    );

    return response.data.data;
  } catch (error: any) {
    throw new Error(error);
  }

  // if (!response.data.success) {
  //   throw new Error(response.data.message || "Failed to create product.");
  // }
};

export const fetchCategories = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/category`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Products Not found !!");
  }

  return res.json();
};

export const deleteCategory = async (id: string) => {
  const response = await axiosInstance.delete(`/category/${id}`);

  if (!response.data.success) {
    throw new Error(response.data.message || "Failed to delete Category.");
  }

  return response.data?.message;
};

export const CategoryBasedProducts = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/category/category-products/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Product Not found !!");
  }

  const result = await res.json();

  return result.data;
};

export const updateCategory = async (
  id: string,
  payload: Partial<Tcategory>
) => {
  const response = await axiosInstance.patch(`/category/${id}`, payload);

  if (!response.data.success) {
    throw new Error(response.data.message || "Failed to Update Category.");
  }

  return response?.data?.data;
};
