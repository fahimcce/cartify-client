/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable padding-line-between-statements */
"use server";
import envConfig from "../config/envConfig";
import { delay } from "../utils/delay";

export const getAllProducts = async () => {
  const baseApi = envConfig.baseApi;
  try {
    const res = await fetch(`${baseApi}/products`);
    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.statusText}`);
    }
    await delay(1000);
    const data = await res.json();
    return data;
  } catch (error) {
    return { data: [], error: "Something went wrong" };
  }
};
