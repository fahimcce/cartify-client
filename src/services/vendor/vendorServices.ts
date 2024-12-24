/* eslint-disable padding-line-between-statements */
import axios from "axios";
import Cookies from "js-cookie";

export interface TProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  inventoryCount: number;
  images: string | null;
  discount: number;
}

// Utility function to get authentication token
const getAuthToken = () => Cookies.get("accessToken");

// Function to fetch products
export const fetchProducts = async (): Promise<TProduct[]> => {
  const token = getAuthToken();
  if (!token) throw new Error("No authentication token found.");

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_API}/vendor/my-shop-products`,
    { headers: { Authorization: `${token}` } }
  );

  if (response.data.success) {
    return response.data.data; // Return the product list
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
  const token = getAuthToken();
  if (!token) throw new Error("No authentication token found.");
  const requestData = {
    name: productData.name,
    description: productData.description,
    price: productData.price,
    inventoryCount: productData.inventoryCount,
    discount: productData.discount,
    images: productData.images,
  };
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_API}/products/create-product`,
    requestData,
    {
      headers: {
        Authorization: `${token}`,
      },
    }
  );

  if (!response.data.success) {
    throw new Error(response.data.message || "Failed to create product.");
  }
};

export const deleteProduct = async (id: string): Promise<void> => {
  const token = getAuthToken();
  if (!token) throw new Error("No authentication token found.");

  const response = await axios.delete(
    `${process.env.NEXT_PUBLIC_BASE_API}/products/${id}`,
    {
      headers: {
        Authorization: `${token}`,
      },
    }
  );

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
): Promise<void> => {
  const token = getAuthToken();
  if (!token) throw new Error("No authentication token found.");
  const payload = {
    name: updatedData.name,
    description: updatedData.description,
    price: updatedData.price,
    inventoryCount: updatedData.inventoryCount,
    discount: updatedData.discount,
  };
  const response = await axios.patch(
    `${process.env.NEXT_PUBLIC_BASE_API}/products/${id}`,
    payload,
    {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json", // Explicitly set JSON header
      },
    }
  );

  if (!response.data.success) {
    throw new Error(response.data.message || "Failed to update product.");
  }
};

// Service function to duplicate a product
export const duplicateProduct = async (id: string) => {
  const token = getAuthToken();
  if (!token) throw new Error("No authentication token found.");

  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_API}/products/create-duplicate-product/${id}`,
    {},
    {
      headers: {
        Authorization: `${token}`,
      },
    }
  );

  if (!response.data.success) {
    throw new Error(response.data.message || "Failed to duplicate product.");
  }

  return response.data.data; // Return the newly created duplicate product
};
