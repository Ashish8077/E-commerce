import React from "react";
import { orders } from "../data/UserData";
import useUserStore from "../store/authStore";

const UserProfilePage = () => {
  const { user } = useUserStore();
  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-12">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center p-6 sm:p-8 bg-indigo-600 text-white gap-4">
          <div className="flex flex-col items-center sm:items-start w-full sm:w-auto">
            <img
              src={user.avatar}
              alt="User Avatar"
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white shadow-lg mb-2"
            />
            <input
              type="file"
              id="fileUpload"
              accept="image/*"
              className="hidden"
            />
            <label
              htmlFor="fileUpload"
              className="border mt-2 sm:mt-4 cursor-pointer inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 sm:px-4 sm:py-2 rounded text-sm sm:text-base">
              Upload Profile Image
            </label>
          </div>
          <div className="w-full sm:w-auto sm:ml-6">
            <h2 className="text-lg sm:text-2xl font-bold break-words">
              {user.fullName}
            </h2>
            <p className="text-sm sm:text-base">{user.email}</p>
            <p className="text-sm sm:text-base">+918979682265</p>
          </div>
        </div>

        {/* Profile Info */}
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
            Profile Info
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-gray-600 text-sm sm:text-base">
                Full Name
              </label>
              <input
                type="text"
                value={user.fullName}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:ring-indigo-500 focus:border-indigo-500 outline-indigo-500"
              />
            </div>
            <div>
              <label className="block text-gray-600 text-sm sm:text-base">
                Email
              </label>
              <input
                type="email"
                value={user.email}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:ring-indigo-500 focus:border-indigo-500 outline-indigo-500"
              />
            </div>
            <div>
              <label className="block text-gray-600 text-sm sm:text-base">
                Phone
              </label>
              <input
                type="tel"
                value={user.phone}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:ring-indigo-500 focus:border-indigo-500 outline-indigo-500"
              />
            </div>
            <div>
              <label className="block text-gray-600 text-sm sm:text-base">
                Shipping Address
              </label>
              <textarea
                rows={4}
                value={user.address}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:ring-indigo-500 focus:border-indigo-500 outline-indigo-500 resize-none"
              />
            </div>
          </div>
        </div>

        {/* Order History */}
        <div className="p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
            Order History
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 text-gray-600 uppercase">
                <tr>
                  <th className="py-2 px-4 text-left">Order ID</th>
                  <th className="py-2 px-4 text-left">Date</th>
                  <th className="py-2 px-4 text-left">Total</th>
                  <th className="py-2 px-4 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {orders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4">{order.id}</td>
                    <td className="py-2 px-4">{order.date}</td>
                    <td className="py-2 px-4">₹{order.total.toFixed(2)}</td>
                    <td className="py-2 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-800"
                            : order.status === "Shipped"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                        }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Actions */}
        <div className="p-4 sm:p-6 border-t text-right">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 sm:px-6 py-2 rounded-lg shadow text-sm sm:text-base">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
