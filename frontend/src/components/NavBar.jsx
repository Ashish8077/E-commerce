import React, { useEffect, useState } from "react";
import {
  ShoppingCart,
  Menu,
  X,
  House,
  ChartBarStacked,
  Handshake,
  BookUser,
  KeyRound,
  BookCheck,
  CircleUserRound,
  LogOut,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import useUserStore from "../store/authStore";
import useCartStore from "../store/cartStore";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const location = useLocation();

  const { user, logout } = useUserStore();
  const { cart } = useCartStore();

  const isAdmin = user?.role === "admin";
  const customer = user && user?.role === "customer";

  const handleNav = (e, hash) => {
    if (location.pathname === "/") {
      e.preventDefault();
      if (hash === "#home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const el = document.getElementById(hash.replace("#", ""));
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
    setOpenMenu(false);
  };

  const handleLogout = async () => {
    await logout();
  };

  useEffect(() => {
    setOpenMenu(false);
  }, [location]);

  return (
    <nav className="bg-gradient-to-r from-purple-600 via-indigo-700 to-blue-600 text-white sticky top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-20 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-wide lg:text-2xl max-[310px]:text-lg">
          ShopSphere
        </Link>

        {/* Nav Links */}
        {!isAdmin && (
          <div
            className={`${
              openMenu ? "flex" : "hidden"
            } lg:flex flex-col lg:flex-row absolute top-16 left-0 lg:static bg-white lg:bg-transparent w-full lg:w-auto space-y-4 lg:space-y-0 lg:space-x-8 text-sm font-medium shadow-md lg:shadow-none z-50 h-screen lg:h-auto text-black lg:text-white p-4 transition-all `}>
            <Link
              to="/"
              className="hover:text-indigo-600 lg:hover:text-indigo-100 transition text-lg flex gap-2   items-center "
              onClick={(e) => handleNav(e, "#home")}>
              {openMenu && <House />}
              Home
            </Link>
            <Link
              to="/#category"
              className="hover:text-indigo-600 lg:hover:text-indigo-100 transition text-lg cursor-pointer flex gap-2   items-center"
              onClick={(e) => handleNav(e, "#category")}>
              {openMenu && <ChartBarStacked />}
              Categories
            </Link>
            <Link
              to="/#deals"
              className="hover:text-indigo-600 lg:hover:text-indigo-100 transition text-lg flex gap-2   items-center"
              onClick={(e) => handleNav(e, "#deals")}>
              {openMenu && <Handshake />}
              Deals
            </Link>
            <Link
              to="/contact"
              className="hover:text-indigo-600 lg:hover:text-indigo-100 transition text-lg flex gap-2   items-center">
              {openMenu && <BookUser />}
              Contact
            </Link>
            {!customer && (
              <Link to={"/login"}>
                <button
                  className="hover:text-indigo-600 lg:hover:text-indigo-100 transition text-lg lg:hidden flex gap-2   items-center "
                  onClick={() => setOpenMenu(false)}>
                  {openMenu && <KeyRound />}
                  Login
                </button>
              </Link>
            )}

            {!customer && (
              <Link
                to="/signup"
                className="hover:text-indigo-600 lg:hover:text-indigo-100 transition text-lg lg:hidden flex gap-2   items-center">
                {openMenu && <BookCheck />} Signup
              </Link>
            )}

            {customer && (
              <Link
                to="/profile"
                className="hover:text-indigo-600 lg:hover:text-indigo-100 transition text-lg lg:hidden flex gap-2   items-center">
                {openMenu && <CircleUserRound />} Profile
              </Link>
            )}
            {user && (
              <button
                className="hover:text-indigo-600 lg:hover:text-indigo-100 transition text-lg lg:hidden flex gap-2   items-center"
                onClick={handleLogout}>
                <LogOut /> Logout
              </button>
            )}
          </div>
        )}

        {/* Actions */}
        {!isAdmin ? (
          <div className="flex items-center flex-row-reverse lg:flex-row   gap-2 min-[320px]:space-x-4">
            <button
              className="cursor-pointer lg:hidden"
              onClick={() => setOpenMenu((prev) => !prev)}>
              {openMenu ? <X /> : <Menu />}
            </button>
            {user ? (
              <>
                {!isAdmin && (
                  <>
                    <Link
                      to={"/cart"}
                      className="relative cursor-pointer lg:text-xl">
                      <ShoppingCart className="w-6 h-6" />
                      <span className="absolute -top-2 -right-2 bg-white text-indigo-700 text-xs rounded-full px-1.5 py-0.5 font-bold">
                        {cart.length}
                      </span>
                    </Link>
                    <Link to="/profile">
                      <CircleUserRound className="w-6 h-6 hidden lg:block" />
                    </Link>
                  </>
                )}
                <button
                  className="bg-white text-indigo-700 font-semibold px-4 py-1.5 rounded-md hover:bg-indigo-100 transition text-sm cursor-pointer hidden lg:block"
                  onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button className="bg-white text-indigo-700 font-semibold px-4 py-1.5 rounded-md hover:bg-indigo-100 transition text-sm cursor-pointer hidden lg:block">
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="bg-white text-indigo-700 font-semibold px-4 py-1.5 rounded-md hover:bg-indigo-100 transition text-sm cursor-pointer hidden lg:block ">
                    Signup
                  </button>
                </Link>
              </>
            )}
          </div>
        ) : (
          <button
            className="hover:text-indigo-600 lg:hover:text-indigo-100 transition text-lg  flex gap-1   items-center cursor-pointer bg-red-500 px-2 py-1 rounded-sm font-medium"
            onClick={handleLogout}>
            <LogOut /> Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
