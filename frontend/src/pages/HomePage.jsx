import React from "react";

const categories = [
  {
    id: 1,
    name: "Electronics",
    image: "/electronics.avif",
  },
  {
    id: 2,
    name: "Fashion",
    image: "/fashion.jpg",
  },
  {
    id: 3,
    name: "Health & Wellness",
    image: "/health.avif",
  },
  {
    id: 4,
    name: "Personal Care",
    image: "/personalCare.avif",
  },
];

const featuredProducts = [
  {
    id: 1,
    name: "SonicBuds Wireless Over-Ear Headphones with ANC, 40mm Drivers, Bluetooth 5.3 for Deep Bass & Long Listening (Black)",
    price: "$99.99",
    image: "/headphone.avif",
  },
  {
    id: 2,
    name: "Apple MacBook Pro 14-inch with M2 Pro Chip, 16GB RAM, 512GB SSD, Liquid Retina XDR Display for Creators (2023)",
    price: "$1449.00",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 3,
    name: "ProStride Lightweight Running Shoes with AirMesh, FlexFoam Sole for Daily Training & Long Runs (UK 8)",
    price: "$120.00",
    image: "shoes.avif",
  },
  {
    id: 4,
    name: "Minimalist Hair Growth Actives 18% Scalp Serum With Capixyl, Redensyl For Hair Fall Control (30ml)",
    price: "$79.99",
    image: "s.avif",
  },
];

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 via-indigo-700 to-blue-600 text-white py-20 px-6 lg:px-20 text-center lg:text-left">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="lg:w-1/2">
            <h1 className="text-4xl lg:text-6xl font-extrabold mb-4 leading-tight">
              Upgrade Your Style <br /> with Our Exclusive Products
            </h1>
            <p className="text-lg lg:text-xl mb-8 text-indigo-100">
              Discover quality, trendy items at unbeatable prices. Shop now and
              enjoy free shipping on orders over $50!
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
      <section className="max-w-7xl mx-auto px-6 md:px-20 py-16 ">
        <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
          Shop by Category
        </h2>

        <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map(({ id, name, image }) => (
            <div
              key={id}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300 flex flex-col items-center p-4">
              <img
                src={image}
                alt={name}
                className="w-24 h-24 object-cover rounded-full mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-6 md:px-20 py-16">
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
