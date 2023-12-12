import React, { useEffect, useState } from "react";
import CheckoutNavBar from "./CheckoutNavBar";
import { useCart } from "../context/CartProvider";
import Select from "react-select";
import "./Checkout.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useProduct } from "../context/ProductProvider";
import { PropagateLoader } from "react-spinners";
import ProgressStepBar from "./ProgressStepBar";
import CheckoutFooter from "./CheckoutFooter";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const [delayedLoading, setDelayedLoading] = useState(true);
  const { cartItems, subtotal, removeFromCart } = useCart();
  const { isLoading } = useProduct();
  const [activeStep, setActiveStep] = useState(0); // Start at step 0
  const [checkoutForm, setCheckoutForm] = useState({
    name: "",
    surname: "",
    country: "",
    city: "",
    address: "",
    phoneNumber: "",
    email: "",
    transportCost: 0,
  });

  const [validInputs, setValidInputs] = useState({
    name: { isValid: false, isTouched: false },
    surname: { isValid: false, isTouched: false },
    city: { isValid: false, isTouched: false },
    address: { isValid: false, isTouched: false },
    // ... other fields
  });

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/checkout/cart"); // Redirect to the cart page if cartItems is empty
    }
  }, [cartItems]); // Depend on cartItems and navigate function

  useEffect(() => {
    let timeout;
    if (!isLoading) {
      timeout = setTimeout(() => {
        setDelayedLoading(false);
      }, 1000); // 1000 ms delay
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [isLoading]);

  const handleNextStep = () => {
    setSubmitAttempted(true);

    let formIsValid = true;

    const updatedValidInputs = { ...validInputs };

    for (const field in checkoutForm) {
      const value = checkoutForm[field];

      if (value === checkoutForm.transportCost) {
        continue;
      }

      const isValid = validateInput(field, value);

      updatedValidInputs[field] = { ...updatedValidInputs[field], isValid };

      if (!isValid) {
        formIsValid = false;
      }
    }

    setValidInputs(updatedValidInputs);

    if (formIsValid) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      navigate("/payment", { state: { checkoutFormData: checkoutForm } });
    }
  };

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

  const validateInput = (name, value) => {
    if (
      name === "name" ||
      name === "surname" ||
      name === "city" ||
      name === "address"
    ) {
      // For name and surname, check that they are not empty and have at least two characters
      return (
        typeof value === "string" &&
        value.trim().length > 0 &&
        value.trim().length >= 3
      );
    } else {
      // For other inputs, you can add different validation logic
      return typeof value === "string" && value.trim().length >= 3;
    }
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

      setCheckoutForm({
        ...checkoutForm,
        country: selectedOption.value,
        transportCost,
      });
    } else {
      // If the selection is cleared, reset the country field and transport cost
      setCheckoutForm({
        ...checkoutForm,
        country: "",
        city: "",
        transportCost: 0,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Set the form values
    setCheckoutForm({ ...checkoutForm, [name]: value });

    // Validate the input and update validInputs state
    const isValid = validateInput(name, value);
    setValidInputs((prev) => ({
      ...prev,
      [name]: { ...prev[name], isValid, isTouched: true },
    }));
  };

  return (
    <>
      <CheckoutNavBar />

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
          <PropagateLoader color={"#1975B5"} />
        </div>
      ) : (
        <div>
          <section className="section" style={{ backgroundColor: "#f5f5f5" }}>
            {/* Light gray background for the entire section */}
            <div className="container">
              <div
                className="columns"
                style={{ gap: "30px", marginTop: "-5px" }}
              >
                <div className="column is-half" style={{}}>
                  <ProgressStepBar activeStep={activeStep} />

                  <form>
                    <div className="field">
                      <label className="label">Name</label>
                      <div className="control has-icons-right">
                        <input
                          className={`input ${
                            !validInputs.name.isValid &&
                            submitAttempted &&
                            "is-danger"
                          }`}
                          type="text"
                          name="name"
                          value={checkoutForm.name}
                          onChange={handleChange}
                          placeholder="Enter your name"
                          required
                        />

                        {validInputs.name.isValid &&
                          validInputs.name.isTouched && (
                            <span
                              className="icon is-right"
                              style={{ color: "#1975B5" }}
                            >
                              <FontAwesomeIcon
                                icon={faCheck}
                                size="lg"
                                style={{ fontSize: "1.5em" }}
                              />
                            </span>
                          )}
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">Surname</label>
                      <div className="control has-icons-right">
                        <input
                          className={`input ${
                            !validInputs.surname.isValid &&
                            submitAttempted &&
                            "is-danger"
                          }`}
                          type="text"
                          name="surname"
                          value={checkoutForm.surname}
                          onChange={handleChange}
                          placeholder="Enter your last name"
                          required
                        />

                        {validInputs.surname.isValid &&
                          validInputs.surname.isTouched && (
                            <span
                              className="icon is-right"
                              style={{ color: "#1975B5" }}
                            >
                              <FontAwesomeIcon
                                icon={faCheck}
                                size="lg"
                                style={{ fontSize: "1.5em" }}
                              />
                            </span>
                          )}
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
                      <div className="control has-icons-right">
                        <input
                          className={`input ${
                            !validInputs.city.isValid &&
                            submitAttempted &&
                            "is-danger"
                          }`}
                          type="text"
                          name="city"
                          value={checkoutForm.city}
                          onChange={handleChange}
                          placeholder="Enter your city"
                          required
                        />

                        {validInputs.city.isValid &&
                          validInputs.city.isTouched && (
                            <span
                              className="icon is-right"
                              style={{ color: "#1975B5" }}
                            >
                              <FontAwesomeIcon
                                icon={faCheck}
                                size="lg"
                                style={{ fontSize: "1.5em" }}
                              />
                            </span>
                          )}
                      </div>
                    </div>

                    <div className="field">
                      <label className="label">Address</label>
                      <div className="control has-icons-right">
                        <input
                          className={`input ${
                            !validInputs.address.isValid &&
                            submitAttempted &&
                            "is-danger"
                          }`}
                          type="text"
                          name="address"
                          value={checkoutForm.address}
                          onChange={handleChange}
                          placeholder="Enter your address"
                          required
                        />

                        {validInputs.address.isValid &&
                          validInputs.address.isTouched && (
                            <span
                              className="icon is-right"
                              style={{ color: "#1975B5" }}
                            >
                              <FontAwesomeIcon
                                icon={faCheck}
                                size="lg"
                                style={{ fontSize: "1.5em" }}
                              />
                            </span>
                          )}
                      </div>
                    </div>

                    <div className="field">
                      <label className="label">Email</label>
                      <div className="control">
                        <input
                          className="input"
                          type="email"
                          name="email"
                          value={checkoutForm.email}
                          onChange={handleChange}
                          placeholder="Enter your email"
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
                          value={checkoutForm.phoneNumber}
                          onChange={handleChange}
                          placeholder="Enter your phone number"
                          required
                        />
                      </div>
                    </div>
                  </form>
                </div>

                <div
                  className="column is-half"
                  style={{ padding: "10px", marginBottom: "20px" }}
                >
                  <div className="box " style={{ backgroundColor: "white" }}>
                    {" "}
                    {/* Ensure the box background is white */}
                    <h2 className="title is-5">Shporta e blerjeve </h2>
                    {/* cartItems */}
                    <div
                      className="cart-content"
                      style={{
                        overflowY: "auto",
                        maxHeight: "400px",
                        marginRight: "20px",
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
                    <div
                      className="price-summary"
                      style={{ paddingTop: "0px" }}
                    >
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
                          {checkoutForm.transportCost === 0
                            ? "Free"
                            : `${checkoutForm.transportCost.toFixed(2)} €`}
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
                              parseFloat(subtotal) + checkoutForm.transportCost
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
          <CheckoutFooter total={subtotal} onNextStepClick={handleNextStep} />
        </div>
      )}
    </>
  );
};

export default Checkout;
