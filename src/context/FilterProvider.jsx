import React, { createContext, useState, useContext, useMemo } from "react";
import { useProduct } from "./ProductProvider";

const FilterContext = createContext();

export const useFilter = () => useContext(FilterContext);

export const FilterProvider = ({ children }) => {
  // Initialize filterCriteria with properties for brands, sizes, and colors

  const [filterCriteria, setFilterCriteria] = useState({
    type: "men",
    price: { min: "", max: "" },
    brands: [],
    sizes: [],
    colors: [],
  });

  const [allowMultipleTypes, setAllowMultipleTypes] = useState(false);

  const { productsWithSlug } = useProduct();

  const defaultFilterCriteria = {
    type: "men",
    price: { min: "", max: "" },
    brands: [],
    sizes: [],
    colors: [],
  };

  const updateType = (type) => {
    setFilterCriteria((prevCriteria) => ({ ...prevCriteria, type }));
  };

  const updateFilterCriteria = (criteria) => {
    // Update filter criteria with a function to ensure correct updates when relying on previous state
    setFilterCriteria((prevCriteria) => ({ ...prevCriteria, ...criteria }));
  };

  const resetFilterCriteria = () => {
    setFilterCriteria(defaultFilterCriteria);
  };

  const filteredProducts = useMemo(() => {
    return productsWithSlug.filter((product) => {
      let typeMatch;

      if (allowMultipleTypes) {
        typeMatch = filterCriteria.type.includes(product.type);
      } else {
        typeMatch = product.type === filterCriteria.type;
      }

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

      const priceMatch =
        (!filterCriteria.price.min ||
          parseFloat(product.discountPrice) >=
            parseFloat(filterCriteria.price.min)) &&
        (!filterCriteria.price.max ||
          parseFloat(product.discountPrice) <=
            parseFloat(filterCriteria.price.max));

      return typeMatch && brandMatch && sizeMatch && colorMatch && priceMatch;
    });
  }, [filterCriteria]);

  const enableMultipleTypes = (isEnabled) => {
    setAllowMultipleTypes(isEnabled);
  };

  const value = {
    filteredProducts,
    updateFilterCriteria,
    filterCriteria,
    resetFilterCriteria,
    enableMultipleTypes,
    updateType,
  };

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};
