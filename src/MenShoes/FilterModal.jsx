import React from "react";
import FilterPanel from "../FilterPanel/FilterPanel";

import "./FilterModal.css";

const FilterModal = ({ isActive, closeFilterModal, ...props }) => {
  return (
    <div className={`modal ${isActive ? "is-active" : ""}`}>
      <div className="modal-background" onClick={closeFilterModal}></div>
      <div className="modal-content">
        {/* Your filter panel component */}
        <FilterPanel {...props} />
      </div>
      <button
        className="modal-close is-large"
        aria-label="close"
        onClick={closeFilterModal}
      ></button>
    </div>
  );
};

export default FilterModal;
