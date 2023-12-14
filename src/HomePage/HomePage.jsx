import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import "bulma/css/bulma.min.css";
import Navbar from "../Navbar/NavBar";

// react-slideshow library
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//loading spinner
import { PropagateLoader } from "react-spinners";

// css import
import "./HomePage.css";

import MainSlider from "./MainSlider";
import CategoryImageList from "./CategoryImageList";

import mainSliderImages from "../ImagesModule/mainSliderImages";
import brandsImages from "../ImagesModule/brandsImages";
import BrandsImageList from "./BrandsImagesList";
import ShoeProduct from "./ShoeProduct";

import Footer from "./Footer";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartProvider";
import CartModal from "../CartModal/CartModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useProduct } from "../context/ProductProvider";

const HomePage = () => {
  const [delayedLoading, setDelayedLoading] = useState(true);
  const [cardWidth, setCardWidth] = useState("210px");

  const { isCartOpen, toggleCart, cartItems } = useCart();

  const { productsWithSlug, productBestCategory, isLoading } = useProduct();

  useEffect(() => {
    let timeout;
    if (!isLoading) {
      // Set a timeout to change the delayedLoading state after a certain period
      timeout = setTimeout(() => {
        setDelayedLoading(false);
      }, 1500); // 2000 ms delay
    }

    return () => {
      // Clear the timeout if the component is unmounted
      // to prevent a state update on an unmounted component
      clearTimeout(timeout);
    };
  }, [isLoading]); // Dependency on the isLoading state

  useEffect(() => {
    // Function to update the card width based on window size
    const updateCardWidth = () => {
      const width = window.innerWidth;
      if (width < 768) {
        // You can adjust the breakpoint as needed
        setCardWidth("150px");
      } else {
        setCardWidth("210px");
      }
    };

    // Call the function on mount and add listener for window resize
    updateCardWidth();
    window.addEventListener("resize", updateCardWidth);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener("resize", updateCardWidth);
  }, []);

  // ... res

  const scrollFirstContainer = useRef(null);
  const scrollSecondContainer = useRef(null);

  const scroll1 = (offset) => {
    if (scrollFirstContainer.current) {
      scrollFirstContainer.current.scrollBy({
        left: offset,
        behavior: "smooth",
      });
    }
  };

  const scroll2 = (offset) => {
    if (scrollSecondContainer.current) {
      scrollSecondContainer.current.scrollBy({
        left: offset,
        behavior: "smooth",
      });
    }
  };

  const settings = {
    fade: true,
    lazyLoad: "ondemand",
    infinite: true,
    speed: 350,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: true,
  };

  return (
    <div>
      <Helmet>
        <title>Atletja ime - Home</title>
        <meta
          name="description"
          content="Explore the latest trends in footwear and shop your favorite shoes at Atletja ime. Quality and style at your feet."
        />
        {/* Any other head tags you want to include */}
      </Helmet>

      <Navbar />

      {delayedLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "calc(100vh - 60px)",
          }}
        >
          {/* Adjust the height as per your Navbar's height, here assumed 60px */}
          <PropagateLoader color={"#1975B5"} />
        </div>
      ) : (
        <div>
          <section className="section">
            <div className="container">
              <div className="columns">
                <div className="column is-full has-text-centered">
                  <MainSlider settings={settings} slides={mainSliderImages} />
                </div>
              </div>
            </div>
          </section>

          {/* Categories */}
          <section className="section">
            <div className="container">
              <h4
                className="title is-size-6-mobile is-size-6-tablet is-size-5-desktop"
                style={{ marginLeft: "13px" }}
              >
                Kategoritë më të kërkuara
              </h4>
              {isLoading ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "200px",
                  }}
                >
                  <PropagateLoader color={"#123abc"} />
                </div>
              ) : (
                <div className="horizontal-scroll-wrapper">
                  <CategoryImageList products={productBestCategory} />
                </div>
              )}
            </div>
          </section>

          {/* Brands */}
          <section className="section">
            <div className="container">
              <h4
                className="title is-size-6-mobile is-size-6-tablet is-size-5-desktop"
                style={{ marginLeft: "13px" }}
              >
                Brendet më të kërkuara
              </h4>
              <div className="horizontal-scroll-wrapper">
                <BrandsImageList images={brandsImages} />
              </div>
            </div>
          </section>

          {/* cards */}

          {/* Product Cards */}
          <section className="section">
            <div className="container">
              <h4
                className="title is-4 is-size-6-mobile is-size-6-tablet is-size-5-desktop"
                style={{ marginLeft: "13px" }}
              >
                Modelet tona
              </h4>
              <div className="horizontal-scroll-container">
                <button
                  onClick={() => scroll1(-200)}
                  className="scroll-arrow left"
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <div
                  className="horizontal-scroll-wrapper"
                  ref={scrollFirstContainer}
                  style={{ overflowX: "auto", whiteSpace: "nowrap" }}
                >
                  {productsWithSlug.slice(0, 13).map((product) => (
                    <Link
                      to={`/shoe/${product.slug}`}
                      key={product.id}
                      style={{ textDecoration: "none" }}
                    >
                      <div
                        className="card"
                        style={{
                          display: "inline-flex",
                          flexDirection: "column",
                          width: cardWidth,
                          margin: "0 10px",
                          height: "fit-content", // This makes the card height fit its content
                          boxShadow: "0px 2px 15px rgba(0,0,0,0.1)", // Add shadow to the card
                          borderRadius: "10px", // Rounded corners for the card
                          overflow: "hidden",
                          marginBottom: "10px",
                          cursor: "pointer",
                        }}
                      >
                        <ShoeProduct {...product} />
                      </div>
                    </Link>
                  ))}
                </div>
                <button
                  onClick={() => scroll1(200)}
                  className="scroll-arrow right"
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </div>
            </div>
          </section>

          <section className="section">
            <div className="container">
              <h4
                className="title is-4 is-size-6-mobile is-size-6-tablet is-size-5-desktop"
                style={{ marginLeft: "13px" }}
              >
                Modelet tona
              </h4>
              <div className="horizontal-scroll-container">
                <button
                  onClick={() => scroll2(-200)}
                  className="scroll-arrow left"
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <div
                  className="horizontal-scroll-wrapper"
                  ref={scrollSecondContainer}
                  style={{ overflowX: "auto", whiteSpace: "nowrap" }}
                >
                  {productsWithSlug.slice(13, 25).map((product) => (
                    <Link
                      to={`/shoe/${product.slug}`}
                      key={product.id}
                      style={{ textDecoration: "none" }}
                    >
                      <div
                        className="card"
                        style={{
                          display: "inline-flex",
                          flexDirection: "column",
                          width: cardWidth,
                          margin: "0 10px",
                          height: "fit-content", // This makes the card height fit its content
                          boxShadow: "0px 2px 15px rgba(0,0,0,0.1)", // Add shadow to the card
                          borderRadius: "10px", // Rounded corners for the card
                          overflow: "hidden",
                          marginBottom: "10px",
                          cursor: "pointer",
                        }}
                      >
                        <ShoeProduct {...product} />
                      </div>
                    </Link>
                  ))}
                </div>
                <button
                  onClick={() => scroll2(200)}
                  className="scroll-arrow right"
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </div>
            </div>
          </section>

          {/* classic ones */}

          <section className="section">
            <div className="container ">
              <h4 className="title is-4">Classic Shoes</h4>
              <div className="columns is-multiline is-mobile">
                {productsWithSlug.slice(25, 29).map((shoe) => (
                  <div
                    className="column is-half-mobile is-4-tablet is-3-desktop"
                    key={shoe.id}
                  >
                    <Link
                      to={`/shoe/${shoe.slug}`}
                      style={{ textDecoration: "none" }}
                    >
                      <div
                        className="card"
                        style={{
                          boxShadow: "0px 2px 15px rgba(0,0,0,0.1)",
                          borderRadius: "10px",
                        }}
                      >
                        <div className="card-image">
                          <figure className="image">
                            <img
                              src={shoe.imageUrl}
                              alt={shoe.name}
                              style={{ borderRadius: "10px 10px 0 0" }}
                            />
                          </figure>
                        </div>
                        <div className="card-content has-text-left">
                          <p className="title is-size-6">{shoe.name}</p>
                          <p
                            className="title is-7"
                            style={{ textDecoration: "line-through" }}
                          >
                            {shoe.originalPrice}€
                          </p>
                          <p className="title is-6">{shoe.discountPrice}€</p>
                          <p className="subtitle is-6">
                            {shoe.description.slice(0, 40) + "..."}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <CartModal
            isCartOpen={isCartOpen}
            closeCart={toggleCart}
            cartItems={cartItems}
          />

          <Footer />
        </div>
      )}
    </div>
  );
};

export default HomePage;
