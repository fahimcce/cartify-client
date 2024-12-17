/* eslint-disable import/order */
"use client";
import { IProduct } from "@/src/types/ProductTypes";
import { Button } from "@nextui-org/button";
import { Card, CardFooter, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/react";

export default function FeatureCard({ product }: { product: IProduct }) {
  return (
    <Card isFooterBlurred className="h-[400px] relative">
      <CardHeader className="absolute z-10 top-1 flex-col items-start">
        <p className="text-tiny text-default-600 uppercase font-bold">
          In Stock : {product.inventoryCount}
        </p>
        <h4 className="text-red font-medium text-2xl">{product.name}</h4>
      </CardHeader>

      {/* Price Section */}
      <div className="absolute top-2 right-2 bg-black text-white text-sm px-3 py-1 rounded-full z-20 shadow-md">
        ${product.price}
      </div>

      <Image
        removeWrapper
        alt={product.description}
        className="z-0 w-full h-64 object-cover"
        src={product.images}
      />
      <CardFooter className="absolute bg-black/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
        <div>
          <p className="text-white text-tiny">{product.description}</p>
        </div>
        <Button className="text-tiny" color="primary" radius="full" size="sm">
          Buy Now
        </Button>
      </CardFooter>
    </Card>
  );
}
