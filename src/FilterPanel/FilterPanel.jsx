import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

import "./CustomPanel.css"; // Adjust the path to where your actual CSS file is located

const FilterPanel = ({ onFilterChange, availableSizes }) => {
  const [price, setPrice] = useState({ min: "", max: "" });
  const [brands, setBrands] = useState({
    Reebok: false,
    Lapolo: false,
    "New Balance": false,
    "Dragon Ortopedic Shoes": false,
    "New Dragon Ortopedic Shoes": false,
    "Nike Pegasus": false,
    Pllanika: false,
    "Dugana Sport Shoes": false,
    "Alexander Mc Queen": false,
  });
  const [sizes, setSizes] = useState({
    36: false,
    37: false,
    38: false,
    39: false,
    40: false,
    41: false,
    42: false,
    43: false,
    44: false,
    45: false,
  });

  const [colors, setColors] = useState({
    bardhe: false,
    zeze: false,
    hiri: false,
    gjelbert: false,
    portokall: false,
  });

  const [isPriceOpen, setIsPriceOpen] = useState(true);
  const [isBrandOpen, setIsBrandOpen] = useState(true);
  const [isSizeOpen, setIsSizeOpen] = useState(true);
  const [isColorOpen, setIsColorOpen] = useState(true);

  const togglePrice = () => setIsPriceOpen(!isPriceOpen);
  const toggleBrand = () => setIsBrandOpen(!isBrandOpen);
  const toggleSize = () => setIsSizeOpen(!isSizeOpen);
  const toggleColor = () => setIsColorOpen(!isColorOpen);

  const getActiveFilterLabels = () => {
    const filterLabels = [];

    // Add selected price range
    if (price.min) filterLabels.push(`Minimum price: ${price.min}€`);
    if (price.max) filterLabels.push(`Maximum price: ${price.max}€`);

    // Add selected brands
    Object.entries(brands).forEach(([brand, isSelected]) => {
      if (isSelected) filterLabels.push(`Brand: ${brand}`);
    });

    // Add selected sizes
    Object.keys(sizes).forEach((size) => {
      if (sizes[size]) filterLabels.push(`Size: ${size}`);
    });

    // Add selected colors
    Object.entries(colors).forEach(([color, isSelected]) => {
      if (isSelected) filterLabels.push(`Color: ${color}`);
    });

    return filterLabels;
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPrice((prevPrice) => ({ ...prevPrice, [name]: value }));
  };

  const handleBrandChange = (brandName) => {
    // Toggle the brand selection state
    setBrands((prevBrands) => {
      const updatedBrands = {
        ...prevBrands,
        [brandName]: !prevBrands[brandName],
      };
      // After state update, call onFilterChange with the current selection
      onFilterChange({
        brands: Object.keys(updatedBrands).filter(
          (brand) => updatedBrands[brand]
        ),
        // ... include other filters like sizes and colors if needed
      });
      return updatedBrands;
    });
  };

  const handleSizeChange = (size) => {
    setSizes((prevSizes) => ({ ...prevSizes, [size]: !prevSizes[size] }));
  };

  const handleColorChange = (color) => {
    setColors((prevColors) => {
      const updatedColors = { ...prevColors, [color]: !prevColors[color] };

      onFilterChange({
        brands: Object.keys(brands).filter((b) => brands[b]), // Keep current brand selection
        colors: Object.keys(updatedColors).filter((c) => updatedColors[c]), // Update color selection
        sizes: Object.keys(sizes).filter((s) => sizes[s]), // Keep current size selection
        // ... include other filters if needed
      });

      return updatedColors;
    });
  };

  const onRemoveFilter = (label) => {
    // You'll need to parse the label to understand what type of filter it is and its value
    // Then update the state accordingly to remove the filter
    // Call onFilterChange to update the parent component
  };

  return (
    <nav className="panel small-filter-panel " style={{ margin: "10px" }}>
      <a
        className="panel-heading is-flex is-justify-content-space-between"
        onClick={togglePrice}
      >
        Price
        <span className="icon">
          <FontAwesomeIcon icon={isPriceOpen ? faChevronUp : faChevronDown} />
        </span>
      </a>
      {isPriceOpen && (
        <div>
          <div className="panel-block">
            <p className="control has-icons-left">
              <input
                className="input is-small"
                type="number"
                placeholder="Minimum price"
              />
              <span className="icon is-left">€</span>
            </p>
          </div>
          <div className="panel-block">
            <p className="control has-icons-left">
              <input
                className="input is-small"
                type="number"
                placeholder="Maximum price"
              />
              <span className="icon is-left">€</span>
            </p>
          </div>
        </div>
      )}

      <a
        className="panel-heading is-flex is-justify-content-space-between"
        onClick={toggleBrand}
      >
        Brand
        <span className="icon">
          <FontAwesomeIcon icon={isBrandOpen ? faChevronUp : faChevronDown} />
        </span>
      </a>
      {isBrandOpen && (
        <div className="scrollable-container">
          {Object.entries(brands).map(([brand, isChecked]) => (
            <label className="panel-block" key={brand}>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => handleBrandChange(brand)}
              />
              <span className="is-size-7-fullhd">{brand}</span>
            </label>
          ))}
        </div>
      )}

      <a
        className="panel-heading is-flex is-justify-content-space-between"
        onClick={toggleSize}
      >
        Size
        <span className="icon">
          <FontAwesomeIcon icon={isSizeOpen ? faChevronUp : faChevronDown} />
        </span>
      </a>
      {isSizeOpen && (
        <div className="scrollable-container">
          {Object.keys(sizes).map((size) => {
            const isSizeAvailable = availableSizes.includes(parseInt(size));
            return (
              <label
                className={`panel-block ${
                  !isSizeAvailable ? "is-disabled" : ""
                }`}
                key={size}
              >
                <input
                  type="checkbox"
                  checked={sizes[size]}
                  disabled={!isSizeAvailable}
                  onChange={() => handleSizeChange(size)}
                />
                <span
                  className={`is-size-7-fullhd ${
                    !isSizeAvailable ? "has-text-grey-light" : ""
                  }`}
                >
                  {size}
                </span>
              </label>
            );
          })}
        </div>
      )}

      <a
        className="panel-heading is-flex is-justify-content-space-between"
        onClick={toggleColor}
      >
        Color
        <span className="icon">
          <FontAwesomeIcon icon={isColorOpen ? faChevronUp : faChevronDown} />
        </span>
      </a>
      {isColorOpen && (
        <div className="scrollable-container">
          {Object.entries(colors).map(([color, isChecked]) => (
            <label className="panel-block" key={color}>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => handleColorChange(color)}
              />
              <span className="is-size-7-fullhd">{color}</span>
            </label>
          ))}
        </div>
      )}

      {/* Section to display selected filters */}
      <div
        className="selected-filters-container"
        style={{
          padding: "10px",
          background: "#f5f5f5",
          borderRadius: "8px",
          marginTop: "20px",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {getActiveFilterLabels().map((label, index) => (
          <span
            key={index}
            className="tag is-small is-info m-1"
            style={{
              display: "flex",
              alignItems: "center",
              background: "#e6e6e6",
              color: "#333",
              fontWeight: "bold",
              borderRadius: "20px",
            }}
          >
            {label}
            <button
              className="delete is-small"
              onClick={() => onRemoveFilter(label)}
              style={{ marginLeft: "10px" }}
            ></button>
          </span>
        ))}
      </div>
    </nav>
  );
};

export default FilterPanel;
