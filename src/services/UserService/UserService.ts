/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable padding-line-between-statements */
/* eslint-disable import/order */
import envConfig from "@/src/config/envConfig";
import { delay } from "@/src/utils/delay";
import axios from "axios";
import Cookies from "js-cookie";

const getAuthToken = () => Cookies.get("accessToken");

export const getAllUsers = async () => {
  const res = await fetch(`${envConfig.baseApi}/user`);

  await delay(5000);

  return res.json();
};

export const updateUserStatus = async (id: string, status: string) => {
  const token = getAuthToken();
  if (!token) throw new Error("No authentication token found.");

  const payload = { status };

  const response = await axios.patch(
    `${envConfig.baseApi}/user/${id}`,
    payload,
    {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data; // Ensure correct data format
};

export const updateShopRestriction = async (
  id: string,
  payload: { restricted: boolean }
): Promise<any> => {
  const token = getAuthToken();
  if (!token) throw new Error("No authentication token found.");

  try {
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_BASE_API}/admin/restricted/${id}`,
      payload,
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to update restriction."
    );
  }
};
