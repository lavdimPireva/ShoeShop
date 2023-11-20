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

const FemaleShoesPage = () => {
  const {
    filteredProducts,
    updateType,
    resetFilterCriteria,
    updateFilterCriteria,
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

  // Set the filter type to "unisex" when the component mounts
  useEffect(() => {
    updateType("unisex");
    // Specify a cleanup function to reset the filter criteria when the component unmounts
    return () => {
      resetFilterCriteria();
    };
  }, []); // Empty

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
        <title>Modelet per Femra - Atletja ime</title>
        <meta
          name="description"
          content="Browse our collection of women's shoes. Find the perfect pair for every occasion."
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
                          <p className="subtitle is-6">{shoe.description}</p>
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

export default FemaleShoesPage;
