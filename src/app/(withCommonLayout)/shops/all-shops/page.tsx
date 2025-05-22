/* eslint-disable import/order */
/* eslint-disable react/self-closing-comp */
"use client";

import { useQuery } from "@tanstack/react-query";
import ShopPage from "@/src/components/UI/ShopPage";
import { getAllShops } from "@/src/services/ShopServices/ShopService";
import { Tshop } from "@/src/types";

export default function Shops() {
  const {
    data: shopsData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["allShops"],
    queryFn: getAllShops,
  });

  if (isError) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-500">
        Failed to load shops.
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <h1 className="text-2xl font-semibold mb-4 mt-4">
        🏬 Shop Count: {shopsData?.data?.length || 0}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-48 rounded-md bg-gray-200 animate-pulse"
            />
          ))
        ) : shopsData?.data?.length > 0 ? (
          shopsData.data.map((shop: Tshop) => (
            <ShopPage key={shop.id} shop={shop} />
          ))
        ) : (
          <p>No shops available</p>
        )}
      </div>
    </div>
  );
}
