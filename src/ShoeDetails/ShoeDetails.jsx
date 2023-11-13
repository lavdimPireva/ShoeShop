import React from "react";
import Navbar from "../Navbar/NavBar";
import Footer from "../HomePage/Footer";
import alexanderbardhZi from "../img/alexander_bardhzi.jpg";
import ReactImageMagnify from "react-image-magnify";

// css
import "./ShoeDetails.css";

const ShoeDetails = () => {
  const product = {
    id: 1,
    name: "Luxury Fashion Brand",
    imageUrl: alexanderbardhZi,
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
            <div className="image-container">
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
                    width: "100%",
                    height: "100%",
                  },

                  isHintEnabled: true,
                  shouldHideHintAfterFirstActivation: false,
                  // Add any additional configurations
                }}
              />
            </div>
          </div>
          <div className="column is-full-mobile is-two-fifths-tablet is-two-fifths-desktop product-details">
            <h1 className="title">{product.name}</h1>
            {/* Display other product details here */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ShoeDetails;
