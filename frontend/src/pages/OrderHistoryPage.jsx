import React from "react";

const orders = [
  {
    id: "123456",
    date: "2025-05-25",
    total: "$85.00",
    status: "Delivered",
    items: 3,
  },
  {
    id: "789012",
    date: "2025-05-15",
    total: "$120.00",
    status: "Shipped",
    items: 5,
  },
];

const OrderHistoryPage = () => {
  return (
    <div className="w-full max-w-5xl mx-auto px-2 sm:px-4 py-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">📜 Order History</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="p-4 sm:p-6 bg-white  rounded-lg shadow-sm flex flex-col sm:flex-row sm:justify-between gap-4">
            <div>
              <p className="font-semibold">Order #{order.id}</p>
              <p className="text-gray-500 text-sm">Placed on {order.date}</p>
              <p className="text-gray-500 text-sm">{order.items} items</p>
            </div>
            <div className="text-right sm:text-left">
              <p className="font-medium text-lg">{order.total}</p>
              <p
                className={`text-sm font-semibold ${
                  order.status === "Delivered"
                    ? "text-green-600"
                    : "text-yellow-500"
                }`}>
                {order.status}
              </p>
              <button className="mt-2 text-indigo-600 hover:underline text-sm">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistoryPage;
