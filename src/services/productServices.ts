/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable padding-line-between-statements */
"use server";
import axiosInstance from "../lib/AxiosInstance";

export const getAllProducts = async () => {
  try {
    const response = await axiosInstance.get("/products");
    return response.data;
  } catch (error) {
    return { data: [], error: "Something went wrong" };
  }
};

export const flashProducts = async () => {
  try {
    const response = await axiosInstance.get("/products/flashproducts");
    return response.data.data;
  } catch (error) {
    return { data: [], error: "Something went wrong" };
  }
};
