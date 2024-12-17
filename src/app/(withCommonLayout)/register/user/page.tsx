/* eslint-disable react/self-closing-comp */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable no-console */
/* eslint-disable padding-line-between-statements */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useRef } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null); // For resetting the form

  const handlePostSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const imageFile = formData.get("image") as File;

    try {
      const requestData = new FormData();
      requestData.append("file", imageFile); // Attach the file for profilePhoto
      requestData.append(
        "data",
        JSON.stringify({
          password: formData.get("password"),
          customer: {
            name: formData.get("name"),
            email: formData.get("email"),
            contactNumber: formData.get("contactNumber"),
            address: formData.get("address"),
          },
        })
      );

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API}/user/create-customer`,
        requestData
      );

      console.log("Response from backend:", response.data);

      if (response.data.success) {
        // Show success toast
        toast.success("Customer created successfully! Redirecting to login...");

        // Clear the form inputs
        formRef.current?.reset();

        // Navigate to login page after a short delay
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (error: any) {
      setError("Something went wrong.");
      // Show error toast with the message from the backend, if available
      toast.error("Something went wrong.Try with another email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6">
          Register with Cartify
        </h1>
        <form
          ref={formRef}
          onSubmit={handlePostSubmit}
          encType="multipart/form-data"
          className="space-y-6"
        >
          <div>
            <label htmlFor="name" className="block font-medium mb-1">
              Name
            </label>
            <input
              name="name"
              type="text"
              className="w-full input input-bordered"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block font-medium mb-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              className="w-full input input-bordered"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label htmlFor="contactNumber" className="block font-medium mb-1">
              Contact Number
            </label>
            <input
              name="contactNumber"
              type="text"
              className="w-full input input-bordered"
              placeholder="Enter your contact number"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block font-medium mb-1">
              Password
            </label>
            <input
              name="password"
              type="password"
              className="w-full input input-bordered"
              placeholder="Enter your password"
              required
            />
          </div>

          <div>
            <label htmlFor="address" className="block font-medium mb-1">
              Address
            </label>
            <input
              name="address"
              type="text"
              className="w-full input input-bordered"
              placeholder="Enter your address"
              required
            />
          </div>

          <div>
            <label htmlFor="image" className="block font-medium mb-1">
              Profile Image
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
              "Register"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
