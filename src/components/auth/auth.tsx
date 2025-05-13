import type { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  exp?: number;
  [key: string]: unknown;
}

export const RequireAuth = ({ children }: PropsWithChildren) => {
  const token = localStorage.getItem("at");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode<JwtPayload>(token);
    console.log("Decoded Token:", decoded);

    if (decoded.exp && Date.now() >= decoded.exp * 1000) {
      console.warn("Token expired");
      return <Navigate to="/login" replace />;
    }
  } catch (error) {
    console.error("Invalid token", error);
    return <Navigate to="/login" replace />;
  }

  return children;
};
