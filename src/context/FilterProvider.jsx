import React, { createContext, useState, useContext } from "react";

import { products } from "../ImagesModule/ModelsImage";

const FilterContext = createContext();

export const useFilter = () => useContext(FilterContext);

export const FilterProvider = ({ children }) => {
  const [filterType, setFilterType] = useState("all");

  const menShoes = products.filter((product) => product.type === "men");
  const femaleShoes = products.filter((product) => product.type === "unisex");

  const value = {
    menShoes,
    femaleShoes,
  };

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};
