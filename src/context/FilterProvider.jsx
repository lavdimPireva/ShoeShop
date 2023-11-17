import React, { createContext, useState, useContext, useMemo } from "react";

import { products } from "../ImagesModule/ModelsImage";

const FilterContext = createContext();

export const useFilter = () => useContext(FilterContext);

export const FilterProvider = ({ children }) => {
  const [filterType, setFilterType] = useState("all");

  const [filterCriteria, setFilterCriteria] = useState({ type: "men" });

  const updateFilterCriteria = (criteria) => {
    setFilterCriteria({ ...filterCriteria, ...criteria });
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const typeMatch = product.type === filterCriteria.type;
      const brandMatch =
        !filterCriteria.brands || filterCriteria.brands.includes(product.name);

      console.log("Rezultati", typeMatch && brandMatch);

      return typeMatch && brandMatch;
    });
  }, [filterCriteria]);

  const value = {
    filteredProducts, // Use this instead of menShoes or femaleShoes
    updateFilterCriteria, // Use this function to update the filter criteria
  };

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};
