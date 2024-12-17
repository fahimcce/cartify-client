/* eslint-disable padding-line-between-statements */
import axios from "axios";
import Cookies from "js-cookie";

export interface TCategory {
  id: string;
  name: string;
  categoryImage: string | null;
}

const getAuthToken = () => Cookies.get("accessToken");

export const createCategory = async (categoryData: {
  name: string;
  imageFile: File;
}) => {
  const token = getAuthToken();
  if (!token) throw new Error("No authentication token found.");
  const requestData = new FormData();
  requestData.append("file", categoryData.imageFile);
  requestData.append(
    "data",
    JSON.stringify({
      name: categoryData.name,
    })
  );
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_API}/category/create-category`,
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

export const fetchCategories = async (): Promise<TCategory[]> => {
  const token = getAuthToken();
  if (!token) throw new Error("No authentication token found.");

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_API}/category`,
    { headers: { Authorization: `${token}` } }
  );

  if (response.data.success) {
    return response.data.data;
  } else {
    throw new Error("Failed to load category.");
  }
};
