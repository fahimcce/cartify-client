/* eslint-disable react/jsx-sort-props */
"use client";
import { Image } from "@nextui-org/react";
import { useRouter } from "next/navigation";
export default function LandingPage() {
  const router = useRouter();

  return (
    <section className="py-10 px-5 md:px-20">
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 text-center md:text-left">
          <p className="text-red-500 font-semibold mb-2">
            Best for your categories
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-green-600 mb-4">
            Exclusive Collection <br />
            in
            <span className="bg-green-600 text-white px-2 inline-block">
              Our Online Store
            </span>
          </h1>
          <p className="text-default-600 mb-6">
            Discover our exclusive collection available only in our online
            store. Shop now for unique and premium items that you wont find
            anywhere else.
          </p>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="text-left">
              <p className="text-lg font-semibold">Total Discount </p>
              <p className="text-3xl font-bold text-default-800">$15000.00</p>
            </div>
            <button
              onClick={() => router.push("/products")}
              className="bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-gray-800 transition"
            >
              Shop Now
            </button>
          </div>
        </div>

        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center relative">
          <div className="overflow-hidden">
            <Image
              src="https://i.ibb.co.com/5v84QJH/het.png"
              alt="Exclusive Collection"
              width={400}
              height={500}
              className="rounded-sm"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
