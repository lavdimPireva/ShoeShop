import React from "react";
import Navbar from "../Navbar/NavBar";
import Footer from "../HomePage/Footer";
import CartModal from "../CartModal/CartModal";
import { useFilter } from "../context/FilterProvider";
import { useCart } from "../context/CartProvider";
import { generateSlug } from "../helpers/slugUtils";
import { Link } from "react-router-dom";

const MenShoesPage = () => {
  const { menShoes } = useFilter();

  const productsList = menShoes.map((product) => ({
    ...product,
    slug: generateSlug(product.name, product.id),
  }));

  const { isCartOpen, toggleCart, cartItems } = useCart();

  return (
    <>
      <Navbar />

      <section className="section">
        <div className="container">
          <h1 className="title">Men's Shoes</h1>
          <div className="columns is-multiline">
            {productsList.map((shoe) => (
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
        </div>
      </section>

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
