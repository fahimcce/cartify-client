/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable import/order */
"use client";

import { useAuth } from "@/src/context/AuthContext";
import { getMyOrder } from "@/src/services/orderServices/orderServices";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import OrdersList from "./OrdersList";

export default function GetOrders() {
  const { user } = useAuth(); // Assuming `useAuth` provides the authenticated user
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) {
      toast.error("User not authenticated.");

      return;
    }

    const fetchOrders = async () => {
      try {
        const data = await getMyOrder(user.id);

        setOrders(data?.data || []);
      } catch (error) {
        toast.error("Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user?.id]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      {orders.length > 0 ? (
        <OrdersList orders={orders} /> // Pass orders to a child component
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
}
