import React from "react";
import { Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useCartStore from "../store/cartStore";
import { useEffect } from "react";
import { EmptyCartMessage, LoadingSpinner } from "../components";
import { formatPriceInINR } from "../utils/priceUtils";
import toast from "react-hot-toast";

const CartPage = () => {
  const { cart, loading, updateQuantity, deleteItemFromCart, total, subTotal } =
    useCartStore();
  const navigate = useNavigate();

  if (loading) return <LoadingSpinner />;

  const handleDeleteProduct = async (productId) => {
    const { success } = await deleteItemFromCart(productId);
    if (success) {
      toast.success("Product successfully removed from the cart.");
    }
  };

  const handleQuantity = async (operation, productId) => {
    updateQuantity(operation, productId);
  };

  return (
    <div className="w-full px-2 sm:px-4 md:px-6 py-6 max-w-6xl mx-auto">
      <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 md:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 border-b pb-4">
          🛒 Shopping Cart
        </h1>

        {/* Cart Items */}
        {cart.length === 0 ? (
          <EmptyCartMessage />
        ) : (
          <>
            <div className="space-y-6">
              {/* Cart Item */}
              {cart?.map((item, i) => (
                <div
                  key={item.id}
                  className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b pb-4">
                  <div className="flex flex-1 items-center gap-4">
                    <img
                      src={item.product?.image}
                      alt="Item"
                      className="w-20 h-20 object-cover rounded-md flex-shrink-0"
                    />
                    <div className="text-sm sm:text-base">
                      <h2 className="font-semibold truncate max-w-[150px] sm:max-w-none">
                        {item.product?.name}
                      </h2>
                      <p className="text-gray-500">
                        {formatPriceInINR(item.product?.price)}
                      </p>
                    </div>
                  </div>

                  <div className="">
                    <button
                      className="w-8 h-8 bg-gray-100 shadow-md  rounded hover:bg-gray-200 text-xl cursor-pointer"
                      onClick={() => handleQuantity("-", item.product.id)}>
                      −
                    </button>
                    <span className="text-lg px-2">{item.quantity}</span>
                    <button
                      className="w-8 h-8 bg-gray-100 shadow-md   rounded hover:bg-gray-200 text-xl  cursor-pointer"
                      onClick={() => handleQuantity("+", item.product.id)}>
                      +
                    </button>
                  </div>

                  <div className="text-lg font-medium t ">
                    {formatPriceInINR(item.product?.price)}
                  </div>

                  <button
                    className="text-red-500 hover:text-red-700 text-sm sm:text-base cursor-pointer"
                    onClick={() => handleDeleteProduct(item.product.id)}>
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
                  <span>{formatPriceInINR(subTotal)}</span>
                </div>
                {/* <div className="flex justify-between">
                  <span>Discount</span>
                  <span>−$10.00</span>
                </div> */}
                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                  <span>Total</span>
                  <span>{formatPriceInINR(total)}</span>
                </div>
              </div>
              <button
                className="mt-6 w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition duration-200"
                onClick={() => navigate("/checkout")}>
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
