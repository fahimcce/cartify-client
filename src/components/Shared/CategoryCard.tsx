/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable import/order */
/* eslint-disable react/jsx-sort-props */
"use client";
import Image from "next/image";
import { Tcategory } from "@/src/types";
import { useRouter } from "next/navigation";

export default function CategoryCard({ props }: { props: Tcategory }) {
  const { id, name, categoryImage } = props;
  const router = useRouter();

  return (
    <div className="rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4 bg-white text-center">
      <div
        onClick={() => router.push(`/products/categoryProducts/${id}`)}
        className="w-full h-32 flex items-center justify-center bg-gray-100 rounded-md overflow-hidden cursor-pointer"
      >
        <Image
          src={categoryImage}
          alt={name}
          height={100}
          width={200}
          className="object-cover h-full w-full"
        />
      </div>
      <h2 className="mt-4 text-lg font-semibold text-gray-800">{name}</h2>
    </div>
  );
}
