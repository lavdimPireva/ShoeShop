import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef } from "react";

const BrandsImageList = ({ images }) => {
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
        {images.map((image, index) => (
          <div className="horizontal-scroll-item" key={index}>
            <a href={image.link}>
              <img src={image.src} alt={image.alt} className="brand-image" />
            </a>
          </div>
        ))}
      </div>
      <button onClick={scrollRight} className="scroll-arrow right">
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </>
  );
};

export default BrandsImageList;
