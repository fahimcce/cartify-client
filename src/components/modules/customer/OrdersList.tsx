/* eslint-disable react/self-closing-comp */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable no-console */
/* eslint-disable import/order */
"use client";
import { useState } from "react";
import { Iorder } from "@/src/types/orderType";
import { FaStar } from "react-icons/fa";
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
  const [loading, setLoading] = useState<boolean>(false); // Loading state

  const reviewSubmit = (id: string, name: string) => {
    setSelectedProductId(id);
    setSelectedProductName(name);
    setIsModalOpen(true);
  };

  const handleReviewSubmit = async () => {
    if (!selectedProductId || !rating || !review) {
      alert("Please fill out all fields before submitting your review.");

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

      toast.success("Review add ssuccessFully");

      // Reset the form and close the modal
      setReview("");
      setRating(0);
      setIsModalOpen(false);
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
    <div className="space-y-4">
      {orders.map((order) => (
        <div
          key={order.id}
          className="border rounded-lg p-4 flex justify-between items-center"
        >
          <div>
            <h2 className="text-lg font-semibold">Order ID: {order.id}</h2>
            <p className="text-sm text-gray-600">
              Order Date: {new Date(order.orderDate).toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">
              Order Status: {order.orderStatus}
            </p>
            <p className="text-sm text-gray-600">
              Payment Status: {order.PaymentStatus}
            </p>

            {/* Iterate over orderItems to display product details */}
            {order.orderItems.map((item) => (
              <div key={item.id} className="mt-2">
                <p className="text-sm text-gray-600">
                  Product Name: {item.product.name}
                </p>
                <p className="text-sm text-gray-600">
                  Quantity: {item.quantity}
                </p>
                <p className="text-sm text-gray-600">Price: ${item.price}</p>
                <button
                  onClick={() =>
                    reviewSubmit(item.product.id, item.product.name)
                  }
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Review
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-25">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Submit Your Review</h2>
            <p className="text-gray-600 mb-4">
              You are reviewing product: {selectedProductName}
            </p>
            {/* Star Rating */}
            <div className="flex mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={`cursor-pointer text-2xl ${
                    star <= rating ? "text-yellow-500" : "text-gray-300"
                  }`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
            {/* Review form */}
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="w-full p-2 border rounded mb-4"
              placeholder="Write your review..."
            ></textarea>
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="bg-gray-300 px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleReviewSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                {loading ? (
                  <svg
                    className="animate-spin h-5 w-5 mx-auto"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
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
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
