import React from "react";
import { user, orders } from "../data/UserData";
// import useUserStore from "../store/authStore";

const UserProfilePage = () => {
  // const { user } = useUserStore();
  // console.log(user);
  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-12">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center p-8 bg-indigo-600 text-white">
          <div className=" flex flex-col items-center">
            <img
              src={user.avatar}
              alt="User Avatar"
              className="w-24 h-24 rounded-full border-4 border-white shadow-lg mb-4 md:mb-0 md:mr-8"
            />
            <input
              type="file"
              id="fileUpload"
              accept="image/*"
              // onChange={handleFileChange}
              className="hidden"
            />
            <label
              htmlFor="fileUpload"
              className="border mt-4 cursor-pointer inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded">
              Upload Profile Image
            </label>
          </div>
          <div className="border">
            <h2 className="text-2xl font-bold ">{user.name}</h2>
            <p>{user.email}</p>
            <p>{user.phone}</p>
          </div>
        </div>

        {/* Profile Info */}
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Profile Info
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-600">Full Name</label>
              <input
                type="text"
                value={user.name}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 outline-indigo-500"
              />
            </div>
            <div>
              <label className="block text-gray-600">Email</label>
              <input
                type="email"
                value={user.email}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 outline-indigo-500"
              />
            </div>
            <div>
              <label className="block text-gray-600">Phone</label>
              <input
                type="tel"
                value={user.phone}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 outline-indigo-500"
              />
            </div>
            <div>
              <label className="block text-gray-600">Shipping Address</label>
              <textarea
                type="text"
                rows={4}
                value={user.address}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 outline-indigo-500 resize-none"
              />
            </div>
          </div>
        </div>

        {/* Order History */}
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Order History
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
                <tr>
                  <th className="py-3 px-6 text-left">Order ID</th>
                  <th className="py-3 px-6 text-left">Date</th>
                  <th className="py-3 px-6 text-left">Total</th>
                  <th className="py-3 px-6 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {orders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-6">{order.id}</td>
                    <td className="py-3 px-6">{order.date}</td>
                    <td className="py-3 px-6">${order.total.toFixed(2)}</td>
                    <td className="py-3 px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
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
        <div className="p-6 border-t text-right">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-lg shadow">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
