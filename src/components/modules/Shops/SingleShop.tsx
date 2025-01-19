/* eslint-disable react/jsx-sort-props */
/* eslint-disable @next/next/no-img-element */
"use client";

import { Spinner } from "@nextui-org/spinner";

import { useGetMyshopQuery } from "@/src/redux/features/shop/shopApi";

export default function VendorShop() {
  const { data, isLoading, error } = useGetMyshopQuery(undefined);
  const shop = data?.data;

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="lg" color="primary" label="Loading Shop..." />
      </div>
    );
  if (error) {
    return (
      <div className="flex justify-center items-center">
        <p>⚠️ You have No shop . Please create a shop</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 flex items-center justify-center p-6 bg-white rounded-lg shadow-md">
      <div className="mb-2">
        <p className="text-lg mt-2 text-center">
          <strong>My Shop Name:</strong> {shop?.shopName || "N/A"}
        </p>
        <br />
        <p className="text-lg">
          <strong>Address:</strong> {shop?.address || "Not Provided"}
        </p>
      </div>
      <div className="flex justify-center">
        <img
          src={shop.shopLogo}
          alt={`${shop.shopName} Logo`}
          className="w-3/4 rounded-lg"
        />
      </div>
    </div>
  );
}
