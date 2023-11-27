import React, { useState } from "react";
import CheckoutNavBar from "./CheckoutNavBar";
import Footer from "../HomePage/Footer";
import { useCart } from "../context/CartProvider";
import Select from "react-select";

import "./Checkout.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Checkout = () => {
  const { cartItems, subtotal, removeFromCart } = useCart();
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    country: "",
    city: "",
    address: "",
    phoneNumber: "",
    transportCost: 0,
  });

  const countryOptions = [
    { value: "Kosova", label: "Kosova" },
    { value: "Shqiperia", label: "Shqiperia" },
    { value: "Maqedonia", label: "Maqedonia" },
  ];

  const customStyles = {
    placeholder: (defaultStyles) => {
      return {
        ...defaultStyles,
        color: "#d3d3d3",
      };
    },
    control: (provided) => ({
      ...provided,

      boxShadow: "none",
      border: "1px solid #dbdbdb",
    }),
  };

  const formattedSubtotal =
    subtotal && !isNaN(subtotal) ? parseFloat(subtotal).toFixed(2) : "0.00";

  const handleCountryChange = (selectedOption) => {
    if (selectedOption) {
      let transportCost = 0;

      if (
        selectedOption.value === "Shqiperia" ||
        selectedOption.value === "Maqedonia"
      ) {
        transportCost = 5;
      }

      setFormData({
        ...formData,
        country: selectedOption.value,
        transportCost,
      });
    } else {
      // If the selection is cleared, reset the country field and transport cost
      setFormData({ ...formData, country: "", city: "", transportCost: 0 });
    }
  };

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
                  <Select
                    options={countryOptions}
                    onChange={handleCountryChange}
                    placeholder="Select your country"
                    isClearable={true} // Allows users to clear their selection
                    isSearchable={false} // Disables the ability to type and search in the dropdown
                    styles={customStyles} // Apply the custom styles
                  />
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
                  <label className="label">Address</label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Enter your address"
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
              <div className="box " style={{ backgroundColor: "white" }}>
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
                      className="box cart-item "
                      style={{
                        backgroundColor: "white",
                        marginBottom: "10px",
                        position: "relative",
                      }}
                    >
                      <article
                        className="media"
                        style={{
                          backgroundColor: "white",
                          marginBottom: "10px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <div className="media-left">
                          <figure className="image is-96x96">
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              className="cart-item-image"
                            />
                          </figure>
                        </div>
                        <div className="media-content cart-item-details ">
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

                        <div
                          className="media-right"
                          style={{
                            position: "absolute", // Absolute position for the delete button
                            top: "50%", // Position at the top half to vertically center
                            right: "0.75rem", // Right position with some padding
                            transform: "translateY(-50%)",
                          }}
                        >
                          <button
                            className="button is-light" // Use 'is-light' for a button that blends into the background
                            onClick={() => removeFromCart(item.cartItemId)}
                            style={{
                              border: "none",
                              background: "transparent",
                              marginLeft: "auto", // This will push the button to the far right
                            }} // Remove border and background for a cleaner look
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
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
                      <span>Transporti:</span>{" "}
                      {formData.transportCost === 0
                        ? "Free"
                        : `${formData.transportCost.toFixed(2)} €`}
                    </p>
                    <p
                      className="is-size-6"
                      style={{
                        borderTop: "1px solid #eaeaea",
                        paddingTop: "10px",
                      }}
                    >
                      <strong>Total:</strong>{" "}
                      <strong>
                        {(
                          parseFloat(subtotal) + formData.transportCost
                        ).toFixed(2)}{" "}
                        €
                      </strong>
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