import axios from "axios";
import Cookies from "js-cookie";

import envConfig from "@/src/config/envConfig";

const getAuthToken = () => Cookies.get("accessToken");
const token = getAuthToken();

// Function to send order data
export const createOrder = async (orderData: any) => {
  try {
    const response = await axios.post(
      `${envConfig.baseApi}/orders`,
      orderData,
      {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMyOrder = async (id: string) => {
  try {
    const response = await axios.get(
      `${envConfig.baseApi}/orders/my-orders/${id}`,
      {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};
