import React from "react";
import { useNavigate } from "react-router-dom";

const inputStyle =
  "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 outline-indigo-500";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const handlePlaceOrder = () => {
    navigate("/order-confirmation");
  };
  return (
    <div className="w-full px-2 sm:px-4 md:px-6 py-6 max-w-5xl mx-auto">
      <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 md:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 border-b pb-4">
          💳 Checkout
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Section: Form */}
          <div className="flex-1 space-y-6">
            {/* Billing Info */}
            <div>
              <h2 className="text-xl font-semibold mb-3">
                Billing Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className={inputStyle}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className={inputStyle}
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className={`${inputStyle} sm:col-span-2`}
                />
              </div>
            </div>

            {/* Shipping Address */}
            <div>
              <h2 className="text-xl font-semibold mb-3">Shipping Address</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Address Line 1"
                  className={`${inputStyle} sm:col-span-2`}
                />
                <input type="text" placeholder="City" className={inputStyle} />
                <input
                  type="text"
                  placeholder="Postal Code"
                  className={inputStyle}
                />
                <input
                  type="text"
                  placeholder="Country"
                  className={`${inputStyle} sm:col-span-2`}
                />
              </div>
            </div>

            {/* Payment */}
            <div>
              <h2 className="text-xl font-semibold mb-3">Payment Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Cardholder Name"
                  className={`${inputStyle} sm:col-span-2`}
                />
                <input
                  type="text"
                  placeholder="Card Number"
                  className={`${inputStyle} sm:col-span-2`}
                />
                <input
                  type="text"
                  placeholder="Expiry (MM/YY)"
                  className={inputStyle}
                />
                <input type="text" placeholder="CVV" className={inputStyle} />
              </div>
            </div>
          </div>

          {/* Right Section: Summary */}
          <div className="w-full lg:w-1/3 bg-gray-50 p-4 sm:p-6 rounded-lg h-fit">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="text-sm sm:text-base space-y-2 text-gray-700">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>$90.00</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>$5.00</span>
              </div>
              <div className="flex justify-between">
                <span>Discount</span>
                <span>- $10.00</span>
              </div>
              <div className="border-t pt-2 font-bold flex justify-between text-lg">
                <span>Total</span>
                <span>$85.00</span>
              </div>
            </div>

            <button
              className="mt-6 w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition cursor-pointer"
              onClick={handlePlaceOrder}>
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
