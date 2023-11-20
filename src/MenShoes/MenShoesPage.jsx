import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/NavBar";
import Footer from "../HomePage/Footer";
import CartModal from "../CartModal/CartModal";
import { useFilter } from "../context/FilterProvider";
import { useCart } from "../context/CartProvider";
import { Link } from "react-router-dom";
import FilterPanel from "../FilterPanel/FilterPanel";
import { generateSlug } from "../helpers/slugUtils";
import { Helmet } from "react-helmet";

const MenShoesPage = () => {
  const {
    filteredProducts,
    updateFilterCriteria,
    filterCriteria,
    enableMultipleTypes,
    resetFilterCriteria,
  } = useFilter();
  const { isCartOpen, toggleCart, cartItems } = useCart();
  const [filteredProductsSlug, setFilteredProductsSlug] = useState([]);
  const [availableSizes, setAvailableSizes] = useState([]);
  const [availableBrands, setAvailableBrands] = useState([]);
  const [availableColors, setAvailableColors] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [activeFilters, setActiveFilters] = useState({
    brands: [],
    sizes: [],
    colors: [],
    // ... any other filters you have
  });

  useEffect(() => {
    const slugProducts = filteredProducts.map((product) => ({
      ...product,
      slug: generateSlug(product.name, product.id),
    }));
    setFilteredProductsSlug(slugProducts);
    console.log("filteredProductSlug", slugProducts);
  }, [filteredProducts]);

  useEffect(() => {
    enableMultipleTypes(true);
    updateFilterCriteria({ type: ["men", "unisex"] });

    return () => {
      resetFilterCriteria();
    };
  }, []);

  useEffect(() => {
    const newAvailableBrands = new Set();
    const newAvailableSizes = new Set();
    const newAvailableColors = new Set();

    filteredProducts.forEach((product) => {
      newAvailableBrands.add(product.name);
      product.numeration.forEach((size) => newAvailableSizes.add(size));
      product.color.forEach((color) => newAvailableColors.add(color));
    });

    setAvailableBrands(Array.from(newAvailableBrands));
    setAvailableSizes(Array.from(newAvailableSizes));
    setAvailableColors(Array.from(newAvailableColors));
  }, [filteredProducts]);

  const handleFilterChange = (newFilters) => {
    setActiveFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));

    if (newFilters.brands) {
      setSelectedBrands(newFilters.brands);
    }

    updateFilterCriteria(newFilters);
  };

  return (
    <>
      <Helmet>
        <title>Modelet per meshkuj - Atletja ime</title>
        <meta
          name="description"
          content="Browse our collection of men's shoes. Find the perfect pair for every occasion."
        />
        {/* You can add more meta tags and other elements as needed */}
      </Helmet>
      <Navbar />

      <div className="container">
        <div className="columns">
          <div className="column is-one-quarter">
            <FilterPanel
              onFilterChange={handleFilterChange}
              availableSizes={availableSizes}
              availableBrands={availableBrands}
              availableColors={availableColors}
              activeFilters={activeFilters}
            />
          </div>

          <div className="column is-three-quarters">
            <section className="section">
              <h1 className="title">Men's Shoes</h1>
              <div className="columns is-multiline">
                {filteredProductsSlug.map((shoe) => (
                  <div className="column is-3" key={shoe.id}>
                    <Link to={`/shoe/${shoe.slug}`}>
                      <div className="card">
                        <div className="card-image">
                          <figure className="image">
                            <img src={shoe.imageUrl} alt={shoe.name} />
                          </figure>
                        </div>

                        <div className="card-content has-text-centered">
                          <p className="title is-5">{shoe.name}</p>
                          <p className="subtitle is-6 has-text-weight-semibold">
                            {shoe.discountPrice
                              ? `${shoe.discountPrice}€`
                              : `${shoe.originalPrice}€`}
                          </p>
                          <p className="subtitle is-6">
                            {shoe.description.length > 15
                              ? shoe.description.slice(0, 15) + "..."
                              : shoe.description}
                          </p>
                          {shoe.discountPrice && (
                            <p
                              className="has-text-grey-lighter"
                              style={{ textDecoration: "line-through" }}
                            >
                              {shoe.originalPrice}€
                            </p>
                          )}
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      <CartModal
        isCartOpen={isCartOpen}
        closeCart={toggleCart}
        cartItems={cartItems}
      />

      <Footer />
    </>
  );
};

export default MenShoesPage;
