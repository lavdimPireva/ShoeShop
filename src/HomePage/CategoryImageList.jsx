import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const CategoryImageList = ({ products }) => {
  const scrollContainer = useRef(null);

  const scrollLeft = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <>
      <button onClick={scrollLeft} className="scroll-arrow left">
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <div className="horizontal-scroll-wrapper" ref={scrollContainer}>
        {products.map((product, index) => (
          <div className="horizontal-scroll-item" key={index}>
            <Link
              to={`/shoe/${product.slug}`}
              key={product.id}
              style={{ textDecoration: "none" }}
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="category-image"
              />
            </Link>
          </div>
        ))}
      </div>
      <button onClick={scrollRight} className="scroll-arrow right">
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </>
  );
};

export default CategoryImageList;
