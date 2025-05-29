import { Link } from "react-router-dom";
import React from "react";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r  text-white px-4 bg-gray-50">
      <h1 className="text-9xl text-black font-extrabold tracking-widest ">
        404
      </h1>

      <h2 className="text-3xl font-bold mb-2">Page Not Found</h2>
      <p className="mb-4 text-gray-700">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <a
        href="/"
        className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded transition">
        Go Home
      </a>
    </div>
  );
};

export default NotFoundPage;
