/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-sort-props */
"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useParams } from "next/navigation";

import { IProduct } from "@/src/types/ProductTypes";
import { getSingleShopProducts } from "@/src/services/ShopServices/ShopService";
import { useCart } from "@/src/hook/useCart";

export default function ShopDetailsPage() {
  const [shop, setShop] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const id = params?.id;
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchShopDetails = async () => {
      try {
        const data = await getSingleShopProducts(id as string);

        setShop(data.data);
      } catch (error) {
        toast.error("Failed to fetch shop details");
      } finally {
        setLoading(false);
      }
    };

    fetchShopDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;

  if (!shop) return <p>Shop not found!</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Shop Details */}
      <div className="flex items-center mb-8">
        <img
          src={shop.shopLogo}
          alt={shop.shopName}
          className="w-24 h-24 rounded-full mr-6"
        />
        <div>
          <h1 className="text-3xl font-bold">{shop.shopName}</h1>
          <p className="text-gray-600">{shop.description}</p>
          <p className="text-gray-600">
            <span className="font-semibold">Address:</span> {shop.address}
          </p>
        </div>
      </div>

      {/* Shop Products */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {shop.products.map((product: IProduct) => (
            <div
              key={product.id}
              className="border rounded-lg p-4 hover:shadow-lg transition"
            >
              <img
                src={product.images}
                alt={product.name}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-bold">{product.name}</h3>
              <p className="text-sm text-gray-600">{product.description}</p>
              <p className="text-green-600 font-semibold">
                Price: ${product.price}
              </p>
              <button
                onClick={() => addToCart(product)}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded mt-2 hover:bg-blue-600 transition"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
