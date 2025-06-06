import { CirclePlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
// Optional icon

const EmptyProductState = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-4">
      <h2 className="text-xl font-semibold text-gray-700 mt-4">
        No products found
      </h2>
      <p className="text-gray-500 mt-2">
        You haven’t added any products yet. Start by creating your first one.
      </p>
      <button
        onClick={() => navigate("/admin/products/new")}
        className="mt-6 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
        <CirclePlus className="h-5 w-5 mr-2" />
        Add Product
      </button>
    </div>
  );
};

export default EmptyProductState;
