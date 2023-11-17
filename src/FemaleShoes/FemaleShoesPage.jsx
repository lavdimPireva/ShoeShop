import React from "react";
import Navbar from "../Navbar/NavBar";
import Footer from "../HomePage/Footer";
import CartModal from "../CartModal/CartModal";
import { useFilter } from "../context/FilterProvider";
import { useCart } from "../context/CartProvider";

const FemaleShoesPage = () => {
  const { femaleShoes } = useFilter();
  const { isCartOpen, toggleCart, cartItems } = useCart();

  return (
    <>
      <Navbar />

      <section className="section">
        <div className="container" style={{ cursor: "pointer" }}>
          <h1 className="title is-size-5">Modelet per Femra/Meshkuj</h1>
          <div className="columns is-multiline">
            {femaleShoes.map((shoe) => (
              <div className="column is-3" key={shoe.id}>
                <div className="card">
                  <div className="card-image">
                    <figure className="image is-16by4">
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
                    {/* If you have a strike-through price (original price), display it here */}
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

export default FemaleShoesPage;
