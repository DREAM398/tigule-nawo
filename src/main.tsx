import React from "react";
import ReactDOM from "react-dom/client";
import { inject } from '@vercel/analytics';

import App from "./App";
import "./index.css";

import { ProductProvider } from "./context/ProductContext";
import { AuthProvider } from "./context/AuthContext";

inject();

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>
    <ProductProvider>
      <AuthProvider>
      <App />
      </AuthProvider>
    </ProductProvider>
  </React.StrictMode>
);