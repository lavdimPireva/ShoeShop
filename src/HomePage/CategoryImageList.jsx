import React from "react";

const CategoryImageList = ({ images }) => (
  <div className="horizontal-scroll-wrapper">
    {images.map((image, index) => (
      <div className="horizontal-scroll-item" key={index}>
        <a href={image.link}>
          <img src={image.src} alt={image.alt} className="category-image" />
        </a>
      </div>
    ))}
  </div>
);

export default CategoryImageList;
