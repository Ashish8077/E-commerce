import React from "react";
import { Trash } from "lucide-react";

const CartPage = () => {
  return (
    <div className="w-full px-2 sm:px-4 md:px-6 py-6 max-w-6xl mx-auto">
      <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 md:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 border-b pb-4">
          🛒 Shopping Cart
        </h1>

        {/* Cart Items */}
        <div className="space-y-6">
          {/* Cart Item */}
          {[1, 2, 3, 4, 5, 6].map((_, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-4">
              <div className="flex items-center gap-4">
                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Item"
                  className="w-20 h-20 object-cover rounded-md flex-shrink-0"
                />
                <div className="text-sm sm:text-base">
                  <h2 className="font-semibold truncate max-w-[150px] sm:max-w-none">
                    Product Name
                  </h2>
                  <p className="text-gray-500">$40.00</p>
                </div>
              </div>

              <div className="">
                <button className="w-8 h-8 bg-gray-100 shadow-md  rounded hover:bg-gray-200 text-xl cursor-pointer">
                  −
                </button>
                <span className="text-lg px-2">1</span>
                <button className="w-8 h-8 bg-gray-100 shadow-md   rounded hover:bg-gray-200 text-xl  cursor-pointer">
                  +
                </button>
              </div>

              <div className="text-lg font-medium t ">$40.00</div>

              <button className="text-red-500 hover:text-red-700 text-sm sm:text-base cursor-pointer">
                <Trash />
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="mt-8 bg-gray-50 p-4 sm:p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-2 text-sm sm:text-base text-gray-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>$90.00</span>
            </div>
            <div className="flex justify-between">
              <span>Discount</span>
              <span>−$10.00</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2 border-t">
              <span>Total</span>
              <span>$80.00</span>
            </div>
          </div>
          <button className="mt-6 w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition duration-200">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
