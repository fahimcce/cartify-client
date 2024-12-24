import axios from "axios";

import envConfig from "@/src/config/envConfig";
import { delay } from "@/src/utils/delay";

export const getAllShops = async () => {
  const res = await fetch(`${envConfig.baseApi}/shops`);

  await delay(5000);

  return res.json();
};

export const getSingleShop = async (id: string) => {
  try {
    const response = await axios.get(
      `${envConfig.baseApi}/shops/my-orders/${id}`
    );

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

export const unfollowShop = async (customerId: string, shopId: string) => {
  try {
    const response = await axios.post(`${envConfig.baseApi}/shops/unfollow`, {
      customerId,
      shopId,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
