import React from "react";
import useUserStore from "../store/authStore";
import LoadingSpinner from "./LoadingSpinner";
import { Navigate, replace, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, checkingAuth } = useUserStore();
  const location = useLocation();

  if (checkingAuth) return <LoadingSpinner />;

  if (!user)
    return <Navigate to={"/login"} state={{ from: location }} replace />;

  if (allowedRoles && !allowedRoles.includes(user?.role))
    return <Navigate to={"/"} replace />;

  return children;
};

export default ProtectedRoute;
