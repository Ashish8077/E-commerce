import React from "react";
import { Check} from "lucide-react";
import { Link } from "react-router-dom";
const OrderConfirmationPage = () => {
  return (
    <div className="w-full px-2 sm:px-4 md:px-6 py-6 max-w-3xl mx-auto">
      <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 md:p-8 text-center">
        {/* Success Icon & Message */}
        <div className="mb-6">
          <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <Check size={30} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-green-700">
            Order Confirmed!
          </h1>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">
            Thank you for your purchase. Your order has been successfully
            placed.
          </p>
        </div>

        {/* Order Summary */}
        <div className="mt-6 text-left">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="bg-gray-50 p-4 rounded-lg text-sm sm:text-base space-y-4">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span>Order Number</span>
                <span className="font-medium">#123456</span>
              </div>
              <div className="flex justify-between">
                <span>Total</span>
                <span className="font-medium">$85.00</span>
              </div>
              <div className="flex justify-between">
                <span>Payment Method</span>
                <span className="font-medium">Visa **** 4242</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping To</span>
                <span className="font-medium text-right">
                  John Doe
                  <br />
                  123 Main St
                  <br />
                  New York, NY
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Preview */}
        <h2 className="text-xl font-semibold my-4 text-left">
          Purchased Items
        </h2>
        {[1, 2, 3, 4].map((_, i) => (
          <div className="mt-8 text-left">
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 shadow-md rounded-lg hover:shadow-xl">
                <div className="flex items-center gap-4">
                  <img
                    src="https://via.placeholder.com/60"
                    alt="Item"
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <p className="font-medium">Product Name</p>
                    <p className="text-gray-500 text-sm">Qty: 1</p>
                  </div>
                </div>
                <div className="font-medium">$40.00</div>
              </div>
            </div>
          </div>
        ))}

        {/* Continue Shopping */}
        <div className="mt-10">
          <Link
            to="/"
            className="w-full sm:w-auto bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700 transition cursor-pointer">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
