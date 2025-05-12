import type { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

import axios from "axios";

/* // Dummy JWT token generation
const generateDummyToken = () => {
  // This creates a simple dummy JWT structure (not cryptographically valid)
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = btoa(
    JSON.stringify({
      sub: "user123",
      name: "Test User",
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // Expires in 24 hours
    })
  );
  const signature = btoa("dummy-signature");
  return `${header}.${payload}.${signature}`;
};

// Set the token in localStorage if it doesn't exist
const initializeToken = () => {
  if (!localStorage.getItem("token")) {
    localStorage.setItem("token", generateDummyToken());
  }
};

// Initialize token on load
initializeToken();

// Configure Axios interceptor to add Authorization header
axios.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);
 */
export const RequireAuth = ({ children }: PropsWithChildren) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }
  return children;
};
