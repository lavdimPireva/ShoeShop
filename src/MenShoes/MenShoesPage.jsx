import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/NavBar";
import Footer from "../HomePage/Footer";
import CartModal from "../CartModal/CartModal";
import { useFilter } from "../context/FilterProvider";
import { useCart } from "../context/CartProvider";
import { Link } from "react-router-dom";
import FilterPanel from "../FilterPanel/FilterPanel";
import { products } from "../ImagesModule/ModelsImage";

const MenShoesPage = () => {
  const { filteredProducts, updateFilterCriteria, filterCriteria } =
    useFilter();
  const { isCartOpen, toggleCart, cartItems } = useCart();
  const [availableSizes, setAvailableSizes] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  useEffect(() => {
    const newAvailableSizes = new Set();
    const brandsSelected = selectedBrands.length > 0;
    const selectedColors = filterCriteria.colors || [];
    const colorsSelected = selectedColors.length > 0;

    products.forEach((product) => {
      const brandMatches =
        !brandsSelected || selectedBrands.includes(product.name);
      const colorMatches =
        !colorsSelected ||
        product.color.some((color) => selectedColors.includes(color));

      if (brandMatches && colorMatches) {
        product.numeration.forEach((size) => newAvailableSizes.add(size));
      }
    });

    setAvailableSizes([...newAvailableSizes]);
  }, [selectedBrands, filterCriteria.colors]);

  const handleFilterChange = (newFilters) => {
    if (newFilters.brands) {
      setSelectedBrands(newFilters.brands);
    }
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
