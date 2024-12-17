/* eslint-disable padding-line-between-statements */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useRef } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function CreateShopPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null); // For resetting the form

  // Function to get the authorization token (you may need to adjust this based on where it's stored)
  const getAuthToken = () => {
    // Example: getting token from localStorage
    return Cookies.get("accessToken");
  };

  const handlePostSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const imageFile = formData.get("image") as File;

    try {
      const requestData = new FormData();
      requestData.append("file", imageFile); // Attach the file for shop image
      requestData.append(
        "data",
        JSON.stringify({
          shopName: formData.get("shopName"),
          address: formData.get("address"),
          description: formData.get("description"),
        })
      );

      // Get the token from localStorage or wherever it's stored
      const token = getAuthToken();

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API}/shops/create-shop`,
        requestData,
        {
          headers: {
            Authorization: `${token}`, // Add the token to the Authorization header
          },
        }
      );

      console.log("Response from backend:", response.data);

      if (response.data.success) {
        // Show success toast
        toast.success("Shop created successfully! Redirecting...");

        // Clear the form inputs
        formRef.current?.reset();

        // Navigate to the shop listing page or shop dashboard after a short delay
        setTimeout(() => {
          router.push("/vendor/my-shop"); // Replace with the actual route for shop listing
        }, 2000);
      }
    } catch (error: any) {
      setError("Something went wrong.");
      // Show error toast with the message from the backend, if available
      toast.error("Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6">
          Create a New Shop
        </h1>
        <form
          ref={formRef}
          onSubmit={handlePostSubmit}
          encType="multipart/form-data"
          className="space-y-6"
        >
          <div>
            <label htmlFor="shopName" className="block font-medium mb-1">
              Shop Name
            </label>
            <input
              name="shopName"
              type="text"
              className="w-full input input-bordered"
              placeholder="Enter shop name"
              required
            />
          </div>

          <div>
            <label htmlFor="address" className="block font-medium mb-1">
              Shop Address
            </label>
            <input
              name="address"
              type="text"
              className="w-full input input-bordered"
              placeholder="Enter shop address"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block font-medium mb-1">
              Shop Description
            </label>
            <textarea
              name="description"
              className="w-full input input-bordered"
              placeholder="Enter a brief description about the shop"
              required
            ></textarea>
          </div>

          <div>
            <label htmlFor="image" className="block font-medium mb-1">
              Shop Image
            </label>
            <input
              name="image"
              type="file"
              accept="image/*"
              className="w-full input input-bordered"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md font-medium text-center hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition disabled:bg-indigo-400"
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 mx-auto"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
            ) : (
              "Create Shop"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
