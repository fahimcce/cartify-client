/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/order */
/* eslint-disable padding-line-between-statements */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-console */
"use client";
import { useAuth } from "@/src/context/AuthContext";
import { Tshop } from "@/src/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface ShopCardProps {
  shop: Tshop;
}

const ShopPage: React.FC<ShopCardProps> = ({ shop }) => {
  const { user } = useAuth();
  const router = useRouter();
  const { id, shopName, shopLogo, address, vendor } = shop;

  const [isFollowed, setIsFollowed] = useState(false);
  const [followerCount, setFollowerCount] = useState(shop.follower);

  // Check if the shop is already followed
  useEffect(() => {
    const fetchFollowStatus = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_API}/shops/followed/${user.id}`
        );
        const followedShops = response.data.data;
        const alreadyFollowed = followedShops.some((s: Tshop) => s.id === id);
        setIsFollowed(alreadyFollowed);
      } catch (error) {
        toast.error("Unable to check follow status");
      }
    };

    if (user?.id) {
      fetchFollowStatus();
    }
  }, [user?.id, id]);

  // Handle follow shop
  const handleFollow = async () => {
    try {
      const requestData = {
        customerId: user.id,
        shopId: id,
      };
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API}/shops/follow`,
        requestData
      );
      if (response.data.success) {
        toast.success(`Followed ${shopName} successfully`);
        setIsFollowed(true); // Update follow state
        setFollowerCount((prev) => prev + 1); // Increment follower count dynamically
      }
    } catch (error: any) {
      toast.error("Unable to follow the shop");
    }
  };

  // Handle unfollow shop
  const handleUnfollow = async () => {
    try {
      const requestData = {
        customerId: user.id,
        shopId: id,
      };
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API}/shops/unfollow`,
        requestData
      );
      if (response.data.success) {
        toast.success(`Unfollowed ${shopName} successfully`);
        setIsFollowed(false); // Update follow state
        setFollowerCount((prev) => Math.max(prev - 1, 0)); // Decrement follower count dynamically
      }
    } catch (error: any) {
      console.error("Error unfollowing the shop:", error);
      toast.error("Unable to unfollow the shop");
    }
  };

  const handleGoToShop = () => {
    router.push(`/shops/details/${id}`);
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
      <h2 className="text-xl font-semibold">Follower: {followerCount}</h2>
      <p className="text-gray-600">Address: {address}</p>
      <p className="text-gray-600 mt-2">Vendor: {vendor.name}</p>
      <div className="relative h-[100px] w-full">
        <button
          onClick={handleGoToShop}
          className="absolute bottom-0 right-0 w-[200px] bg-green-500 text-white py-2 px-4 rounded hover:bg-purple-700 transition"
        >
          Go to {shopName}
        </button>
        {isFollowed ? (
          <button
            onClick={handleUnfollow}
            className="absolute bg-red-500 text-white py-2 px-4 rounded hover:bg-purple-700"
          >
            Unfollow
          </button>
        ) : (
          <button
            onClick={handleFollow}
            className="absolute bg-green-500 text-white py-2 px-4 rounded hover:bg-purple-700"
          >
            Follow
          </button>
        )}
      </div>
    </div>
  );
};

export default ShopPage;
