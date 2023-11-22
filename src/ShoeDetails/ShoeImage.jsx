// ShoeImage.jsx
import React, { useEffect, useState } from "react";
import ReactImageMagnify from "react-image-magnify";
import ReactImageLightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

import "./ShoeImage.css";

const ShoeImage = ({ shoe, onMouseEnter, onMouseLeave }) => {
  const [disableZoom, setDisableZoom] = useState(window.innerWidth <= 768);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setDisableZoom(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const imageProps = {
    alt: shoe.name,
    src: shoe.imageUrl,
    // ... other image properties
  };

  return (
    <div
      className="image-container mb-5 mt-2"
      onMouseEnter={disableZoom ? null : onMouseEnter}
      onMouseLeave={disableZoom ? null : onMouseLeave}
      onClick={() => disableZoom && setLightboxOpen(true)}
    >
      {disableZoom ? (
        <>
          <img {...imageProps} />
          {lightboxOpen && (
            <ReactImageLightbox
              mainSrc={shoe.imageUrl}
              onCloseRequest={() => setLightboxOpen(false)}
            />
          )}
        </>
      ) : (
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
            isHintEnabled: false,
            shouldHideHintAfterFirstActivation: false,
          }}
        />
      )}
    </div>
  );
};

export default ShoeImage;
