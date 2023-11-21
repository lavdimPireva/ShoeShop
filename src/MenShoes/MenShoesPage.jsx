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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import FilterModal from "./FilterModal";

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

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  useEffect(() => {
    const slugProducts = filteredProducts.map((product) => ({
      ...product,
      slug: generateSlug(product.name, product.id),
    }));
    setFilteredProductsSlug(slugProducts);
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

  const toggleFilterModal = () => {
    setIsFilterModalOpen(!isFilterModalOpen);
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
          <div className="column is-one-quarter is-hidden-mobile">
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
              <div className="level is-mobile">
                <div className="level-left">
                  <h1 className="title is-size-6-mobile is-size-6-tablet is-size-6-desktop">
                    Men's Shoes
                  </h1>
                </div>
                <div className="level-right">
                  <button
                    className="button is-hidden-tablet is-hidden-desktop"
                    onClick={toggleFilterModal}
                  >
                    <span className="icon is-size-7">
                      <FontAwesomeIcon icon={faFilter} />
                    </span>
                    <span className="is-size-7">Filtro</span>
                  </button>
                </div>
              </div>
              <div className="columns is-multiline is-mobile">
                {filteredProductsSlug.map((shoe) => (
                  <div
                    className="column is-half-mobile is-4-tablet is-3-desktop"
                    key={shoe.id}
                  >
                    <Link to={`/shoe/${shoe.slug}`}>
                      <div className="card">
                        <div className="card-image">
                          <figure className="image">
                            <img src={shoe.imageUrl} alt={shoe.name} />
                          </figure>
                        </div>

                        <div className="card-content">
                          <p className="title is-7">{shoe.name}</p>
                          <p className="subtitle is-6 has-text-weight-semibold">
                            {shoe.discountPrice
                              ? `${shoe.discountPrice}€`
                              : `${shoe.originalPrice}€`}
                          </p>
                          <p className="subtitle is-7">
                            {shoe.description.length > 15
                              ? shoe.description.slice(0, 40) + "..."
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

      <FilterModal
        isActive={isFilterModalOpen}
        closeFilterModal={toggleFilterModal}
        onFilterChange={handleFilterChange}
        availableSizes={availableSizes}
        availableBrands={availableBrands}
        availableColors={availableColors}
        activeFilters={activeFilters}
      />

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
