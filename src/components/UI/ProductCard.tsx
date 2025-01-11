/* eslint-disable import/order */
/* eslint-disable padding-line-between-statements */
/* eslint-disable react/jsx-sort-props */
"use client";

import { duplicateProduct } from "@/src/services/vendor/vendorServices";
import { IProduct } from "@/src/types/ProductTypes";
import { Card, CardHeader, CardBody, Image, Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ProductCardProps {
  product: IProduct;
  handleDelete: (id: string) => void;
  onDuplicateSuccess: (newProduct: any) => void;
}

export default function ProductCard({
  product,
  handleDelete,
  onDuplicateSuccess,
}: ProductCardProps) {
  const { id, images, name, description, price, inventoryCount, discount } =
    product;

  const router = useRouter();

  const handleUpdate = () => {
    router.push(`/products/update/${id}`);
  };

  const handleDuplicate = async () => {
    try {
      const newProduct = await duplicateProduct(id as string);
      toast.success("Product duplicated successfully!");
      onDuplicateSuccess(newProduct);
    } catch {
      toast.error("Failed to duplicate product.");
    }
  };

  return (
    <Card key={id} className="p-4 shadow-md">
      <CardHeader className="flex justify-center">
        <Image
          alt={name}
          src={images || "https://via.placeholder.com/150"}
          className="w-40 h-40 object-cover rounded-lg"
        />
      </CardHeader>
      <CardBody>
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-gray-500 line-clamp-2">{description}</p>
        <div className="flex justify-between mt-2">
          <span className="font-bold text-primary">${price}</span>
          <span className="text-gray-600">Inventory: {inventoryCount}</span>
        </div>
        {discount > 0 && (
          <div className="mt-2 text-sm text-red-500">{discount}% OFF</div>
        )}
        <div className="flex justify-between mt-4">
          <Button
            color="primary"
            variant="solid"
            size="sm"
            onPress={handleUpdate}
          >
            Update
          </Button>
          <Button
            color="secondary"
            variant="solid"
            size="sm"
            onPress={handleDuplicate}
          >
            Duplicate
          </Button>
          <Button
            color="danger"
            variant="solid"
            size="sm"
            onPress={() => handleDelete(id as string)}
          >
            Delete
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
