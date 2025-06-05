import React from "react";
import useUserStore from "../store/authStore";
import LoadingSpinner from "./LoadingSpinner";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, checkingAuth } = useUserStore();

  if (checkingAuth) return <LoadingSpinner />;

  if (!user) return <Navigate to={"/"} />;

  if (allowedRoles && !allowedRoles.includes(user.role))
    return <Navigate to={"/"} />;

  return children;
};

export default ProtectedRoute;
