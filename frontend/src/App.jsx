import { NavBar, Footer, LoadingSpinner } from "./components";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import ProductListingPage from "./pages/ProductListingPage";
import SignupPage from "./pages/Signup";
import LoginPage from "./pages/LoginPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage ";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import UserProfilePage from "./pages/UserProfilePage";
import ContactPage from "./pages/ContactPage";

import { Navigate, Route, Routes } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";

import AdminPanel from "./admin/AdminPanel";
import useUserStore from "./store/authStore";
import { useEffect } from "react";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const { checkAuth, checkingAuth, user } = useUserStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (checkingAuth) return <LoadingSpinner />;

  const isAdmin = user && user.role === "admin";
  const customer = user && user.role === "customer";

  return (
    <>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            isAdmin ? <Navigate to={"/secret-dashboard"} /> : <HomePage />
          }></Route>

        <Route
          path="/secret-dashboard"
          element={isAdmin ? <AdminPanel /> : <Navigate to={"/"} />}
        />

        <Route
          path="/cart"
          element={customer ? <CartPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/checkout"
          element={customer ? <CheckoutPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/order-confirmation"
          element={customer ? <OrderConfirmationPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/profile"
          element={customer ? <UserProfilePage /> : <Navigate to={"/"} />}
        />

        <Route path="/contact" element={<ContactPage />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route
          path="/category/:categoryName/:subcategoryName"
          element={<ProductListingPage />}
        />

        <Route path="/signup" element={user ? <HomePage /> : <SignupPage />} />
        <Route path="/login" element={user ? <HomePage /> : <LoginPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
