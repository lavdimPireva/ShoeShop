import React, { useRef } from "react";
import { Helmet } from "react-helmet";
import "bulma/css/bulma.min.css";
import Navbar from "../Navbar/NavBar";

// react-slideshow library
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// css import
import "./HomePage.css";

import MainSlider from "./MainSlider";
import CategoryImageList from "./CategoryImageList";
import categoryImages from "../ImagesModule/categoryImages";
import mainSliderImages from "../ImagesModule/mainSliderImages";
import brandsImages from "../ImagesModule/brandsImages";
import BrandsImageList from "./BrandsImagesList";
import ShoeProduct from "./ShoeProduct";
import { classicShoes, products } from "../ImagesModule/ModelsImage";

import Footer from "./Footer";
import { Link } from "react-router-dom";
import { generateSlug } from "../helpers/slugUtils";
import { useCart } from "../context/CartProvider";
import CartModal from "../CartModal/CartModal";
import { useFilter } from "../context/FilterProvider";

const HomePage = () => {
  const { isCartOpen, toggleCart, cartItems } = useCart();

  const settings = {
    fade: true,
    lazyLoad: "ondemand",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: true,
  };

  const productsList = products.map((product) => ({
    ...product,
    slug: generateSlug(product.name, product.id),
  }));

  console.log("classic", productsList.slice(25, 29));

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

      {/* slideshow */}
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
          <h4 className="title is-4">Kategoritë më të kërkuara</h4>
          <div className="horizontal-scroll-wrapper">
            <CategoryImageList images={categoryImages} />
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="section">
        <div className="container">
          <h4 className="title is-4">Brendet më të kërkuara</h4>
          <div className="horizontal-scroll-wrapper">
            <BrandsImageList images={brandsImages} />
          </div>
        </div>
      </section>

      {/* cards */}

      {/* Product Cards */}
      <section className="section">
        <div className="container">
          <h4 className="title is-4">Modelet tona</h4>
          <div
            className="horizontal-scroll-wrapper"
            style={{ overflowX: "auto", whiteSpace: "nowrap" }}
          >
            {productsList.slice(0, 13).map((product) => (
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
                    width: "210px",
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
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h4 className="title is-4">Modelet tona</h4>
          <div
            className="horizontal-scroll-wrapper"
            style={{ overflowX: "auto", whiteSpace: "nowrap" }}
          >
            {productsList.slice(13, 25).map((product) => (
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
                    width: "210px",
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
        </div>
      </section>

      {/* classic ones */}

      <section className="section">
        <div className="container">
          <h4 className="title is-4">Classic Shoes</h4>
          <div className="columns">
            {productsList.slice(25, 29).map((shoe) => (
              <div className="column is-3" key={shoe.id}>
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
                    <div className="card-content has-text-centered">
                      <p className="title is-5">{shoe.name}</p>
                      <p
                        className="title is-6"
                        style={{ textDecoration: "line-through" }}
                      >
                        {shoe.originalPrice}€
                      </p>
                      <p className="title is-4">{shoe.discountPrice}€</p>
                      <p className="subtitle is-6">{shoe.description}</p>
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
  );
};

export default HomePage;
