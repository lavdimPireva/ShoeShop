// ShoeSizeSelector.jsx
import React from "react";

const ShoeSizeSelector = ({ selectedSizes, onSelectSize, onRemoveSize }) => {
  const sizes = ["36", "37", "38", "39", "40", "41", "42", "43", "44"];

  return (
    <div className="tags are-medium m-3" style={{ cursor: "pointer" }}>
      {sizes.map((size) => (
        <span
          key={size}
          className={`tag ${
            selectedSizes.includes(size) ? "is-primary" : "is-light"
          }`}
          onClick={() => onSelectSize(size)}
        >
          {size}
        </span>
      ))}
      {/* ... */}
    </div>
  );
};

export default ShoeSizeSelector;
