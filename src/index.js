import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// bulma framework css
import "bulma/css/bulma.min.css";
import { CartProvider } from "./context/CartProvider";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <CartProvider>
      <App />
    </CartProvider>
  </BrowserRouter>
);
