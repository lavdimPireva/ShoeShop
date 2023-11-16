import React, { createContext, useState, useContext } from "react";

const FilterContext = createContext();

export const useFilter = () => useContext(FilterContext);

export const FilterProvider = ({ children }) => {
  const [filterType, setFilterType] = useState("all");

  const handleFilterChange = (type) => {
    setFilterType(type);
  };

  return (
    <FilterContext.Provider value={{ filterType, handleFilterChange }}>
      {children}
    </FilterContext.Provider>
  );
};
