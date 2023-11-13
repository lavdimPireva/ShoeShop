import React, { useState } from "react";

import {
  faHome,
  faMale,
  faRunning,
  faShoePrints,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Breadcrumbs = () => (
  <nav className="breadcrumb px-6 pt-5 " aria-label="breadcrumbs">
    <ul>
      <li>
        <a href="#" className="has-text-black">
          <span className="icon is-small">
            <FontAwesomeIcon icon={faHome} />
          </span>
          <span>Home</span>
        </a>
      </li>
      <li>
        <a href="#" className="has-text-black">
          <span className="icon is-small">
            <FontAwesomeIcon icon={faMale} /> {/* For men's shoes */}
          </span>
          <span>Men's Shoes</span>
        </a>
      </li>
      <li>
        <a href="#" className="has-text-black">
          <span className="icon is-small">
            <FontAwesomeIcon icon={faRunning} />
          </span>
          <span>Sports Shoes</span>
        </a>
      </li>
      <li className="is-active">
        <a href="#" className="has-text-black ">
          <span className="icon is-small">
            <FontAwesomeIcon icon={faShoePrints} />{" "}
          </span>
          <span>Running Shoes</span>
        </a>
      </li>
    </ul>
  </nav>
);

export default Breadcrumbs;
