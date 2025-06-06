import { NavBar, Footer, LoadingSpinner, ToasterProvider } from "./components";
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
import { useEffect, useState } from "react";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const { checkAuth, checkingAuth, user } = useUserStore();

  useEffect(() => {
    checkAuth();
  }, []);

  if (checkingAuth) return <LoadingSpinner />;

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/secret-dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminPanel />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute allowedRoles={["customer"]}>
              <CartPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute allowedRoles={["customer"]}>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order-confirmation"
          element={
            <ProtectedRoute allowedRoles={["customer"]}>
              <OrderConfirmationPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={["customer"]}>
              <UserProfilePage />
            </ProtectedRoute>
          }
        />

        <Route path="/contact" element={<ContactPage />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route
          path="/category/:categoryName/:subcategoryName"
          element={<ProductListingPage />}
        />

        <Route
          path="/signup"
          element={
            !user ? (
              <SignupPage />
            ) : user.role === "admin" ? (
              <Navigate to="/secret-dashboard" replace />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/login"
          element={
            !user ? (
              <LoginPage />
            ) : user.role === "admin" ? (
              <Navigate to="/secret-dashboard" replace />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <ToasterProvider />
      {(!user || user.role !== "admin") && <Footer />}
    </>
  );
}

export default App;
