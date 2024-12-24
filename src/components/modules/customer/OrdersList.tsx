"use client";

import { Iorder } from "@/src/types/orderType";

export default function OrdersList({ orders }: { orders: Iorder[] }) {
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
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
