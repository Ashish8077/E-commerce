import React, { useState } from "react";
import axios from "axios";

const DeletePopup = ({ setIsOpen, product }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleDelete = async () => {
    const id = product.id;
    try {
      await axios.delete(`/api/products/${id}`);
    } catch (error) {
      console.error("Error while Deleting Product: ", error);
    }
  };

  return (
    <div className="backdrop-blur-sm fixed top-0 left-0  w-full min-h-full   flex justify-center items-center z-50">
      <div className="bg-white p-4 flex flex-col gap-3 shadow-2xl rounded-2xl">
        <p className="text-center text-md  font-medium">Delete Product ?</p>
        <p className="text-cente text-red-700">
          Are you sure you want to delete{" "}
          <span className="text-blue-500">{product.name}</span>
        </p>
        <p className="text-center text-red-700">You can't undo this action</p>
        <div className="text-center ">
          <button
            className="bg-blue-600 p-2 text-md text-white font-medium mr-3 rounded-xl cursor-pointer"
            onClick={handleCancel}>
            Cancel
          </button>
          <button
            className="bg-red-600 p-2 text-md text-white font-medium rounded-xl cursor-pointer"
            onClick={handleDelete}>
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;
