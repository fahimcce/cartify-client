/* eslint-disable no-console */
/* eslint-disable import/order */
/* eslint-disable padding-line-between-statements */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-sort-props */
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Input, Button } from "@nextui-org/react";
import { toast } from "sonner";
import { updateProduct } from "@/src/services/vendor/vendorServices";

export default function UpdateProductPage() {
  const params = useParams();
  const id = params?.id as string; // Type-cast id to string

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    inventoryCount: "",
    discount: "",
  });

  useEffect(() => {
    if (!id) {
      toast.error("Invalid product ID.");
      return;
    }

    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API}/products/${id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch product details.");
        }
        const product = await response.json();
        // Handle nested response if the product data is nested
        const productData = product?.data || product;
        setFormData({
          name: productData.name || "",
          description: productData.description || "",
          price: productData.price?.toString() || "",
          inventoryCount: productData.inventoryCount?.toString() || "",
          discount: productData.discount?.toString() || "",
        });
      } catch (error) {
        toast.error("Failed to fetch product details.");
      }
    };

    fetchProduct();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdateSubmit = async () => {
    if (!id) {
      toast.error("Invalid product ID.");
      return;
    }

    setLoading(true);

    const payload = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      inventoryCount: parseInt(formData.inventoryCount),
      discount: parseFloat(formData.discount),
    };

    console.log("Payload Sent to Server:", payload); // Check the data before sending

    try {
      await updateProduct(id, payload);
      toast.success("Product updated successfully!");
    } catch (error) {
      toast.error("Failed to update product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">Update Product</h1>
      <div className="w-full max-w-lg space-y-4">
        <Input
          label="Product Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          fullWidth
        />
        <Input
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          fullWidth
        />
        <Input
          label="Price"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleInputChange}
          fullWidth
        />
        <Input
          label="Inventory Count"
          name="inventoryCount"
          type="number"
          value={formData.inventoryCount}
          onChange={handleInputChange}
          fullWidth
        />
        <Input
          label="Discount"
          name="discount"
          type="number"
          value={formData.discount}
          onChange={handleInputChange}
          fullWidth
        />
        <Button
          color="primary"
          onPress={handleUpdateSubmit}
          disabled={loading}
          fullWidth
        >
          {loading ? "Updating..." : "Update Product"}
        </Button>
      </div>
    </div>
  );
}
