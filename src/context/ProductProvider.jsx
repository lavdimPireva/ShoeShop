// CartContext.js

import React, { createContext, useState, useContext, useEffect } from "react";
import { generateSlug } from "../helpers/slugUtils";
import axios from "axios";

const ProductContext = createContext();

export const useProduct = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://api.atletjaime.com/api/products/"
        );

        setProducts(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching products", error);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const productsWithSlug = products.map((product) => ({
    ...product,
    slug: generateSlug(product.name, product.id),
  }));
  const productBestCategory = productsWithSlug.slice(30, 38);

  const value = {
    productsWithSlug,
    productBestCategory,
    isLoading,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
