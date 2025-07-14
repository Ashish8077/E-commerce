import { Edit, Star, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import useProductStore from "../../store/productStore";
import { handleApiError } from "../../utils/handleApiError";
import axios from "../../lib/axios";
import { LoadingSpinner } from "../../components";
import { EmptyProductState, DeletePopup } from "../components";
import truncateWords from "../../utils/stringUtils";

const AdminProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [refresh, setRefresh] = useState(false);

  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/products/");
      setProducts(res.data.data);
      setLoading(false);
    } catch (error) {
      console.error("fetchAllProducts Error:", error);
      const message = handleApiError(error);
      return { success: false, error: message };
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, [refresh]);

  if (loading) return <LoadingSpinner />;

  return (
    <>
      {products.length === 0 ? (
        <EmptyProductState />
      ) : (
        <>
          <table className="min-w-full divide-y divide-gray-700 relative">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Product Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Product Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Featured
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {products.map((product, i) => (
                <tr key={i} className="hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={product.image}
                          alt={"imgetest"}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-white ">
                          {truncateWords(product.name)}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">
                      ₹ {product.price}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">
                      {product.category}
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">
                      <button className={`p-1 rounded-full `}>
                        <Star className="h-5 w-5"></Star>
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-white flex gap-2">
                      <button
                        className="cursor-pointer text-red-400 hover:text-red-300"
                        onClick={() => {
                          setSelectedProduct(product);
                          setIsOpen(true);
                        }}>
                        <Trash className="h-5 w-5" />
                      </button>
                      <button className="cursor-pointer text-red-400 hover:text-red-300">
                        <Edit className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {isOpen && (
            <DeletePopup
              setIsOpen={setIsOpen}
              product={selectedProduct}
              setRefresh={setRefresh}
            />
          )}
        </>
      )}
    </>
  );
};

export default AdminProductList;
