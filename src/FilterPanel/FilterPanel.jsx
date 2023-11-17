import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

import "./CustomPanel.css"; // Adjust the path to where your actual CSS file is located

const FilterPanel = ({ onFilterChange }) => {
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

  const [isPriceOpen, setIsPriceOpen] = useState(true);
  const [isBrandOpen, setIsBrandOpen] = useState(true);
  const [isSizeOpen, setIsSizeOpen] = useState(true);

  const togglePrice = () => setIsPriceOpen(!isPriceOpen);
  const toggleBrand = () => setIsBrandOpen(!isBrandOpen);
  const toggleSize = () => setIsSizeOpen(!isSizeOpen);

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPrice((prevPrice) => ({ ...prevPrice, [name]: value }));
  };

  const handleBrandChange = (brand) => {
    setBrands((prevBrands) => ({ ...prevBrands, [brand]: !prevBrands[brand] }));
  };

  const handleSizeChange = (size) => {
    setSizes((prevSizes) => ({ ...prevSizes, [size]: !prevSizes[size] }));
  };

  // Call this function whenever you want to propagate filter changes up to the parent component
  const applyFilters = () => {
    onFilterChange({ price, brands, sizes });
  };

  return (
    <nav className="panel small-filter-panel">
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
          {Object.entries(sizes).map(([size, isChecked]) => (
            <label className="panel-block" key={size}>
              <input
                type="checkbox"
                checked={isChecked}
                className="is-size-6-fullhd	"
                onChange={() => handleSizeChange(size)}
              />
              <span className="is-size-7-fullhd">{size}</span>
            </label>
          ))}
        </div>
      )}

      <div className="panel-block">
        <button
          className="button is-link is-outlined is-fullwidth m-4"
          onClick={applyFilters}
        >
          Apliko Filterat
        </button>
      </div>
    </nav>
  );
};

export default FilterPanel;
