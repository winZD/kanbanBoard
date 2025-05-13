import type { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  exp?: number; // expiration timestamp (optional but commonly used)
  // add other fields you expect in your token
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

    // Optional: check if the token is expired
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
