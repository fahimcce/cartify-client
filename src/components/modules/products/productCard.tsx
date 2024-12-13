/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import Image from "next/image";

export default function ProductCard({ product }) {
  //   console.log(product);

  return (
    <div>
      <Card className="py-4">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="text-tiny uppercase font-bold">{product.name}</p>
          <small className="text-default-500">{product.description}</small>
          <h4 className="font-bold text-large">Frontend Radio</h4>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          {product?.images ? (
            <Image
              alt="Card background"
              className="object-cover rounded-xl"
              src={product.images}
              width={270}
              height={150}
            />
          ) : (
            <div className="w-[270px] h-[150px] bg-gray-200 rounded-xl flex items-center justify-center">
              <h1 className="text-sm text-gray-600">No Picture</h1>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
