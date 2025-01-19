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
    <div className="border p-4 shadow-lg hover:shadow-lg transition">
      <div className="mb-4">
        <Image
          src={shop?.shopLogo}
          alt={`${shopName} logo`}
          className="w-full h-60"
          height={150}
          width={250}
        />
        <h2 className="text-xl text-center mt-1">{shopName}</h2>
      </div>
      <h2 className="text-xl font-semibold">Follower: {followerCount}</h2>
      <p className="text-gray-600">Address: {address}</p>
      <p className="text-gray-600 mt-2">Owner : {vendor.name}</p>

      <div className="flex justify-between">
        <div>
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
        <div>
          <button
            onClick={handleGoToShop}
            className=" bg-green-500 text-white py-2 px-4 rounded hover:bg-purple-700"
          >
            Go to {shopName}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
