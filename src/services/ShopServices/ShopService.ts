import axios from "axios";

import envConfig from "@/src/config/envConfig";
import axiosInstance from "@/src/lib/AxiosInstance";

export const getAllShops = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/shops`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Shops Not found !!");
  }

  return res.json();
};

export const getSingleShop = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/shops/my-orders/${id}`);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSingleShopProducts = async (id: string) => {
  try {
    const response = await axios.get(`${envConfig.baseApi}/shops/${id}`);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const followShop = async (customerId: string, shopId: string) => {
  try {
    const response = await axiosInstance.post(`/shops/follow`, {
      customerId,
      shopId,
    });

    return {
      success: true,
      data: response.data,
    };
  } catch {
    return {
      success: false,
      error: "An error occurred",
    };
  }
};

export const unfollowShop = async (customerId: string, shopId: string) => {
  try {
    const response = await axiosInstance.post(`/shops/unfollow`, {
      customerId,
      shopId,
    });

    return {
      success: true,
      data: response.data,
    };
  } catch {
    return {
      success: false,
      error: "An error occurred",
    };
  }
};
