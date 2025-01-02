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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#f8d7da",
          color: "#721c24",
          fontSize: "18px",
          fontWeight: "bold",
          textAlign: "center",
          borderRadius: "8px",
          padding: "20px",
        }}
      >
        <p>⚠️ You have No shop . Please create a shop</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-6 bg-white rounded-lg shadow-md">
      <div className="w-1/3">
        <img
          src={shop.shopLogo}
          alt={`${shop.shopName} Logo`}
          className="object-cover rounded-lg"
        />
      </div>
      <div className="mb-4 md:mb-0">
        <h1 className="text-2xl font-bold mb-2">My Shop</h1>
        <p className="text-lg">
          <strong>Shop Name:</strong> {shop?.shopName || "N/A"}
        </p>
        <p className="text-lg">
          <strong>Address:</strong> {shop?.address || "Not Provided"}
        </p>
      </div>
    </div>
  );
}
