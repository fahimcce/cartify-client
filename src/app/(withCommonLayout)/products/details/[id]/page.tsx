"use client";
/* eslint-disable react/jsx-sort-props */
/* eslint-disable import/order */

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useCart } from "@/src/hook/useCart";
import { Spinner } from "@nextui-org/spinner";
import { useQuery } from "@tanstack/react-query";
import { getProductReviews } from "@/src/services/orderServices/orderServices";
import { IProduct } from "@/src/types/ProductTypes";
import { getSingleProduct } from "@/src/services/productServices";

export default function ProductDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const { addToCart } = useCart();

  const {
    data: productData,
    isLoading: isProductLoading,
    isError: isProductError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getSingleProduct(id),
    enabled: !!id,
  });

  const {
    data: reviews,
    isLoading: isReviewsLoading,
    isError: isReviewsError,
  } = useQuery({
    queryKey: ["product-reviews", id],
    queryFn: () => getProductReviews(id),
    enabled: !!id,
  });

  const product: IProduct | null = productData?.data || null;

  const averageRating = reviews?.length
    ? reviews.reduce((sum: number, r: any) => sum + r.rating, 0) /
      reviews.length
    : null;

  const shopId = product?.shop?.id;
  const handleGoToShop = () => {
    router.push(`/shops/details/${shopId}`);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <span
        key={i}
        className={`text-lg ${
          i < Math.round(rating) ? "text-yellow-500" : "text-gray-300"
        }`}
      >
        ★
      </span>
    ));
  };

  if (isProductLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner color="warning" label="Loading product..." />
      </div>
    );

  if (isProductError || !product)
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        Failed to load product details.
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-6 min-h-screen">
      <button
        onClick={() => router.back()}
        className="mb-4 bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition"
      >
        Back
      </button>

      {/* Product Detail Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex justify-center items-center">
          {product.images ? (
            <Image
              src={product.images}
              alt={product.name}
              width={500}
              height={500}
              className="rounded-lg h-96 object-cover"
            />
          ) : (
            <div className="w-[500px] h-[500px] bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
              No Image
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center space-y-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-lg text-gray-600">
            <span className="font-semibold">Inventory:</span>{" "}
            {product.inventoryCount}
          </p>
          <p className="text-lg">
            <span className="font-semibold text-green-600">Price:</span> $
            {product.price}
          </p>
          <p className="text-lg text-red-500">
            <span className="font-semibold">Discount:</span> {product.discount}%
          </p>

          <div className="flex items-center justify-between gap-4">
            <p className="text-lg">
              <span className="font-semibold text-green-600">Shop Name:</span>{" "}
              {product?.shop?.shopName}
            </p>

            <button
              onClick={handleGoToShop}
              className="w-[200px] bg-green-500 text-white py-2 px-4 rounded hover:bg-purple-700 transition"
            >
              Visit Shop
            </button>
          </div>

          <p className="text-gray-700">Details: {product.description}</p>

          <button
            onClick={() => addToCart(product)}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>

        {isReviewsLoading ? (
          <p className="text-gray-500">Loading reviews...</p>
        ) : isReviewsError ? (
          <p className="text-red-500">Failed to load reviews.</p>
        ) : reviews?.length ? (
          <>
            <div className="flex items-center mb-4">
              <span className="text-lg font-semibold mr-2">
                Average Rating:
              </span>
              {renderStars(averageRating!)}
              <span className="ml-2 text-gray-600">
                ({averageRating?.toFixed(1)})
              </span>
            </div>

            <div className="space-y-4">
              {reviews.map(
                ({ rating, review, customerName }: any, index: number) => (
                  <div
                    key={index}
                    className="bg-gray-100 p-4 rounded-lg shadow-md border border-gray-300"
                  >
                    <div className="flex items-center mb-2">
                      {renderStars(rating)}
                    </div>
                    <p className="text-gray-700">{review}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      - {customerName}
                    </p>
                  </div>
                )
              )}
            </div>
          </>
        ) : (
          <p className="text-gray-500">
            No reviews available for this product.
          </p>
        )}
      </div>
    </div>
  );
}
