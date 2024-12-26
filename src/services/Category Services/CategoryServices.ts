import axiosInstance from "@/src/lib/AxiosInstance";

export const createCategory = async (categoryData: {
  name: string;
  categoryImage: string;
}) => {
  const response = await axiosInstance.post(
    "/category/create-category",
    categoryData
  );

  if (!response.data.success) {
    throw new Error(response.data.message || "Failed to create product.");
  }
};

export const fetchCategories = async () => {
  try {
    const response = await axiosInstance.get("/category");

    return response.data.data;
  } catch {
    throw new Error("Failed to fatch Category.");
  }
};

export const deleteCategory = async (id: string) => {
  const response = await axiosInstance.delete(`/category/${id}`);

  if (!response.data.success) {
    throw new Error(response.data.message || "Failed to delete Category.");
  }

  return response.data?.message;
};
