import React, { useState } from "react";
import CheckoutNavBar from "./CheckoutNavBar";
import Footer from "../HomePage/Footer";
import { useCart } from "../context/CartProvider";

const Checkout = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    country: "",
    city: "",
    phoneNumber: "",
  });

  const { cartItems, subtotal, removeFromCart } = useCart();

  const formattedSubtotal =
    subtotal && !isNaN(subtotal) ? parseFloat(subtotal).toFixed(2) : "0.00";

  console.log("subtotal", formattedSubtotal);
  console.log("subtotal TYPE", typeof formattedSubtotal);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can add what you want to do on form submit, like sending data to a backend server
    console.log(formData);
  };

  return (
    <>
      <CheckoutNavBar />

      <section className="section" style={{ backgroundColor: "#f5f5f5" }}>
        {" "}
        {/* Light gray background for the entire section */}
        <div className="container">
          <div className="columns">
            <div className="column is-half">
              <form onSubmit={handleSubmit}>
                <div className="field">
                  <label className="label">Name</label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Surname</label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      name="surname"
                      value={formData.surname}
                      onChange={handleChange}
                      placeholder="Enter your surname"
                      required
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Country</label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      placeholder="Enter your country"
                      required
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">City</label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Enter your city"
                      required
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Phone Number</label>
                  <div className="control">
                    <input
                      className="input"
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                </div>
                <div className="control">
                  <button className="button is-primary" type="submit">
                    Complete Payment
                  </button>
                </div>
              </form>
            </div>
            <div className="column is-half">
              <div className="box" style={{ backgroundColor: "white" }}>
                {" "}
                {/* Ensure the box background is white */}
                <h2 className="title is-5" style={{ padding: "5px" }}>
                  Shporta e blerjeve{" "}
                </h2>
                {/* cartItems */}
                <div
                  className="cart-content"
                  style={{
                    overflowY: "auto",
                    maxHeight: "300px",
                    marginBottom: "20px",
                  }}
                >
                  {" "}
                  {/* Set a max-height and overflowY to create a scrollable area */}
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="box cart-item"
                      style={{ backgroundColor: "white", marginBottom: "10px" }}
                    >
                      {" "}
                      {/* Individual cart item box */}
                      <article className="media">
                        <div className="media-left">
                          <figure className="image is-96x96">
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              className="cart-item-image"
                            />
                          </figure>
                        </div>
                        <div className="media-content cart-item-details">
                          <div className="content">
                            <p className="cart-item-name has-text-weight-bold is-size-7-mobile is-size-7-tablet is-size-7-fullhd">
                              {item.name}
                            </p>
                            <p className="cart-item-price">
                              <span className="has-text-weight-semibold is-size-7-mobile is-size-7-tablet is-size-7-fullhd">
                                Çmimi:
                              </span>{" "}
                              <span className="has-text-weight-bold is-size-7-mobile is-size-7-tablet is-size-7-fullhd">
                                {item.discountPrice
                                  ? `${item.discountPrice}`
                                  : item.originalPrice}
                                €
                              </span>
                            </p>
                            <p className="cart-item-sizes has-text-weight-bold is-size-7-mobile is-size-7-tablet is-size-7-fullhd	">
                              Madhesia e zgjedhur:{" "}
                              {item.selectedSizes.join(", ")}
                            </p>
                          </div>
                        </div>

                        <div className="media-right">
                          <button
                            className="delete"
                            onClick={() => removeFromCart(item.cartItemId)}
                          ></button>
                        </div>
                      </article>
                    </div>
                  ))}
                </div>
                {/* Calculation of the Total*/}
                {/* Calculation of the Total*/}
                <div className="price-summary" style={{ paddingTop: "0px" }}>
                  {/* Summary Heading */}
                  <h3 className="title is-5 has-text-left">Permbledhje</h3>

                  <div
                    className="content has-text-left"
                    style={{ marginTop: "20px" }}
                  >
                    <p className="is-size-6">
                      <span>Subtotal:</span> {formattedSubtotal} €
                    </p>
                    {/* Assuming shipping is a constant value; replace with appropriate variable if needed */}
                    <p className="is-size-6">
                      <span>Transporti:</span> Free
                    </p>
                    <p
                      className="is-size-6"
                      style={{
                        borderTop: "1px solid #eaeaea",
                        paddingTop: "10px",
                      }}
                    >
                      <strong>Total:</strong> {formattedSubtotal} €
                    </p>{" "}
                    {/* No shipping fees added for this example */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Checkout;
