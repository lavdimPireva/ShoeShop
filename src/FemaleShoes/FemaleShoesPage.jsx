import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/NavBar";
import Footer from "../HomePage/Footer";
import CartModal from "../CartModal/CartModal";
import { useFilter } from "../context/FilterProvider";
import { useCart } from "../context/CartProvider";
import { generateSlug } from "../helpers/slugUtils";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import FilterPanel from "../FilterPanel/FilterPanel";
import FilterModal from "../MenShoes/FilterModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { useProduct } from "../context/ProductProvider";
import { PropagateLoader } from "react-spinners";

const FemaleShoesPage = () => {
  const {
    filteredProducts,
    updateType,
    resetFilterCriteria,
    updateFilterCriteria,
  } = useFilter();
  const { isCartOpen, toggleCart, cartItems } = useCart();
  const [delayedLoading, setDelayedLoading] = useState(true);

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
  const { isLoading } = useProduct();

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  useEffect(() => {
    let timeout;
    if (!isLoading) {
      // Set a timeout to change the delayedLoading state after a certain period
      timeout = setTimeout(() => {
        setDelayedLoading(false);
      }, 1000); // 1000 ms delay
    }

    return () => {
      // Clear the timeout if the component is unmounted
      // to prevent a state update on an unmounted component
      clearTimeout(timeout);
    };
  }, [isLoading]); // Dependency on the isLoading state

  useEffect(() => {
    const slugProducts = filteredProducts.map((product) => ({
      ...product,
      slug: generateSlug(product.name, product.id),
    }));
    setFilteredProductsSlug(slugProducts);
    console.log("filteredProductSlug", slugProducts);
  }, [filteredProducts]);

  // Set the filter type to "unisex" when the component mounts
  useEffect(() => {
    updateType("unisex");
    // Specify a cleanup function to reset the filter criteria when the component unmounts
    return () => {
      resetFilterCriteria();
    };
  }, []); // Empty

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

  // Handle changes to filter criteria
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
        <title>Modelet per Femra - Atletja ime</title>
        <meta
          name="description"
          content="Browse our collection of women's shoes. Find the perfect pair for every occasion."
        />
        {/* You can add more meta tags and other elements as needed */}
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
          <PropagateLoader color={"#e54325"} />
        </div>
      ) : (
        <div>
          <div className="container">
            <div className="columns">
              <div className="column is-one-quarter  is-hidden-mobile">
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
                        Female's Shoes
                      </h1>
                    </div>
                    <div className="level-right">
                      <button
                        className="button is-hidden-tablet is-hidden-desktop filter-button"
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
        </div>
      )}
    </>
  );
};

export default FemaleShoesPage;
