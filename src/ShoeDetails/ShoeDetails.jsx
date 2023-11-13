import React, { useState } from "react";
import Navbar from "../Navbar/NavBar";
import Footer from "../HomePage/Footer";
import alexanderbardhZi from "../img/alexander_bardhzi.jpg";
import dragonclassic33 from "../img/dragonclassic33.jpg";

import ReactImageMagnify from "react-image-magnify";

// css
import "./ShoeDetails.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoePrints,
  faTags,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";

const ShoeDetails = () => {
  const [isImageHovered, setImageHovered] = useState(false);

  const hideDetailsStyle = {
    display: isImageHovered ? "none" : "block",
  };

  const handleMouseHover = (isHovered) => {
    if (window.innerWidth > 768) {
      setImageHovered(isHovered);
    }
  };
  const product = {
    id: 1,
    name: "Dragon e zeze pa toja",
    imageUrl: dragonclassic33,
    originalPrice: "69.99",
    discountPrice: "19.99",
    description:
      "Comfortable running shoes with great traction and durability.",
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="columns is-multiline">
          <div className="column is-full-mobile is-three-fifths-tablet is-three-fifths-desktop">
            <div
              className="image-container mb-5 mt-2"
              onMouseEnter={() => handleMouseHover(true)}
              onMouseLeave={() => handleMouseHover(false)}
            >
              <ReactImageMagnify
                {...{
                  smallImage: {
                    alt: product.name,
                    isFluidWidth: true,
                    src: product.imageUrl,
                    width: 620,
                    height: 560,
                    sizes: "(min-width: 1024px) 620px, 100vw",
                  },
                  largeImage: {
                    src: product.imageUrl,
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
          </div>
          {/* product details */}
          <div className="column is-full-mobile mb-5" style={hideDetailsStyle}>
            <div className="box">
              {/* Box Title */}
              <h2 className="title is-4 m-2">Detajet e Produktit</h2>

              <div className="is-flex is-align-items-center m-3">
                <span className="icon is-large">
                  <FontAwesomeIcon
                    style={{ color: "#781200" }}
                    icon={faShoePrints}
                    size="2x"
                  />
                </span>
                <span className="ml-2">Dragon e zeze pa toja</span>
              </div>

              <div className="is-flex is-align-items-center mb-2 m-3">
                <span className="icon is-large">
                  <FontAwesomeIcon
                    style={{ color: "#781200" }}
                    icon={faTags}
                    size="2x"
                  />
                </span>
                <span className="ml-2">Price: 19.99€</span>
              </div>

              <div className="is-flex is-align-items-center mb-2 m-3">
                <span className="icon is-large">
                  <FontAwesomeIcon
                    icon={faTruck}
                    style={{ color: "#781200" }}
                    size="2x"
                  />
                </span>
                <span className="ml-2">Albania - Transport 5€</span>
              </div>

              <div className="is-flex is-align-items-center mb-2 m-3">
                <span className="icon is-large">
                  <FontAwesomeIcon
                    icon={faTruck}
                    style={{ color: "#781200" }}
                    size="2x"
                  />
                </span>
                <span className="ml-2 ">Maqedoni - Transport 5€ </span>
              </div>

              <div className="is-flex is-align-items-center mb-2 m-3">
                <span className="icon is-large">
                  <FontAwesomeIcon
                    style={{ color: "#781200" }}
                    icon={faTruck}
                    size="2x"
                  />
                </span>
                <span className="ml-2">Kosovo - Transporti FREE</span>
              </div>

              {/* Numeration Label */}
              <h3 className="subtitle is-5 m-3">Numeracioni</h3>

              {/* Numeration */}
              <div className="tags m-3">
                {["36", "37", "38", "39", "40", "41", "42", "43", "44"].map(
                  (size) => (
                    <span key={size} className="tag is-light">
                      {size}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ShoeDetails;
