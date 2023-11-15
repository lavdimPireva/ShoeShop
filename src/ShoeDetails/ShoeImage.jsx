// ShoeImage.jsx
import React from "react";

import ReactImageMagnify from "react-image-magnify";

import "./ShoeImage.css";

const ShoeImage = ({ shoe, onMouseEnter, onMouseLeave }) => {
  return (
    <div
      className="image-container mb-5 mt-2"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <ReactImageMagnify
        {...{
          smallImage: {
            alt: shoe.name,
            isFluidWidth: true,
            src: shoe.imageUrl,
            width: 620,
            height: 560,
            sizes: "(min-width: 1024px) 620px, 100vw",
          },
          largeImage: {
            src: shoe.imageUrl,
            width: 1000,
            height: 1500,
          },
          lensStyle: { backgroundColor: "rgba(0,0,0,.6)" },
          enlargedImagePosition: "beside",
          enlargedImageContainerDimensions: {
            width: "150%",
            height: "100%",
          },
          isHintEnabled: true,
          shouldHideHintAfterFirstActivation: false,
        }}
      />
    </div>
  );
};

export default ShoeImage;
