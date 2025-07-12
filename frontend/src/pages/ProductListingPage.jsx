import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { categoryBackground } from "../data/categoriesData";

import useProductStore from "../store/productStore";
import { formatPriceInINR } from "../utils/priceUtils";
import { Header, LoadingSpinner } from "../components";
import useCartStore from "../store/cartStore";
import useUserStore from "../store/authStore";

const ProductListingPage = () => {
  const { categoryName } = useParams();
  const { fetchProductsByCategories, products, loading } = useProductStore();
  const { user } = useUserStore();
  const { addToCart, cart } = useCartStore();
  const decodedCategory = decodeURIComponent(categoryName);
  const [addingProductId, setAddingProductId] = useState(null);

  const background = categoryBackground[decodedCategory];

  useEffect(() => {
    const fetchProducts = async () => {
      await fetchProductsByCategories(decodedCategory);
    };
    fetchProducts();
  }, [decodedCategory]);

  if (loading) return <LoadingSpinner />;

  const isProductInCart = (cart, productId) => {
    const exists = cart.some((item) => item.product.id === productId);
    return exists;
  };

  const handleAddProduct = async (product) => {
    if (!user) return;
    if (isProductInCart(cart, product.id)) return;
    setAddingProductId(product.id);
    const { success } = await addToCart(product);
    setAddingProductId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header background={background} category={decodedCategory} />

      {products.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold text-gray-600">
            No products available in {decodedCategory}
          </h2>
          <p className="text-gray-500 mt-2">
            Try another category or check back later.
          </p>
        </div>
      ) : (
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
            {products?.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col justify-between">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-contain"
                  loading="lazy"
                />
                <div className="p-4">
                  <h3 className="text-md font-semibold text-gray-900 line-clamp-4">
                    {product.name}
                  </h3>
                  <p className="mt-2 text-indigo-600 font-bold text-xl">
                    {formatPriceInINR(product.price)}
                  </p>
                  <button
                    className={`mt-4 w-full bg-indigo-600  py-2 rounded-md hover:bg-indigo-700  cursor-pointer ${
                      isProductInCart(cart, product.id)
                        ? "cursor-not-allowed font-medium"
                        : "bg-indigo-600 text-white hover:bg-indigo-700"
                    }`}
                    onClick={() => handleAddProduct(product)}
                    disabled={
                      isProductInCart(cart, product.id) ||
                      addingProductId === product.id
                    }>
                    {isProductInCart(cart, product.id)
                      ? "✔️ Added"
                      : addingProductId === product.id
                      ? "Adding..."
                      : "Add to Cart"}
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
      )}
    </div>
  );
};

export default ProductListingPage;
