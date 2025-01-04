/* eslint-disable react/self-closing-comp */
/* eslint-disable padding-line-between-statements */
/* eslint-disable no-console */
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { CategoryBasedProducts } from "@/src/services/Category Services/CategoryServices";
import ProductCard from "@/src/components/modules/products/productCard";
import { IProduct } from "@/src/types/ProductTypes";

export default function CategoryProducts() {
  const params = useParams();
  const id = params?.id;
  const [products, setProducts] = useState<IProduct[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await CategoryBasedProducts(id as string);
        setProducts(response);
      } catch {
        toast.error("Failed to fetch product details.");
        setProducts(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="spinner border-4 border-blue-500 border-t-transparent rounded-full w-12 h-12 animate-spin"></div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="flex items-center justify-center h-48">
        <p className="text-lg font-medium text-gray-500">
          No products found for this category.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 h-screen">
      {products.map((product: IProduct) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
