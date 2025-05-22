/* eslint-disable padding-line-between-statements */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable no-console */
/* eslint-disable import/order */
"use client";
import { useState } from "react";
import { Iorder } from "@/src/types/orderType";
import { FaStar } from "react-icons/fa";
import { Calendar, CreditCard, ShoppingBag, X } from "lucide-react";
import { postReview } from "@/src/services/orderServices/orderServices";
import { toast } from "sonner";

export default function OrdersList({ orders }: { orders: Iorder[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const [selectedProductName, setSelectedProductName] = useState<string | null>(
    null
  );
  const [review, setReview] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const reviewSubmit = (id: string, name: string) => {
    setSelectedProductId(id);
    setSelectedProductName(name);
    setIsModalOpen(true);
  };

  const handleReviewSubmit = async () => {
    if (!selectedProductId || !rating || !review) {
      toast.error("Please fill out all fields before submitting your review.");
      return;
    }

    const reviewData = {
      productId: selectedProductId,
      rating: rating,
      review: review,
    };

    try {
      setLoading(true);
      await postReview(reviewData);
      toast.success("Review added successfully!");
      closeModal();
    } catch {
      toast.error("Failed to submit review. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProductId(null);
    setSelectedProductName(null);
    setReview("");
    setRating(0);
  };

  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <div
          key={order.id}
          className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md"
        >
          {/* Order Header */}
          <div className="bg-gray-50 p-4 border-b border-gray-100">
            <div className="flex flex-wrap gap-4 justify-between items-center">
              <div className="flex gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(order.orderDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <CreditCard className="w-4 h-4" />
                  <span>{order.PaymentStatus}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="divide-y divide-gray-100">
            {order.orderItems.map((item) => (
              <div
                key={item.id}
                className="p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex flex-wrap gap-4 justify-between items-center">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">
                      {item.product.name}
                    </h3>
                    <div className="mt-1 flex gap-4 text-sm text-gray-600">
                      <span>Quantity: {item.quantity}</span>
                      <span className="font-medium text-gray-900">
                        ${item.price}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      reviewSubmit(item.product.id, item.product.name)
                    }
                    className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                  >
                    Write Review
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Status */}
          <div className="bg-gray-50 px-4 py-3 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-900">
                Status:{" "}
              </span>
              <span
                className={`text-sm ${
                  order.orderStatus === "Delivered"
                    ? "text-green-600"
                    : order.orderStatus === "Pending"
                    ? "text-yellow-600"
                    : "text-blue-600"
                }`}
              >
                {order.orderStatus}
              </span>
            </div>
          </div>
        </div>
      ))}

      {/* Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm"
            onClick={closeModal}
          ></div>
          <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md m-4 p-6">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Write a Review
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                for {selectedProductName}
              </p>
            </div>

            {/* Rating */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className="focus:outline-none"
                  >
                    <FaStar
                      className={`w-6 h-6 ${
                        star <= rating ? "text-yellow-400" : "text-gray-200"
                      } transition-colors hover:text-yellow-400`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Review Text */}
            <div className="mb-6">
              <label
                htmlFor="review"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Your Review
              </label>
              <textarea
                id="review"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="w-full min-h-[100px] p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-shadow"
                placeholder="Share your experience with this product..."
              ></textarea>
            </div>

            {/* Actions */}
            <div className="flex gap-3 justify-end">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleReviewSubmit}
                disabled={loading}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Submitting...</span>
                  </div>
                ) : (
                  "Submit Review"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
