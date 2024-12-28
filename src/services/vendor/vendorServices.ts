/* eslint-disable padding-line-between-statements */
import axiosInstance from "@/src/lib/AxiosInstance";

export const fetchProducts = async () => {
  const response = await axiosInstance.get(`/vendor/my-shop-products`);
  if (response.data.success) {
    return response.data.data;
  } else {
    throw new Error("Failed to load products.");
  }
};

export const createProduct = async (productData: {
  name: string;
  description: string;
  price: number;
  inventoryCount: number;
  discount: number;
  images: string;
}) => {
  const requestData = {
    name: productData.name,
    description: productData.description,
    price: productData.price,
    inventoryCount: productData.inventoryCount,
    discount: productData.discount,
    images: productData.images,
  };
  const response = await axiosInstance.post(
    `/products/create-product`,
    requestData
  );
  if (!response.data.success) {
    throw new Error(response.data.message || "Failed to create product.");
  }
};

export const deleteProduct = async (id: string) => {
  const response = await axiosInstance.delete(`/products/${id}`);

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
