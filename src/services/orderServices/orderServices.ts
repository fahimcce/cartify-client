import axiosInstance from "@/src/lib/AxiosInstance";

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
