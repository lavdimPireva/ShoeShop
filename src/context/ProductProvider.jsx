// CartContext.js

import React, { createContext, useState, useContext, useEffect } from "react";
import { generateSlug } from "../helpers/slugUtils";
import axios from "axios";

const ProductContext = createContext();

export const useProduct = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/products");

        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };

    fetchProducts();
  }, []);

  const productsWithSlug = products.map((product) => ({
    ...product,
    slug: generateSlug(product.name, product.id),
  }));
  const productBestCategory = productsWithSlug.slice(30, 38);

  console.log("productsWithSlug", productsWithSlug);

  const value = {
    productsWithSlug,
    productBestCategory,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
