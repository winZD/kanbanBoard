import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RequireAuth } from "./components/auth/auth.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/settings",
    element: (
      <RequireAuth>
        <div>You are in settings mockup</div>
      </RequireAuth>
    ),
  },
  {
    path: "/login",
    element: <div>You are in LOGIN mockup</div>,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    console.log("Service worker is supported");
  });
}
