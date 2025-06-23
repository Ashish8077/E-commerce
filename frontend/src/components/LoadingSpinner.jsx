import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center min-h-screen ">
      <div className="w-10 h-10 border-4 border-t-green-500 border-gray-300 rounded-full animate-spin mt-10"></div>
    </div>
  );
};

export default LoadingSpinner;
