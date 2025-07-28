import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";
import App from "./App.jsx";
import "./index.css";
import Signin from "./components/pages/signin/Signin.page.jsx";
import Signup from "./components/pages/signup/Signup.page.jsx";
import Dashboard from "./components/pages/dashboard/Dashboard.page.jsx";
import Send from "./components/pages/send/Send.page.jsx";
import PaymentHistory from "./components/pages/payment-history/paymentHistory.page.jsx";
import AuthGuard from "./components/utils/AuthGuard.jsx";
import AuthProvider from "./components/utils/AuthProvider.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthGuard>
        <Dashboard />
      </AuthGuard>
    ),
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/dashboard",
    element: (
      <AuthGuard>
        <Dashboard />
      </AuthGuard>
    ),
  },
  {
    path: "/send",
    element: (
      <AuthGuard>
        <Send />
      </AuthGuard>
    ),
  },
  {
    path: "/history",
    element: (
      <AuthGuard>
        <PaymentHistory />
      </AuthGuard>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RecoilRoot>
        <AuthProvider>
        <RouterProvider router={router}/>
        </AuthProvider>
    </RecoilRoot>
  </React.StrictMode>
);
