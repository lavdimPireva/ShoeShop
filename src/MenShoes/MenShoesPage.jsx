import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/NavBar";
import Footer from "../HomePage/Footer";
import CartModal from "../CartModal/CartModal";
import { useFilter } from "../context/FilterProvider";
import { useCart } from "../context/CartProvider";
import { generateSlug } from "../helpers/slugUtils";
import { Link } from "react-router-dom";
import FilterPanel from "../FilterPanel/FilterPanel";
import { products } from "../ImagesModule/ModelsImage";

const MenShoesPage = () => {
  const { filteredProducts, updateFilterCriteria, filterCriteria } =
    useFilter();
  const { isCartOpen, toggleCart, cartItems } = useCart();
  const [availableSizes, setAvailableSizes] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  console.log("PRODUCT >>>", products);

  useEffect(() => {
    // Whenever selectedBrands changes, update the available sizes
    const newAvailableSizes = new Set();
    if (selectedBrands.length === 0) {
      // If no brands are selected, all sizes are available
      products.forEach((product) =>
        product.numeration.forEach((size) => newAvailableSizes.add(size))
      );
    } else {
      // If brands are selected, only their sizes are available
      products.forEach((product) => {
        if (selectedBrands.includes(product.name)) {
          product.numeration.forEach((size) => newAvailableSizes.add(size));
        }
      });
    }
    setAvailableSizes([...newAvailableSizes]);
  }, [selectedBrands]);

  const handleFilterChange = (newFilters) => {
    console.log("lavdim");

    console.log("newFilters", newFilters);
    // Update selected brands based on newFilters
    if (newFilters.brands) {
      setSelectedBrands(newFilters.brands);
    }
    // Call updateFilterCriteria from your context
    updateFilterCriteria(newFilters);
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <div className="columns">
          <div className="column is-one-quarter">
            <FilterPanel
              onFilterChange={handleFilterChange}
              availableSizes={availableSizes}
            />
          </div>

          <div className="column is-three-quarters">
            <section className="section">
              <h1 className="title">Men's Shoes</h1>
              <div className="columns is-multiline">
                {filteredProducts.map((shoe) => (
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

export default MenShoesPage;
