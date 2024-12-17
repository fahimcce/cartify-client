/* eslint-disable react/jsx-sort-props */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useGetMyshopQuery } from "@/src/redux/features/shop/shopApi";

export default function VendorShop() {
  const { data, isLoading, error } = useGetMyshopQuery(undefined);
  const shop = data?.data; // Extracting the actual shop data from the API response

  if (isLoading) return <p>Loading...</p>;
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
        <p>⚠️ You have No shop</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between p-6 bg-white rounded-lg shadow-md">
      {/* Left Side: Shop Details */}
      <div>
        <h1 className="text-2xl font-bold mb-2">Vendor Shop</h1>
        <p className="text-lg">
          <strong>Shop Name:</strong> {shop?.shopName || "N/A"}
        </p>
        <p className="text-lg">
          <strong>Shop ID:</strong> {shop?.id || "N/A"}
        </p>
        <p className="text-lg">
          <strong>Address:</strong> {shop?.address || "Not Provided"}
        </p>
      </div>

      {/* Right Side: Shop Logo */}
      {shop?.shopLogo && (
        <div>
          <img
            src={shop.shopLogo}
            alt={`${shop.shopName} Logo`}
            className="w-32 h-32 object-cover rounded-lg"
          />
        </div>
      )}
    </div>
  );
}
