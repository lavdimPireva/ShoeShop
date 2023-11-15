import React, { useState } from "react";
import Navbar from "../Navbar/NavBar";
import Footer from "../HomePage/Footer";

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
import { products } from "../ImagesModule/ModelsImage";
import { useParams } from "react-router-dom";
import ShoeSizeSelector from "./ShoeSizeSelector";
import ShoeImage from "./ShoeImage";
import { generateSlug } from "../helpers/slugUtils";

const ShoeDetails = () => {
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [isImageHovered, setImageHovered] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  // get the slug from URL
  const { slug } = useParams();

  console.log("slug", slug);

  const shoeDetails = products.find(
    (shoe) => generateSlug(shoe.name, shoe.id) === slug
  );

  const openCart = () => {
    setCartOpen(true);

    const productToAdd = {
      ...shoeDetails,
      selectedSizes: selectedSizes,
    };

    setCartItems([productToAdd]);
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
            <ShoeImage
              shoe={shoeDetails}
              onMouseEnter={() => handleMouseHover(true)}
              onMouseLeave={() => handleMouseHover(false)}
            />
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
                <span className="ml-2">{shoeDetails.name}</span>
              </div>

              <div className="is-flex is-align-items-center mb-2 m-3">
                <span className="icon is-large">
                  <FontAwesomeIcon
                    style={{ color: "#781200" }}
                    icon={faTags}
                    size="2x"
                  />
                </span>
                <span className="ml-2">
                  Çmimi: {shoeDetails.discountPrice}€
                </span>
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
              <ShoeSizeSelector
                selectedSizes={selectedSizes}
                onSelectSize={handleSelectSize}
                onRemoveSize={handleRemoveSize}
              />

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
