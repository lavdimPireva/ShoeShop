import React, { useState } from "react";
import Navbar from "../Navbar/NavBar";
import Footer from "../HomePage/Footer";
import CartModal from "../CartModal/CartModal";
import { useFilter } from "../context/FilterProvider";
import { useCart } from "../context/CartProvider";
import { generateSlug } from "../helpers/slugUtils";
import { Link } from "react-router-dom";
import FilterPanel from "../FilterPanel/FilterPanel";

const MenShoesPage = () => {
  const { menShoes } = useFilter();
  const [filters, setFilters] = useState({});
  const { isCartOpen, toggleCart, cartItems } = useCart();

  const productsList = menShoes.map((product) => ({
    ...product,
    slug: generateSlug(product.name, product.id),
  }));

  const filteredProductsList = menShoes.filter((product) => {
    // Apply filtering logic here based on the filters state
    // Example:
    // return (!filters.brand || product.brand === filters.brand) &&
    //        (!filters.size || product.size === filters.size);
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <div className="columns">
          <div className="column is-one-quarter">
            <FilterPanel onFilterChange={handleFilterChange} />
          </div>

          <div className="column is-three-quarters">
            <section className="section">
              <h1 className="title">Men's Shoes</h1>
              <div className="columns is-multiline">
                {filteredProductsList.map((shoe) => (
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
