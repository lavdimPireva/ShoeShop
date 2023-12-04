// ShoeSizeSelector.jsx
import React from "react";

const ShoeSizeSelector = ({
  numeration,
  selectedSizes,
  onSelectSize,
  onRemoveSize,
}) => {
  return (
    <div className="tags are-medium m-3" style={{ cursor: "pointer" }}>
      {numeration.map((size) => (
        <span
          key={size}
          className={`tag ${
            selectedSizes.includes(size.toString()) ? "" : "is-light"
          }`}
          style={
            selectedSizes.includes(size.toString())
              ? { backgroundColor: "#1975B5", color: "white" }
              : {}
          }
          onClick={() => onSelectSize(size.toString())}
        >
          {size}
        </span>
      ))}
    </div>
  );
};

export default ShoeSizeSelector;
