/* eslint-disable import/order */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable @next/next/no-img-element */
"use client";

import { Tcategory } from "@/src/types";
import { useRouter } from "next/navigation";

interface CardProps {
  category: Tcategory;
}

export default function CategoryCard({ category }: CardProps) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/products/categoryProducts/${category.id}`)}
      className="relative rounded-lg shadow-md hover:shadow-lg bg-white overflow-hidden group cursor-pointer"
    >
      <img
        src={category.categoryImage}
        alt={category.name}
        className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300 pointer-events-none"
      />
      <div className="absolute inset-0 bg-black bg-opacity-25 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h2 className="text-white text-lg font-semibold">{category.name}</h2>
      </div>
    </div>
  );
}
