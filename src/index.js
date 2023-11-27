import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// bulma framework css
import "bulma/css/bulma.min.css";
import { CartProvider } from "./context/CartProvider";
import { FilterProvider } from "./context/FilterProvider";

import { BrowserRouter } from "react-router-dom";
import { ProductProvider } from "./context/ProductProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ProductProvider>
      <FilterProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </FilterProvider>
    </ProductProvider>
  </BrowserRouter>
);
