/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable import/order */
/* eslint-disable padding-line-between-statements */
"use client";

import { useEffect, useState } from "react";
import { Spinner } from "@nextui-org/react";
import ProductCard from "../../UI/ProductCard";
import {
  deleteProduct,
  fetchProducts,
  TProduct,
} from "@/src/services/vendor/vendorServices";
import { toast } from "sonner";

export default function ShopProducts() {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Load all products
  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchProducts();
      setProducts(data);
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Handle product deletion
  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id);
      toast.success("Product deleted successfully!");
      setProducts((prevProducts) => prevProducts.filter((p) => p.id !== id));
    } catch (error) {
      toast.error("Failed to delete product.");
    }
  };

  const handleDuplicateSuccess = (newProduct: TProduct) => {
    setProducts((prevProducts) => [newProduct, ...prevProducts]);
  };

  return (
    <div className="shop-products-container">
      <h2 className="text-center text-2xl font-bold mb-6">Shop Products</h2>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner size="lg" color="primary" label="Loading products..." />
        </div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              handleDelete={handleDelete}
              onDuplicateSuccess={handleDuplicateSuccess}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          No products available.
        </div>
      )}
    </div>
  );
}
