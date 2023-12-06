import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/NavBar";
import Footer from "../HomePage/Footer";

// css
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ShoeDetails.css";
import {
  faCartPlus,
  faShoePrints,
  faTags,
  faTimes,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import CartModal from "../CartModal/CartModal";
import { useParams } from "react-router-dom";
import ShoeSizeSelector from "./ShoeSizeSelector";
import ShoeImage from "./ShoeImage";
import { generateSlug } from "../helpers/slugUtils";
import { Helmet } from "react-helmet";
import { useCart } from "../context/CartProvider";
import { useProduct } from "../context/ProductProvider";
import { PropagateLoader } from "react-spinners";

const ShoeDetails = () => {
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [isImageHovered, setImageHovered] = useState(false);
  const [showSizeWarning, setShowSizeWarning] = useState(false);

  const { addToCart, isCartOpen, toggleCart, cartItems } = useCart();
  const { productsWithSlug, isLoading } = useProduct();

  // get the slug from URL
  const { slug } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const shoeDetails = productsWithSlug.find(
    (shoe) => generateSlug(shoe.name, shoe.id) === slug
  );

  const handleAddToCart = () => {
    if (selectedSizes.length === 0) {
      setShowSizeWarning(true);
      // Optionally, set a timeout to hide the notification after a few seconds
      setTimeout(() => setShowSizeWarning(false), 3000);
      return;
    }

    const quantity = selectedSizes.length;

    // Create a product object with the necessary properties
    const productToAdd = {
      ...shoeDetails,
      selectedSizes: selectedSizes,
      quantity: quantity,
    };

    // Call the addToCart function from your context
    addToCart(productToAdd);
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

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 60px)",
        }}
      >
        {/* Adjust the height as per your Navbar's height, here assumed 60px */}
        <PropagateLoader color={"#123abc"} />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`Buy ${shoeDetails.name} - Atletja ime`}</title>
        <meta
          name="description"
          content={`Purchase ${shoeDetails.name}. ${shoeDetails.description}`}
        />
      </Helmet>
      <Navbar />
      <div className="container">
        <div className="columns is-multiline">
          <div className="column is-full-mobile is-half-tablet is-half-desktop">
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
              <h2 className="title is-size-6-mobile is-size-6-tablet is-size-5-fullhd m-2">
                Detajet e Produktit
              </h2>

              <div className="is-flex is-size-6-mobile is-align-items-center m-3">
                <span className="icon is-large">
                  <FontAwesomeIcon
                    style={{ color: "#781200" }}
                    icon={faShoePrints}
                    size="2x"
                  />
                </span>
                <span className="ml-2 is-size-6-mobile is-size-6-tablet  is-size-6-fullhd">
                  {shoeDetails.name}
                </span>
              </div>

              <div className="is-flex is-align-items-center mb-2 m-3">
                <span className="icon is-large ">
                  <FontAwesomeIcon
                    style={{ color: "#781200" }}
                    icon={faTags}
                    size="2x"
                  />
                </span>
                <span className="ml-2 is-size-6-mobile is-size-6-tablet is-size-6-fullhd">
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
                <span className="ml-2 is-size-6-mobile is-size-6-tablet is-size-6-fullhd">
                  Albania - Transport 5€
                </span>
              </div>
              <div className="is-flex is-align-items-center mb-2 m-3">
                <span className="icon is-normal-mobile is-large">
                  <FontAwesomeIcon
                    icon={faTruck}
                    style={{ color: "#781200" }}
                    size="2x"
                  />
                </span>
                <span className="ml-2 is-size-6-mobile is-size-6-tablet is-6-fullhd  ">
                  Maqedoni - Transport 5€
                </span>
              </div>

              <div className="is-flex is-align-items-center mb-2 m-3">
                <span className="icon is-large">
                  <FontAwesomeIcon
                    style={{ color: "#781200" }}
                    icon={faTruck}
                    size="2x"
                  />
                </span>
                <span className="ml-2 is-size-6-mobile is-size-6-tablet  is-6-fullhd">
                  Kosovo - Transporti FALAS!
                </span>
              </div>

              {/* Numeration Label */}
              <h3 className="subtitle is-size-6-mobile is-size-6-tablet	 m-3 is-6-fullhd">
                Zgjedh numrin ose numrat qe deshironi t'i porositni
              </h3>

              {/* Numeration */}
              <ShoeSizeSelector
                numeration={shoeDetails.numeration}
                selectedSizes={selectedSizes}
                onSelectSize={handleSelectSize}
                onRemoveSize={handleRemoveSize}
              />

              {selectedSizes.length > 0 && (
                <div className="tags m-3 are-medium is-6-fullhd">
                  <p>Ju keni zgjedhur keta numra per porosi:</p>
                  {selectedSizes.map((size) => (
                    <span
                      key={size}
                      className="tag is-deleteable  m-2 is-6-fullhd"
                      style={{ background: "#1975B5", color: "#fff" }}
                    >
                      {size}
                      <button
                        className="delete is-small"
                        onClick={() => handleRemoveSize(size)}
                      ></button>
                    </span>
                  ))}
                </div>
              )}

              <div
                className="button  m-3"
                style={{ background: "#1975B5", color: "#fff" }}
                onClick={handleAddToCart}
              >
                <span className="icon">
                  <FontAwesomeIcon icon={faCartPlus} />
                </span>
                <span className="has-text-weight-semi-bold">Add to Cart</span>
              </div>

              {showSizeWarning && (
                <div className="notification is-danger is-light">
                  <button
                    className="delete"
                    onClick={() => setShowSizeWarning(false)}
                  ></button>
                  <strong>Please select a size before adding to cart.</strong>
                </div>
              )}
              <CartModal
                isCartOpen={isCartOpen}
                closeCart={toggleCart}
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
