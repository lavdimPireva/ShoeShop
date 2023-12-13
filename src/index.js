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
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

const theme = createTheme({
  components: {
    MuiStepConnector: {
      styleOverrides: {
        line: {
          borderColor: "#eaeaf0",
          borderTopWidth: 3,
          borderRadius: 1,
        },
        active: {
          "& $line": {
            borderColor: "#1975b5",
          },
        },
        completed: {
          "& $line": {
            borderColor: "#1975b5",
          },
        },
      },
    },
    MuiStepIcon: {
      styleOverrides: {
        root: {
          color: "#eaeaf0",
          "&.Mui-active": {
            color: "#1975b5",
          },
          "&.Mui-completed": {
            color: "#1975b5",
          },
        },
      },
    },
  },
});

root.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <ToastContainer />

      <ProductProvider>
        <FilterProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </FilterProvider>
      </ProductProvider>
    </ThemeProvider>
  </BrowserRouter>
);
