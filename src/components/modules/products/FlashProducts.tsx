/* eslint-disable import/order */
"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { IProduct } from "@/src/types/ProductTypes";
import { flashProducts } from "@/src/services/productServices";
import { SkeletonCard } from "./products";
import FeatureCard from "../Home/FeatureCard";

export default function FlashSalePage() {
  const [products, setProducts] = useState<IProduct[] | null>(null);
  const [timer, setTimer] = useState<string>("");

  const flashSaleEndTime = new Date("2025-01-20T00:00:00Z").getTime();

  useEffect(() => {
    const fetchFlashProducts = async () => {
      try {
        const flashSaleData = await flashProducts();

        if (flashSaleData.error) {
          toast.error(flashSaleData.error);

          return;
        }
        setProducts(flashSaleData);
      } catch {
        toast.error("Failed to fetch flash sale products.");
      }
    };

    fetchFlashProducts();

    // Set the timer
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = flashSaleEndTime - now;

      if (distance <= 0) {
        clearInterval(interval);
        setTimer("Flash Sale Ended");
      } else {
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimer(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mx-auto p-6 min-h-screen">
      {/* Flash Sale Timer */}
      <div className="text-center py-4 bg-red-500 text-white rounded-lg mb-6">
        <h2 className="text-2xl font-semibold">
          30% OFF <br />
          Flash Sale Ending In:
        </h2>
        <p className="text-xl">{timer}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-1">
        {products === null
          ? // Skeleton cards while loading
            Array.from({ length: 12 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : // Product cards after data is loaded
            products.map((product: IProduct) => (
              <FeatureCard key={product.id} product={product} />
            ))}
      </div>
    </div>
  );
}
