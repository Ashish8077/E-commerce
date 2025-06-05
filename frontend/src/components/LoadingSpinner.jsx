import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center min-h-screen mt-12">
      <div className="w-10 h-10 border-4 border-t-green-500 border-gray-300 rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
