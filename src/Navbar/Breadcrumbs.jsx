import React, { useState } from "react";

import {
  faHome,
  faMale,
  faRunning,
  faShoePrints,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Link } from "react-router-dom";

const Breadcrumbs = () => (
  <nav className="breadcrumb px-6 pt-5" aria-label="breadcrumbs">
    <ul>
      <li>
        <Link to="/" className="has-text-black">
          <span className="icon is-small">
            <FontAwesomeIcon icon={faHome} />
          </span>
          <span>Home</span>
        </Link>
      </li>
      <li>
        <Link to="/Men-shoes" className="has-text-black">
          <span className="icon is-small">
            <FontAwesomeIcon icon={faMale} /> {/* For men's shoes */}
          </span>
          <span>Men's Shoes</span>
        </Link>
      </li>
      {/* Other breadcrumb items */}
      <li>
        <Link to="/Sports-shoes" className="has-text-black">
          <span className="icon is-small">
            <FontAwesomeIcon icon={faRunning} />
          </span>
          <span>Sports Shoes</span>
        </Link>
      </li>
      <li className="is-active">
        <Link to="/Running-shoes" className="has-text-black">
          <span className="icon is-small">
            <FontAwesomeIcon icon={faShoePrints} />
          </span>
          <span>Running Shoes</span>
        </Link>
      </li>
    </ul>
  </nav>
);

export default Breadcrumbs;
