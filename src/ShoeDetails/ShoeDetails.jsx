import React, { useState } from "react";
import Navbar from "../Navbar/NavBar";
import Footer from "../HomePage/Footer";
import alexanderbardhZi from "../img/alexander_bardhzi.jpg";
import dragonclassic33 from "../img/dragonclassic33.jpg";

import ReactImageMagnify from "react-image-magnify";

// css
import "./ShoeDetails.css";

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
    name: "Luxury Fashion Brand",
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
                  // Add any additional configurations
                }}
              />
            </div>
          </div>

          {/* product details */}
          <div
            className="column is-full-mobile is-two-fifths-tablet is-two-fifths-desktop product-details"
            style={hideDetailsStyle}
          >
            <h1 className="title">{product.name}</h1>
            <p className="price">
              <span className="original-price">{product.originalPrice}€</span>
              <span className="discount-price">{product.discountPrice}€</span>
              <span className="discount-percentage">
                {/* {product.discountPercentage} OFF */}
              </span>
            </p>
            <p className="description">{product.description}</p>
            <p className="size">Size: {product.size}</p>
            <p className="availability">
              {product.availability ? "In Stock" : "Out of Stock"}
            </p>
            <p className="shipping-info">{product.shippingInfo}</p>
            {/* Add to cart button */}
            <button className="button is-primary add-to-cart">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ShoeDetails;
