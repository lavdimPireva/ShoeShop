import React from "react";
import FilterPanel from "../FilterPanel/FilterPanel";

import "./FilterModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons"; //

const FilterModal = ({ isActive, closeFilterModal, ...props }) => {
  return (
    <div className={`modal ${isActive ? "is-active" : ""}`}>
      <div className="modal-background" onClick={closeFilterModal}></div>
      <div className="modal-content">
        {/* Replace the delete button with FontAwesomeIcon button */}
        <button
          className="modal-close-button"
          aria-label="close"
          onClick={closeFilterModal}
        >
          <FontAwesomeIcon icon={faXmark} size="2x" />
          {/* Adjust size as needed */}
        </button>
        {/* Your filter panel component */}
        <FilterPanel {...props} />
      </div>
    </div>
  );
};

export default FilterModal;
