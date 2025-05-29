import React, { useState } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <nav className="bg-gradient-to-r from-purple-600 via-indigo-700 to-blue-600 text-white sticky top-0 left-0">
      <div className="max-w-7xl mx-auto px-6 lg:px-20 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold tracking-wide lg:text-2xl">
          ShopSphere
        </div>

        {/* Nav Links */}
        <div
          className={`${
            openMenu ? "flex" : "hidden"
          } flex flex-col lg:flex-row absolute top-16 left-0 lg:static bg-white lg:bg-transparent w-full lg:w-auto space-y-4 lg:space-y-0 lg:space-x-8 text-sm font-medium shadow-md lg:shadow-none z-50 h-screen lg:h-auto  text-black lg:text-white p-4 transition-all `}>
          <a
            href="#"
            className="hover:text-indigo-600 lg:hover:text-indigo-100 transition text-lg">
            Home
          </a>
          <a
            href="#"
            className="hover:text-indigo-600 lg:hover:text-indigo-100 transition text-lg">
            Categories
          </a>
          <a
            href="#"
            className="hover:text-indigo-600 lg:hover:text-indigo-100 transition text-lg">
            Deals
          </a>
          <a
            href="#"
            className="hover:text-indigo-600 lg:hover:text-indigo-100 transition text-lg">
            Contact
          </a>
          <a
            href="#"
            className="hover:text-indigo-600 lg:hover:text-indigo-100 transition text-lg lg:hidden">
            Login
          </a>
          <a
            href="#"
            className="hover:text-indigo-600 lg:hover:text-indigo-100 transition text-lg lg:hidden">
            Signup
          </a>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <button
            className="cursor-pointer lg:hidden"
            onClick={() => setOpenMenu((prev) => !prev)}>
            {openMenu ? <X /> : <Menu />}
          </button>
          <button className="relative cursor-pointer lg:text-xl">
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-white text-indigo-700 text-xs rounded-full px-1.5 py-0.5 font-bold">
              2
            </span>
          </button>
          <button className="bg-white text-indigo-700 font-semibold px-4 py-1.5 rounded-md hover:bg-indigo-100 transition text-sm cursor-pointer hidden lg:block  ">
            Login
          </button>
          <button className="bg-white text-indigo-700 font-semibold px-4 py-1.5 rounded-md hover:bg-indigo-100 transition text-sm cursor-pointer hidden lg:block ">
            Signup
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

{
  /* <div
  className={`${
    menuOpen ? "flex" : "hidden"
  } flex-col absolute top-16 w-full bg-white text-gray-800 shadow-md z-50
     lg:flex lg:static lg:w-auto lg:bg-transparent lg:shadow-none lg:flex-row lg:items-center lg:space-x-8 text-sm font-medium`}
></div> */
}
