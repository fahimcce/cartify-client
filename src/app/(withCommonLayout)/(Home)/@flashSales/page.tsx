/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/self-closing-comp */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-sort-props */
"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Link from "next/link";

import { flashProducts } from "@/src/services/productServices";
import { IProduct } from "@/src/types/ProductTypes";
import { useCart } from "@/src/hook/useCart";

export default function FlashSale() {
  const [flashSaleProducts, setFlashSaleProducts] = useState([]);
  const [timeLeft, setTimeLeft] = useState("");
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await flashProducts();

        setFlashSaleProducts(products);
      } catch {
        toast.error("Error fetching flash sale products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    // Countdown timer logic
    const targetTime = new Date().setHours(new Date().getHours() + 6); // 6-hour sale
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetTime - now;

      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft("Sale Ended");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-10 bg-gradient-to-b from-yellow-100 via-white to-yellow-50 min-h-screen">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl text-center mb-6 text-gray-800">
          Flash Sale - Dont Miss Out!
        </h2>
        <p className="text-center text-lg text-red-600 font-semibold mb-8">
          Ends in: <span className="font-bold">{timeLeft}</span>
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {loading ? (
            // Skeleton loaders while fetching products
            Array.from({ length: 12 }).map((_, index) => (
              <div
                key={index}
                className="border rounded-lg shadow-md bg-white p-4 animate-pulse"
              >
                <div className="w-full h-32 bg-gray-300 rounded-md mb-4"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
                <div className="h-8 bg-gray-300 rounded"></div>
              </div>
            ))
          ) : flashSaleProducts.length > 0 ? (
            // Product cards when data is loaded
            flashSaleProducts.map((product: IProduct) => (
              <div
                key={product.id}
                className="relative border rounded-lg shadow-md bg-white p-4 hover:shadow-lg transition duration-300"
              >
                <Link href={`/products/details/${product.id}`}>
                  <img
                    src={product.images}
                    alt={product.name}
                    className="w-full h-32 object-cover rounded-md mb-4"
                  />
                </Link>
                <h3 className="text-sm md:text-base font-semibold text-gray-800 mb-2">
                  {product.name}
                </h3>
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-lg md:text-xl font-bold text-red-600">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-xs md:text-sm line-through text-gray-500">
                    $1000
                  </span>
                </div>
                <button
                  onClick={() => addToCart(product)}
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:from-red-600 hover:to-red-700 transition"
                >
                  Add cart
                </button>
              </div>
            ))
          ) : (
            // Message when no products are available
            <div className="text-center text-gray-500 col-span-full">
              No products available for this flash sale.
            </div>
          )}
        </div>
        <div className="flex justify-center mt-4">
          <Link href="/flashsales">
            <button className="px-4 py-2 border hover:bg-green-600 hover:text-white shadow-lg">
              Explore more products...
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
