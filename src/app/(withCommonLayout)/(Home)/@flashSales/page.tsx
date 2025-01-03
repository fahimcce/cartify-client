/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-sort-props */
"use client";

import { useEffect, useState } from "react";

export default function FlashSale() {
  const [flashSaleProducts, setFlashSaleProducts] = useState([
    {
      id: 1,
      name: "Wireless Headphones",
      price: 59.99,
      discountPrice: 39.99,
      imageUrl:
        "https://images-cdn.ubuy.co.in/636e5231bbadec17c37f2dd4-wireless-ear-buds-bluetooth-headphones.jpg",
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 129.99,
      discountPrice: 89.99,
      imageUrl:
        "https://images-cdn.ubuy.co.in/65585d8185f7a70bf67a0617-szbxd-smart-watch-for-kids-kids-smart.jpg",
    },
    {
      id: 3,
      name: "Gaming Mouse",
      price: 49.99,
      discountPrice: 29.99,
      imageUrl: "https://example.com/mouse.jpg",
    },
  ]);

  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
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
    <section className="py-10 bg-yellow-50">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
          Flash Sale - Hurry Up!
        </h2>
        <p className="text-center text-lg text-red-600 font-semibold mb-8">
          Ends in: {timeLeft}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {flashSaleProducts.map((product) => (
            <div
              key={product.id}
              className="relative border rounded-lg shadow-md bg-white p-4 hover:shadow-lg transition duration-300"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold text-red-600">
                  ${product.discountPrice.toFixed(2)}
                </span>
                <span className="text-sm line-through text-gray-500">
                  ${product.price.toFixed(2)}
                </span>
              </div>
              <button className="mt-4 w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition">
                Buy Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
