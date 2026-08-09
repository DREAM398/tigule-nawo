import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";

import { ProductProvider } from "./context/ProductContext";
import { AuthProvider } from "./context/AuthContext";

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