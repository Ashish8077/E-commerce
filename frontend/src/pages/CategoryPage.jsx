import React, { useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { useParams, Link } from "react-router-dom";
import { categoriesData } from "../data/categoriesData";
import useProductStore from "../store/productStore";

import { useState } from "react";
import { formatPriceInINR } from "../utils/priceUtils";

// const electronicsData = {
//   Smartphones: [
//     {
//       id: 1,
//       name: "Samsung Galaxy S23 Ultra 5G (256GB, Phantom Black)",
//       price: "₹1,24,999",
//       image:
//         "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80",
//     },
//     {
//       id: 2,
//       name: "Apple iPhone 14 Pro Max (128GB, Deep Purple)",
//       price: "₹1,39,900",
//       image:
//         "https://images.unsplash.com/photo-1603898071731-eb0b37bb4ed6?auto=format&fit=crop&w=800&q=80",
//     },
//     {
//       id: 2,
//       name: "Apple iPhone 14 Pro Max (128GB, Deep Purple)",
//       price: "₹1,39,900",
//       image:
//         "https://images.unsplash.com/photo-1603898071731-eb0b37bb4ed6?auto=format&fit=crop&w=800&q=80",
//     },
//   ],
//   "Audio Devices": [
//     {
//       id: 3,
//       name: "boAt Rockerz 450 Wireless Headphones with HD Sound & 15H Playtime",
//       price: "₹1,299",
//       image:
//         "https://images.unsplash.com/photo-1580894894513-e95f26a55dfd?auto=format&fit=crop&w=800&q=80",
//     },
//     {
//       id: 4,
//       name: "Sony WF-1000XM5 Truly Wireless Earbuds with ANC",
//       price: "₹21,990",
//       image:
//         "https://images.unsplash.com/photo-1587691592099-240a91f41c5e?auto=format&fit=crop&w=800&q=80",
//     },
//   ],
//   "Laptops & Tablets": [
//     {
//       id: 5,
//       name: "Apple MacBook Pro 14-inch (M2 Pro, 16GB/512GB, 2023)",
//       price: "₹1,99,900",
//       image:
//         "https://images.unsplash.com/photo-1587829741301-dc798b82b5f4?auto=format&fit=crop&w=800&q=80",
//     },
//     {
//       id: 6,
//       name: 'Lenovo Tab P11 Pro (11.5" OLED, 6GB/128GB, Wi-Fi)',
//       price: "₹34,990",
//       image:
//         "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=800&q=80",
//     },
//   ],
// };

const CategoryPage = () => {
  const { categoryName } = useParams();
  const { fetchProductsByCategories, products } = useProductStore();
  const decodedCategory = decodeURIComponent(categoryName);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <header className="bg-gradient-to-r from-purple-600 via-indigo-700 to-blue-600 text-white py-16 text-center">
        <h1 className="text-4xl font-extrabold">{decodedCategory}</h1>
        <p className="mt-2 text-indigo-100 text-lg">
          Explore top {categoryName.toLowerCase()} products .
        </p>
      </header>

      {/* Subcategories and Products */}
      <main className="max-w-7xl mx-auto px-6 lg:px-20 py-16 space-y-16 ">
        {Object.entries(products).map(([category, items]) => (
          <section key={category} className="">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b border-indigo-200 pb-2 ">
              {category}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
              {items.slice(0, 3).map(({ id, name, price, image }) => (
                <div
                  key={id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300  flex flex-col justify-between">
                  <img
                    src={image}
                    alt={name}
                    className="w-full h-48 object-contain"
                  />
                  <div className="p-4">
                    <h3 className="text-md font-semibold text-gray-900 line-clamp-3">
                      {name}
                    </h3>
                    <p className="mt-2 text-indigo-600 font-bold text-lg">
                      {formatPriceInINR(price)}
                    </p>
                    <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-10">
              <Link
                to={`/category/${categoryName}/${category}`}
                className="inline-flex items-center bg-white border-indigo-600 text-indigo-600 justify-center gap-2   px-6 py-2 rounded-md font-medium transition duration-300 shadow-md cursor-pointer  hover:bg-indigo-50">
                View All {category} <ChevronRight />
              </Link>
            </div>
          </section>
        ))}
      </main>
    </div>
  );
};

export default CategoryPage;
