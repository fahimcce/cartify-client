/* eslint-disable padding-line-between-statements */
import axiosInstance from "@/src/lib/AxiosInstance";

export const getAllUsers = async () => {
  try {
    const response = await axiosInstance.get("/user");
    return response.data.data;
  } catch {
    throw new Error("Failed to fatch User.");
  }
};

export const updateUserStatus = async (id: string, status: string) => {
  const payload = { status };
  try {
    const response = await axiosInstance.patch(`/user/${id}`, payload);
    return response.data;
  } catch {
    throw new Error("Failed to fatch User.");
  }
};

export const updateShopRestriction = async (
  id: string,
  payload: { restricted: boolean }
) => {
  try {
    const response = await axiosInstance.patch(
      `/admin/restricted/${id}`,
      payload
    );
    return response.data;
  } catch {
    throw new Error("Failed to update restriction.");
  }
};

export const deleteShop = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/shops/${id}`);
    return response.data?.message;
  } catch {
    throw new Error("Failed to delete Shop.");
  }
};
