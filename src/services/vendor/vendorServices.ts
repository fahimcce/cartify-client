/* eslint-disable padding-line-between-statements */
import axiosInstance from "@/src/lib/AxiosInstance";
import { PProduct } from "@/src/types/ProductTypes";

export const fetchProducts = async () => {
  const response = await axiosInstance.get(`/vendor/my-shop-products`);
  if (response.data.success) {
    return response.data.data;
  } else {
    throw new Error("Failed to load products.");
  }
};

export const createProduct = async (productData: PProduct) => {
  try {
    const response = await axiosInstance.post(
      `/products/create-product`,
      productData
    );
    return response.data;
  } catch {
    throw new Error("An unexpected error occurred while creating the product.");
  }
};

export const deleteProduct = async (id: string) => {
  const response = await axiosInstance.patch(`/products/delete/${id}`);

  if (!response.data.success) {
    throw new Error(response.data.message || "Failed to delete product.");
  }
};

export const updateProduct = async (
  id: string,
  updatedData: {
    name?: string;
    description?: string;
    price?: number;
    inventoryCount?: number;
    discount?: number;
  }
) => {
  const payload = {
    name: updatedData.name,
    description: updatedData.description,
    price: updatedData.price,
    inventoryCount: updatedData.inventoryCount,
    discount: updatedData.discount,
  };
  const response = await axiosInstance.patch(`/products/${id}`, payload);

  if (!response.data.success) {
    throw new Error(response.data.message || "Failed to update product.");
  }
};

export const duplicateProduct = async (id: string) => {
  const response = await axiosInstance.post(
    `/products/create-duplicate-product/${id}`
  );
  if (!response.data.success) {
    throw new Error(response.data.message || "Failed to duplicate product.");
  }
  return response.data.data;
};
