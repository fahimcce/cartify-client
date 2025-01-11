/* eslint-disable import/order */
"use server";
import ShopPage from "@/src/components/UI/ShopPage";
import { getAllShops } from "@/src/services/ShopServices/ShopService";
import { Tshop } from "@/src/types";

export default async function Shops() {
  const shops = await getAllShops();

  return (
    <div>
      all shops
      <h1 className="text-2xl font-semibold mb-4">
        Total Shops: {shops?.data?.length || 0}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {shops?.data?.map((shop: Tshop) => (
          <ShopPage key={shop?.id} shop={shop} />
        )) || <p>No shops available</p>}
      </div>
    </div>
  );
}
