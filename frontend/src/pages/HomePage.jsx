import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  categories,
  featuredProducts,
  categoriesData,
} from "../data/categoriesData";

const HomePage = () => {
  useEffect(() => {
    if (window.location.hash) {
      const el = document.querySelector(window.location.hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [window.location.hash]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section
        id="home"
        className="bg-gradient-to-r from-purple-600 via-indigo-700 to-blue-600 text-white py-20 px-6 lg:px-20 text-center lg:text-left">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="lg:w-1/2">
            <h1 className="text-4xl lg:text-6xl font-extrabold mb-4 leading-tight">
              Upgrade Your Style <br /> with Our Exclusive Products
            </h1>
            <p className="text-lg lg:text-xl mb-8 text-indigo-100">
              Discover quality, trendy items at unbeatable prices. Shop now and
              enjoy free shipping on orders over ₹999!
            </p>
            <button className="bg-white text-indigo-700 font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-indigo-100 transition duration-300">
              Shop Now
            </button>
          </div>
          <div className="md:w-1/2">
            <img
              src="/heroimg.png"
              alt="E-commerce Hero"
              className="rounded-lg  mx-auto md:mx-0"
            />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-20 py-16 " id="category">
        <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
          Shop by Category
        </h2>

        <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map(({ id, name, image }) => (
            <Link
              to={`/category/${name}`}
              key={id}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300 flex flex-col items-center p-4">
              <img
                src={image}
                alt={name}
                className="w-24 h-24 object-cover rounded-full mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section id="deals" className="max-w-7xl mx-auto px-6 md:px-20 py-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
          Featured Products
        </h2>

        <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map(({ id, name, price, image }) => (
            <div
              key={id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer">
              <img
                src={image}
                alt={name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg line-clamp-4 font-semibold text-gray-900">
                  {name}
                </h3>
                <p className="mt-2 text-indigo-600 font-bold text-xl">
                  {price}
                </p>
                <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
