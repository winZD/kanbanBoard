import type { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

export const RequireAuth = ({ children }: PropsWithChildren) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }
  return children;
};
