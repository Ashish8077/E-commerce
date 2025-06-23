import { Link } from "react-router-dom";
import { ShoppingBagIcon } from "@heroicons/react/24/outline"; // Optional: Heroicons for better UI
import { categoriesData } from "../data/categoriesData";

const EmptyCartMessage = () => {
  console.log(categoriesData);
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4">
      <ShoppingBagIcon className="w-16 h-16 text-gray-400 mb-4" />
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">
        Your cart is empty
      </h2>
      <p className="text-gray-500 mb-6">
        Looks like you haven’t added anything yet.
      </p>
      <Link
        to="/#category"
        className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition">
        Start Shopping
      </Link>
    </div>
  );
};

export default EmptyCartMessage;
