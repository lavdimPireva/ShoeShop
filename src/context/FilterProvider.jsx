import React, { createContext, useState, useContext, useMemo } from "react";
import { products } from "../ImagesModule/ModelsImage";

const FilterContext = createContext();

export const useFilter = () => useContext(FilterContext);

export const FilterProvider = ({ children }) => {
  // Initialize filterCriteria with properties for brands, sizes, and colors
  const [filterCriteria, setFilterCriteria] = useState({
    type: "men",
    brands: [],
    sizes: [],
    colors: [],
  });

  const updateFilterCriteria = (criteria) => {
    // Update filter criteria with a function to ensure correct updates when relying on previous state
    setFilterCriteria((prevCriteria) => ({ ...prevCriteria, ...criteria }));
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const typeMatch = product.type === filterCriteria.type;

      // Update logic to handle brands as an array
      const brandMatch =
        filterCriteria.brands.length === 0 ||
        filterCriteria.brands.includes(product.name);

      // Update logic to handle sizes as an array and parse them as integers
      const sizeMatch =
        filterCriteria.sizes.length === 0 ||
        filterCriteria.sizes.some((size) =>
          product.numeration.includes(parseInt(size, 10))
        );

      // Update logic to handle colors as an array
      const colorMatch =
        filterCriteria.colors.length === 0 ||
        filterCriteria.colors.some((color) => product.color.includes(color));

      return typeMatch && brandMatch && sizeMatch && colorMatch;
    });
  }, [filterCriteria]);

  const value = {
    filteredProducts,
    updateFilterCriteria,
    filterCriteria,
  };

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};
