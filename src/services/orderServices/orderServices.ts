import axiosInstance from "@/src/lib/AxiosInstance";
import { TReview } from "@/src/types";

export const createOrder = async (orderData: any) => {
  try {
    const response = await axiosInstance.post(`/orders`, orderData);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMyOrder = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/orders/my-orders/${id}`);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postReview = async (Review: TReview) => {
  try {
    const response = await axiosInstance.post(`/review`, Review);

    return response.data.message;
  } catch (error) {
    throw error;
  }
};

export const getProductReviews = async (id: string) => {
  try {
    const response = await axiosInstance.get(`review/${id}`);

    return response.data.data;
  } catch (error) {
    throw error;
  }
};
