"use client";
import { Tshop } from "@/src/types";

interface ShopCardProps {
  shop: Tshop; // This ensures the shop prop is typed correctly
}

const ShopCard: React.FC<ShopCardProps> = ({ shop }) => {
  const { shopName, shopLogo, address, vendor } = shop;
  // Delete button logic will go here when you implement it
  const handleDelete = () => {
    console.log(`Delete shop: ${shopName}`);
    // Add API call for deletion here when ready
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
      <button
        onClick={handleDelete}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Delete
      </button>
    </div>
  );
};

export default ShopCard;
