import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faMale,
  faFemale,
  faRunning,
  faShoePrints,
} from "@fortawesome/free-solid-svg-icons";

import "./Breadcrumbs.css";

const Breadcrumbs = () => (
  <nav className="breadcrumb px-6 pt-5" aria-label="breadcrumbs">
    <ul>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "has-text-black is-active" : "has-text-black"
          }
          end
        >
          <span className="icon is-small">
            <FontAwesomeIcon icon={faHome} />
          </span>
          <span>Home</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/Men-shoes"
          className={({ isActive }) =>
            isActive ? "has-text-black is-active" : "has-text-black"
          }
        >
          <span className="icon is-small">
            <FontAwesomeIcon icon={faMale} />
          </span>
          <span>Men's Shoes</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/Female-shoes"
          className={({ isActive }) =>
            isActive ? "has-text-black is-active" : "has-text-black"
          }
        >
          <span className="icon is-small">
            <FontAwesomeIcon icon={faFemale} />
          </span>
          <span>Female's Shoes</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/Sports-shoes"
          className={({ isActive }) =>
            isActive ? "has-text-black is-active" : "has-text-black"
          }
        >
          <span className="icon is-small">
            <FontAwesomeIcon icon={faRunning} />
          </span>
          <span>Sports Shoes</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/Running-shoes"
          className={({ isActive }) =>
            isActive ? "has-text-black is-active" : "has-text-black"
          }
        >
          <span className="icon is-small">
            <FontAwesomeIcon icon={faShoePrints} />
          </span>
          <span>Running Shoes</span>
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default Breadcrumbs;
