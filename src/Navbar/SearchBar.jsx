import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const SearchBar = () => (
  <div className="level-item has-expanded">
    <div className="field has-addons" style={{ width: "100%" }}>
      <div className="control is-expanded">
        <input
          className="input"
          type="search"
          placeholder="Search for shoes"
          // onChange={...} // Handle the input change
        />
      </div>
      <div className="control">
        <button
          className="button"
          style={{
            backgroundColor: "#1975B5",
            color: "#fff",
          }}
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
    </div>
  </div>
);

export default SearchBar;
