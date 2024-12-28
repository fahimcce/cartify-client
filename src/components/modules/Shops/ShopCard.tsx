/* eslint-disable import/order */
/* eslint-disable padding-line-between-statements */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-console */
"use client";

import {
  deleteShop,
  updateShopRestriction,
} from "@/src/services/UserService/UserService";
import { Tshop } from "@/src/types";
import { useState } from "react";

import { toast } from "sonner";

interface ShopCardProps {
  shop: Tshop;
}

const ShopCard: React.FC<ShopCardProps> = ({ shop }) => {
  const { id, shopName, shopLogo, address, vendor, restricted } = shop;

  // State to track restriction status dynamically
  const [isRestricted, setIsRestricted] = useState(restricted);

  const handleRestrictionToggle = async () => {
    const newStatus = !isRestricted; // Toggle restriction status
    try {
      await updateShopRestriction(id, { restricted: newStatus }); // Send updated payload
      setIsRestricted(newStatus); // Update local state
      toast.success(
        `${shopName} is now ${newStatus ? "Restricted" : "Unrestricted"}`
      );
    } catch (error: any) {
      console.error("Error updating restriction:", error.message);
      toast.error("Failed to update shop restriction.");
    }
  };

  const handleDelete = async () => {
    try {
      const response = await deleteShop(id);
      if (response) {
        toast.success("Deleted Category Successfully");
        window.location.reload();
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="border p-4 rounded-md shadow-md hover:shadow-lg transition">
      <div className="flex items-center mb-4">
        <img
          src={shopLogo}
          alt={`${shopName} logo`}
          className="w-16 h-16 object-cover rounded-full mr-4"
        />
        <h2 className="text-xl font-semibold">{shopName}</h2>
      </div>
      <p className="text-gray-600">{address}</p>
      <p className="text-gray-600 mt-2">Vendor: {vendor.name}</p>
      <p
        className={`mt-2 px-2 py-1 inline-block rounded-full text-white ${
          isRestricted ? "bg-red-500" : "bg-green-500"
        }`}
      >
        {isRestricted ? "Restricted Shop" : "Active Shop"}
      </p>
      <div>
        <button
          onClick={handleDelete}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Delete
        </button>
        <button
          onClick={handleRestrictionToggle}
          className="mt-4 ml-2 px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
        >
          {isRestricted ? "Unrestrict?" : "Restrict?"}
        </button>
      </div>
    </div>
  );
};

export default ShopCard;
