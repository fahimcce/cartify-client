"use client";
/* eslint-disable prettier/prettier */
import { Image } from "@nextui-org/react";
export default function LandingPage() {
  return (
    <section className="bg-default-50 py-10 px-5 md:px-20">
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        {/* Text Content */}
        <div className="md:w-1/2 text-center md:text-left">
          <p className="text-red-500 font-semibold mb-2">
            Best for your categories
          </p>
          <h1 className="text-4xl md:text-5xl font-bold leading-snug mb-4">
            Exclusive Collection <br />
            in{" "}
            <span className="bg-default-200 px-2 inline-block">
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
              <p className="text-lg font-semibold">Discount Price</p>
              <p className="text-3xl font-bold text-default-800">$140.00</p>
            </div>
            <button className="bg-black text-white px-6 py-3 rounded-lg shadow hover:bg-gray-800 transition">
              Shop Now
            </button>
          </div>
        </div>
        {/* Image */}
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center relative">
          <div className="rounded-lg overflow-hidden">
            <Image
              src="https://img.freepik.com/free-photo/woman-with-bright-shopping-bags-talking-by-phone-wooden-wall_23-2148042915.jpg?semt=ais_hybrid"
              alt="Exclusive Collection"
              width={400}
              height={500}
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
