import React from "react";
import { useParams } from "react-router-dom";
import { categoriesData } from "../data/categoriesData";

const ProductListingPage = () => {
  const { categoryName, subcategoryName } = useParams();
  const decodedCategory = decodeURIComponent(categoryName);
  const decodedSubcat = decodeURIComponent(subcategoryName);
  const subcategories = categoriesData[decodedCategory][decodedSubcat];
  console.log(
    subcategories.map((cat) => {
      console.log(cat);
      return "Hello";
    })
  );
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-purple-600 via-indigo-700 to-blue-600 text-white py-16 text-center">
        <h1 className="text-4xl font-extrabold">All Products</h1>
        <p className="mt-2 text-indigo-100 text-lg">
          Browse, filter, and sort products to find your perfect match!
        </p>
      </header>

      <main className="max-w-7xl mx-auto px-6 lg:px-20 py-12">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full sm:w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />

          <select className="w-full sm:w-1/4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600">
            <option>Sort by Price (Low to High)</option>
            <option>Sort by Price (High to Low)</option>
          </select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {subcategories.map(({ id, name, price }) => (
            <div
              key={id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer">
              <img
                src={`https://via.placeholder.com/400x300?text=Product+${id}`}
                alt={`Product ${id}`}
                className="w-full h-48 object-cover"
                loading="lazy"
              />
              <div className="p-4">
                <h3 className="text-md font-semibold text-gray-900 line-clamp-4">
                  {name}
                </h3>
                <p className="mt-2 text-indigo-600 font-bold text-xl">
                  ₹{price}
                </p>
                <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center space-x-3 mt-12">
          <button className="px-4 py-2 rounded-md bg-indigo-600 text-white disabled:bg-indigo-300 hover:bg-indigo-700 transition duration-300">
            Prev
          </button>

          {[1, 2, 3].map((page) => (
            <button
              key={page}
              className={`px-4 py-2 rounded-md transition duration-300 ${
                page === 1
                  ? "bg-indigo-700 text-white"
                  : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
              }`}>
              {page}
            </button>
          ))}

          <button className="px-4 py-2 rounded-md bg-indigo-600 text-white disabled:bg-indigo-300 hover:bg-indigo-700 transition duration-300">
            Next
          </button>
        </div>
      </main>
    </div>
  );
};

export default ProductListingPage;
