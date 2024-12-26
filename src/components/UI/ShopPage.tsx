/* eslint-disable react/jsx-sort-props */
/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";

import { useAuth } from "@/src/context/AuthContext";
import { Tshop } from "@/src/types";
import {
  followShop,
  unfollowShop,
} from "@/src/services/ShopServices/ShopService";

interface ShopCardProps {
  shop: Tshop;
}

const ShopPage: React.FC<ShopCardProps> = ({ shop }) => {
  const { user } = useAuth();
  const router = useRouter();
  const { id, shopName, address, vendor } = shop;

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

  const handleFollow = async () => {
    const response = await followShop(user.id, id);

    if (response.success) {
      setFollowerCount((prev) => prev + 1);
      setIsFollowed(true);
      toast.success(`Followed ${shopName} successfully`);
    } else {
      toast.error(response.error || "Unable to follow the shop");
    }
  };

  const handleUnfollow = async () => {
    const response = await unfollowShop(user.id, id);

    if (response.success) {
      setFollowerCount((prev) => Math.max(prev - 1, 0));
      setIsFollowed(false);
      toast.success(`UnFollow ${shopName} successfully`);
    } else {
      toast.error("Unable to Unfollow the shop");
    }
  };

  const handleGoToShop = () => {
    router.push(`/shops/details/${id}`);
  };

  return (
    <div className="border p-4 rounded-md shadow-md hover:shadow-lg transition">
      <div className="flex items-center mb-4">
        <Image
          src={
            shop?.shopLogo ||
            "https://img.freepik.com/premium-psd/3d-render-online-shopping-store_252008-3047.jpg"
          }
          alt={`${shopName} logo`}
          className="w-16 h-16 object-cover rounded-full mr-4"
          height={150}
          width={250}
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
