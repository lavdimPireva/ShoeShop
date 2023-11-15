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
  faCartPlus,
  faShoePrints,
  faTags,
  faTimes,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import CartModal from "../CartModal/CartModal";

const ShoeDetails = () => {
  const [selectedSizes, setSelectedSizes] = useState([]);

  const [isImageHovered, setImageHovered] = useState(false);

  const [isCartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const product = {
    id: 1,
    name: "Dragon e zeze pa toja",
    imageUrl: dragonclassic33,
    originalPrice: "69.99",
    discountPrice: "19.99",
    description:
      "Comfortable running shoes with great traction and durability.",
  };

  const openCart = () => {
    setCartOpen(true);
    setCartItems([product]);
  };

  // Function to close the cart modal
  const closeCart = () => {
    setCartOpen(false);
  };

  const addToCart = () => {
    console.log("Add to cart");

    // Logic to add the item to the cart
    // Then open the cart sidebar
    openCart();
  };

  const hideDetailsStyle = {
    display: isImageHovered ? "none" : "block",
  };

  const handleMouseHover = (isHovered) => {
    if (window.innerWidth > 768) {
      setImageHovered(isHovered);
    }
  };

  // Function to remove selected size
  const handleRemoveSize = (size) => {
    setSelectedSizes((prevSelectedSizes) =>
      prevSelectedSizes.filter((s) => s !== size)
    );
  };

  const handleSelectSize = (size) => {
    setSelectedSizes((prevSelectedSizes) => {
      if (prevSelectedSizes.includes(size)) {
        return prevSelectedSizes.filter((s) => s !== size);
      } else {
        return [...prevSelectedSizes, size];
      }
    });
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
                <span className="ml-2">Çmimi: 19.99€</span>
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
                <span className="ml-2">Kosovo - Transporti FALAS!</span>
              </div>

              {/* Numeration Label */}
              <h3 className="subtitle is-5 m-3">
                Zgjedh numrin ose numrat qe deshironi t'i porositni
              </h3>

              {/* Numeration */}
              <div
                className="tags are-medium m-3 "
                style={{ cursor: "pointer" }}
              >
                {["36", "37", "38", "39", "40", "41", "42", "43", "44"].map(
                  (size) => (
                    <span
                      key={size}
                      className={`tag ${
                        selectedSizes.includes(size) ? "is-primary" : "is-light"
                      }`}
                      onClick={() => handleSelectSize(size)}
                    >
                      {size}
                    </span>
                  )
                )}
              </div>

              {selectedSizes.length > 0 && (
                <div className="tags m-3 are-medium">
                  <p>Ju keni zgjedhur keta numra per porosi:</p>
                  {selectedSizes.map((size) => (
                    <span
                      key={size}
                      className="tag is-deleteable is-primary m-2"
                    >
                      {size}
                      <button
                        className="delete is-small"
                        onClick={() => handleRemoveSize(size)}
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              <div className="button is-primary m-3" onClick={addToCart}>
                <span className="icon">
                  <FontAwesomeIcon icon={faCartPlus} />
                </span>
                <span>Add to Cart</span>
              </div>
              <CartModal
                isCartOpen={isCartOpen}
                closeCart={closeCart}
                cartItems={cartItems}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ShoeDetails;
